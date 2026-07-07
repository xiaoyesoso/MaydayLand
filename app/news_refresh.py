"""新闻定时刷新线程

设计要点：
- 使用 daemon 线程 + time.sleep 实现定时任务，不引入 APScheduler 等第三方库
- 启动后延迟 60 秒执行第一次（等待 Flask 完全初始化）
- 之后每 24 小时执行一次
- 失败仅记 warning，不影响主服务
- Flask debug 模式下通过 WERKZEUG_RUN_MAIN 判断仅在主进程启动
- 通过环境变量 `NEWS_REFRESH_DISABLED=1` 可禁用
"""
import logging
import os
import threading
import time

logger = logging.getLogger('news_refresh')

DEFAULT_INTERVAL = 24 * 3600  # 24 小时
FIRST_RUN_DELAY = 60  # 启动后 60 秒首次执行


def _do_refresh():
    """执行一次新闻刷新"""
    try:
        from app import db
        from app.model import News
        from app.news_fetcher import refresh_news
        success, new_count, msg = refresh_news(db.session, News)
        print('[news_refresh] %s (new=%d)' % (msg, new_count), flush=True)
        return success, new_count, msg
    except Exception as e:
        print('[news_refresh] error: %s' % e, flush=True)
        logger.exception('新闻刷新失败')
        return False, 0, str(e)


def _loop():
    # 首次延迟执行
    time.sleep(FIRST_RUN_DELAY)
    _do_refresh()
    while True:
        time.sleep(DEFAULT_INTERVAL)
        _do_refresh()


def start():
    if getattr(start, '_started', False):
        return
    if os.environ.get('NEWS_REFRESH_DISABLED', '0') == '1':
        print('[news_refresh] disabled by NEWS_REFRESH_DISABLED=1', flush=True)
        return
    # Flask debug 模式下 reloader 会启动两次进程，仅在主进程启动
    if os.environ.get('FLASK_DEBUG') == '1' and os.environ.get('WERKZEUG_RUN_MAIN') != 'true':
        return
    try:
        interval = int(os.environ.get('NEWS_REFRESH_INTERVAL', DEFAULT_INTERVAL))
    except ValueError:
        interval = DEFAULT_INTERVAL

    t = threading.Thread(target=_loop, daemon=True, name='news_refresh')
    t.start()
    start._started = True
    print('[news_refresh] started: interval=%ds, first_run_after=%ds' % (interval, FIRST_RUN_DELAY), flush=True)


def refresh_now():
    """手动触发一次刷新（供 API 调用）"""
    return _do_refresh()
