from flask import Blueprint, jsonify, request, Response
from flask_login import login_required, current_user
import requests
import os

weather_routes = Blueprint('weather', __name__)

TOMORROW_API_KEY = os.getenv('TOMORROW_API_KEY')

@weather_routes.route('/forecast', methods=['GET'])
@login_required
def fetch_weather():
    """
    Get weather forecast data for the current user's city
    """
    city = current_user.city
    if not city:
        return {'errors': {'message': 'City not set'}}, 400

    url = f'https://api.tomorrow.io/v4/weather/forecast?location={city}&apikey={TOMORROW_API_KEY}'

    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        return jsonify(data), 200
    except requests.exceptions.HTTPError as http_err:
        return {'errors': {'HTTP error': f"HTTP error occurred: {http_err}"}}, 500
    except requests.exceptions.RequestException as req_err:
        return jsonify({'errors': {'Req error': f"Request error occurred: {req_err}"}}), 500
    except:
        return jsonify({'errors': {'message': "Failed to fetch"}}), 500


@weather_routes.route('/sky-conditions', methods=['GET'])
# @login_required
def fetch_sky_conditions():
    """
    Get sky conditions
    """
    city = current_user.city
    country = current_user.country

    if not city :
        return {'errors': {'message': 'City not set'}}, 400

    url = f'http://www.7timer.info/bin/astro.php?lon=113.17&lat=23.09&ac=0&lang=en&unit=metric&output=internal&tzshift=0'

    try:
        response = requests.get(url)
        response.raise_for_status()
        # data = response.json()
        return Response(response.content, mimetype='text/plain')
    except requests.exceptions.HTTPError as http_err:
        return {'errors': {'HTTP error': f"HTTP error occurred: {http_err}"}}, 500
    except requests.exceptions.RequestException as req_err:
        return jsonify({'errors': {'Req error': f"Request error occurred: {req_err}"}}), 500
    except:
        return jsonify({'errors': {'message': "Failed to fetch"}}), 500
