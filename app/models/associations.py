from .db import db, environment, SCHEMA, add_prefix_for_prod

location_collection = db.Table(
    'location_collections',
    # db.Column('id', db.Integer, primary_key=True),
    db.Column('location_id', db.Integer, db.ForeignKey(add_prefix_for_prod('locations.id')), nullable=False),
    db.Column('collection_id', db.Integer, db.ForeignKey(add_prefix_for_prod('collections.id')), nullable=False),
    db.Column('created_at', db.DateTime, nullable=False, default=db.func.current_timestamp()),
    db.Column('updated_at', db.DateTime, nullable=False, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp()),

    # indexing for efficiency
    db.Index('idx_location_collections_location_id', 'location_id'),
    db.Index('idx_location_collections_collection_id', 'collection_id'),
    db.UniqueConstraint('location_id', 'collection_id', name='uidx_location_collections')

)

if environment == "production":
    location_collection.schema = SCHEMA
