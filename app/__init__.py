from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
import pymysql
import os
import config

# 因MySQLDB不支持Python3，使用pymysql扩展库代替MySQLDB库
pymysql.install_as_MySQLdb()

# 初始化web应用
app = Flask(__name__, instance_relative_config=True)
app.config['DEBUG'] = config.DEBUG

# 设定数据库链接（支持 MySQL 生产 / SQLite 本地开发）
app.config['SQLALCHEMY_DATABASE_URI'] = config.SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = config.SQLALCHEMY_TRACK_MODIFICATIONS

# 初始化DB操作对象
db = SQLAlchemy(app)

# 静态资源：把仓库根目录 assets/ 暴露为 /static/assets/，避免重复存储
_BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
_ASSETS_DIR = os.path.join(_BASE_DIR, 'assets')


@app.route('/static/assets/<path:filename>')
def _serve_assets(filename):
    resp = send_from_directory(_ASSETS_DIR, filename)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


# 微信公众平台域名验证文件（如 f342dd5a3c7a9653bcaddc5ee5ca998c.txt）
@app.route('/<filename>')
def _serve_verify(filename):
    if not filename.endswith('.txt'):
        from flask import abort
        abort(404)
    _STATIC_DIR = os.path.join(_BASE_DIR, 'app', 'static')
    return send_from_directory(_STATIC_DIR, filename)


# 加载控制器
from app import views

# 加载配置
app.config.from_object('config')


# 注入模板全局变量：构建时间戳，用于前端静态资源 cache busting
@app.context_processor
def _inject_buildtime():
    build_time = None
    try:
        with open(os.path.join(_BASE_DIR, '.buildtime'), 'r') as f:
            build_time = f.read().strip()
    except Exception:
        pass
    return dict(build_time=build_time or str(int(os.environ.get('DEBUG', '0'))))


# 启动保活线程（生产环境定时访问云托管域名，避免 30 分钟无访问被回收）
from app import keepalive
keepalive.start()
