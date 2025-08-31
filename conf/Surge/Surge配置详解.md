# Surge 配置文件详细解释

## [General] 段落 - 基础设置

### 日志和错误处理
- **`loglevel = notify`** - 设置日志详细程度，notify 表示只显示重要信息，不会过于冗余
- **`show-error-page-for-reject = true`** - 当访问被拒绝的网站时，显示错误页面而不是直接超时

### 网络访问控制
- **`allow-wifi-access = true`** - 允许其他设备通过 Wi-Fi 连接到此设备使用代理
- **`wifi-access-http-port = 6152`** - 设置 HTTP 代理端口号，其他设备可以通过这个端口连接
- **`wifi-access-socks5-port = 6153`** - 设置 SOCKS5 代理端口号
- **`allow-hotspot-access = true`** - 允许通过个人热点共享代理服务

### 网络协议设置
- **`all-hybrid = false`** - 禁用全混合网络模式，避免同时使用多个网络接口造成的复杂性
- **`ipv6 = true`** - 启用 IPv6 支持，现代网络环境建议开启
- **`ipv6-vif = disabled`** - 禁用 IPv6 虚拟网络接口，避免潜在冲突

### 测试和超时设置
- **`test-timeout = 4`** - 设置网络测试超时时间为4秒，平衡速度和准确性
- **`internet-test-url = http://www.bing.com`** - 用于测试互联网连接的 URL
- **`proxy-test-url = http://www.gstatic.com/generate_204`** - 用于测试代理服务器延迟的 URL（返回 204 状态码，无内容）

### DNS 配置
- **`dns-server = 223.5.5.5, 114.114.114.114, 119.29.29.29, system`** - DNS 服务器列表，包括阿里、114、腾讯 DNS 和系统默认
- **`encrypted-dns-server = https://doh.pub/dns-query, https://dns.alidns.com/dns-query`** - 加密 DNS 服务器，使用 HTTPS 协议提高安全性
- **`hijack-dns = *:53`** - 劫持所有 DNS 请求到 53 端口，确保 DNS 查询通过 Surge 处理
- **`read-etc-hosts = true`** - 读取系统 hosts 文件中的 DNS 记录

### 管理和控制
- **`http-api = Lucky@127.0.0.1:5208`** - 启用 HTTP API，用户名 Lucky，监听本地 5208 端口
- **`http-api-web-dashboard = true`** - 启用网页控制面板，可以通过浏览器管理 Surge

### 网络行为设置
- **`exclude-simple-hostnames = true`** - 排除简单主机名（如 localhost），不对其应用代理规则
- **`use-default-policy-if-wifi-not-primary = false`** - 当连接的 Wi-Fi 不是主 Wi-Fi 时，不使用默认策略
- **`skip-proxy = 127.0.0.1, 192.168.0.0/16...`** - 跳过代理的 IP 地址段，这些地址直连不走代理

### 特殊域名处理
- **`always-real-ip = *.srv.nintendo.net...`** - 对这些域名总是使用真实 IP，不走代理的 DNS 解析（主要是游戏和流媒体服务）

### 数据库和安全
- **`disable-geoip-db-auto-update = true`** - 禁用 GeoIP 数据库自动更新，避免频繁下载
- **`udp-policy-not-supported-behaviour = REJECT`** - 当代理服务器不支持 UDP 时，直接拒绝 UDP 请求
- **`wifi-assist = true`** - 启用 Wi-Fi 助手，网络质量差时自动切换
- **`udp-priority = false`** - UDP 不优先处理，TCP 优先

---

## [Replica] 段落 - 请求记录过滤

**Replica 是 Surge 的请求记录功能，这些设置控制哪些请求会在日志中显示：**

- **`hide-apple-request = 1`** - 隐藏苹果系统的后台请求（如系统更新检查、推送等），因为这些请求很频繁且通常不重要
- **`hide-crashlytics-request = true`** - 隐藏应用崩溃报告请求，减少日志噪音
- **`use-keyword-filter = false`** - 不使用关键词过滤器来隐藏请求
- **`hide-udp = 1`** - 隐藏 UDP 请求记录，因为 UDP 请求通常很频繁（如 DNS 查询）
- **`keyword-filter-type = none`** - 关键词过滤器类型设为无
- **`hide-crash-reporter-request = 1`** - 隐藏崩溃报告请求（与 crashlytics 类似）

**简单说：这些设置让你的请求日志更清爽，只显示重要的网络请求，过滤掉系统自动产生的噪音。**

---

## [Proxy] 段落 - 代理服务器定义

这里是手动添加代理服务器的地方，格式如：
```
ProxyName = ss, server.com, 443, encrypt-method=chacha20, password=pwd
```
通常我们使用订阅链接，所以这里是空的。

---

## [Proxy Group] 段落 - 策略组定义

### 主要策略组
- **`♥️ 网速超快`** - 手动选择组，包含所有订阅的代理服务器，可以手动切换
- **`🟡 延迟优选`** - 自动测速组，自动选择延迟最低的服务器
- **`🤖 智能助理`** - 专门用于 AI 服务（ChatGPT、Claude 等）的策略组
- **`🍎 苹果服务`** - 苹果相关服务的路由策略
- **`Ⓜ️ 微软服务`** - 微软服务的路由策略
- **`📱 社交平台`** - Telegram、X(Twitter) 等社交软件的策略
- **`🎮 游戏平台`** - Steam、Epic、PlayStation 等游戏平台策略
- **`📺 国际媒体`** - Netflix、YouTube、Disney+ 等国际流媒体
- **`🖥️ 港台番剧`** - 哔哩哔哩等需要港台 IP 的内容
- **`💿 国内媒体`** - 爱奇艺、腾讯视频等国内流媒体
- **`🟢 全球加速`** - 需要代理的国际网站和服务
- **`🟣 法外狂徒`** - 兜底策略，所有未匹配规则的请求使用此策略

### 地区节点组
- **`🇭🇰 香港节点`** - 自动选择延迟最低的香港服务器
- **`🇨🇳 台湾节点`** - 自动选择延迟最低的台湾服务器
- **`🇯🇵 日本节点`** - 自动选择延迟最低的日本服务器
- **`🇰🇷 韩国节点`** - 自动选择延迟最低的韩国服务器
- **`🇸🇬 新加坡节点`** - 自动选择延迟最低的新加坡服务器
- **`🇺🇸 美国节点`** - 自动选择延迟最低的美国服务器

**策略组参数解释：**
- **`select`** - 手动选择模式
- **`url-test`** - 自动测速模式
- **`tolerance=20`** - 延迟容差，当当前服务器比最快服务器慢超过 20ms 时才切换
- **`evaluate-before-use=true`** - 使用前先测试延迟
- **`policy-regex-filter`** - 正则表达式过滤器，只包含匹配的服务器
- **`hidden=1`** - 在界面中隐藏这个策略组
- **`icon-url`** - 策略组的图标

---

## [Rule] 段落 - 路由规则

**规则按优先级从上到下匹配，匹配到第一条规则后就不再往下匹配。**

### 安全防护规则
- **`AND,((PROTOCOL,UDP), (DEST-PORT,443)),REJECT-NO-DROP`** - 阻止 UDP 443 端口请求，防止某些网络攻击
- **`IP-CIDR,0.0.0.0/32,REJECT,no-resolve`** - 阻止访问 0.0.0.0，防止应用无限循环请求

### 规则修正
- **`RULE-SET,https://.../Unbreak.list,DIRECT`** - 修正某些被误判的网站，确保正常网站能直连

### 应用专用规则
- **`RULE-SET,https://.../WeChat.list,DIRECT`** - 微信相关域名直连，避免消息延迟

### 网络环境规则
- **`RULE-SET,LAN,DIRECT`** - 局域网地址直连
- **`GEOIP,LAN,DIRECT`** - 局域网 IP 段直连

### 广告拦截
- **`RULE-SET,https://.../AWAvenue-Ads-Rule...REJECT`** - 使用增强的广告拦截规则集
- **`extended-matching`** - 启用扩展匹配模式，更精确的规则匹配

### 服务分流
每个 `RULE-SET` 都对应一个在线维护的规则列表：
- **AI 服务** - ChatGPT、Claude 等 AI 网站走专用线路
- **苹果服务** - App Store、iCloud 等走指定策略
- **流媒体** - Netflix、YouTube 等走国际媒体策略
- **游戏平台** - Steam、Epic 等走游戏专用策略

### 地理位置规则
- **`GEOIP,CN,DIRECT`** - 中国大陆 IP 直连
- **`FINAL,🟣 法外狂徒,dns-failed`** - 兜底规则，未匹配的请求走指定策略

---

## [Host] 段落 - DNS 解析覆盖

- **`*.weixin.com = 119.29.29.29`** - 微信域名使用腾讯 DNS 解析，提高连接质量
- **`mtalk.google.com = 108.177.125.188`** - Firebase 推送服务指定 IP，避免连接问题
- **`*testflight.apple.com = server:8.8.4.4`** - TestFlight 使用 Google DNS 解析

---

## [URL Rewrite] 段落 - URL 重写

- **Google 重定向规则** - 将 Google 中国版自动重定向到国际版：
  - `g.cn` → `google.com`
  - `google.cn` → `google.com`
  - 数字 `302` 表示临时重定向

---

## [MITM] 段落 - 中间人攻击设置

**⚠️ 高级功能，用于 HTTPS 解密和脚本执行：**

- **`skip-server-cert-verify = true`** - 跳过服务器证书验证（仅在 MITM 时）
- **`tcp-connection = true`** - 启用 TCP 连接 MITM
- **`h2 = true`** - 启用 HTTP/2 协议 MITM
- **`hostname = *`** - 对所有域名启用 MITM（需要安装 Surge 证书）
- **`%APPEND%`** - 追加特定域名到 MITM 列表
- **`hostname-disabled = *`** - 默认禁用所有域名的 MITM（需要手动启用具体域名）

---

## 策略组工作原理

### select（手动选择）
用户可以在 Surge 界面中手动选择使用哪个代理服务器或策略。

### url-test（自动测速）
- 定期测试所有包含的代理服务器延迟
- 自动选择延迟最低的服务器
- `tolerance=20` 表示只有当当前服务器比最快服务器慢 20ms 以上才会切换

### 规则集（RULE-SET）
- 指向在线维护的规则文件
- 自动更新，无需手动维护
- `extended-matching` 启用更精确的匹配算法
- `no-resolve` 表示不解析域名直接匹配

---

## Replica 段落详细解释

**Replica 是 Surge 的请求监控和记录功能：**

- **`hide-apple-request = 1`** 
  - 隐藏苹果系统服务请求（如软件更新检查、天气数据、Siri 等）
  - 这些请求很频繁但通常不需要关注

- **`hide-crashlytics-request = true`** 
  - 隐藏 Firebase Crashlytics 崩溃报告请求
  - 应用崩溃时会自动发送报告，这些请求对用户无意义

- **`use-keyword-filter = false`** 
  - 不使用关键词过滤器
  - 如果启用，可以根据关键词隐藏特定请求

- **`hide-udp = 1`** 
  - 隐藏 UDP 协议请求
  - UDP 主要用于 DNS 查询、游戏数据等，请求频繁但通常不需要查看

- **`keyword-filter-type = none`** 
  - 关键词过滤器类型设为无
  - 可选值：whitelist（白名单）、blacklist（黑名单）、none（无）

- **`hide-crash-reporter-request = 1`** 
  - 隐藏崩溃报告请求
  - 与 crashlytics 功能类似，隐藏应用崩溃时的自动报告

**总结：Replica 设置的目的是让请求日志更清爽，只显示用户主动访问的重要请求，过滤掉系统和应用的后台噪音。**
