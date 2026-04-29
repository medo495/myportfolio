# Building Secure Mobile Apps with React Native

*Published on December 5, 2024 • 7 min read*

## Introduction

Mobile applications handle increasingly sensitive data, from personal information to financial details. As a React Native developer, I've learned that security must be built into the development process from the beginning. This article covers essential security practices for React Native applications.

## Understanding React Native Security

React Native bridges native mobile development with JavaScript, creating unique security challenges:
- **JavaScript Layer**: Vulnerable to code injection and XSS
- **Native Bridge**: Communication between JS and native code
- **Platform Differences**: iOS and Android security models vary
- **Third-Party Dependencies**: Libraries can introduce vulnerabilities

## Secure Data Storage

### Local Storage Security

Never store sensitive data in AsyncStorage or localStorage:

```javascript
// ❌ Insecure: Storing sensitive data in plain text
await AsyncStorage.setItem('userToken', 'sensitive-jwt-token');

// ✅ Secure: Use encrypted storage
import EncryptedStorage from 'react-native-encrypted-storage';

await EncryptedStorage.setItem('userToken', {
  jwt: 'sensitive-jwt-token',
  // Additional encryption happens automatically
});
```

### Keychain/Keystore Integration

```javascript
// iOS Keychain
import * as Keychain from 'react-native-keychain';

await Keychain.setGenericPassword('username', 'password', {
  service: 'com.myapp.service',
  accessControl: Keychain.ACCESS_CONTROL.BIOLOGIC,
});

// Android Keystore
import RNSecureStorage from 'rn-secure-storage';

await RNSecureStorage.set('token', 'jwt-token', {
  keychainService: 'myKeychain',
});
```

## Network Security

### Certificate Pinning

Prevent man-in-the-middle attacks by pinning SSL certificates:

```javascript
import { Platform } from 'react-native';
import RNSSLPublicKeyPinning from 'react-native-ssl-public-key-pinning';

const config = {
  'api.example.com': {
    publicKeyHashes: [
      'sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'sha256/BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=',
    ],
  },
};

RNSSLPublicKeyPinning.initialize(config);
```

### API Communication Best Practices

```javascript
// Secure API client configuration
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// Request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    const token = await EncryptedStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token refresh
      const newToken = await refreshToken();
      if (newToken) {
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return apiClient.request(error.config);
      }
    }
    return Promise.reject(error);
  }
);
```

## Authentication & Authorization

### JWT Token Management

```javascript
class AuthService {
  static async login(email, password) {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      });

      const { token, refreshToken, expiresIn } = response.data;

      // Store tokens securely
      await EncryptedStorage.setItem('tokens', {
        accessToken: token,
        refreshToken,
        expiresAt: Date.now() + (expiresIn * 1000),
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async getValidToken() {
    const tokens = await EncryptedStorage.getItem('tokens');
    if (!tokens) return null;

    const { accessToken, refreshToken, expiresAt } = JSON.parse(tokens);

    if (Date.now() > expiresAt) {
      // Token expired, try refresh
      try {
        const response = await apiClient.post('/auth/refresh', {
          refreshToken,
        });

        const newTokens = response.data;
        await EncryptedStorage.setItem('tokens', {
          ...newTokens,
          expiresAt: Date.now() + (newTokens.expiresIn * 1000),
        });

        return newTokens.accessToken;
      } catch {
        // Refresh failed, logout
        await this.logout();
        return null;
      }
    }

    return accessToken;
  }
}
```

### Biometric Authentication

```javascript
import ReactNativeBiometrics from 'react-native-biometrics';

const biometricAuth = async () => {
  const { biometryType } = await ReactNativeBiometrics.isSensorAvailable();

  if (biometryType === ReactNativeBiometrics.Biometrics) {
    const { success, signature } = await ReactNativeBiometrics.createSignature({
      promptMessage: 'Authenticate to continue',
      payload: 'sensitive-operation',
    });

    if (success) {
      // Proceed with authenticated operation
      return true;
    }
  }

  return false;
};
```

## Code Security

### Input Validation

```javascript
// Client-side validation (never trust client input)
import validator from 'validator';

const validateEmail = (email) => {
  return validator.isEmail(email) && validator.isLength(email, { min: 5, max: 254 });
};

const validatePassword = (password) => {
  return validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });
};

// Sanitize user inputs
const sanitizeInput = (input) => {
  return validator.escape(input);
};
```

### Preventing Code Injection

```javascript
// Avoid eval and Function constructor
// ❌ Dangerous
const userCode = "alert('Hello " + userInput + "')";
// eval(userCode);

// ✅ Safe
const greeting = `Hello ${userInput.replace(/[<>'"&]/g, '')}`;
```

## Third-Party Library Security

### Dependency Auditing

```bash
# Check for vulnerabilities
npm audit

# Update dependencies
npm update

# Use tools like Snyk
npx snyk test

# Check bundle size and dependencies
npx bundle-analyzer build
```

### Library Selection Criteria

```javascript
// Check package.json for security indicators
const packageInfo = require('./package.json');

// Prefer libraries with:
- Active maintenance (recent commits)
- Good documentation
- Security audit history
- Large user base
- Open-source license
```

## Platform-Specific Security

### iOS Security Features

```objective-c
// App Transport Security
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
  <false/>
  <key>NSExceptionDomains</key>
  <dict>
    <key>example.com</key>
    <dict>
      <key>NSExceptionAllowsInsecureHTTPLoads</key>
      <false/>
      <key>NSIncludesSubdomains</key>
      <true/>
    </dict>
  </dict>
</dict>
```

### Android Security Features

```xml
<!-- AndroidManifest.xml -->
<manifest>
  <application
    android:networkSecurityConfig="@xml/network_security_config"
    android:usesCleartextTraffic="false">
  </application>
</manifest>

<!-- res/xml/network_security_config.xml -->
<network-security-config>
  <domain-config cleartextTrafficPermitted="false">
    <domain includeSubdomains="true">secure.example.com</domain>
  </domain-config>
</network-security-config>
```

## Runtime Security

### Root/Jailbreak Detection

```javascript
import JailMonkey from 'jail-monkey';

const checkDeviceSecurity = async () => {
  const isJailBroken = await JailMonkey.isJailBroken();
  const canMockLocation = await JailMonkey.canMockLocation();
  const isOnExternalStorage = await JailMonkey.isOnExternalStorage();

  if (isJailBroken || canMockLocation) {
    // Handle compromised device
    Alert.alert('Security Warning', 'This device may be compromised.');
    return false;
  }

  return true;
};
```

### Certificate Transparency Monitoring

```javascript
import { checkCertificateTransparency } from 'react-native-certificate-transparency';

const verifyCertificate = async (domain) => {
  try {
    const result = await checkCertificateTransparency(domain);
    return result.isValid;
  } catch (error) {
    console.error('Certificate verification failed:', error);
    return false;
  }
};
```

## Testing Security

### Security Testing Checklist

```javascript
// Unit tests for security functions
describe('AuthService', () => {
  test('should reject weak passwords', () => {
    expect(validatePassword('123456')).toBe(false);
  });

  test('should accept strong passwords', () => {
    expect(validatePassword('StrongP@ss123')).toBe(true);
  });
});

// Integration tests for API security
describe('API Security', () => {
  test('should handle token expiration', async () => {
    // Mock expired token scenario
    const result = await AuthService.getValidToken();
    expect(result).toBeNull();
  });
});
```

### Penetration Testing

```bash
# Use tools like:
# - OWASP ZAP for API testing
# - Frida for runtime analysis
# - MobSF for static analysis

# Example MobSF usage
docker run -it --rm -p 8000:8000 -v $(pwd):/app opensecurity/mobile-security-framework-mobsf:latest
```

## Deployment Security

### Code Obfuscation

```javascript
// metro.config.js
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
```

### Environment Configuration

```javascript
// Separate config files for different environments
const config = {
  development: {
    apiUrl: 'http://localhost:3000',
    debug: true,
  },
  staging: {
    apiUrl: 'https://api-staging.example.com',
    debug: false,
  },
  production: {
    apiUrl: 'https://api.example.com',
    debug: false,
  },
};

export default config[process.env.NODE_ENV || 'development'];
```

## Monitoring and Incident Response

### Error Tracking

```javascript
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'your-sentry-dsn',
  environment: process.env.NODE_ENV,
});

// Capture security-related errors
Sentry.captureException(new Error('Potential security breach'), {
  tags: {
    type: 'security',
    severity: 'high',
  },
});
```

### Security Event Logging

```javascript
class SecurityLogger {
  static logSecurityEvent(event, details) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      details,
      deviceInfo: {
        platform: Platform.OS,
        version: Platform.Version,
      },
    };

    // Send to security monitoring service
    apiClient.post('/security/logs', logEntry);
  }
}

// Usage
SecurityLogger.logSecurityEvent('failed_biometric_auth', {
  attemptCount: 3,
  userId: 'user123',
});
```

## Conclusion

Building secure React Native applications requires a comprehensive approach that addresses every layer of the application stack. From secure data storage and network communication to code security and platform-specific features, security must be considered at every development stage.

Remember that security is an ongoing process, not a one-time implementation. Regular audits, dependency updates, and staying informed about the latest threats are essential for maintaining application security.

By following these practices, you can build React Native applications that protect user data and maintain trust in your mobile solutions.