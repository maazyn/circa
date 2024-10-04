from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    region = db.Column(db.String(50))
    country = db.Column(db.String(50))
    lat = db.Column(db.Float)
    lng = db.Column(db.Float)
    profile_img = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    # Relationships one-to-many
    locations = db.relationship('Location', back_populates='user', cascade="all, delete-orphan")
    collections = db.relationship('Collection', back_populates='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email,
            'city': self.city,
            'region': self.region,
            'country': self.country,
            'lat': self.lat,
            'lng': self.lng,
            'profile_img': self.profile_img,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'collections': [collection.to_dict() for collection in self.collections],
        }
