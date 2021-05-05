# -*- coding: utf-8 -*-
import logging
import socket
from datetime import datetime
from flask import (jsonify, request)
from werkzeug.security import (generate_password_hash, check_password_hash)
from flask_jwt_extended import (
    unset_jwt_cookies, get_jwt_identity, set_access_cookies, 
    create_access_token, create_refresh_token
    )
from utils.basic import insert_action, find_action

filename = datetime.strftime(datetime.now(), '%Y%m%d_') + 'login.log'
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s {} %(message)s".format(socket.gethostname()),
    filename='log/{filename}'.format(filename=filename))


def set_protected():
    """
    turn into index.html
    """
    try:
        current_identity = get_jwt_identity()
        if current_identity:
            response = jsonify(logged_in_as=current_identity)
            return response, 200
        else:
            response = jsonify(logged_in_as="please login")
            return response, 467
    except Exception as e:
        logging.exception(e)

    response = jsonify({'message':"Please login!"})
    return response, 400

def set_signup():
    """
    set signup
    """
    try:
        ## get json format
        data = request.get_json()
        ## hash the pwd
        hashed_password = generate_password_hash(data['password'], method='sha256')

        username = {'username': data['username']}
        email = {'email': data['email']}

        if find_action(username):
            response = jsonify({'message' : 'Username has been already created!'})
            return response, 468
        elif find_action(email):
            response = jsonify({'message' : 'Email has been already created!'})
            return response, 470
        elif data['username'] == data['password']:
            response = jsonify({'message' : 'username and password cannot be same!'})    
            return response, 469
        else:
            new_user = {"username": data['username'], 'email': data['email'], 'password':hashed_password}
            insert_action(new_user)
            response = jsonify({'message' : 'New user created!'})
            return response, 200

    except Exception as error:
        logging.exception(error)
    
    response = jsonify({'message':"Please signup!"})
    return response, 400

def set_login():
    """
    login by check username & pwd & email in mongodb 
    """
    try:
        ## get username & password & email to check 
        if request.method == "POST":
            auth = request.authorization

            if not auth or not auth.username or not auth.password:
                response = jsonify({"msg": "Login field empty!"})
                return response, 465

            username = {'username':auth.username}
            db_user = find_action(username)

            if not db_user:
                response = jsonify({"msg": "Don't find username!"})
                return response, 468

            if check_password_hash(db_user['password'], auth.password):
                access_token = create_access_token(identity=auth.username)
                refresh_token = create_refresh_token(identity=auth.username)
                
                ## set cookies
                set_access_cookies(jsonify({"msg": "login successful"}), access_token)

                response = jsonify({"msg": "login successful", 'access_token':access_token, 'refresh_token':refresh_token})
                return response, 200
            else:
                response = jsonify({"msg": "password error"})
                return response, 469

    except Exception as error:
        logging.exception(error)

    response = jsonify({'message':"Please login!"})
    return response, 400

def set_refresh():
    """
    refresh access token 
    """
    try:
        identity = get_jwt_identity()
        access_token = create_access_token(identity=identity)
        response = jsonify(access_token=access_token)
        return response, 200
    except Exception as error:
        logging.exception(error)
    
    response = jsonify({'message':"refresh token error"})
    return response, 400

def set_logout():
    """
    logout by cookies 
    """
    try:
        current_identity = get_jwt_identity()
        response = jsonify({"msg": "hi {user} ! logout successful! ".format(user=current_identity)})
        unset_jwt_cookies(response)
        return response, 200
    except Exception as error:
        logging.exception(error)
    response = jsonify({'message':"logout error"})
    return response, 400