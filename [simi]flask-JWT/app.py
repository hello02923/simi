from flask import Flask, request, jsonify, make_response
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps
from mongodb_utils import get_cached_mongo_db
from flask_jwt_extended import (
    JWTManager, create_access_token,
    get_jwt_identity
)

app = Flask(__name__)
app.config['SECRET_KEY'] = 'thisissecret'
activity_db = get_cached_mongo_db()
records = activity_db['register']
# jwt = JWTManager(app)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'access-token' in request.headers:
            token = request.headers['access-token']

        if not token:
            return jsonify({'message' : 'Token is missing!'}), 401

        try: 
            ## 這邊卡住
            data_ = jwt.decode(token, app.config['SECRET_KEY'], verify=False)
            print(data_['public_id'])
            # db_user = records.find_one({'exp':data_['exp']})
            # print(db_user)

        except:
            return jsonify({'message' : 'Token is invalid!'}), 401

        return f(data_, *args, **kwargs)

    return decorated

@app.route('/user', methods=['GET'])
@token_required
def test_login(data_):
    # name = token['username']
    return jsonify({'hello' :data_})


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

@app.route('/login')
def login():
    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        return make_response('Could not verify1', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    db_user = records.find_one({'username':auth.username})
    # print(db_user['username'])

    if not db_user:
        return make_response('Could not verify2', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    if check_password_hash(db_user['password'], auth.password):
        user_auth = {'public_id' : db_user['username'], 'exp' : datetime.datetime.now() + datetime.timedelta(minutes=30)}
        records.update_one({'username':auth.username}, {'$set': user_auth}, upsert=True)
        token = jwt.encode(user_auth, app.config['SECRET_KEY'])

        return jsonify({'token' : token.decode('UTF-8')})

        # it should be pip install PyJWT==1.7.1
        # return jsonify({'token' : token})

    return make_response('Could not verify3', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})



if __name__ == '__main__':
    app.run(debug=True)