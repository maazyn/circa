from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, location_collection
# from app.forms import CollectionForm
# from app.forms import CollectionUpdateForm

locol_routes = Blueprint('location-collections', __name__)



# # Add locations to a collection
# @locol_routes.route('/',  methods=['POST'])
# @login_required
# def create_locol():
#     """
#     Add multiple locations to a collection
#     """
#     data = request.get_json()

#     collection_id = data.get('collection_id')
#     location_ids = data.get('location_ids')

#     if not collection_id or not isinstance(location_ids, list):
#         return jsonify({'error': 'Missing collection id or location ids'}), 400

#     try:
#         # Create a list of insert operations
#         insert_values = [
#             {'location_id': location_id, 'collection_id': collection_id}
#             for location_id in location_ids
#         ]

#         # Inserting multiple rows in one go
#         db.session.execute(location_collection.insert().values(insert_values))
#         db.session.commit()

#         return jsonify({'message': 'Locations added to collection successfully'}), 201

#     except Exception as e:
#         db.session.rollback()
#         return jsonify({'error': str(e)}), 500



# # Delete a location from a collection
# @locol_routes.route('/',  methods=['DELETE'])
# @login_required
# def remove_locol():
#     """
#     Delete a location from a collection
#     """
#     data = request.get_json()

#     collection_id = data.get('collection_id')
#     location_id = data.get('location_id')

#     if not collection_id or not location_id:
#         return jsonify({'error' : 'Missing collection id or location id'}), 400

#     try:
#         deletedLocol = location_collection.delete().where(
#             location_collection.c.collection_id == collection_id,
#             location_collection.c.location_id == location_id
#         )

#         db.session.execute(deletedLocol)
#         db.session.commit()

#         return jsonify({'message': 'Location removed from collection successfully'}), 200

#     except Exception as e:
#         db.session.rollback
#         return jsonify({'error': str(e)}), 500


# Update locations in a collection (add and remove)
@locol_routes.route('/', methods=['PUT'])
@login_required
def update_locol():
    """
    Add or remove locations in a collection
    """
    data = request.get_json()

    collection_id = data.get('collection_id')
    locations = data.get('locations', [])  # Reset locations instead of managing add and delete separately
    # locations_to_add = data.get('add', [])
    # locations_to_remove = data.get('remove', [])

    if not collection_id:
        return jsonify({'error': 'Missing collection id'}), 400

    # if not (locations_to_add or locations_to_remove):
    #     return jsonify({'error': 'At least one location must be added or removed'}), 400

    try:
        # Start a transaction
        with db.session.begin(subtransactions=True):
            db.session.execute(location_collection.delete().where(
                location_collection.c.collection_id == collection_id
            ))
            # Remove locations
            # if locations_to_remove:
            #     db.session.execute(location_collection.delete().where(
            #         location_collection.c.collection_id == collection_id,
            #         location_collection.c.location_id.in_(locations_to_remove)
            #     ))

            # Add locations
            if locations :
                newLocols = [
                    {'location_id': loc_id, 'collection_id': collection_id}
                    for loc_id in locations
                ]
                db.session.execute(location_collection.insert(), newLocols)

        db.session.commit()
        # print("Locations updated successfully in the DB")

        # return newLocols.to_dict(), 201
        return jsonify({'message': 'Locations updated in collection successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
