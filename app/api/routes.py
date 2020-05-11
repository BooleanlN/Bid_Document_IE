from . import bp
from .. import es
from flask import request
import json
import base64
import os
SOURCE_FOLDER = 'app/source'
@bp.route('/template/bid',methods=['GET'])
def get_bid_template():
    pass

@bp.route('/template/bid',methods=['POST'])
def upload_bid_template():
    pass

@bp.route('/material/bid',methods=['POST'])
def upload_bid_material():
    file = request.files['material']
    print(os.getcwd())
    payload = {}
    file.save(os.path.join(SOURCE_FOLDER,file.filename))
    file_bytes = open(os.path.join(SOURCE_FOLDER,file.filename),"rb").read()
    file_base = base64.b64decode(file_bytes)
    payload['msg'] = "success"
    payload['code'] = 2000
    print(file_base)
    return json.dumps(payload)