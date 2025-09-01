import requests
import os

# 下载 Clash YAML 文件
url = "https://raw.githubusercontent.com/ignaciocastro/a-dove-is-dumb/main/clash.yaml"
response = requests.get(url)
lines = response.text.splitlines()

# 提取规则（保留 Surge 格式：DOMAIN,example.com）
clean_rules = [line.strip() for line in lines if line.strip().startswith("- DOMAIN,")]
clean_rules = [rule[2:].strip() for rule in clean_rules]

# 指定输出路径（这里放在仓库根目录）
output_file = "conf/Surge/rule/AGS.list"

# 保存
with open(output_file, "w") as f:
    f.write("\n".join(clean_rules))

print("✅ 已保存文件:", os.path.abspath(output_file))
