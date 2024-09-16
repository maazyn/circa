from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Collection, Location
from app.forms import CollectionForm
from app.forms import CollectionUpdateForm

collection_routes = Blueprint('collections', __name__)



# Get all collections owned by current user
@collection_routes.route('/')
@login_required
def user_collections():
    """
    Get all current user's collections
    """
    collections = Collection.query.filter_by(user_id=current_user.id).all()
    if not collections:
        return {'errors': {'message': 'No existing collections'}}, 404
    return {'collections': [collection.to_dict() for collection in collections]}, 200


# Get details for a collection from an id
@collection_routes.route('/<int:collection_id>')
@login_required
def user_collection(collection_id):
    """
    Get a collection's details
    """
    theCollection = Collection.query.filter_by(user_id=current_user.id, id=collection_id).first()

    if not theCollection:
        return {'errors': {'message': 'The collection does not exist'}}, 404
    return theCollection.to_dict(), 200


# Create a collection
@collection_routes.route('/',  methods=['POST'])
@login_required
def create_collection():
    """
    Create a collection
    """
    form = CollectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        newCollection = Collection(
            user_id=current_user.id,
            title=form.data['title'],
            description=form.data['description'],
        )
        db.session.add(newCollection)
        # db.session.commit()

        # location_ids = request.json.get('location_ids', [])
        # if location_ids:
        #     for location_id in location_ids:
        #         location = Location.query.get(location_id)
        #         if location:
        #             newCollection.locations.append(location)

        db.session.commit()
        return newCollection.to_dict(), 201
    return form.errors, 400


# Edit a collection
@collection_routes.route('/<int:collection_id>',  methods=['PUT'])
@login_required
def edit_collection(collection_id):
    """
    Edit a collection
    """
    updatedCollection = Collection.query.get(collection_id)

    if not updatedCollection:
        return {'errors': {'message': 'Collection not found'}}, 404
    if updatedCollection.user_id != current_user.id:
        return {'errors': {'message': 'Unauthorized'}}, 401

    form = CollectionUpdateForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        updatedCollection.title = form.title.data
        updatedCollection.description = form.description.data

        # # Grab loc ids from the form
        # location_ids = form.location_ids.data
        # if location_ids:
        #     locations = Location.query.filter(Location.id.in_(location_ids)).all()
        #     updatedCollection.locations = locations
        # else:
        #     # clears if none provded
        #     updatedCollection.locations  = []

        # db.session.add(updatedCollection)
        db.session.commit()
        return {'collection': updatedCollection.to_dict()}, 200
    return form.errors, 400


# Delete a collection
@collection_routes.route('/<int:collection_id>', methods=['DELETE'])
@login_required
def delete_collection(collection_id):
    """
    Deletes a collection by id
    """
    theCollection = Collection.query.filter_by(id=collection_id, user_id=current_user.id).first()
    if not theCollection:
        return {'errors': {'message': 'Collection not found'}}, 404

    db.session.delete(theCollection)
    db.session.commit()
    return {'message': "Collection successfully deleted"}, 200


# Add a location to a collection



# Remove a location from a collection
