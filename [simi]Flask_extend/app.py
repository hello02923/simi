from flask import Flask, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from mongodb_utils import get_cached_mongo_db
import datetime

from flask_jwt_extended import (
    create_access_token, get_jwt_identity, jwt_required, JWTManager,
    current_user
)

activity_db = get_cached_mongo_db()
records = activity_db['register']

app = Flask(__name__)

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
jwt = JWTManager(app)

@app.route('/signup', methods=['POST'])
def signup():

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
    return jsonify({'massage':"Please sigin!"})

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@app.route("/login", methods=["POST"])
def login():

    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        return jsonify({"msg": "Login required!"}), 401

    db_user = records.find_one({'username':auth.username})
    if not db_user:
        return jsonify({"msg": "Login required!"}), 401

    if check_password_hash(db_user['password'], auth.password):
        access_token = create_access_token(identity=auth.username)
    return jsonify(access_token=access_token)


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


if __name__ == "__main__":
    app.run()