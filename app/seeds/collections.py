from app.models import db, Collection, Location, environment, SCHEMA
from sqlalchemy.sql import text

def seed_collections():
    # user1_locations = Location.query.filter_by(user_id=1).all()
    # user2_locations = Location.query.filter_by(user_id=2).all()

    # user1_location_map = {loc.title: loc for loc in user1_locations}
    # user2_location_map = {loc.title: loc for loc in user2_locations}

    demo_collection_1 = Collection(
        user_id=1,
        title="Travel list - Asia",
        description="Countries to visit",
        # locations=[
        #     user1_location_map.get("Shanghai"),
        #     user1_location_map.get("Astana"),
        #     user1_location_map.get("Ho Chi Minh city")
        # ]
    )

    demo_collection_2 = Collection(
        user_id=1,
        title="US National Parks",
        description="4 down, 60 more to go!",
        # locations=[
        #     user1_location_map.get("Zion National Park"),
        #     user1_location_map.get("Canyonlands National Park"),
        #     user1_location_map.get("Olympic National Park")
        # ]
    )

    demo_collection_3 = Collection(
        user_id=1,
        title="New England",
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum suscipit, velit eu auctor euismod, felis nibh condimentum elit, non varius augue diam vitae massa. Aliquam nunc dolor, sodales eu neque et, accumsan mollis mauris. Etiam eu tempus risus, eget dignissim odio. Nulla facilisi. Nulla porttitor eu est vel tempor. ",
        # locations=[
        #     user2_location_map.get("Boston"),
        #     user2_location_map.get("Worcester"),
        #     user2_location_map.get("Providence"),
        #     user2_location_map.get("Hartford"),
        #     user2_location_map.get("New York")
        # ]
    )



    db.session.add(demo_collection_1)
    db.session.add(demo_collection_2)
    db.session.add(demo_collection_3)
    # db.session.add(demo_collection_4)

    db.session.commit()


def undo_collections():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.collections RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM collections"))

    db.session.commit()
