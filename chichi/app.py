#coding:utf8
from flask import Flask, render_template, request, redirect, url_for, flash, abort, session
from flask_login import (LoginManager, UserMixin, login_user, logout_user,
                            current_user, login_required, fresh_login_required)

from flask_bcrypt import Bcrypt
from mongodb_utils import get_cached_mongo_db

app = Flask(__name__, static_folder="_static", template_folder="_templates")
# app = Flask(__name__)
app.secret_key = "testing"


login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message = 'Unauthorized User'
login_manager.login_message_category = "info"


class User(UserMixin):
    pass

@login_manager.unauthorized_handler     # In unauthorized_handler we have a callback URL 
def unauthorized_callback():            # In call back url we can specify where we want to 
       return redirect(url_for('login'))

# 通过用户名，获取用户记录，如果不存在，则返回None
def query_user(username):
    activity_db = get_cached_mongo_db()
    records = activity_db['register']
    user_found = records.find_one({"name": username})
    if user_found:
        return username

@login_manager.user_loader
def load_user(username):
    if query_user(username) is not None:
        curr_user = User()
        curr_user.id = username

        return curr_user

@app.route('/')
@login_required
def index():
    if current_user.is_active: 
        return render_template('index.html')
    else:
        return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        activity_db = get_cached_mongo_db()
        records = activity_db['register']

        username = request.form.get('username')
        password = request.form.get('password')
        hash_pwd = Bcrypt().generate_password_hash(password, 10).decode('utf-8')

        email = request.form.get('email')
        user_found = records.find_one({"username": username})

        if user_found:
            flash('There already is a user by that name')
        else:
            user_input = {'username':username,'email':email, 'password':hash_pwd}
            records.insert_one(user_input)
            # flash('成功註冊請登入')
            return render_template('login.html')
    return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        activity_db = get_cached_mongo_db()
        records = activity_db['register']

        username = request.form.get('username')
        password = request.form.get('password')

        db_username = records.find_one({"username": username})
        hash_pwd = Bcrypt().check_password_hash(db_username['password'], password)

        if username == db_username['username'] and hash_pwd :
            session["username"] = username
            curr_user = User()
            curr_user.id = username
            login_user(curr_user, remember=True)
            # flash('Logged in successfully.')
            return render_template("index.html")
        else:
            flash('Wrong username or password!')
    print(22)
    return render_template("login.html")

@app.route('/logout', methods=["POST", "GET"])
def logout():
    session.pop("username", None)
    # flask_login.logout_user()
    return render_template("logout.html")

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)