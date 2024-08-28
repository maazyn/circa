from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Optional, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'Username', validators=[DataRequired(), username_exists])
    email = StringField('Email', validators=[DataRequired(), user_exists])
    password = StringField('Password', validators=[DataRequired()])
    first_name = StringField('First Name', validators=[DataRequired(), Length(max=40)])
    last_name = StringField('Last Name', validators=[DataRequired(), Length(max=40)])
    city = StringField('City', validators=[Optional(), Length(max=50)])
    region = StringField('Region', validators=[Optional(), Length(max=50)])
    country = StringField('Country', validators=[Optional(), Length(max=50)])
