import click
from flask.cli import AppGroup

# Import the seed functions
from .seed_users import seed_users
from .seed_locations import seed_locations
from .seed_collections import seed_collections

# Create a seed group to hold our commands
seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed_all():
    seed_users()
    seed_locations()
    seed_collections()
    click.echo('Seeded all data!')

@seed_commands.command('users')
def seed_users_command():
    seed_users()
    click.echo('Seeded users!')

@seed_commands.command('locations')
def seed_locations_command():
    seed_locations()
    click.echo('Seeded locations!')

@seed_commands.command('collections')
def seed_collections_command():
    seed_collections()
    click.echo('Seeded collections!')
