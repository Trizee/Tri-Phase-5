#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
from models import db, User, Follows, Codes, UserCodes, Rooms

# Local imports
from app import app
from models import db

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        
        print("Clearing database...")
        User.query.delete()
        Follows.query.delete()
        Codes.query.delete()
        UserCodes.query.delete()
        Rooms.query.delete()

        print("Starting seed...")
        db.create_all()
        # Seed code goes here!
        print("Starting seeding of user...")
        for _ in range(5):
            u = User(
                username = fake.name(),
                pic = fake.url(),
                password_hash = "123abc"
            )

            db.session.add(u)
            db.session.commit()

        print("Starting seeding Code...")

        c1 = Codes(
            title = 'code 1',
            description = 'code 1',
            html = '<h1>Hello</h1>',
            css = '''body {
            background-color: red;
            }''',
            js= 'conosle.log(1)'
        )
        c2 = Codes(
            title = 'code 2',
            description = 'code 2',
            html = '<h1>Hello2</h1>',
            css = '''body {
            background-color: red;
            }''',
            js= 'conosle.log(1)'
        )
        c3 = Codes(
            title = 'code 3',
            description = 'code 3',
            html = '<h1>Hello3</h1>',
            css = '''body {
            background-color: red;
            }''',
            js= 'conosle.log(1)'
        )
        c4 = Codes(
            title = 'code 4',
            description = 'code 4',
            html = '<h1>code 4</h1>',
            css = '''body {
            background-color: red;
            }''',
            js= 'conosle.log(1)'
        )
        c5 = Codes(
            title = 'code 5',
            description = 'code 5',
            html = '<h1>code 5</h1>',
            css = '''body {
            background-color: red;
            }''',
            js= 'conosle.log(1)'
        )

        db.session.add_all([c1,c2,c3,c4,c5])
        db.session.commit()

        print("Starting seeding user's code...")  
        for i in range(5):
            uc = UserCodes(
                user_id = randint(1,5),
                code_id = randint(1,5)
            )
        
            db.session.add(uc)
            db.session.commit()

        print("Starting seeding rooms...")
        for i in range(5):
            r = Rooms(
                user_id = randint(1,5),
                code_id = randint(1,5),
                url = fake.url()
            )
            db.session.add(r)
            db.session.commit()

        print("Starting seeding follows...")
        for i in range(5):
            f = Follows(
                following_user = randint(1,5),
                followed_user = randint(1,5)
            )
            db.session.add(f)
            db.session.commit()

        print("Seeding complete...")