from app.models import db, Location, environment, SCHEMA
from sqlalchemy.sql import text

def seed_locations():
    demo_location_1 = Location(
        user_id=1,
        title="Hong Kong",
        # googleId="googleId",
        lat=50.4444,
        lng=-50.4444,
        # type="",
        continent="Asia",
        country="China",
        # region="",
        # city="",
        visitedAt="2024-01-20")

    demo_location_2 = Location(
        user_id=1,
        title="Bermuda",
        # googleId="googleId",
        lat=50.4444,
        lng=-50.4444,
        # type="",
        continent="North America",
        country="Bermuda",
        # region="",
        # city="",
        visitedAt="2024-03-20")

    demo_location_3 = Location(
        user_id=2,
        title="Zion National Park",
        # googleId="googleId",
        lat=50.4444,
        lng=-50.4444,
        type="national park",
        continent="North America",
        country="US",
        region="Utah")
        # city="",
        # visitedAt="2024-05-20")


    db.session.add(demo_location_1)
    db.session.add(demo_location_2)
    db.session.add(demo_location_3)

    db.session.commit()


def undo_locations():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.locations RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM locations"))

    db.session.commit()
