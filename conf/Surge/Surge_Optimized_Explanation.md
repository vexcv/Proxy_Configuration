# Surge 配置文件优化说明（2025.9.6）
> 作者: https://github.com/vexcv  
> Telegram: https://t.me/vexcso  
> Surge 官方手册: https://manual.nssurge.com/  
> 兼容版本: iOS/macOS Surge 5（公司网络全托管自用版）

---

## [General] - 基础设置与优化

### 日志与错误处理
- **`loglevel = notify`**  
  只记录重要信息，避免日志过于冗余，推荐用于日常使用。
- **`show-error-page-for-reject = true`**  
  被 REJECT 的请求显示错误页，更直观了解访问受阻原因。

### 网络访问控制
- **`allow-wifi-access` / `wifi-access-http-port` / `wifi-access-socks5-port`**  
  可根据需求开启，允许局域网或热点设备使用代理。  
  优化建议：公司自用可关闭热点共享，避免安全风险。
- **`all-hybrid = false`**  
  禁用全混合模式，减少网络冲突。
- **`ipv6 = false` / `ipv6-vif = disabled`**  
  默认禁用 IPv6，若网络环境支持 IPv6，可启用提升兼容性。

### 测试与超时
- **`test-timeout = 2`**  
  设置连接测试超时时间，过低可能误判网络不可用，可适当调高到 3~5 秒。
- **`internet-test-url = http://www.gstatic.com/generate_204`**  
  推荐使用 204 响应的 URL，快速检测网络连通性。
- **`proxy-test-url = http://www.gstatic.com/generate_204`**  
  用于测速代理延迟，确保选择最佳节点。

### DNS 配置
- **`dns-server = 223.5.5.5,114.114.114.114,119.29.29.29,system`**  
  多 DNS 并用，提高解析稳定性。
- **`encrypted-dns-server = https://doh.pub/dns-query,https://dns.alidns.com/dns-query`**  
  加密 DNS 提升安全性，防止劫持。
- **`hijack-dns = *:53`**  
  劫持所有 53 端口请求，通过 Surge 统一解析。
- **`read-etc-hosts = true`**  
  使用系统 hosts 文件，优先解析本地自定义域名。

### 代理策略与控制
- **`skip-proxy = 127.0.0.1,192.168.0.0/16,...`**  
  跳过局域网 IP 及本地地址，直连提高速度。
- **`always-real-ip = *.srv.nintendo.net,...`**  
  特殊域名直连，避免游戏、直播等服务走代理导致延迟。
- **`udp-policy-not-supported-behaviour = REJECT` / `udp-priority = false`**  
  未支持 UDP 时拒绝请求，TCP 优先，提高稳定性。

### 外部控制
- **`external-controller-access = 108108@0.0.0.0:6170`**  
  远程控制器配置，生产环境建议限定内网访问或使用密码保护。

---

## [Proxy Group] - 策略组优化说明

### 常用策略组
- **`Proxy`**: 手动选择所有订阅节点，适合测试新节点。
- **`Apple` / `Microsoft` / `AI` / `YouTube` / `TikTok` / `Netflix` / `Disney+` / `Spotify` / `Telegram`**  
  为不同服务分流，提高访问速度与稳定性。
- **`GlobalMedia`**  
  兜底国际媒体访问，未匹配到专用策略的走这里。

### 地区策略组
- **🇺🇸 / 🇭🇰 / 🇹🇼 / 🇯🇵 / 🇰🇷 / 🇸🇬 / 🇨🇦 / 🇬🇧 / 🇫🇷 / 🇳🇱 / 🇩🇪**  
  自动测速并选择延迟最低节点。  
  优化建议：`update-interval` 可设置为 300~600 秒，避免频繁测速导致不必要的网络消耗。

### 策略组参数解释
- **`select`** - 手动选择节点  
- **`url-test`** - 自动测速并选择最优节点  
- **`tolerance`** - 延迟容差阈值  
- **`evaluate-before-use`** - 使用前先测延迟  
- **`hidden`** - UI 隐藏策略组  
- **`icon-url`** - 策略组图标，增强可读性

---

## [Rule] - 路由规则说明

规则匹配优先级从上到下，匹配到第一条即生效。

### 安全防护
- **`AND,((PROTOCOL,UDP),(DEST-PORT,443)),REJECT-NO-DROP`**  
  阻止 UDP 443 避免部分应用循环或异常请求。
- **`IP-CIDR,0.0.0.0/32,REJECT,no-resolve`**  
  阻止访问非法 IP，防止 App 循环请求。

### 应用专用规则
- **微信服务** - `RULE-SET,...WeChat.list,DIRECT`  
- **AI 服务** - `RULE-SET,...OpenAI/OpenAI.list,AI`  
- **苹果服务** - `RULE-SET,...Apple_All_No_Resolve.list,Apple`  
- **流媒体** - Netflix/YouTube/Disney+ 等对应策略组  
- **微软服务** - `RULE-SET,...Microsoft.list,Microsoft`  

### 广告与安全
- **`RULE-SET,...Advertising.list,REJECT,pre-matching,extended-matching`**  
  广告拦截规则，`pre-matching` 优先处理，减少冗余流量。

### 地理位置路由
- **`GEOIP,CN,DIRECT`** - 中国大陆 IP 直连  
- **`FINAL,Proxy,dns-failed`** - 兜底策略，未匹配请求走 Proxy

---

## [URL Rewrite] - URL 重写

- **Google CN 重定向**  
  将 `g.cn` / `google.cn` 重定向到 `google.com`，保证访问国际搜索无障碍。

---

## [MITM] - HTTPS 解密

- **`skip-server-cert-verify = true`**  
  跳过证书验证，便于自签证书 MITM。
- **`tcp-connection = true` / `h2 = true`**  
  支持 TCP 与 HTTP/2 协议的 MITM。
- **`hostname = *, %APPEND% ...`**  
  启用指定域名的 HTTPS 解密。
- ⚠️ 使用 MITM 需安装 Surge 根证书，确保安全。

---

## 优化总结

1. **日志与请求过滤**：保持 notify 级别，Replica 可隐藏后台噪音。  
2. **DNS 优化**：劫持 DNS + 加密 DNS + hosts 文件，提升解析稳定性。  
3. **策略组优化**：按服务和地区分类，延迟容差设置合理，避免频繁切换。  
4. **规则优化**：先安全后分流，再兜底，匹配顺序关键。  
5. **MITM 使用**：仅在需要 HTTPS 拦截或请求修改时启用，避免安全风险。  
6. **代理控制**：远程控制建议密码保护，内部网络限制访问。

---

