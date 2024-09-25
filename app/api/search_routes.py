from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Location, Collection, User

search_routes = Blueprint('search', __name__)

# Search all
@search_routes.route('', methods=['GET'])
@login_required
def search_all():
    """
    Search locations and collections
    """
    query = request.args.get('query')
    print(f'query')
    if not query:
        return jsonify({"error": "No search query provided"}), 400

    # Location search
    location_results = Location.query.filter(Location.title.ilike(f'%{query}%')).all()

    # Collection search
    collection_results = Collection.query.filter(Collection.title.ilike(f'%{query}%')).all()

    # Users search
    user_results = User.query.filter(User.username.ilike(f'%{query}%')).filter(User.id != current_user.id).all()

    response_data = {
        'locations': [location.to_dict() for location in location_results],
        'collections': [collection.to_dict() for collection in collection_results],
        'users': [user.to_dict() for user in user_results]
    }

    return jsonify(response_data), 200


# Get details for a user's saved location
# @search_routes.route('/<int:location_id>')
# @login_required
# def search_location():
#     """
#     Get details for a current user's saved location
#     """
#     query = request.args.get('query')
#     if not query:
#         return jsonify({"error": "No search query provided"}), 400

#     location_results = Location.query.filter(Location.title.ilike(f'%{query}%')).all()
#     theLocation = Location.query.filter_by(user_id=current_user.id,  id=location_id).first()

#     if not theLocation:
#         return {'errors': {'message': 'This location does not exist'}}, 404
#     return theLocation.to_dict(), 200
