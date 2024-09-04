from app.models import db, Location, environment, SCHEMA
from sqlalchemy.sql import text

def seed_locations():
    demo_location_1 = Location(
        user_id=1,
        title="Hong Kong",
        # googleId="googleId",
        lat=50.4444,
        lng=-50.4444,
        type="city",
        continent="Asia",
        country="China",
        # region="",
        city="Hong Kong",
        visited=False
    )

    demo_location_2 = Location(
        user_id=1,
        title="Miami FL",
        # googleId="googleId",
        lat=50.4444,
        lng=-50.4444,
        type="city",
        continent="North America",
        country="US",
        region="FL",
        city="Miami",
        visited=True
    )

    demo_location_3 = Location(
        user_id=2,
        title="Zion National Park",
        # googleId="googleId",
        lat=50.4444,
        lng=-50.4444,
        type="national park",
        continent="North America",
        country="US",
        region="Utah",
        visited=False
        # city="",
    )



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
