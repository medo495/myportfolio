# Network Traffic Analysis with Wireshark

*Published on November 18, 2024 • 9 min read*

## Introduction

Network traffic analysis is fundamental to cybersecurity, and Wireshark has been my go-to tool for understanding network communications. From analyzing ICS protocols to troubleshooting connectivity issues, Wireshark provides deep insights into network behavior. This article covers practical techniques I've learned while working with network analysis.

## Wireshark Fundamentals

### Installation and Setup

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install wireshark

# Enable non-root capture
sudo usermod -a -G wireshark $USER
sudo chmod +x /usr/bin/dumpcap

# macOS
brew install wireshark

# Windows - Download from wireshark.org
```

### Basic Capture Setup

```bash
# Capture on specific interface
wireshark -i eth0

# Capture with filters
wireshark -i eth0 -f "tcp port 80"

# Capture to file
wireshark -i eth0 -w capture.pcap
```

## Capture Filters vs Display Filters

### Capture Filters (BPF Syntax)
Applied during capture to reduce data volume:

```wireshark
# Basic filters
host 192.168.1.1
port 80
tcp portrange 20-25

# Protocol filters
tcp
udp
icmp

# Complex filters
src host 192.168.1.1 and dst port 443
not broadcast and not multicast
```

### Display Filters
Applied after capture for analysis:

```wireshark
# Basic display filters
ip.src == 192.168.1.1
tcp.port == 80
http.request.method == "GET"

# Protocol-specific filters
tcp.flags.syn == 1
dns.qry.name contains "google"

# Time-based filters
frame.time >= "2024-11-01 00:00:00"
```

## Analyzing Common Protocols

### HTTP/HTTPS Traffic

```wireshark
# HTTP requests
http.request

# HTTPS - requires decryption
# Edit > Preferences > Protocols > TLS
# Add private key file for decryption

# Common HTTP analysis
http.request.method == "POST"
http.response.code == 404
http.content_length > 1000000
```

### DNS Analysis

```wireshark
# DNS queries
dns.qry.name

# DNS responses
dns.resp.name
dns.flags.rcode != 0

# Detect DNS tunneling
dns.qry.name len > 50
udp.length > 512
```

### TCP Connection Analysis

```wireshark
# Three-way handshake
tcp.flags.syn == 1 and tcp.flags.ack == 0

# Connection establishment
tcp.stream eq 1

# Retransmissions
tcp.analysis.retransmission

# Window size issues
tcp.window_size < 1000
```

## ICS Protocol Analysis

### Modbus TCP Analysis

```wireshark
# Basic Modbus traffic
tcp.port == 502

# Function codes
modbus.func_code == 3    # Read Holding Registers
modbus.func_code == 16   # Write Multiple Registers

# Exception responses
modbus.exception_code

# Analyze register access patterns
modbus.reference_num
```

### Modbus Traffic Patterns

```wireshark
# Normal polling pattern
tcp.port == 502 and ip.src == 192.168.1.100

# Unusual function codes
modbus.func_code > 21

# Large data transfers
modbus.length > 100
```

## Advanced Analysis Techniques

### Following TCP Streams

```wireshark
# Right-click packet > Follow > TCP Stream
# Useful for reconstructing application data
# Export stream for further analysis
```

### Expert Information

```wireshark
# Analyze > Expert Information
# Categories: Errors, Warnings, Notes

# Common issues to look for:
# Retransmissions
# Duplicate ACKs
# Out-of-order packets
# Window updates
```

### Statistics and Graphs

```wireshark
# Statistics > Protocol Hierarchy
# Shows protocol distribution

# Statistics > Conversations
# Shows traffic between endpoints

# Statistics > Endpoints
# Shows traffic by IP address

# Statistics > IO Graph
# Visualize traffic patterns over time
```

## Security Analysis

### Detecting Anomalies

```wireshark
# Port scanning
tcp.flags.syn == 1 and tcp.flags.ack == 0 and tcp.window_size == 1024

# SYN flood
tcp.flags.syn == 1 and tcp.flags.ack == 0

# Unusual traffic patterns
udp and udp.length > 1400

# Potential data exfiltration
tcp.len > 1000 and tcp.port not in {80 443}
```

### Malware Analysis

```wireshark
# C2 communications
dns.qry.name matches ".*[0-9]{8,}.*"

# Beaconing behavior
tcp.stream
| sort by time
| delta time > 300

# Unusual user agents
http.user_agent contains "curl"
```

## Command Line Analysis with Tshark

Tshark provides powerful command-line analysis capabilities:

```bash
# Basic capture
tshark -i eth0 -w capture.pcap

# Real-time analysis
tshark -i eth0 -f "tcp port 80" -T fields -e ip.src -e ip.dst

# Extract specific fields
tshark -r capture.pcap -T fields -e frame.time -e ip.src -e tcp.port

# Statistics
tshark -r capture.pcap -q -z conv,tcp

# Protocol hierarchy
tshark -r capture.pcap -q -z proto,colinfo,frame.colinfo
```

## Automation and Scripting

### Python Integration with Scapy

```python
from scapy.all import *

def analyze_pcap(pcap_file):
    packets = rdpcap(pcap_file)

    # Extract TCP streams
    streams = {}
    for pkt in packets:
        if TCP in pkt:
            stream_key = (pkt[IP].src, pkt[TCP].sport, pkt[IP].dst, pkt[TCP].dport)
            if stream_key not in streams:
                streams[stream_key] = []
            streams[stream_key].append(pkt)

    # Analyze each stream
    for stream_key, stream_packets in streams.items():
        print(f"Stream {stream_key}: {len(stream_packets)} packets")

        # Check for anomalies
        syn_count = sum(1 for pkt in stream_packets if pkt[TCP].flags & 0x02)
        if syn_count > 10:
            print(f"  Potential SYN scan detected")

# Usage
analyze_pcap('capture.pcap')
```

### Custom Dissectors

For proprietary protocols, you can create custom dissectors:

```lua
-- Lua dissector for Wireshark
local my_proto = Proto("myproto", "My Custom Protocol")

local fields = {
    command = ProtoField.uint8("myproto.command", "Command", base.HEX),
    length = ProtoField.uint16("myproto.length", "Length", base.DEC),
    data = ProtoField.bytes("myproto.data", "Data"),
}

my_proto.fields = fields

function my_proto.dissector(buffer, pinfo, tree)
    if buffer:len() < 3 then return end

    local subtree = tree:add(my_proto, buffer(), "My Protocol Data")

    subtree:add(fields.command, buffer(0,1))
    subtree:add(fields.length, buffer(1,2))
    subtree:add(fields.data, buffer(3))
end

-- Register dissector
tcp_table = DissectorTable.get("tcp.port")
tcp_table:add(12345, my_proto)
```

## Performance Considerations

### Capture Optimization

```bash
# Use ring buffer for continuous capture
tshark -i eth0 -b filesize:100000 -b files:5 -w capture.pcap

# Capture only headers for analysis
tshark -i eth0 -s 128

# Filter at capture time to reduce CPU usage
tshark -i eth0 -f "not port 22" -w filtered.pcap
```

### Large File Handling

```bash
# Split large captures
editcap -c 100000 input.pcap output.pcap

# Merge captures
mergecap -w merged.pcap capture1.pcap capture2.pcap

# Compress captures
gzip capture.pcap
```

## Troubleshooting Common Issues

### Capture Problems

```bash
# Check interface permissions
sudo tshark -D

# Test capture capability
sudo tshark -i eth0 -c 1

# Debug filter syntax
tshark -f "tcp port 80" -d tcp.port==80,http
```

### Performance Issues

```bash
# Monitor system resources during capture
top -p $(pgrep tshark)

# Use dumpcap for high-speed capture
dumpcap -i eth0 -w highspeed.pcap -b filesize:100000
```

## Integration with Other Tools

### Combining with Nmap

```bash
# Scan network
nmap -sn 192.168.1.0/24 > hosts.txt

# Capture traffic during scan
tshark -i eth0 -f "icmp or tcp" -w nmap_scan.pcap &
nmap -A -T4 -iL hosts.txt
kill %1

# Analyze scan results
tshark -r nmap_scan.pcap -q -z conv,ip
```

### SIEM Integration

```bash
# Export for Splunk
tshark -r capture.pcap -T json > splunk_input.json

# Format for ELK stack
tshark -r capture.pcap -T ek > elk_input.json
```

## Best Practices

### Capture Strategy
1. **Define objectives** before starting capture
2. **Use appropriate filters** to focus on relevant traffic
3. **Monitor resources** during long captures
4. **Document methodology** for reproducibility

### Analysis Approach
1. **Start broad**, then narrow down
2. **Use statistics** to identify patterns
3. **Follow streams** for detailed investigation
4. **Correlate with other data sources**

### Security Considerations
1. **Handle sensitive data appropriately**
2. **Comply with privacy regulations**
3. **Secure capture files**
4. **Limit capture scope** to necessary data

## Case Study: ICS Security Assessment

During my ICS security evaluation project, I used Wireshark to:

1. **Baseline normal traffic**:
   ```wireshark
   tcp.port == 502 and frame.time >= "2024-01-01 00:00:00"
   ```

2. **Identify anomalies**:
   ```wireshark
   modbus.func_code not in {1,2,3,4,5,6,15,16}
   ```

3. **Detect potential attacks**:
   ```wireshark
   tcp.flags.syn == 1 and tcp.flags.ack == 0 and ip.src not in {known_ips}
   ```

4. **Analyze response patterns**:
   ```wireshark
   modbus.exception_code != 0
   ```

## Conclusion

Wireshark is an indispensable tool for network analysis, offering deep insights into protocol behavior and network security. From basic packet capture to advanced protocol dissection, it provides the visibility needed to understand and secure network communications.

The key to effective Wireshark usage lies in understanding both the technical details of network protocols and the broader context of network security. Regular practice with different scenarios and protocols will build the intuition needed for effective network analysis.

As networks grow more complex and threats more sophisticated, tools like Wireshark will remain essential for maintaining network visibility and security.