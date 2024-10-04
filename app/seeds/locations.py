from app.models import db, Location, environment, SCHEMA
from sqlalchemy.sql import text

def seed_locations():
    demo_location_1 = Location(
        user_id=2,
        title="Boston",
        # googleId="googleId",
        lat=42.3554,
        lng=-71.0605,
        type="city",
        continent="North America",
        country="US",
        region="MA",
        city="Boston",
        visited=True
    )

    demo_location_2 = Location(
        user_id=1,
        title="Nepal",
        # googleId="googleId",
        lat=28.3949,
        lng=84.1240,
        type="country",
        continent="Asia",
        country="Nepal",
        # region="",
        # city="Shanghai",
        visited=False
    )

    demo_location_3 = Location(
        user_id=1,
        title="Turkiye",
        # googleId="googleId",
        lat=38.9637,
        lng=35.2433,
        type="country",
        continent="Asia",
        country="Turkiye",
        # region="",
        # city="Istanbul",
        visited=True
    )

    demo_location_4 = Location(
        user_id=1,
        title="Miami",
        # googleId="googleId",
        lat=25.7742,
        lng=-80.1936,
        type="city",
        continent="North America",
        country="US",
        region="FL",
        city="Miami",
        visited=True
    )

    demo_location_5 = Location(
        user_id=1,
        title="Singapore",
        # googleId="googleId",
        lat=1.3521,
        lng=103.8198,
        type="country",
        continent="Asia",
        country="Singapore",
        # region="FL",
        # city="Miami",
        visited=False
    )

    demo_location_6 = Location(
        user_id=1,
        title="Vietnam",
        # googleId="googleId",
        lat=14.0583,
        lng=108.2772,
        type="country",
        continent="Asia",
        country="Vietnam",
        # region="FL",
        # city="Miami",
        visited=False
    )

    demo_location_7 = Location(
        user_id=1,
        title="Grand Canyon National Park",
        # googleId="googleId",
        lat=36.3079,
        lng=-112.2929,
        type="nature",
        continent="North America",
        country="US",
        region="AZ",
        visited=False
        # city="",
    )

    demo_location_8 = Location(
        user_id=1,
        title="Zion National Park",
        # googleId="googleId",
        lat=37.3247,
        lng=-113.0048,
        type="nature",
        continent="North America",
        country="US",
        region="UT",
        visited=True
        # city="",
    )

    demo_location_9 = Location(
        user_id=1,
        title="Canyonlands National Park",
        # googleId="googleId",
        lat=38.2333,
        lng=-109.9207,
        type="nature",
        continent="North America",
        country="US",
        region="UT",
        visited=True
        # city="",
    )

    demo_location_10 = Location(
        user_id=1,
        title="Olympic National Park",
        # googleId="googleId",
        lat=47.7865,
        lng=-123.5361,
        type="nature",
        continent="North America",
        country="US",
        region="WA",
        visited=True
        # city="",
    )

    demo_location_11 = Location(
        user_id=1,
        title="Boston",
        # googleId="googleId",
        lat=42.3554,
        lng=-71.0605,
        type="city",
        continent="North America",
        country="US",
        region="MA",
        city="Boston",
        visited=True
    )

    demo_location_12 = Location(
        user_id=1,
        title="Worcester",
        # googleId="googleId",
        lat=42.2626,
        lng=-71.8019,
        type="city",
        continent="North America",
        country="US",
        region="MA",
        city="Worcester",
        visited=True
    )

    demo_location_13 = Location(
        user_id=1,
        title="Providence",
        # googleId="googleId",
        lat=41.8240,
        lng=-71.4128,
        type="city",
        continent="North America",
        country="US",
        region="RI",
        city="Providence",
        visited=True
    )

    demo_location_14 = Location(
        user_id=1,
        title="Hartford",
        # googleId="googleId",
        lat=41.7646,
        lng=-72.6909,
        type="city",
        continent="North America",
        country="US",
        region="CT",
        city="Hartford",
        visited=True
    )

    demo_location_15 = Location(
        user_id=1,
        title="New York",
        # googleId="googleId",
        lat=40.7815,
        lng=-73.9591,
        type="city",
        continent="North America",
        country="US",
        region="NY",
        city="New York",
        visited=True
    )

    demo_location_16 = Location(
        user_id=1,
        title="Yellowstone National Park",
        # googleId="googleId",
        lat=44.6201,
        lng=-110.5607,
        type="nature",
        continent="North America",
        country="US",
        region="WY",
        visited=False
        # city="",
    )

    demo_location_17 = Location(
        user_id=1,
        title="Acadia National Park",
        # googleId="googleId",
        lat=44.3563,
        lng=-68.2155,
        type="nature",
        continent="North America",
        country="US",
        region="ME",
        visited=False
        # city="",
    )

    demo_location_18 = Location(
        user_id=1,
        title="Haleakalā National Park",
        # googleId="googleId",
        lat=20.6991,
        lng=-156.1324,
        type="nature",
        continent="North America",
        country="US",
        region="HI",
        visited=False
        # city="",
    )

    demo_location_19 = Location(
        user_id=1,
        title="Big Bend National Park",
        # googleId="googleId",
        lat=29.2502,
        lng=-103.2505,
        type="nature",
        continent="North America",
        country="US",
        region="TX",
        visited=False
        # city="",
    )

    demo_location_20 = Location(
        user_id=1,
        title="Badlands National Park",
        # googleId="googleId",
        lat=43.8554,
        lng=-102.3397,
        type="nature",
        continent="North America",
        country="US",
        region="SD",
        visited=False
        # city="",
    )

    demo_location_21 = Location(
        user_id=1,
        title="Yosemite National Park",
        # googleId="googleId",
        lat=37.8651,
        lng=-119.5383,
        type="nature",
        continent="North America",
        country="US",
        region="CA",
        visited=False
        # city="",
    )

    demo_location_22 = Location(
        user_id=1,
        title="Rocky Mountains National Park",
        # googleId="googleId",
        lat=40.3428,
        lng=-105.6836,
        type="nature",
        continent="North America",
        country="US",
        region="CO",
        visited=False
        # city="",
    )

    demo_location_23 = Location(
        user_id=1,
        title="Malaysia",
        # googleId="googleId",
        lat=4.2105,
        lng=101.9758,
        type="country",
        continent="Asia",
        country="Malaysia",
        # region="CO",
        visited=False
        # city="",
    )

    demo_location_24 = Location(
        user_id=1,
        title="Kazakhstan",
        # googleId="googleId",
        lat=48.0196,
        lng=66.9237,
        type="country",
        continent="Asia",
        country="Kazakhstan",
        # region="CO",
        visited=False
        # city="",
    )

    demo_location_25 = Location(
        user_id=1,
        title="Kyrgyzstan",
        # googleId="googleId",
        lat=42.8746,
        lng=74.5698,
        type="country",
        continent="Asia",
        country="Kyrgyzstan",
        # region="CO",
        visited=False
        # city="",
    )

    db.session.add(demo_location_1)
    db.session.add(demo_location_2)
    db.session.add(demo_location_3)
    db.session.add(demo_location_4)
    db.session.add(demo_location_5)
    db.session.add(demo_location_6)
    db.session.add(demo_location_7)
    db.session.add(demo_location_8)
    db.session.add(demo_location_9)
    db.session.add(demo_location_10)
    db.session.add(demo_location_11)
    db.session.add(demo_location_12)
    db.session.add(demo_location_13)
    db.session.add(demo_location_14)
    db.session.add(demo_location_15)
    db.session.add(demo_location_16)
    db.session.add(demo_location_17)
    db.session.add(demo_location_18)
    db.session.add(demo_location_19)
    db.session.add(demo_location_20)
    db.session.add(demo_location_21)
    db.session.add(demo_location_22)
    db.session.add(demo_location_23)
    db.session.add(demo_location_24)
    db.session.add(demo_location_25)

    db.session.commit()


def undo_locations():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.locations RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM locations"))

    db.session.commit()
