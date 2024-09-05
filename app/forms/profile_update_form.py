from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length, Optional, URL

class ProfileUpdateForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired(), Length(max=40)])
    last_name = StringField('Last Name', validators=[DataRequired(), Length(max=40)])
    city = StringField('City', validators=[DataRequired(), Length(max=50)])
    region = StringField('Region', validators=[Optional(), Length(max=50)])
    country = StringField('Country', validators=[Optional(), Length(max=50)])
    profile_img_url = StringField('Profile Image URL', validators=[Optional(), Length(max=255), URL()])
