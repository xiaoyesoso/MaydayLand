# 创建应用实例
import sys
import os

from app import app, db
import config


def init_db():
    """首次启动时自动建库建表并导入种子数据"""
    if os.environ.get('USE_SQLITE', '0') == '1':
        # SQLite 模式：直接建表 + 种子
        with app.app_context():
            db.create_all()
        _seed()
        return

    # MySQL 模式：先确保数据库存在
    try:
        import pymysql
        host, port = config.db_address.split(':')
        conn = pymysql.connect(host=host, port=int(port),
                               user=config.username, password=config.password)
        cursor = conn.cursor()
        cursor.execute('CREATE DATABASE IF NOT EXISTS mayday_land '
                       'CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci')
        conn.commit()
        cursor.close()
        conn.close()
        print('[startup] database mayday_land ensured', flush=True)
    except Exception as e:
        print('[startup] ensure database failed: %s' % e, flush=True)

    with app.app_context():
        db.create_all()
    _seed()


def _seed():
    """导入种子数据（已存在则跳过）"""
    try:
        from seed import seed_all
        seed_all()
    except Exception as e:
        print('[startup] seed failed: %s' % e, flush=True)


# 启动Flask Web服务
if __name__ == '__main__':
    init_db()
    app.run(host=sys.argv[1] if len(sys.argv) > 1 else '0.0.0.0',
            port=int(sys.argv[2]) if len(sys.argv) > 2 else 80)
