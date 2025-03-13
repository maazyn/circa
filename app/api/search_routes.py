from flask import Blueprint, request, jsonify
import requests
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


# Nominatim Api search address
@search_routes.route('/address', methods=['GET'])
@login_required
def search_address():
    query = request.args.get('query')
    if not query:
        return jsonify({"error": "No search query provided"}), 400
    headers = {
        "User-Agent": "Circa/1.0 (sherifmaazin@gmail.com)",
        "Accept-Language": "en"
    }
    response = requests.get(f"https://nominatim.openstreetmap.org/search?q={query}&format=json&addressdetails=1&limit=10&accept-language=en", headers=headers)
    return jsonify(response.json())


# Nominatim Api address coordinates
@search_routes.route('/coordinates', methods=['GET'])
# @login_required
def search_coordinates():
    query = request.args.get('query')
    # if not query:
    #     return jsonify({"error": "No search query provided"}), 400
    # query = ", ".join(filter(None, query.split(",")))

    print(f"Received search query: {query}")
    headers = {
        "User-Agent": "Circa/1.0 (sherifmaazin@gmail.com)",
    }
    response = requests.get(f"https://nominatim.openstreetmap.org/search?q={query}&format=json&limit=1", headers=headers)
    response.raise_for_status()
    return jsonify(response.json())

    # try:
    # except requests.RequestException as e:
    #     print(f"Error fetching coordinates: {e}")
    #     return jsonify({"error": str(e)}), 500
