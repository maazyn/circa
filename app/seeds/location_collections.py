from app.models import db, location_collection, environment, SCHEMA
from sqlalchemy.sql import text

def seed_location_collections():
    insert_data = [

        {'location_id': 2, 'collection_id': 1},
        {'location_id': 3, 'collection_id': 1},
        {'location_id': 5, 'collection_id': 1},
        {'location_id': 6, 'collection_id': 1},
        {'location_id': 7, 'collection_id': 2},
        {'location_id': 8, 'collection_id': 2},
        {'location_id': 9, 'collection_id': 2},
        {'location_id': 10, 'collection_id': 2},
        {'location_id': 11, 'collection_id': 3},
        {'location_id': 12, 'collection_id': 3},
        {'location_id': 13, 'collection_id': 3},
        {'location_id': 14, 'collection_id': 3},
        {'location_id': 15, 'collection_id': 3},
        {'location_id': 16, 'collection_id': 2},
        {'location_id': 17, 'collection_id': 2},
        {'location_id': 18, 'collection_id': 2},
        {'location_id': 19, 'collection_id': 2},
        {'location_id': 20, 'collection_id': 2},
        {'location_id': 21, 'collection_id': 2},
        {'location_id': 22, 'collection_id': 2},

        {'location_id': 23, 'collection_id': 1},
        {'location_id': 24, 'collection_id': 1},
        {'location_id': 25, 'collection_id': 1},
    ]

    db.session.execute(location_collection.insert().values(insert_data))

    db.session.commit()

def undo_location_collections():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.location_collections RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM location_collections"))

    db.session.commit()
