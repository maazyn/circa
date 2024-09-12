from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Location, associations
from app.forms import LocationForm

location_routes = Blueprint('locations', __name__)

# Get all locations saved by current user
@location_routes.route('/')
@login_required
def user_locations():
    """
    Get all current user's saved locations
    """
    locations = Location.query.filter_by(user_id=current_user.id).all()
    if not locations:
        return {'errors': {'message': 'No existing locations'}}, 404
    return {'locations': [location.to_dict() for location in locations]}, 200



# Get details for a user's saved location
@location_routes.route('/<int:location_id>')
@login_required
def user_location(location_id):
    """
    Get details for a current user's saved location
    """
    theLocation = Location.query.filter_by(user_id=current_user.id,  id=location_id).first()
    if not theLocation:
        return {'errors': {'message': 'No existing locations'}}, 404
    return theLocation.to_dict(), 200



# Create a new location
@location_routes.route('/', methods=['POST'])
@login_required
def create_location():
    """
    Creates/Adds a new location
    """
    form = LocationForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        location = Location(
            user_id=current_user.id,
            title=form.data['title'],
            # googleId: form.data['googleId'],
            lat=form.data['lat'],
            lng=form.data['lng'],
            type=form.data['type'],
            continent=form.data['continent'],
            country=form.data['country'],
            region=form.data['region'],
            city=form.data['city'],
            visited=form.data['visited']
        )
        db.session.add(location)
        db.session.commit()
        return location.to_dict(), 201
    return form.errors, 400



# Update location
@location_routes.route('/<int:location_id>', methods=['PUT'])
@login_required
def update_location(location_id):
    """
    Updates a user's saved location
    """
    theLocation = Location.query.get(location_id)
    if not theLocation:
        return {'errors': {'message': 'Location not found'}}, 404
    if theLocation.user_id != current_user.id:
        return {'errors': {'message': 'Unauthorized'}}, 401

    form = LocationForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        theLocation.title = form.data['title']
        # theLocation.googleId: form.data['googleId'],
        theLocation.lat = form.data['lat']
        theLocation.lng = form.data['lng']
        theLocation.type = form.data['type']
        theLocation.continent = form.data['continent']
        theLocation.country = form.data['country']
        theLocation.region = form.data['region']
        theLocation.city = form.data['city']
        theLocation.visited = form.data['visited']

        db.session.add(theLocation)
        db.session.commit()
        return theLocation.to_dict()
    return form.errors, 401





# Delete location
@location_routes.route('/<int:location_id>', methods=['DELETE'])
@login_required
def delete_location(location_id):
    """
    Deletes a location by id
    """
    theLocation = Location.query.filter_by(id=location_id, user_id=current_user.id).first()
    if not theLocation:
        return {'errors': {'message': 'Location not found'}}, 404

    # deletes loc from all user collections too
    db.session.execute(
        location_collection.delete().where(location_collection.c.location_id == location_id)
    )
    db.session.delete(theLocation)
    db.session.commit()
    return {'message': "Location successfully deleted"}, 200
