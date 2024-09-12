from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField, FieldList, IntegerField
from wtforms.validators import DataRequired, Optional, Length, ValidationError
from app.models import Collection

def title_exists_for_user(form, field):
    title = field.data
    collection_id = form.collection_id.data

    collection = Collection.query.filter(Collection.title == title, Collection.user_id == current_user.id, Collection.id != collection_id).first()
    if collection:
        raise ValidationError('You already have a collection with this title.')

class CollectionUpdateForm(FlaskForm):
    collection_id = IntegerField('Collection ID', validators=[DataRequired()])
    title = StringField('Title', validators=[DataRequired(), Length(max=100), title_exists_for_user])
    description = StringField('Description', validators=[Optional()])
    location_ids = FieldList(IntegerField('Location ID'), validators=[Optional()])
