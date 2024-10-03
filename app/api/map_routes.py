# from flask import Blueprint, jsonify, request, Response
# from flask_login import login_required, current_user
# import os

# map_routes = Blueprint('map', __name__)

# google_api_key = os.getenv('GOOGLE_API_KEY')

# @map_routes.route('/google-key', methods=['GET'])
# # @login_required
# def get_google_key():
#     """
#     fetch map
#     """

#     # if not current_user.is_authenticated:
#     #     return {'errors': {'message': 'User not authenticated'}}, 401

#     try:
#         return jsonify({'key': google_api_key}), 200

#     except Exception as e:
#         return jsonify({'errors': {'message': f"Failed to fetch API key: {str(e)}"}}), 500
