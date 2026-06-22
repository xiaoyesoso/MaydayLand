"""保活线程：定时访问云托管自身域名，避免 30 分钟无访问被回收实例。

设计要点：
- 通过环境变量 `KEEPALIVE_URL` 配置目标 URL（生产填云托管公网域名，本地留空则不启动）
- 通过 `KEEPALIVE_INTERVAL` 配置访问间隔（默认 1200 秒 = 20 分钟，低于平台 30 分钟阈值）
- 使用 daemon 线程，主进程退出时自动结束
- 失败仅记 warning，不影响主服务
- Flask debug 模式下 reloader 会启动两次进程，通过 `WERKZEUG_RUN_MAIN` 判断仅在主进程启动
"""
import logging
import os
import threading
import time
from urllib.request import Request, urlopen
from urllib.error import URLError

logger = logging.getLogger('keepalive')

DEFAULT_URL = 'https://flask-8ull-82486-5-1322783998.sh.run.tcloudbase.com/api/health'
DEFAULT_INTERVAL = 1200  # 20 分钟


def _ping(url, timeout=10):
    try:
        req = Request(url, headers={'User-Agent': 'MaydayLand-Keepalive/1.0'})
        with urlopen(req, timeout=timeout) as resp:
            msg = '[keepalive] ping %s -> %d' % (url, resp.status)
            print(msg, flush=True)
            return True
    except Exception as e:
        msg = '[keepalive] ping %s failed: %s' % (url, e)
        print(msg, flush=True)
    return False


def _loop(url, interval):
    time.sleep(30)
    while True:
        _ping(url)
        time.sleep(interval)


def start():
    if getattr(start, '_started', False):
        return
    if os.environ.get('FLASK_DEBUG') == '1' and os.environ.get('WERKZEUG_RUN_MAIN') != 'true':
        return
    url = os.environ.get('KEEPALIVE_URL', '').strip()
    if not url:
        if os.environ.get('USE_SQLITE', '0') == '1':
            print('[keepalive] skipped (USE_SQLITE=1, local dev)', flush=True)
            return
        url = DEFAULT_URL
    try:
        interval = int(os.environ.get('KEEPALIVE_INTERVAL', DEFAULT_INTERVAL))
    except ValueError:
        interval = DEFAULT_INTERVAL

    t = threading.Thread(target=_loop, args=(url, interval), daemon=True, name='keepalive')
    t.start()
    start._started = True
    print('[keepalive] started: url=%s interval=%ds' % (url, interval), flush=True)
