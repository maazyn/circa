from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Optional, Length, ValidationError
from app.models import Location

def title_exists_for_user(form, field):
    title = field.data
    user_id = form.user_id.data
    location = Location.query.filter_by(user_id=user_id, title=title).first()
    if location:
        raise ValidationError('You already have a location with this title.')


class LocationForm(FlaskForm):
    user_id = IntegerField('User ID', validators=[DataRequired()])
    title = StringField('Title', validators=[DataRequired(), Length(max=100), title_exists_for_user])
    # googleId = StringField('Latitude', validators=[DataRequired())
    lat = FloatField('Latitude', validators=[Optional()])
    lng = FloatField('Longitude', validators=[Optional()])
    type = StringField('Type', validators=[DataRequired(), Length(max=50)])
    continent = StringField('Continent', validators=[Optional()])
    country = StringField('Country', validators=[DataRequired()])
    region = StringField('Region', validators=[Optional()])
    city = StringField('City', validators=[Optional()])
    visited = BooleanField('Visited', validators=[Optional()])
