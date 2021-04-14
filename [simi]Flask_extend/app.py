from flask import Flask, jsonify, request, render_template
from werkzeug.security import generate_password_hash, check_password_hash
from mongodb_utils import get_cached_mongo_db
import datetime
import logging
from datetime import timedelta
from datetime import timezone

from flask_jwt_extended import (
    unset_jwt_cookies, get_jwt_identity, jwt_required, JWTManager,
    current_user, set_access_cookies, create_access_token,
    create_refresh_token
)
# jwt_refresh_token_required,
activity_db = get_cached_mongo_db()
records = activity_db['register']

app = Flask(__name__)

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "kkkkkktest"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)
jwt = JWTManager(app)


logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s : %(message)s',
    filename='log/app.log')

@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        hashed_password = generate_password_hash(data['password'], method='sha256')

        if records.find_one({'username': data['username']}):
            return jsonify({'message' : 'Username has been already created!'})
        elif records.find_one({'email': data['email']}):
            return jsonify({'message' : 'Email has been already created!'})
        else:
            new_user = {"username": data['username'], 'email': data['email'], 'password':hashed_password}
            records.insert_one(new_user)
            return jsonify({'message' : 'New user created!'})
    except Exception as e:
        logging.exception(e)    
    
    return jsonify({'massage':"Please signup!"})


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@app.route("/login", methods=["POST", "GET"])
def login():
    if request.method == "POST":
        auth = request.authorization

        if not auth or not auth.username or not auth.password:
            return jsonify({"msg": "Login required!"}), 401

        db_user = records.find_one({'username':auth.username})
        if not db_user:
            return jsonify({"msg": "Login required!"}), 401

        if check_password_hash(db_user['password'], auth.password):
            access_token = create_access_token(identity=auth.username)
        return jsonify(access_token=access_token)

        if check_password_hash(db_user['password'], auth.password):
            access_token = create_access_token(identity=auth.username)
            refresh_token = reate_refresh_token(identity=auth.username)
            response = jsonify({"msg": "login successful", 'access_token':access_token, 'refresh_token':refresh_token})
            set_access_cookies(response, access_token)
        return response

        
@app.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    return jsonify(access_token=access_token)

@app.route("/optionally_protected", methods=["GET"])
@jwt_required()
def optionally_protected():
    current_identity = get_jwt_identity()
    if current_identity:
        return jsonify(logged_in_as=current_identity)
    else:
        return jsonify(logged_in_as="please login")

@app.route("/logout_with_cookies", methods=["POST"])
def logout_with_cookies():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


if __name__ == "__main__":
    app.run()