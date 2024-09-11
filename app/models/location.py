from .db import db, environment, SCHEMA, add_prefix_for_prod

class Location(db.Model):
    __tablename__ = 'locations'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    # googleId = db.Column(db.String(50), nullable=False)
    lat = db.Column(db.Float)
    lng = db.Column(db.Float)
    type = db.Column(db.String(50), nullable=False)
    continent = db.Column(db.String(50))
    country = db.Column(db.String(50), nullable=False)
    region = db.Column(db.String(50))
    city = db.Column(db.String(50))
    visited = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    # many to one relationship to User
    user = db.relationship('User', back_populates='locations')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            # 'googleId': self.googleId,
            'lat': self.lat,
            'lng': self.lng,
            'type': self.type,
            'continent': self.continent,
            'country': self.country,
            'region': self.region,
            'city': self.city,
            'visited': self.visited,
            'created_at': self.created_at,
            'updated_at': self.updated_at
            # 'locations': [location.to_dict() for location in self.locations],
        }
