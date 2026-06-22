# 创建应用实例
import sys

from app import app

# 启动Flask Web服务
if __name__ == '__main__':
    app.run(host=sys.argv[1] if len(sys.argv) > 1 else '0.0.0.0',
            port=int(sys.argv[2]) if len(sys.argv) > 2 else 80)
