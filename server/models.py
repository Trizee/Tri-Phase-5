from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.sql import func
from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = "user_table"

    serialize_rules = ('-_password_hash', '-follows.follower', '-followed_by.following', '-rooms.user', '-user_code_rel.code','-code.user')

    id = db.Column(db.Integer, primary_key=True)
    pic = db.Column(db.String)
    email = db.Column(db.String)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)

    
    rooms = db.relationship('Rooms', back_populates='user')
    follows = db.relationship('Follows', back_populates='follower', foreign_keys='Follows.following_user', cascade='all, delete-orphan')
    followed_by = db.relationship('Follows', back_populates='following', foreign_keys='Follows.followed_user', cascade='all, delete-orphan')
    code = db.relationship('Codes',back_populates='user')

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))


class Follows(db.Model, SerializerMixin):
    __tablename__ = 'follow_table'

    serialize_rules = ('-follower.follows', '-following.followed_by')

    id = db.Column(db.Integer, primary_key=True)
    following_user = db.Column(db.Integer, db.ForeignKey('user_table.id'))
    followed_user = db.Column(db.Integer, db.ForeignKey('user_table.id'))

    follower = db.relationship('User', back_populates='follows', foreign_keys=[following_user])
    following = db.relationship('User', back_populates='followed_by', foreign_keys=[followed_user])


class Codes(db.Model, SerializerMixin):
    __tablename__ = 'code_table'

    serialize_rules = ('-rooms.code', '-version.code','-user.code')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user_table.id'))
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    rooms = db.relationship('Rooms', back_populates='code')
    version = db.relationship('Versions', back_populates='code')
    user = db.relationship('User',back_populates='code')


class Rooms(db.Model, SerializerMixin):
    __tablename__ = 'room_table'

    serialize_rules = ('-user.rooms', '-code.rooms')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user_table.id'))
    code_id = db.Column(db.Integer, db.ForeignKey('code_table.id'))
    url = db.Column(db.String, unique = True)

    user = db.relationship('User', back_populates='rooms')
    code = db.relationship('Codes', back_populates='rooms')

class Versions(db.Model, SerializerMixin):
    __tablename__ = 'versions_table'

    serialize_rules = ('-code.version',)

    id = db.Column(db.Integer, primary_key=True)
    html = db.Column(db.String)
    css = db.Column(db.String)
    js = db.Column(db.String)
    code_id = db.Column(db.Integer, db.ForeignKey('code_table.id'))

    code = db.relationship('Codes', back_populates='version')