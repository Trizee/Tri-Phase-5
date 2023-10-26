from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.sql import func
from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = "user_table"

    serialize_rules = ('-password_hash', '-user_code_rel.user', '-follows_rel.user')

    id = db.Column(db.Integer, primary_key=True)
    pic = db.Column(db.String)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)

    user_code_rel = db.relationship('UserCodes', back_populates='user', cascade='all, delete-orphan')
    follows_rel = db.relationship('Follows', back_populates='user', cascade='all, delete-orphan')

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')
        )


class Follows(db.Model, SerializerMixin):
    __tablename__ = 'follow_table'

    serialize_rules = ('-user.follows_rel',)

    id = db.Column(db.Integer, primary_key=True)
    following_user = db.Column(db.Integer, db.ForeignKey('user_table.id'))
    followed_user = db.Column(db.Integer, db.ForeignKey('user_table.id'))

    user = db.relationship('User', back_populates='follows_rel')


class Codes(db.Model, SerializerMixin):
    __tablename__ = 'code_table'

    serialize_rules = ('-user_code_rel.code',)

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    html = db.Column(db.String)
    css = db.Column(db.String)
    js = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    user_code_rel = db.relationship('UserCodes', back_populates='code', cascade='all, delete-orphan')


class Rooms(db.Model, SerializerMixin):
    __tablename__ = 'room_table'

    serialize_rules = ('-user.rooms','-code.rooms')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user_table.id'))
    code_id = db.Column(db.Integer, db.ForeignKey('code_table.id'))
    url = db.Column(db.String)

    user = db.relationship('User', back_populates='rooms')
    code = db.relationship('Codes', back_populates='rooms')


class UserCodes(db.Model, SerializerMixin):
    __tablename__ = 'user_code_table'

    serialize_rules = ('-user.rooms','-code.rooms')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user_table.id'))
    code_id = db.Column(db.Integer, db.ForeignKey('code_table.id'))

    user = db.relationship('User', back_populates='user_code_rel')
    code = db.relationship('Codes', back_populates='user_code_rel')
