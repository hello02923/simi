# -*- coding: utf-8 -*-
from datetime import timedelta
from flask import (Flask, render_template, jsonify)
from flask_mail import Mail
from flask_jwt_extended import (JWTManager, jwt_required, get_jwt_identity)

from lib.login import (set_signup, set_login, set_refresh, set_logout, set_protected)
from lib.reset import (set_pwd_request, set_reset_pwd)
from flask_cors import CORS
app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = "kkkkkktest"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)

jwt = JWTManager(app)
mail = Mail(app)
CORS(app)

@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    response = set_protected()
    return response

@app.route('/signup', methods=['POST'])
def signup():
    response = set_signup()
    return response

@app.route("/login", methods=["POST", "GET"])
def login():
    response = set_login()
    return response

@app.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    response = set_refresh()
    return response

@app.route("/logout_with_cookies", methods=["POST"])
@jwt_required()
def logout_with_cookies():
    response = set_logout()
    return response

@app.route("/reset_password_request", methods=['POST'])
def reset_password_request():
    response = set_pwd_request()
    return response

@app.route('/reset_password', methods=['GET', 'POST'])
def reset_password():
    response = set_reset_pwd()
    return response
