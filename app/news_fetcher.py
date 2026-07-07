"""五月天官方动态抓取器

从相信音乐官网（bin-music.com.tw）抓取五月天相关新闻，更新到数据库 News 表。

数据源：
- https://www.bin-music.com.tw/news 列表页（含最新 10+ 条新闻）
- 过滤规则：标题或正文包含「五月天」/「阿信」/「怪獸」/「瑪莎」/「石頭」/「冠佑」

更新策略：
- 按 URL 去重，已存在的新闻不重复插入
- 失败时保留原有数据，不抛异常
- 启动时执行一次 + 每天定时执行一次
"""
import logging
import re
from datetime import datetime
from urllib.parse import urljoin

logger = logging.getLogger('news_fetcher')

# 相信音乐官网
BIN_MUSIC_NEWS_URL = 'https://www.bin-music.com.tw/news'

# 五月天相关关键词（用于过滤新闻）
MAYDAY_KEYWORDS = ['五月天', '阿信', '怪獸', '瑪莎', '石頭', '冠佑', 'Mayday', '5525']

# 请求头
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'
}


def _is_mayday_related(title, summary=''):
    """判断新闻是否与五月天相关"""
    text = (title or '') + ' ' + (summary or '')
    return any(kw in text for kw in MAYDAY_KEYWORDS)


def _parse_date(date_str):
    """解析 '2026.07.05' 格式日期，返回 '今天'/'昨天'/'X天前' 等相对描述"""
    try:
        news_date = datetime.strptime(date_str.strip(), '%Y.%m.%d')
        today = datetime.now()
        delta = (today.date() - news_date.date()).days
        if delta == 0:
            return '今天'
        elif delta == 1:
            return '昨天'
        elif delta == 2:
            return '前天'
        elif delta < 7:
            return str(delta) + ' 天前'
        else:
            return date_str
    except Exception:
        return date_str


def _classify_news(title, summary=''):
    """根据标题分类新闻类型"""
    text = (title or '') + ' ' + (summary or '')
    if any(kw in text for kw in ['演唱會', '巡迴', '門票', '售票', '場次']):
        return 'news', '资讯'
    if any(kw in text for kw in ['單曲', '專輯', 'MV', 'Stage Video', '上線']):
        return 'music', '新歌'
    if any(kw in text for kw in ['展覽', '活動', '快閃']):
        return 'activity', '活动'
    if any(kw in text for kw in ['門票', '售票', '開賣']):
        return 'ticket', '票务'
    return 'news', '资讯'


def fetch_mayday_news(max_count=10):
    """抓取相信音乐官网，返回五月天相关新闻列表

    返回格式：[{id, title, summary, type, type_label, time}, ...]
    """
    try:
        from bs4 import BeautifulSoup
        from urllib.request import Request, urlopen
    except ImportError:
        logger.warning('beautifulsoup4 未安装，跳过新闻抓取')
        return []

    try:
        req = Request(BIN_MUSIC_NEWS_URL, headers=HEADERS)
        with urlopen(req, timeout=20) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
    except Exception as e:
        logger.warning('抓取相信音乐新闻列表失败: %s', e)
        return []

    soup = BeautifulSoup(html, 'html.parser')
    # 列表页链接格式：/news/2458
    links = soup.find_all('a', href=re.compile(r'/news/\d+'))
    
    seen_urls = set()
    news_list = []
    for a in links:
        href = a.get('href', '')
        # 标准化 URL
        if href.startswith('//'):
            full_url = 'https:' + href
        elif href.startswith('/'):
            full_url = urljoin('https://www.bin-music.com.tw', href)
        else:
            full_url = href
        
        # 提取新闻 ID（/news/2458 -> 2458）
        match = re.search(r'/news/(\d+)', full_url)
        if not match:
            continue
        news_id = match.group(1)
        
        if news_id in seen_urls:
            continue
        seen_urls.add(news_id)
        
        # 链接文本通常包含「标题 + 日期」，如「五月天創最快重返大巨蛋紀錄！...2026.07.04」
        text = a.get_text(strip=True)
        if not text:
            continue
        
        # 分离标题和日期
        date_match = re.search(r'(\d{4}\.\d{2}\.\d{2})\s*$', text)
        if date_match:
            date_str = date_match.group(1)
            title = text[:date_match.start()].strip()
        else:
            date_str = ''
            title = text
        
        # 过滤五月天相关
        if not _is_mayday_related(title):
            continue
        
        # 摘要 = 标题（列表页没有独立摘要，用标题代替）
        summary = title
        type_code, type_label = _classify_news(title)
        time_str = _parse_date(date_str) if date_str else ''
        
        news_list.append({
            'id': 'bm_' + news_id,
            'title': title[:128],
            'summary': summary,
            'type': type_code,
            'type_label': type_label,
            'time': time_str,
            '_source_url': full_url,
            '_source_date': date_str,
        })
        
        if len(news_list) >= max_count:
            break
    
    logger.info('抓取到 %d 条五月天相关新闻', len(news_list))
    return news_list


def update_news_to_db(news_list, db_session, NewsModel):
    """将抓取到的新闻更新到数据库

    - 按 id 去重，已存在的不更新（保留原数据）
    - 新新闻插入到最前面（按日期降序）
    返回新增数量
    """
    if not news_list:
        return 0
    
    new_count = 0
    for item in news_list:
        existing = db_session.query(NewsModel).filter_by(id=item['id']).first()
        if existing:
            continue
        news = NewsModel(
            id=item['id'],
            title=item['title'],
            summary=item['summary'],
            type=item['type'],
            type_label=item['type_label'],
            time=item['time'],
        )
        db_session.add(news)
        new_count += 1
    
    if new_count > 0:
        db_session.commit()
        logger.info('新增 %d 条五月天新闻到数据库', new_count)
    else:
        logger.info('没有新的五月天新闻需要更新')
    
    return new_count


def refresh_news(db_session, NewsModel):
    """完整的刷新流程：抓取 + 更新数据库
    
    返回 (success: bool, new_count: int, message: str)
    """
    try:
        news_list = fetch_mayday_news(max_count=10)
        if not news_list:
            return True, 0, '抓取失败或无五月天相关新闻'
        new_count = update_news_to_db(news_list, db_session, NewsModel)
        return True, new_count, '成功更新 %d 条新闻' % new_count
    except Exception as e:
        logger.exception('刷新新闻失败')
        return False, 0, '刷新失败: %s' % e


if __name__ == '__main__':
    # 命令行测试
    logging.basicConfig(level=logging.INFO)
    news = fetch_mayday_news()
    print('=== 抓取到 %d 条五月天相关新闻 ===' % len(news))
    for n in news:
        print('  [%s] %s | %s' % (n['time'], n['type_label'], n['title']))
