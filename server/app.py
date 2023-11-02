from models import db, User, Follows, Codes, Rooms, Versions
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask import Flask, request ,session
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
            return user.to_dict()
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
        return users, 200
    
    def post(self):
        data = request.get_json()
        try:
            new_user = User(
                username = data['username'],
                email = data['email'],
                password_hash = data['password'],
                pic = data['pic'])
        except ValueError as e:
            return {"errors": ["validation errors"]}, 400
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id

        return new_user.to_dict(),201

api.add_resource(Users, '/users')

class UserByID(Resource):

    def get(self,id):
        user = User.query.filter_by(id = id).first()
        if not user:
            return {"errors":"User not found"},404
        return user.to_dict(),200
    
    def patch(self, id):
        user = User.query.filter_by(id = id).first()
        if user:
            data = request.get_json()
            user.description = data['description']
            user.pic = data['pic']
            db.session.add(user)
            db.session.commit()
            return user.to_dict(), 202
        return {'message': 'User not found'}, 404
    
    def delete(self,id):
        user = User.query.filter_by(id = id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return {'message': 'User deleted'}, 204
        return {'message': 'User not found'}, 404
    
api.add_resource(UserByID,'/users/<int:id>')  

class Code(Resource):
    
    def get(self):
        codes = [code.to_dict() for code in Codes.query.all()]
        if not codes:
            return {"Error": "Code doesn't exist"}, 401
        return codes,200
    
    def post(self):
        data = request.get_json()
        try:
            new_code = Codes(
                title = data['title'],
                pic = data['pic'],
                description = data['description'],
                user_id = session['user_id'])
        except ValueError as e:
            return {"errors": ["validation errors"]}, 400
        db.session.add(new_code)
        db.session.commit()

        return new_code.to_dict(),201

api.add_resource(Code,'/code')

class CodeByID(Resource):
    
    def get(self,id):
        code = Codes.query.filter_by(id = id).first()
        if not code:
            return {'message': 'data not found'},404
        return code.to_dict(),200
    
    def patch(self,id):
        code = Codes.query.filter_by(id = id).first()
        if code:
            data = request.get_json()
            code.title = data['title']
            code.description = data['description']
            db.session.add(code)
            db.session.commit()
            return code.to_dict(), 200
        return {'message': 'data not found'},404
    
    def delete(self,id):
        code = Codes.query.filter_by(id = id).first()
        if code:
            db.session.delete(code)
            db.session.commit()
            return {'message': 'data deleted'}, 204
        return {'message': 'data not found'}, 404
    
api.add_resource(CodeByID,'/code/<int:id>')

class Room(Resource):
    
    def get(self):
        rooms = [room.to_dict() for room in Rooms.query.all()]
        if not rooms:
            return {'message': 'data not found'},404
        return rooms,200
    
    def post(self):
        data = request.get_json()
        try:
            new_room = Rooms(
                url = data['url'],
                user_id = session['user_id'],
                code_id = data['code_id'])
        except ValueError as e:
            return {"errors": ["validation errors"]}, 400
        db.session.add(new_room)
        db.session.commit()

        return new_room.to_dict(),201

api.add_resource(Room,'/room')

class RoomByID(Resource):

    def get(self,id):
        room = Rooms.query.filter_by(id = id).first()
        if not room:
            return {'message': 'data not found'},404
        return room.to_dict(),200

    def delete(self,id):
        room = Rooms.query.filter_by(id = id).first()
        if room:
            db.session.delete(room)
            db.session.commit()
            return {'message': 'data deleted'}, 204
        return {'message': 'data not found'}, 404
    
api.add_resource(RoomByID,'/room/<int:id>')

class Version(Resource):

    def get(self):
        versions = [version.to_dict() for version in Versions.query.all()]
        if not versions:
            return {'message': 'data not found'},404
        return versions,200
    
    def post(self):
        data = request.get_json()
        try:
            new_version = Versions(
                html = data['html'],
                css = data['css'],
                js = data['js'],
                code_id = data['code_id'])
        except ValueError as e:
            return {"errors": ["validation errors"]}, 400
        db.session.add(new_version)
        db.session.commit()

        return new_version.to_dict(),201
    
api.add_resource(Version,'/version')

class VersionByID(Resource):

    def get(self,id):
        version = Versions.query.filter_by(id = id).first()
        if not version:
            return {'message': 'data not found'},404
        return version.to_dict(),200
    
    def patch(self,id):
        version = Versions.query.filter_by(id = id).first()
        if not version:
            return {'message': 'data not found'},404
        
        if version:
            data = request.get_json()
            version.html = data['html']
            version.css = data['css']
            version.js = data['js']
            db.session.add(version)
            db.session.commit()
        return version.to_dict(),202

    def delete(sef,id):
        version = Versions.query.filter_by(id = id).first()
        if version:
            db.session.delete(version)
            db.session.commit()
            return {'message': 'data deleted'}, 204
        return {'message': 'data not found'}, 404

api.add_resource(VersionByID,'/version/<int:id>')

if __name__ == '__main__':
    app.run(port=5000, debug=True)
    
