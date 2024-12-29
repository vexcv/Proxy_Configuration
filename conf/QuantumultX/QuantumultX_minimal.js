# 以 ";" 或 "#" 或 "//" 开头的行为注释行
#
# SS-URI scheme 请参考 https://shadowsocks.org/en/spec/SIP002-URI-Scheme.html
#
# Quantumult 使用 HTTP HEAD 方法对测试网址 server_check_url 进行网页响应性测试（测试结果为通过该节点访问此网页获得 HTTP 响应所需要的时间），来确认节点的可用性
# Quantumult 界面中的延迟测试方式均为网页响应性测试，显示的最终延迟均为通过对应节点访问测试网页获得 HTTP 响应所需要时间
# 由于 Trojan 协议为无响应校验协议，使得 HTTP 检测方式即使获得了 HTTP 响应，也不代表节点一定可用
#
# dns_exclusion_list 包含需要关闭 placeholder IP(240.*) 的域名列表, 不在 dns_exclusion_list 列表中的所域名将默认开启 placeholder IP 并启用 resolve-on-remote（远端解析 DNS）
#
# udp_whitelist 包含目的地的 UDP 端口, 如果留空则默认表示所有的端口都在 udp_whitelist 中。如果带有目的地端口 UDP 包 (通过 Quantumult tunnel interface) 不在 udp_whitelist 中，该 UDP 包将会被丢弃. 此项设置不会影响策略或代理服务器
#
# Quantumult X 将不会处理向 excluded_routes 列表中请求的流量，当你每次修改这个配置时，最好重新启动你的设备
#
# resource_parser_url 的配置文件示例可以参考 https://raw.githubusercontent.com/crossutility/Quantumult-X/master/resource-parser.js
#
# 图标库 → Qure：https://github.com/Koolson/Qure/tree/master/IconSet 或 OrzMini：https://github.com/Orz-3/mini
#
# 更新时间[2024-09-02]
#

[general]
excluded_routes=192.168.0.0/16, 10.0.0.0/8, 172.16.0.0/12, 100.64.0.0/10, 17.0.0.0/8
network_check_url =http://cp.cloudflare.com/generate_204
server_check_url =http://cp.cloudflare.com/generate_204
;doh_user_agent = QuantumultX/1.0
server_check_timeout = 5000
resource_parser_url =https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/master/Scripts/resource-parser.js
profile_img_url =https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/icon/color/apple.png
//https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Apple.png _2 _3 https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/GitHub.png
dns_exclusion_list = *.cmpassport.com, *.jegotrip.com.cn, *.icitymobile.mobi, id6.me, *.pingan.com.cn, *.cmbchina.com, *.localnetwork.uop, mfs.ykimg.com*.ttf, *.icbc.com.cn
geo_location_checker=http://ip-api.com/json/?lang=en-US, https://mirror.ghproxy.com/https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/master/Scripts/IP_API.js

#
# 为保证获得最佳的 DNS 解析性能体验，Quantumult X 默认总是从当前网络（系统配置）的 DNS 服务器获取解析结果，但你可以使用 no-system 参数来关闭此操作，但是必须至少定义一个 DNS 服务器，如  "server=223.5.5.5"
# DNS 解析结果仅用于 直连（direct）规则和判定 IP 分流条件，而不会用于 代理 的规则策略（而是会在远端解析），Quantumult 不会获得目的 IP 和相关的域名
# 此处不允许将特定的域名指向 127.0.0.1. 如果你想将某个域名指向 127.0.0.1 如 example.com，你可以直接在 "filter_local" 中添加 "host, example.com, reject" 来实现。这一操作将会让域名的 DNS 结果返回 127.0.0.1
#

[dns]
;circumvent-ipv4-answer = 127.0.0.1, 0.0.0.0
;circumvent-ipv6-answer = ::
;prefer-doh3
;no-system
no-ipv6
server = 223.5.5.5
server = 114.114.114.114
server = 119.29.29.29
server = 1.1.1.1
server = 8.8.8.8
# 如有需要，自行开启DoQ、DoH
doh-server = https://doh.pub/dns-query
doh-server = https://1.1.1.1/dns-query
;doq-server = quic://dns.adguard.com, quic://dns.nextdns.io
# 为特定域名设置解析服务器
;server = /*.taobao.com/223.5.5.5
;server = /*.tmall.com/223.5.5.5
;server = /*.alipay.com/223.5.5.5
;server = /*.alicdn.com/223.5.5.5
;server = /*.aliyun.com/223.5.5.5
;server = /*.jd.com/119.28.28.28
;server = /*.qq.com/119.28.28.28
;server = /*.tencent.com/119.28.28.28
;server = /*.weixin.com/119.28.28.28
;server = /*.bilibili.com/119.29.29.29
;server = /hdslb.com/119.29.29.29
;server = /*.meituan.com/114.114.114.114
;server = /*.dianping.com/114.114.114.114
;server = /*.douyin.com/119.29.29.29
;server = /*.163.com/119.29.29.29
;server = /*.126.com/119.29.29.29
;server = /*.126.net/119.29.29.29
;server = /*.127.net/119.29.29.29
;server = /*.netease.com/119.29.29.29
;server = /*.mi.com/119.29.29.29
;server = /*.xiaomi.com/119.29.29.29
# 特定域名的解析服务器 Google
;server = /*.google.com/8.8.8.8
;server = /*.google.com/8.8.4.4
;server = /*.google.com/223.5.5.5
;server = /*.google.com/114.114.114.114
# 特定域名的解析服务器 Microsoft
;server = /*.microsoft.com/8.8.8.8
;server = /*.microsoft.com/8.8.4.4
;server = /*.microsoft.com/223.5.5.5
;server = /*.microsoft.com/114.114.114.114
# 特定域名的IP地址映射
;address = /www.google.com/172.217.163.110
;address = /www.youtube.com/142.250.72.206
;address = /x.com/104.244.42.129
;address = /www.twitter.com/104.244.42.65
;address = /www.facebook.com/31.13.71.36
;address = /instagram.com/157.240.229.174
;address = /github.com/140.82.114.4
;address = /mtalk.google.com/108.177.125.188
# 特定域名的IP地址映射 Microsoft
;address = /login.microsoftonline.com/40.90.189.182
;address = /outlook.office365.com/52.96.34.98
;address = /graph.microsoft.com/20.190.130.1
;address = /onedrive.live.com/13.107.42.11
;address = /office.com/52.96.55.234
;address = /azure.microsoft.com/20.189.173.0
;address = /msedge.api.cdp.microsoft.com/13.107.246.13
;address = /storeedgefd.dsx.mp.microsoft.com/13.107.5.88

[policy]
# Others 为其他规则，若前边的规则都没有被匹配到，则听从此策略组的规定
# 策略想走特定节点或套娃，请长按分流策略组自行添加节点/策略组

static=Others, proxy, direct, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Final.png
static=Mainland, proxy, direct, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Domestic.png
static=Outside, proxy, direct, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Global.png
static=CNMedia, proxy, direct, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/DomesticMedia.png
static=GBMedia, proxy, direct, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/ForeignMedia.png
static=OpenAI, proxy, direct, img-url=https://raw.githubusercontent.com/Elvis9931/iOS_Script_Rule/master/icon/color/OpenAI.png
static=Notion, proxy, direct, img-url=https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/icon/qure/color/Notion.png
static=Binance, proxy, direct, img-url=https://raw.githubusercontent.com/Elvis9931/iOS_Script_Rule/master/icon/color/Binance.png
static=OKX, proxy, direct, img-url=https://raw.githubusercontent.com/Elvis9931/iOS_Script_Rule/master/icon/color/OKX.png
static=YouTube, proxy, direct, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/YouTube.png
static=Spotify, proxy, direct, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Spotify.png
static=X, proxy, direct, img-url=https://raw.githubusercontent.com/Elvis9931/iOS_Script_Rule/master/icon/color/X.png
static=Whatsapp, proxy, direct, img-url=https://raw.githubusercontent.com/Elvis9931/iOS_Script_Rule/master/icon/color/Whatsapp.png
static=Instagram, proxy, direct, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Instagram.png
static=TikTok, proxy, direct, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/TikTok_1.png
static=Netflix, proxy, direct, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Netflix_Letter.png
static=Telegram, proxy, direct, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Telegram.png
static=PayPal, proxy, direct, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/PayPal.png
static=Steam, proxy, direct, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Steam.png
static=Microsoft, proxy, direct, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Microsoft.png
static=Google, proxy, direct, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Google_Search.png
static=Speedtest, proxy, direct, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Speedtest.png
static=AdBlock, proxy, direct, reject, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Advertising.png
static=Apple Update, proxy, direct, reject, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Apple_Update.png
static=Apple, proxy, direct, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Apple.png

[server_local]
# 本地服务器部分, 自行添加即可

[server_remote]
# 节点远程订阅

[filter_remote]
# 远程分流规则策略组

# 社交聊天
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Whatsapp/Whatsapp.list, tag=Whatsapp, force-policy=Whatsapp, update-interval=2592000, opt-parser=false, enabled=true
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Telegram/Telegram.list, tag=Telegram, force-policy=Telegram, update-interval=2592000, opt-parser=false, enabled=true
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Twitter/Twitter.list, tag=X, force-policy=X, update-interval=2592000, opt-parser=false, enabled=true
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Instagram/Instagram.list, tag=Instagram, force-policy=Instagram, update-interval=2592000, opt-parser=false, enabled=true
# AI工具
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/OpenAI/OpenAI.list, tag=OpenAI, force-policy=OpenAI, update-interval=2592000, opt-parser=false, enabled=true
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Notion/Notion.list, tag=Notion, force-policy=Notion, update-interval=2592000, opt-parser=false, enabled=true
# 加密货币
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/OKX/OKX.list, tag=OKX, force-policy=OKX, update-interval=2592000, opt-parser=false, enabled=true
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Binance/Binance.list, tag=Binance, force-policy=Binance, update-interval=2592000, opt-parser=false, enabled=true
# Payment
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/PayPal/PayPal.list, tag=PayPal, force-policy=PayPal, update-interval=2592000, opt-parser=false, enabled=true
# 流媒体
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/YouTube/YouTube.list, tag=YouTube, force-policy=YouTube, update-interval=2592000, opt-parser=false, enabled=true
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Netflix/Netflix.list, tag=Netflix, force-policy=Netflix, update-interval=2592000, opt-parser=false, enabled=true
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Spotify/Spotify.list, tag=Spotify, force-policy=Spotify, update-interval=2592000, opt-parser=false, enabled=true
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/TikTok/TikTok.list, tag=TikTok, force-policy=TikTok, update-interval=2592000, opt-parser=false, enabled=true
# Server
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Steam/Steam.list, tag=Steam, force-policy=Steam, update-interval=2592000, opt-parser=false, enabled=true
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Microsoft/Microsoft.list, tag=Microsoft, force-policy=Microsoft, update-interval=2592000, opt-parser=false, enabled=true
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Google/Google.list, tag=Google, force-policy=Google, update-interval=2592000, opt-parser=false, enabled=true
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Apple/Apple.list, tag=Apple, force-policy=Apple, update-interval=2592000, opt-parser=false, enabled=true
# 其他
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaMedia/ChinaMedia.list, tag=CNMedia, force-policy=CNMedia, update-interval=2592000, opt-parser=false, enabled=true
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/GlobalMedia/GlobalMedia.list, tag=GBMedia, force-policy=GBMedia, update-interval=2592000, opt-parser=true, enabled=true
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global.list, tag=Outside, force-policy=Outside, update-interval=2592000, opt-parser=false, enabled=true
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/China/China.list, tag=Mainland, force-policy=Mainland, update-interval=2592000, opt-parser=false, enabled=true
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Speedtest/Speedtest.list, tag=Speedtest, force-policy=Speedtest, update-interval=2592000, opt-parser=false, enabled=true
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Advertising/Advertising.list, tag=AdBlock, force-policy=AdBlock, update-interval=2592000, enabled=true

[filter_local]
# 本地分流规则(相同规则下，本地规则将覆盖远程规则，优先生效)
HOST-KEYWORD,serv00,DIRECT
HOST-KEYWORD,czzy,DIRECT
HOST-KEYWORD,czys,DIRECT

# 绕过企业证书过期
host, ocsp.apple.com, reject

# 屏蔽系统更新
host, ns.itunes.apple.com, Apple Update
host, appldnld.apple.com, Apple Update
host, mesu.apple.com, Apple Update
host, xp.apple.com, Apple Update
host, gdmf.apple.com, Apple Update

# 银行
HOST-SUFFIX,95599.cn,direct
HOST-SUFFIX,abchina.com,direct
HOST-SUFFIX,bscabank.com,direct
HOST-SUFFIX,openaboc.cn,direct
HOST-SUFFIX,openaboc.com,direct
HOST-SUFFIX,openaboc.com.cn,direct

# 其他
host-suffix, local, direct
ip-cidr, 10.0.0.0/8, direct
ip-cidr, 17.0.0.0/8, direct
ip-cidr, 100.64.0.0/10, direct
ip-cidr, 127.0.0.0/8, direct
ip-cidr, 172.16.0.0/12, direct
ip-cidr, 192.168.0.0/16, direct
geoip, cn, direct
final, Others

[rewrite_remote]
# 远程重写规则

[rewrite_local]
# 本地复写规则

[task_local]
# 构造请求，脚本区，自行找库添加，仅保留流媒体解锁查询
event-interaction https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/master/Scripts/streaming-ui-check.js, tag=流媒体解锁查询, img-url=arrowtriangle.right.square.system, enabled=true

[http_backend]

[mitm]
