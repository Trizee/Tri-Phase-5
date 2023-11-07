#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
from models import db, User, Follows, Codes, Versions

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
        Versions.query.delete()

        print("Starting seed...")
        db.create_all()
        # Seed code goes here!
        print("Starting seeding of user...")
        for _ in range(1):
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
        for i in range(1):
            o = Codes(
                title = fake.name(),
                description = fake.name(),
                user_id = 1
            )
            db.session.add(o)
            db.session.commit()


        print("Starting seeding Versions...")

        c1 = Versions(
            name = '1',
            html = '<h1>Hello</h1>',
            css = '''body {
            background-color: red;
            }''',
            js= 'conosle.log(1)',
            code_id = 1
        )
        
        db.session.add(c1)
        db.session.commit()

        print("Starting seeding follows...")
        for i in range(1):
            f = Follows(
                following_user = 1,
                followed_user = 2
            )
            db.session.add(f)
            db.session.commit()

        print("Seeding complete...")