from app.models import db, Location, environment, SCHEMA
from sqlalchemy.sql import text

def seed_locations():
    demo_location_1 = Location(
        user_id=1,
        title="Boston",
        # googleId="googleId",
        lat=42.3554,
        lng=-71.0605,
        type="city",
        continent="North America",
        country="US",
        region="MA",
        city="Boston",
        visited=True
    )

    demo_location_2 = Location(
        user_id=1,
        title="Istanbul",
        # googleId="googleId",
        lat=41.0064,
        lng=28.9759,
        type="city",
        continent="Asia",
        country="Turkey",
        # region="",
        city="Istanbul",
        visited=True
    )

    demo_location_3 = Location(
        user_id=1,
        title="Shanghai",
        # googleId="googleId",
        lat=31.2323,
        lng=-121.4691,
        type="city",
        continent="Asia",
        country="China",
        # region="",
        city="Shanghai",
        visited=False
    )

    demo_location_4 = Location(
        user_id=1,
        title="Miami",
        # googleId="googleId",
        lat=25.7742,
        lng=-80.1936,
        type="city",
        continent="North America",
        country="US",
        region="FL",
        city="Miami",
        visited=True
    )

    demo_location_5 = Location(
        user_id=1,
        title="Astana",
        # googleId="googleId",
        lat=51.1153,
        lng=-71.4664,
        type="city",
        continent="Asia",
        country="Kazakhstan",
        # region="FL",
        # city="Miami",
        visited=False
    )

    demo_location_6 = Location(
        user_id=1,
        title="Ho Chi Minh city",
        # googleId="googleId",
        lat=10.7764,
        lng=-106.7011,
        type="city",
        continent="Asia",
        country="Vietnam",
        # region="FL",
        # city="Miami",
        visited=False
    )

    demo_location_7 = Location(
        user_id=1,
        title="Grand Canyon National Park",
        # googleId="googleId",
        lat=36.3079,
        lng=-112.2929,
        type="nature",
        continent="North America",
        country="US",
        region="AZ",
        visited=False
        # city="",
    )

    demo_location_8 = Location(
        user_id=1,
        title="Zion National Park",
        # googleId="googleId",
        lat=37.3247,
        lng=-113.0048,
        type="nature",
        continent="North America",
        country="US",
        region="UT",
        visited=True
        # city="",
    )

    demo_location_9 = Location(
        user_id=1,
        title="Canyonlands National Park",
        # googleId="googleId",
        lat=38.2333,
        lng=-109.9207,
        type="nature",
        continent="North America",
        country="US",
        region="UT",
        visited=True
        # city="",
    )

    demo_location_10 = Location(
        user_id=1,
        title="Olympic National Park",
        # googleId="googleId",
        lat=47.7865,
        lng=-123.5361,
        type="nature",
        continent="North America",
        country="US",
        region="WA",
        visited=True
        # city="",
    )

    demo_location_11 = Location(
        user_id=2,
        title="Boston",
        # googleId="googleId",
        lat=42.3554,
        lng=-71.0605,
        type="city",
        continent="North America",
        country="US",
        region="MA",
        city="Boston",
        visited=True
    )

    demo_location_12 = Location(
        user_id=2,
        title="Worcester",
        # googleId="googleId",
        lat=42.2626,
        lng=-71.8019,
        type="city",
        continent="North America",
        country="US",
        region="MA",
        city="Worcester",
        visited=True
    )

    demo_location_13 = Location(
        user_id=2,
        title="Providence",
        # googleId="googleId",
        lat=41.8240,
        lng=-71.4128,
        type="city",
        continent="North America",
        country="US",
        region="RI",
        city="Providence",
        visited=True
    )

    demo_location_14 = Location(
        user_id=2,
        title="Hartford",
        # googleId="googleId",
        lat=41.7646,
        lng=-72.6909,
        type="city",
        continent="North America",
        country="US",
        region="CT",
        city="Hartford",
        visited=True
    )

    demo_location_15 = Location(
        user_id=2,
        title="New York",
        # googleId="googleId",
        lat=40.7815,
        lng=-73.9591,
        type="city",
        continent="North America",
        country="US",
        region="NY",
        city="New York",
        visited=True
    )


    db.session.add(demo_location_1)
    db.session.add(demo_location_2)
    db.session.add(demo_location_3)
    db.session.add(demo_location_4)
    db.session.add(demo_location_5)
    db.session.add(demo_location_6)
    db.session.add(demo_location_7)
    db.session.add(demo_location_8)
    db.session.add(demo_location_9)
    db.session.add(demo_location_10)
    db.session.add(demo_location_11)
    db.session.add(demo_location_12)
    db.session.add(demo_location_13)
    db.session.add(demo_location_14)
    db.session.add(demo_location_15)



    db.session.commit()


def undo_locations():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.locations RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM locations"))

    db.session.commit()
