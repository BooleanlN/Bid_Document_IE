import os

import logging
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from logging.handlers import RotatingFileHandler
from flask_session import Session
from flask_cors import CORS
from flask_login import LoginManager
from config import Config
from flask_elasticsearch import FlaskElasticsearch
db = SQLAlchemy() #表示数据库
migrate = Migrate() #数据库迁移引擎
se = Session()
login_manager = LoginManager()
login_manager.session_protection = 'strong'   # 防止恶意用户篡改 cookies
es = FlaskElasticsearch()
def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    #插件关联
    db.init_app(app)
    es.init_app(app)
    migrate.init_app(app, db)
    se.init_app(app)
    login_manager.init_app(app)
    CORS(app)
    #注册蓝图
    from app.api import bp as api_bp
    from app.auth import bp as auth_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(api_bp,url_prefix='/api')
    if not app.debug:
        # ...
        if not os.path.exists('logs'):
            os.mkdir('logs')
        file_handler = RotatingFileHandler('logs/end.log', maxBytes=10240,
                                           backupCount=10)
        file_handler.setFormatter(logging.Formatter(
            '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)

        app.logger.setLevel(logging.INFO)
        app.logger.info('end startup')
    return app