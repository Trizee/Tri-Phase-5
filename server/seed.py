#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
from models import db, User, Follows, Codes, Rooms, Versions

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
        Rooms.query.delete()
        Versions.query.delete()

        print("Starting seed...")
        db.create_all()
        # Seed code goes here!
        print("Starting seeding of user...")
        for _ in range(5):
            u = User(
                username = fake.name(),
                pic = fake.url(),
                description = 'N/A',
                email = fake.url(),
                password_hash = "123abc"
            )

            db.session.add(u)
            db.session.commit()

        print("Starting seeding Code...")
        for i in range(5):
            o = Codes(
                title = fake.name(),
                description = fake.name(),
                user_id = randint(1,5)
            )
            db.session.add(o)
            db.session.commit()


        print("Starting seeding Versions...")

        c1 = Versions(
            html = '<h1>Hello</h1>',
            css = '''body {
            background-color: red;
            }''',
            js= 'conosle.log(1)',
            code_id = 1
        )
        c2 = Versions(
            html = '<h1>Hello2</h1>',
            css = '''body {
            background-color: red;
            }''',
            js= 'conosle.log(1)',
            code_id = 1
        )
        c3 = Versions(
            html = '<h1>Hello3</h1>',
            css = '''body {
            background-color: red;
            }''',
            js= 'conosle.log(1)',
            code_id = 2
        )
        c4 = Versions(
            html = '<h1>code 4</h1>',
            css = '''body {
            background-color: red;
            }''',
            js= 'conosle.log(1)',
            code_id = 2
        )
        c5 = Versions(
            html = '<h1>code 5</h1>',
            css = '''body {
            background-color: red;
            }''',
            js= 'conosle.log(1)',
            code_id = 4
        )

        db.session.add_all([c1,c2,c3,c4,c5])
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
                following_user = 1,
                followed_user = 2
            )
            db.session.add(f)
            db.session.commit()

        print("Seeding complete...")