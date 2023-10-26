from models import db, User
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask import Flask, make_response, jsonify, request, session
import os
from config import app, db, api

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)
api = Api(app)
app.secret_key = 'super secret key'

# Views go here!

@app.route('/')
def index():
    return '<h1>Code Together Backend</h1>'

class Login(Resource):
    def post(self):
        data = request.get_json()
        username= data['username']
        password= data['password']
        user = User.query.filter(User.username == username).first()
        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200
            else:
                return {"Error": "password is wrong"}, 401
        return {"Error": "User doesn't exist"}, 401

api.add_resource(Login, '/login')

class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return user.to_dict(only=('username', 'id'))
        else:
            return {'message': 'Not Authorized'}, 401
        
api.add_resource(CheckSession, '/check_session')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {}, 204
    
api.add_resource(Logout, '/logout')

class Users(Resource):

    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(users, 200)
    
    def post(self):
        data = request.get_json()
        try:
            new_user = User(
                username = data['username'],
                password_hash = data['password'],
                pic = data['pic'])
        except ValueError as e:
            return make_response({"errors": ["validation errors"]}, 400)
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id

        return make_response(new_user.to_dict(),201)

api.add_resource(Users, '/users')

class UserByID(Resource):

    def get(self,id):
        user = User.query.filter_by(id = id).first()
        if not user:
            return make_response({"errors":"User not found"},404)
        return make_response(user.to_dict(),200)
    
    def patch(self, id):
        user = User.query.filter_by(id = id).first()
        if user:
            data = request.get_json()
            user.username = data['username']
            user.password = data['password']
            user.pic = data['pic']
            db.session.add(user)
            db.session.commit()
            return make_response(user.to_dict(), 200)
        return make_response({'message': 'User not found'}, 404)
    
    def delete(self,id):
        user = User.query.filter_by(id = id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return make_response({'message': 'User deleted'}, 204)
        return make_response({'message': 'User not found'}, 404)

api.add_resource(UserByID,'/users/<int:id>')  


if __name__ == '__main__':
    app.run(port=5000, debug=True)
    
