from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name="Demo",
        last_name='User',
        username='Demo',
        email='demo@aa.io',
        password='password',
        city='Worcester',
        region='MA',
        country='US',
        profile_img='https://t4.ftcdn.net/jpg/01/19/05/71/360_F_119057199_YSS8CAnnkvQCzPhZOj3aYfNsx0CQ41sT.jpg')

    user_1 = User(
        first_name="First",
        last_name='User',
        username='user1',
        email='user1@aa.io',
        password='password',
        city='Boston')

    user_2 = User(
        first_name="Second",
        last_name='User',
        username='user2',
        email='user2@aa.io',
        password='password',
        city='Los Angeles')

    db.session.add(demo)
    db.session.add(user_1)
    db.session.add(user_2)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
