from flask import Blueprint, request
from app.models import User, db
from app.forms import LoginForm, SignUpForm, ProfileUpdateForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': {'message': 'Unauthorized'}}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return form.errors, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return form.errors, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': {'message': 'Unauthorized'}}, 401



@auth_routes.route('/update-user', methods=['PUT'])
@login_required
def update_profile():
    """
    Updates the current user's profile.
    """
    form = ProfileUpdateForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user = current_user

        user.first_name = form.data.get('first_name', user.first_name)
        user.last_name = form.data.get('last_name', user.last_name)
        user.city = form.data.get('city', user.city)
        user.region = form.data.get('region', user.region)
        user.country = form.data.get('country', user.country)

        db.session.commit()
        return user.to_dict()
    return {'errors': form.errors}, 400


@auth_routes.route('/delete-user', methods=['DELETE'])
@login_required
def delete_user():
    """
    Deletes the user if user owns account and is authenticated.
    """
    user = current_user
    # user = User.query.get(user_id)
    if not user:
        return {'errors': {'message': 'User not found'}}, 404
    # if user is None:
    #     return {'errors': {'message': 'User not found'}}, 404

    # if user.id != current_user.id:
    #     return {'errors': {'message': 'Unauthorized to delete this user'}}, 403

    db.session.delete(user)
    db.session.commit()

    logout_user()

    return {'message': 'User deleted successfully'}
