from app.models import db, Collection, Location, location_collection, environment, SCHEMA
from sqlalchemy.sql import text

def seed_location_collections():

    loc_coll_1 = location_collection(
        location_id=1,
        collection_id=1,
    )

    loc_coll_2 = location_collection(
        location_id=2,
        collection_id=1,
    )

    loc_coll_3 = location_collection(
        location_id=3,
        collection_id=1,
    )

    db.session.add(loc_coll_1)
    db.session.add(loc_coll_2)
    db.session.add(loc_coll_3)



    db.session.commit()


def undo_location_collections():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.location_collections RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM collection_locations"))

    db.session.commit()
