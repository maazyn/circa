from .db import db, environment, SCHEMA, add_prefix_for_prod

location_collection = db.Table(
    'location_collections',
    # db.Column('id', db.Integer, primary_key=True),
    db.Column('location_id', db.Integer, db.ForeignKey(add_prefix_for_prod('locations.id')), nullable=False),
    db.Column('collection_id', db.Integer, db.ForeignKey(add_prefix_for_prod('collections.id')), nullable=False),
    db.Column('created_at', db.DateTime, nullable=False, default=db.func.current_timestamp()),
    db.Column('updated_at', db.DateTime, nullable=False, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
)

if environment == "production":
        location_collection.schema = SCHEMA
