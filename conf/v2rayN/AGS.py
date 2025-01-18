import requests
import json

def fetch_and_convert(url, output_file):
    try:
        # 下载远程文件
        response = requests.get(url)
        if response.status_code != 200:
            print(f"无法下载文件，HTTP 状态码: {response.status_code}")
            return

        # 按行处理文件内容
        lines = response.text.splitlines()

        # 过滤掉注释行（以 # 开头）和空行
        domains = [line.strip() for line in lines if line.strip() and not line.startswith("#")]

        # 构造 JSON 数据
        output = [
            {
                "Port": "",
                "OutboundTag": "block",
                "Ip": [],
                "Domain": [f"domain:{domain}" for domain in domains],
                "Process": [],
                "Enabled": True,
                "Remarks": "AGS"
            }
        ]

        # 保存为 JSON 文件
        with open(output_file, "w") as json_file:
            json.dump(output, json_file, indent=2)

        print(f"转换成功！JSON 文件已保存至 {output_file}")

    except Exception as e:
        print(f"发生错误：{e}")

# 配置远程文件 URL 和输出文件路径
if __name__ == "__main__":
    remote_file_url = "https://testingcf.jsdelivr.net/gh/ignaciocastro/a-dove-is-dumb/pihole.txt"  # 添加引号
    output_json_file = "AGS.json"
    fetch_and_convert(remote_file_url, output_json_file)
