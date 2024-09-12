from app.models import db, location_collection, environment, SCHEMA
from sqlalchemy.sql import text

def seed_location_collections():
    insert_data = [
        {'location_id': 1, 'collection_id': 1},
        {'location_id': 2, 'collection_id': 1},
        {'location_id': 3, 'collection_id': 1},
    ]

    db.session.execute(location_collection.insert().values(insert_data))

    db.session.commit()

def undo_location_collections():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.location_collections RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM location_collections"))

    db.session.commit()
