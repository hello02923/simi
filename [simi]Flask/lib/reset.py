# -*- coding: utf-8 -*-
import logging
import socket
import datetime
from threading import Thread
from flask import (Flask, jsonify, request)
from flask_mail import (Mail, Message)
from flask_jwt_extended import (create_access_token, decode_token)
from werkzeug.security import generate_password_hash
from utils.basic import insert_action, find_action, update_action

filename = 'reset.log'
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s {} %(message)s".format(socket.gethostname()),
    filename='log/{filename}'.format(filename=filename))

app = Flask(__name__)
app.config.update(
    DEBUG=False,
    # EMAIL SETTINGS
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=465,
    MAIL_USE_SSL=True,
    MAIL_DEFAULT_SENDER=('admin', 'simi0203040506@gmail.com'),
    MAIL_MAX_EMAILS=10,
    MAIL_USERNAME='simi0203040506@gmail.com',
    MAIL_PASSWORD='simi0000'
)
mail = Mail(app)
mail.init_app(app)


def send_async_email(app, msg):
    """
    send email 
    """
    try:
        with app.app_context():
            mail.send(msg)
    except Exception as error:
            logging.exception(error)

def set_pwd_request():
    """
    check user email & send email
    """
    url = 'http://127.0.0.1:5500/templates/reset.html?reset_token='
    logging.info(url)
    try:
        body = request.get_json()
        email = body.get('email')
        db_user = find_action({'email':email})
        if not email:
            return jsonify({'message' : 'Email is empty!'}), 400.1

        if not db_user:
            return jsonify({'message' : 'Email is invaild!'}), 401.13

        expires = datetime.timedelta(hours=24)
        reset_token = create_access_token(str(db_user['username']), expires_delta=expires)
        ## send email to user
        msg = request_email(db_user, url, reset_token)
        thr = Thread(target=send_async_email, args=[app, msg])
        thr.start()

        response = jsonify(msg="success send email")
        return response, 200

    except Exception as error:
        logging.exception(error)

    response = jsonify(msg="fail to send email")
    return response, 400

def request_email(db_user, url, reset_token):
    """
    request_email:reset email format by html
    :parma:db_user: user data
    :param:url: url to reset pwd
    :param:reset_token: the link merge in url
    """
    msg_title = '[Simi] Reset Your Password'
    msg_sender = 'simi0203040506@gmail.com'
    ## 收件者，格式為list，否則報錯
    msg_recipients = [db_user['email']]
    msg_html ='''<div style="width: 100%;height: 100%;font-size:16px;">
        <div style="width: 55%;height: 100%;max-width: 400px;border: 5px solid gray;">
            <p style="padding-left: 10%;padding-top:5%"> 您好,{name} </p>
            <p style="padding-left: 10%;"> 我們已為這個帳號重送了重設密碼連結： </p>
            <div style="height: 50%;width: 35%;margin: 10% auto;width: 100%;display: flex;">
                <div style="position: relative;font-size:16px;background-color: cornflowerblue;color: #fff; height: 50px;width: 100px;margin: 5px auto;border: none;border-radius: 5px;cursor:pointer;">
                <a style="text-decoration: none;text-decoration: none;color: #fff;position: absolute;top: 13px;left: 18px;" href="{url_}">點擊連結</a>
                </div>
            </div>
            <p style="padding-left: 10%;">請注意，該連結僅能使用一次。</p>
            <p style="padding-left: 10%;">如有任何問題，歡迎來信。</p>
            <p style="padding-left: 10%;">感謝您! </p>
            <P style="padding-right: 10%;padding-bottom:5%;text-align: right;">SIMI團隊敬上</P>
        </div>
    </div>
            '''.format(name=db_user['username'], url_=str(url + reset_token))
        
    msg = Message(
        msg_title,
        sender=msg_sender,
        recipients=msg_recipients
        )
    msg.html = msg_html
    return msg

def set_reset_pwd():
    """
    send reset_pwd email & update in mongodb
    """
    try:
        body = request.get_json()
        reset_token = body.get('reset_token')
        password = body.get('password')
        repeat_password = body.get('repeat_password')

        if password != repeat_password:
            response = jsonify({'message' : 'password is not same!'})
            return response, 401.12

        if not reset_token:
            response = jsonify({'message' : 'token invaild!'})
            return response, 401

        if not password or not password:
            response = jsonify({'message' : 'password empty!'})
            return response, 400.1
            
        ## json decode take 'sub' as username 
        username = decode_token(reset_token)['sub']

        db_user = find_action({'username':username})
        hashed_password = generate_password_hash(password, method='sha256')
        
        new_data = {'password': hashed_password}
        update_action(username, new_data)

        response = jsonify(msg="success update password")
        return response, 200

    except Exception as error:
        logging.exception(error)

    response = jsonify(msg="fail to update password")
    return response, 400
