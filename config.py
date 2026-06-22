import os

# 是否开启debug模式
DEBUG = os.environ.get('DEBUG', '1') == '1'

# 读取数据库环境变量
username = os.environ.get("MYSQL_USERNAME", 'root')
password = os.environ.get("MYSQL_PASSWORD", 'root')
db_address = os.environ.get("MYSQL_ADDRESS", '127.0.0.1:3306')

# 数据库 URI：优先 MySQL，本地无 MySQL 时回退 SQLite 方便开发
USE_SQLITE = os.environ.get('USE_SQLITE', '0') == '1'

if USE_SQLITE:
    # SQLite 本地开发模式
    basedir = os.path.abspath(os.path.dirname(__file__))
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'mayday_land.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
else:
    # 微信云托管 / 生产 MySQL 模式
    SQLALCHEMY_DATABASE_URI = 'mysql://{}:{}@{}/mayday_land'.format(
        username, password, db_address)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
