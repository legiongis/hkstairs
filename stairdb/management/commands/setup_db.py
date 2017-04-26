from django.core import management
from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import User
from django.conf import settings
import psycopg2 as db
import os


class Command(BaseCommand):
    help = 'drops and recreates the app database.'

    def add_arguments(self, parser):
        # parser.add_argument(
            # '-f',
            # '--flush',
            # action='store_true',
            # dest='flush',
            # default=False,
            # help='delete all existing stairs before loading process',
        # )
        pass

    def handle(self, *args, **options):

        # if options['flush']:
            # self.remove_stairs()
            
        self.setup_db()

        
    def setup_db(self):
        print("Wiping database")
        dbinfo = settings.DATABASES['default']

        # Postgres version
        conn = db.connect(host=dbinfo['HOST'], user=dbinfo['USER'],
                        password=dbinfo['PASSWORD'], port=int(dbinfo['PORT']))
        conn.autocommit = True
        cursor = conn.cursor()
        try:
            cursor.execute("DROP DATABASE " + dbinfo['NAME'])
        except:
            pass
        cursor.execute("CREATE DATABASE " + dbinfo['NAME'] + " WITH ENCODING 'UTF8'")
        
        management.call_command('makemigrations')
        management.call_command('migrate')

        print("making admin...")
        
        default_user = User.objects.create_user('admin','','stairmaster')
        default_user.is_staff = True
        default_user.is_superuser = True
        default_user.save()
        
        
        print("admin superuser created. password = stairmaster.")
        
        
        
        print("done")
