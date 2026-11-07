# Surge 配置优化说明 (2026-11-08)
> 作者: https://github.com/vexcv  
> Telegram: https://t.me/vexcso  
> Surge 官方手册: https://manual.nssurge.com/ 
> 适用配置：`vexcs.surgeconfig`（公司家庭网络全接管自用版）
> 适用版本：iOS / macOS Surge 6
> 更新日期：2026-11-08
> 参考文档：[Surge 官方手册](https://manual.nssurge.com/)（规则集 `/rules/ruleset.html`、规则总览 `/rules/overview.html`、REJECT 策略 `/policies/reject.html`）

---

## 一、优化目标

1. **减少不必要的 DNS 查询**：域名规则能匹配的流量，不在前面提前解析。
2. **分流更准确**：流量分到正确的服务分组，境外服务不被误判为直连。
3. **内网服务正常访问**：NAS、路由器后台等内网地址不会被送去代理。
4. **广告拦截更彻底**：能拦截通过 IP 直连、或 Host/SNI 与域名不一致的请求。
5. **配置可读、可维护**：关键规则旁写明原因，以后修改不会改错。

---

## 二、规则顺序总览

Surge 按顺序从上往下匹配，命中第一条即停止。优化后的顺序和设计思路如下：

| 顺序 | 规则 | 策略 | 参数 | 作用 |
|---|---|---|---|---|
| 1 | `RULE-SET,SYSTEM` | DIRECT | `no-resolve` | Apple 系统进程（trustd 等）直连 |
| 2 | `Lan.list` | DIRECT | `no-resolve` | 内网域名 / IP 段直连 |
| 3 | `RULE-SET,LAN` | DIRECT | `no-resolve` | Surge 内置局域网 IP 段直连 |
| 4 | `IP-CIDR,0.0.0.0/32` | REJECT | `no-resolve` | 拦截 App 向 0.0.0.0 发起的无效循环请求 |
| 5 | `Unbreak_Direct` / `Unbreak_Proxy` | DIRECT / Proxy | `extended-matching,no-resolve` | 修正被广告规则误杀的域名，必须在广告规则之前 |
| 6 | `Advertising.list` | REJECT | `extended-matching,no-resolve,pre-matching` | 广告拦截 |
| 7 | `WeChat.list` | DIRECT | `extended-matching,no-resolve` | 微信直连，防止被后面的境外规则吞掉 |
| 8 | Apple / AI / Google / LinkedIn / PayPal / Microsoft / GitHub | 各自分组 | `extended-matching,no-resolve` | 常用服务分流 |
| 9 | YouTube / TikTok / Netflix / Disney+ / Spotify / Telegram / X | 各自分组 | `extended-matching,no-resolve` | 流媒体与社交分流 |
| 10 | `GlobalMedia_All_No_Resolve` | GlobalMedia | `extended-matching,no-resolve` | 其余境外流媒体 |
| 11 | `Proxy_All.list`（建议开启） | Proxy | `extended-matching,no-resolve` | 其余境外常见服务 |
| 12 | `ChinaMedia.list` | DIRECT | `extended-matching` | 国内流媒体 |
| 13 | `ChinaMax_All.list` | DIRECT | `extended-matching` | 国内域名与 IP 段 |
| 14 | `GEOIP,CN` | DIRECT | — | 国内 IP 直连 |
| 15 | `RULE-SET,LAN`（兜底） | DIRECT | — | 解析后指向内网 IP 的域名直连 |
| 16 | `FINAL` | Proxy | `dns-failed` | 其余全部走代理 |

**原则：先精确、后宽泛；先域名、后 IP；先例外、后通用。**

---

## 三、具体优化项

### 1. `no-resolve` 策略

**背景**：规则集里如果含有 IP 类规则（IP-CIDR、GEOIP 等），Surge 在匹配到这条规则时会先对域名做 DNS 解析，再拿 IP 比对。排在前面的规则一旦触发解析，后面所有请求都会多一次 DNS 查询，而且境外域名会被送到国内 DNS 查询。

**做法**：

- **顶部规则和所有境外服务规则集都加 `no-resolve`。** 手册确认 `RULE-SET` 支持该参数，作用是对规则集内所有子规则强制不解析。这些规则集里的 IP 规则只匹配本来就是 IP 的请求（比如 App 直接连 IP），域名请求只走域名匹配。
- **`ChinaMedia` 和 `ChinaMax_All` 不加 `no-resolve`。** 它们排在末尾，后面紧跟 `GEOIP,CN` 本来就会解析，不存在"提前解析"的问题；保留 IP 匹配还能补充 GEOIP 数据库没覆盖的国内 IP 段，避免国内流量误走 `FINAL` 代理。

**关于 `RULE-SET,SYSTEM`**：它只包含 DOMAIN、DOMAIN-SUFFIX 和 PROCESS-NAME 规则，本身不会触发 DNS。加 `no-resolve` 没有坏处，统一写法即可。

### 2. `extended-matching`

**作用**：让域名规则除了匹配请求的目标域名外，还匹配 TLS 的 SNI 和 HTTP 的 Host 头。

**解决的问题**：有些 App 直接连 IP，但握手时 SNI 里写着真实域名。不开 `extended-matching` 时，这类请求只能被 IP 规则或 `GEOIP` 匹配，容易分错组或漏拦广告。

**做法**：所有按域名分流的规则集都加上，包括 Unbreak、广告、微信、各服务分组、ChinaMedia、ChinaMax。`SYSTEM`、`LAN` 这类内置 / IP 规则不需要。

### 3. 广告规则 `pre-matching`

```
RULE-SET,…/Advertising/Advertising.list,REJECT,extended-matching,no-resolve,pre-matching
```

- `pre-matching` 让 Surge 在连接建立前就拒绝请求，拦截更快、更省资源。
- 手册限制：**只能用于 REJECT 类策略，只能用于顶层规则**，而且规则集内部允许的规则类型有限。
- **导入后请检查 Surge 是否对这一行给出警告。** 如果规则集里有不支持预匹配的规则类型，Surge 会提示；出现警告时去掉 `pre-matching` 即可，拦截效果不受影响，只是少了提前拒绝。

### 4. Unbreak 规则放在广告规则之前

`Unbreak_Direct` / `Unbreak_Proxy` 用来放行被广告规则误杀的域名。它们必须排在 `Advertising.list` 之前，否则会先被广告规则拦掉，Unbreak 永远不会生效。

### 5. 微信规则前置

`WeChat.list` 放在 Apple、Google 等境外服务之前，避免微信的部分境外域名被后续规则送去代理，导致消息、图片、小程序加载变慢或失败。

### 6. `0.0.0.0/32` 拦截

```
IP-CIDR,0.0.0.0/32,REJECT,no-resolve
```

- 部分 App 在 DNS 被污染或广告域名被解析成 `0.0.0.0` 后会反复重试，造成循环请求、耗电。
- `/32` 只匹配 `0.0.0.0` 这一个地址，**不会影响局域网**（192.168.x.x、10.x.x.x 等不在范围内）。

### 7. Global Services（`Proxy_All.list`）的位置与开关

**之前的问题**：上一版里它排在 YouTube、Netflix 等服务规则之前，把这些服务的流量全部先匹配走了，单独设的分组形同虚设，所以被注释掉。

**现在的位置**：GlobalMedia 之后、ChinaMedia 之前。前面的专用分组先匹配，不会再被吞掉。

**建议开启**，好处：

- 没有专用规则的境外域名直接按域名走 Proxy，**不必先经过 `GEOIP,CN` 用国内 DNS 查一次**，少一次查询，也不把访问记录交给国内 DNS。
- 避免境外服务因国内 CDN 节点或 GEOIP 误标为 CN 而被判成直连。

代价：

- 规则集体积较大。Mac mini 上无影响；iOS 上请在 Surge 首页留意内存占用，明显升高或卡顿时再注释掉。
- 少数本可直连的境外网站会改走代理，多用一点代理流量。

开启方法：去掉该行开头的 `# `，参数保持 `extended-matching,no-resolve` 不变。

### 8. LAN 兜底规则

```
GEOIP,CN,DIRECT
RULE-SET,LAN,DIRECT
FINAL,Proxy,dns-failed
```

- **问题**：顶部的 LAN 规则加了 `no-resolve`，像 `nas.home` 这类解析后指向 `192.168.x.x` 的域名，在顶部不会被解析，也就匹配不到；如果不处理，最后会落到 `FINAL` 被送去代理，内网服务打不开。
- **做法**：在 `GEOIP,CN` 之后、`FINAL` 之前再放一条 **不带 `no-resolve`** 的 `RULE-SET,LAN,DIRECT`。
- **不会多查 DNS**：走到这里时 `GEOIP,CN` 已经完成解析，直接复用结果。

### 9. `FINAL,Proxy,dns-failed`

`dns-failed` 表示：如果前面规则在解析 DNS 时失败（常见于被污染或无法解析的境外域名），直接按 `FINAL` 策略走代理，而不是报错。由代理端去解析，境外域名在国内 DNS 失败时也能正常访问。

### 10. URL Rewrite：Google / Bing 国内域名跳转

```
[URL Rewrite]
^https?:\/\/(www\.)?g\.cn(\/.*)?$ https://www.google.com$2 302
^https?:\/\/(www\.)?google\.cn(\/.*)?$ https://www.google.com$2 302
^https?:\/\/(www\.)?google\.com\.hk(\/.*)?$ https://www.google.com$2 302
^https?:\/\/cn\.bing\.com(\/.*)?$ https://www.bing.com$1 302

[MITM]
hostname = g.cn, www.g.cn, google.cn, www.google.cn, google.com.hk, www.google.com.hk, cn.bing.com
```

- 用捕获组保留原路径和查询参数，**搜索结果页、图片页跳转后内容不丢**。
- HTTPS 跳转需要 MITM，对应主机名已写入 `[MITM] hostname`。
- **配置文件中不包含 CA 证书**。导入后需在 Surge 内自行生成并安装、信任证书。
- Microsoft 分组默认是 Proxy，`cn.bing.com` 跳到 `www.bing.com` 后走代理，不会出现循环跳转。

### 11. 移动设备与旁路由（AutoNetwork 说明）

配置中保留了注释掉的 `AutoNetwork` subnet 分组，并补充了说明：

- `subnet` 分组已取代旧的 `ssid` 分组，依据 **运行 Surge 的设备自身** 所在网络切换策略。
- 启用后若让分流组和 `FINAL` 指向它，在家里 / 公司 Wi-Fi 下境外流量会全部直连，交给旁路由处理。**只有这两个网络上游已经有旁路由代理时才合理。**
- 它无法区分同一 SSID 下的不同设备，所以**不能用来给 Mac mini 网关单独加条件**。
- 另一种做法是用 `[SSID Setting]` 在指定 Wi-Fi 下自动暂停 Surge（该语法未经手册核实，使用前请先确认）。

---

## 四、仍建议调整的项目

| 位置 | 当前值 | 建议 | 原因 |
|---|---|---|---|
| `[General]` `external-controller-access` | `yourpassword@0.0.0.0:6170` | 改为 `密码@127.0.0.1:6170` | `0.0.0.0` 会让局域网内所有设备都能访问控制接口。除非需要从其他设备访问 Dashboard，否则只监听本机更安全；同时务必换掉示例密码 |
| `[Proxy Group]` `Proxy` 的 `update-interval` | `0` | `86400` | `0` 表示不自动更新订阅，节点变动后需手动刷新 |
| `[Rule]` `Proxy_All.list` | 注释 | 去掉 `# ` 开启 | 见第三节第 7 条 |
| `[Rule]` Advertising 行 | `pre-matching` | 导入后看有无警告 | 见第三节第 3 条 |

---

## 五、导入后检查清单

- [ ] 在 Surge 中生成并安装、信任 MITM CA 证书
- [ ] 设置远程控制器密码，并把监听地址改为 `127.0.0.1`（如不需要外部访问）
- [ ] 填入订阅地址（`policy-path=URL`）或本地节点
- [ ] 打开配置后查看是否有规则警告（重点看 Advertising 那一行）
- [ ] 访问 `google.com.hk/search?q=test`，确认跳转到 `www.google.com` 且搜索词保留
- [ ] 访问 `cn.bing.com`，确认跳转到 `www.bing.com`
- [ ] 访问内网服务（NAS、路由器后台），确认在请求列表里命中 DIRECT
- [ ] 在请求列表中抽查 YouTube、Netflix、ChatGPT 是否命中各自分组
- [ ] iOS 上开启 `Proxy_All.list` 后留意 Surge 内存占用

---

## 六、安全提醒

- **不要公开包含 MITM CA 私钥或密码的配置文件。** Surge 生成证书后，会把 `ca-passphrase` 和 `ca-p12` 写入 `[MITM]` 段。任何拿到这两项的人都可以伪造你设备信任的 HTTPS 证书。分享或上传配置前，务必删除这两行。
- 公开的示例配置中，`external-controller-access` 的密码请使用占位符，不要写真实密码。
