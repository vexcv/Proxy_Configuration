# iOS Proxy App Configuration

iOS App Quantumult X 和 Stash 的配置文件 懒人配置 2025

## 使用说明

- 下载配置文件到iCloud，导入配置文件到App，手动添加服务提供商的订阅链接或自建的节点，可将配置上传到iCloud后在设备间关联使用

- 为保证简洁高效运行并减少功耗，已在配置文件中注释掉了一些冗余的功能和规则，可自行修改按需添加

- 为了方便理解和使用，配置文件中大部分字段都添加了中文注释，注释文字完全不影响功能

- 使用本项目的配置时，如果在特定场景下出现问题，可以通过Telegram联系作者[@vexcso](https://t.me/vexcso)

## Tips

<details>
  <summary>点击展开</summary>
  
  - 经过长时间的使用体验，感觉 Quantumult X 更加的成熟稳定，尽管App已经很久没有更新了，如果多多支持正版相信还是有更新的可能
  
  - Stash 几乎兼容 Clash 的所有语法和规则，Clash 已经删库很长时间了，Stash 可能只是套壳，仍有很多Bug，但是更新积极
  
  - 不论是Quantumult X 还是 Stash，如果引用了大量脚本和规则，必定会增加系统占用和功耗，实际使用 同样的策略感觉 Stash 耗电更快
  
  - 大部分懒人配置都建议全部使用IPv4，以及禁用UDP连接，但个人实际使用发现很多App现在都支持IPv6，并且都采用HTTP/3协议(禁用会导致一些问题，比如OpenAI)，所以我的配置中默认都开启这些功能

  - 在DNS的配置中，传统DNS的占用更低效率更高兼容性更好，但是DoH并不会带来很差的体验
  
</details>

## 服务提供商

<details>
  <summary>点击展开</summary>

  > 推荐个人比较喜欢的服务商，如果你的预算极其有限还是建议使用小型机场

  | **服务商**            | **CN**                     | **GB**                | **个人评价**          |
  |-----------------------|----------------------------|----------------------------|-----------------------|
  | [SSRDOG](https://dog.ssrdog.com/#/register?code=JMbxlJz9) | [大陆站](https://st1.hosbb.com/#/register?code=JMbxlJz9) | [国际站](https://dog.ssrdog.com/#/register?code=JMbxlJz9) | 本人长期使用 极其稳定 延迟低 支持团队谦虚友好 力荐 |
  | [TGA](https://tagss.pro/#/auth/ytH0tDkE) | [大陆站](https://tagss09.pro/#/auth/ytH0tDkE) | [国际站](https://tagss.pro/#/auth/ytH0tDkE) | 本人订阅过季度套餐 节点覆盖最广 几乎覆盖全球地区 从北极到南极 更新节点会损耗一些流量 有特殊地区需求的话推荐 |
  
</details>


## 规则和脚本和图标

配置文件中的所有规则、脚本和图标均引用自开源项目，在此表示感谢！

| **引用**              | **作者**                                         | **项目链接**                                                       |
|-----------------------|--------------------------------------------------|--------------------------------------------------------------------|
| **Quantumult X rule** | [@blackmatrix7](https://github.com/blackmatrix7) | [ios_rule_script](https://github.com/blackmatrix7/ios_rule_script) |
| **Stash rule**        | [@MetaCubeX](https://github.com/MetaCubeX)       | [meta-rules-dat](https://github.com/MetaCubeX/meta-rules-dat)      |
| **icon**              | [@Koolson](https://github.com/Koolson)           | [Qure](https://github.com/Koolson/Qure)                            |

## 免责声明

1. 本项目仅用于学习和研究目的，请勿将其用于任何违法或侵权活动。

2. 作者对任何人因使用本项目中的内容而导致的直接或间接后果不承担任何责任。

3. 在使用本项目之前，请确保您已充分了解相关法律法规并遵守所在国家或地区的法律要求。

4. 若您不同意本声明的任何内容，请立即停止使用本项目。
