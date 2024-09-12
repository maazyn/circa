from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FieldList
from wtforms.validators import DataRequired, Optional, Length, ValidationError
from app.models import Collection

def title_exists_for_user(form, field):
    user_id = form.user_id.data
    title = field.data

    collection = Collection.query.filter_by(user_id=user_id, title=title).first()
    if collection:
        raise ValidationError('You already have a collection with this title.')


class CollectionForm(FlaskForm):
    user_id = IntegerField('User ID', validators=[DataRequired()])
    title = StringField('Title', validators=[DataRequired(), Length(max=100), title_exists_for_user])
    description = StringField('Description', validators=[Optional()])
    location_ids = FieldList(IntegerField('Location IDs'), validators=[Optional()])
