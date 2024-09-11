from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Optional, Length

class LocationForm(FlaskForm):
    user_id = IntegerField('User ID', validators=[DataRequired()])
    title = StringField('Title', validators=[DataRequired(), Length(max=100)])
    # googleId = StringField('Latitude', validators=[DataRequired())
    lat = FloatField('Latitude', validators=[Optional()])
    lng = FloatField('Longitude', validators=[Optional()])
    type = StringField('Type', validators=[DataRequired(), Length(max=50)])
    continent = StringField('Continent', validators=[Optional()])
    country = StringField('Country', validators=[DataRequired()])
    region = StringField('Region', validators=[Optional()])
    city = StringField('City', validators=[Optional()])
    visited = BooleanField('Visited', validators=[Optional()])
