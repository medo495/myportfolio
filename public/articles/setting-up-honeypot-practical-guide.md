# Setting Up a Honeypot: A Practical Guide

*Published on February 20, 2025 • 8 min read*

## Introduction

Honeypots are decoy systems designed to attract and trap malicious actors, providing valuable insights into attacker behavior and techniques. As a cybersecurity student, setting up a honeypot was one of my most educational projects. This guide walks through deploying a honeypot on Parrot OS and analyzing the captured data.

## What is a Honeypot?

A honeypot is a security mechanism that creates a decoy system to:
- Attract potential attackers
- Detect unauthorized access attempts
- Collect intelligence on attack methods
- Divert attackers from real systems

### Types of Honeypots
- **Low-Interaction**: Simulate services without full functionality
- **High-Interaction**: Provide real systems and services
- **Production vs Research**: Production protects, research analyzes

## Choosing Your Platform

I chose Parrot OS for this project because:
- Built-in security tools
- Lightweight and stable
- Excellent for both offensive and defensive security work
- Active community support

## Installation and Setup

### 1. System Preparation

```bash
# Update the system
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install -y docker.io docker-compose git curl wget
```

### 2. Installing Cowrie Honeypot

Cowrie is an excellent medium-interaction SSH honeypot that logs brute force attacks and shell interactions.

```bash
# Clone the Cowrie repository
git clone https://github.com/cowrie/cowrie.git
cd cowrie

# Install dependencies
sudo apt install -y python3-virtualenv libssl-dev libffi-dev build-essential
python3 -m venv cowrie-env
source cowrie-env/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

### 3. Configuration

```bash
# Copy configuration files
cp etc/cowrie.cfg.dist etc/cowrie.cfg

# Edit configuration
nano etc/cowrie.cfg
```

Key configuration changes:
```ini
[ssh]
enabled = true
listen_endpoints = tcp:2222:interface=0.0.0.0

[output_jsonlog]
enabled = true
logfile = log/cowrie.json

[output_txtlog]
enabled = true
logfile = log/cowrie.log
```

### 4. Running the Honeypot

```bash
# Start Cowrie
./bin/cowrie start

# Check status
./bin/cowrie status

# View logs
tail -f log/cowrie.log
```

## Advanced Setup with Docker

For easier management, I also set up a containerized version:

```yaml
# docker-compose.yml
version: '3.8'
services:
  cowrie:
    image: cowrie/cowrie:latest
    ports:
      - "2222:2222"
    volumes:
      - ./cowrie-data:/cowrie/cowrie-data
      - ./cowrie-git:/cowrie/cowrie-git
    restart: unless-stopped
```

## Monitoring and Analysis

### Real-Time Monitoring

```bash
# Monitor SSH connection attempts
sudo tcpdump -i any port 2222 -n

# Watch log files
tail -f cowrie/log/cowrie.log
```

### Log Analysis

Cowrie generates detailed JSON logs. Here's a sample analysis script:

```python
import json
import sys
from collections import Counter

def analyze_cowrie_logs(logfile):
    with open(logfile, 'r') as f:
        logs = [json.loads(line) for line in f if line.strip()]

    # Count events by type
    event_types = Counter(log['eventid'] for log in logs)

    # Extract login attempts
    login_attempts = [log for log in logs if log['eventid'] == 'cowrie.login']

    # Common usernames and passwords
    usernames = Counter(log.get('username', '') for log in login_attempts)
    passwords = Counter(log.get('password', '') for log in login_attempts)

    print("Event Summary:")
    for event, count in event_types.most_common():
        print(f"  {event}: {count}")

    print("\nTop Usernames:")
    for username, count in usernames.most_common(10):
        print(f"  {username}: {count}")

    print("\nTop Passwords:")
    for password, count in passwords.most_common(10):
        print(f"  {password}: {count}")

if __name__ == "__main__":
    analyze_cowrie_logs(sys.argv[1])
```

## Attack Analysis

### Common Attack Patterns Observed

1. **Brute Force Attacks**
   - Sequential username/password combinations
   - Dictionary-based attacks
   - Common credential testing

2. **Automated Scanning**
   - Port scanning before attacks
   - Service enumeration
   - Vulnerability probing

3. **Malware Deployment Attempts**
   - Downloading malicious payloads
   - Establishing C2 communications
   - Lateral movement testing

### Sample Attack Session

```
2025-02-15 14:23:01+0000 [SSHService ssh-connection on HoneyPotTransport,1,127.0.0.1] SSH client connected
2025-02-15 14:23:02+0000 [SSHService ssh-connection on HoneyPotTransport,1,127.0.0.1] login attempt [root/admin123]
2025-02-15 14:23:03+0000 [SSHService ssh-connection on HoneyPotTransport,1,127.0.0.1] login attempt [root/password]
2025-02-15 14:23:04+0000 [SSHService ssh-connection on HoneyPotTransport,1,127.0.0.1] login attempt [root/123456]
2025-02-15 14:23:05+0000 [SSHService ssh-connection on HoneyPotTransport,1,127.0.0.1] login attempt [admin/admin]
2025-02-15 14:23:06+0000 [SSHService ssh-connection on HoneyPotTransport,1,127.0.0.1] login failed [admin/admin]
```

## Integration with SIEM

### Splunk Integration

```bash
# Install Splunk Universal Forwarder
wget -O splunkforwarder.tgz 'https://download.splunk.com/products/universalforwarder/releases/9.0.4/linux/splunkforwarder-9.0.4-1a6435c8a9ec-Linux-x86_64.tgz'
tar -xzf splunkforwarder.tgz
cd splunkforwarder/bin
./splunk start --accept-license --answer-yes --no-prompt

# Configure forwarding
./splunk add forward-server <splunk-server>:9997
./splunk add monitor /path/to/cowrie/log/
```

### ELK Stack Alternative

For open-source SIEM:

```yaml
# docker-compose.yml for ELK
version: '3.8'
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.5.0
    environment:
      - discovery.type=single-node
    ports:
      - "9200:9200"

  logstash:
    image: docker.elastic.co/logstash/logstash:8.5.0
    volumes:
      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf
    ports:
      - "5044:5044"

  kibana:
    image: docker.elastic.co/kibana/kibana:8.5.0
    ports:
      - "5601:5601"
```

## Best Practices

### 1. Legal Considerations
- Ensure honeypot deployment complies with local laws
- Document all activities
- Consider ethical implications

### 2. Operational Security
- Don't connect honeypots to production networks
- Use dedicated hardware/virtual machines
- Regularly update and patch

### 3. Data Handling
- Secure log storage
- Regular backup procedures
- Data retention policies

### 4. Maintenance
- Monitor system resources
- Regular log rotation
- Update honeypot software

## Lessons Learned

Setting up this honeypot taught me several valuable lessons:

1. **Attack Persistence**: Attackers are remarkably persistent, often trying thousands of combinations
2. **Common Patterns**: Most attacks follow predictable patterns that can be automated
3. **Intelligence Value**: Even simple honeypots can provide actionable threat intelligence
4. **Resource Requirements**: Honeypots need careful resource management to avoid impacting legitimate systems

## Future Enhancements

### Advanced Features to Add
- **Multi-Service Honeypots**: HTTP, FTP, Telnet
- **Dynamic Content**: Serve different content based on attacker behavior
- **Automated Response**: Trigger alerts or countermeasures
- **Machine Learning**: Anomaly detection for sophisticated attacks

### Integration Ideas
- **Threat Intelligence Sharing**: Contribute to platforms like MISP
- **Automated Reporting**: Generate regular threat reports
- **Collaboration**: Share findings with the security community

## Conclusion

Honeypots are powerful tools for understanding attacker behavior and improving defensive strategies. This project not only enhanced my technical skills but also gave me practical experience in threat detection and analysis.

The insights gained from even a simple SSH honeypot were invaluable for understanding real-world attack patterns. As cyber threats continue to evolve, tools like honeypots will remain essential for proactive defense.

Remember: the goal isn't just to catch attackers, but to learn from them and strengthen your overall security posture.