from datetime import datetime
from werkzeug.security import generate_password_hash,check_password_hash
from app import db
from sqlalchemy.dialects.mysql import LONGTEXT

class User(db.Model):
    """
    用户
    """
    __tablename__ = 'users'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    username = db.Column(db.String(64),index=True,unique=True)
    password_hash = db.Column(db.String(128),default=generate_password_hash("123456"))

    _roles = db.relationship('Role',secondary='user_role', back_populates='roles')

    create_time = db.Column(db.Date, default=datetime.utcnow)
    update_time = db.Column(db.Date, onupdate=datetime.utcnow)
    #外键，可联合查询
    def __repr__(self):#返回一个可以用来表示对象的可打印字符串
        return '<User {} {}>'.format(self.username,self.password_hash)
    def set_password(self,password):
        self.password_hash = generate_password_hash(password=password)
    def check_password(self,password):
        return check_password_hash(self.password_hash,password)
    def get_id(self):
        return self.id
    def load_by_user_id(self,id):
        user = User.query.filter_by(id=id).first()
        if user is not None:
            return user
class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    role_name = db.Column(db.String(30),unique=True,nullable=False)

    _users = db.relationship('User',secondary='user_role', back_populates='users')

    def __repr__(self):
        return self.role_name
    def get_id(self):
        return self.id
class UserRole(db.Model):
    __tablename__ = 'user_role'
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True, nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), primary_key=True, nullable=False)

class BidTypes(db.Model):
    __tablename__ = 'bid_types'
    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    type_name = db.Column(db.String(100),primary_key=True)

    def __repr__(self):
        return self.type_name
class BidTemplates(db.Model):
    """招标文件模版"""
    __tablename__= 'bid_templates'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    bid_type = db.Column(db.String(100),nullable=False)
    title = db.Column(db.String(100))
    bid_content = db.Column(LONGTEXT)
    create_time = db.Column(db.Date,default=datetime.utcnow)
    update_time = db.Column(db.Date,onupdate=datetime.utcnow)
    def __repr__(self):
        return '<Bidtemplate {} {}类型{}'.format(self.id,self.bid_type,self.bid_content)
    def get_content(self):
        return self.bid_content
