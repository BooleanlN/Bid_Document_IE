import json

from flask_login import \
    (LoginManager,
     current_user,
     UserMixin,
     login_required,
     login_user,
     logout_user,
     login_manager)
from flask import Flask, render_template, redirect, request
from ..models import User,Role,UserRole
from .. import db,login_manager
from . import bp

@bp.route("/login",methods=['POST'])
def index():
    username = request.form.get('username')
    password = request.form.get('password')
    res = {}
    user = User.query.filter_by(username=username).first()
    if user and request.method == 'POST':
        if user.check_password(password):
            login_user(user,True)
            res['code'] = 1
            res['msg'] = "login success"
        else:
            res['code'] = -1
            res['msg'] = "Invalid username or password"
    else:
        res['code'] = -1
        res['msg'] = "Invalid username or password"
    return json.dumps(res, encoding="utf-8")

@login_manager.user_loader
def user_loader(user_id):
    user = User.query.filter_by(id=user_id).first()
    return user
@bp.route("/index")
@login_required
def use():
    user = current_user
    return user.username

@bp.route('/logout')
def logout():
    logout_user()
    return json.dumps({'success':True}, ncoding="utf-8")
@bp.route('registe')
def registe():
    datas = json.loads(request.get_data(as_text=True))
    username = datas['username']
    password = datas['password']
    if 'role' in datas:
        role = datas['role']
    else:
        role = 'user'
    print(username, password)
    user = User.query.filter_by(username=username).first()
    payload = {}
    if user is None:
        user = User(username=username)
        user.set_password(password)
        role = Role.query.filter_by(role_name=role).first()
        user_role = UserRole(user.get_id(),role.get_id())
        db.session.add(user)
        db.session.add(user_role)
        db.session.commit()
        payload['code'] = 2000
        payload['msg'] = "registe success"
    else:
        payload['code'] = -1
        payload['msg'] = "please choose another username"
    return json.dumps(payload, encoding="utf-8")

@bp.route("/previlege",methods=['POST'])
def previlege():
    datas = json.loads(request.get_data(as_text=True))
    previlege = datas['previlege']
    role = Role.query.filter_by(role_name=previlege).first()
    print(role)
    payload = {}
    if role is None:
        role  = Role(role_name=previlege)
        db.session.add(role)
        db.session.commit()
        payload['code'] = 2000
        payload['msg'] = "add success"
    else:
        payload['code'] = -1
        payload['msg'] = "please choose another username"
    return json.dumps(payload, encoding="utf-8")