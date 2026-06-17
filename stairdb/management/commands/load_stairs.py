from django.core.management.base import BaseCommand
from django.conf import settings
from django.contrib.gis.gdal import DataSource
import os
from stairdb.models import Stair

class Command(BaseCommand):
    help = 'load stair shapefile to populate database.'

    def add_arguments(self, parser):
        parser.add_argument(
            '-f',
            '--flush',
            action='store_true',
            dest='flush',
            default=False,
            help='delete all existing stairs before loading process',
        )

    def handle(self, *args, **options):

        if options['flush']:
            self.remove_stairs()
            
        self.load_stairs()

    def load_stairs(self):
    
        shp = os.path.join(settings.BASE_DIR,'stairdb','fixtures','Stairs_v5_polygons_wsg84.shp')
        
        print("loading stairs into database from file:")
        print(shp)

        ds = DataSource(shp)
        lyr = ds[0]

        ct,bad_ct = 0,0
        for feat in lyr:
            
            sid = feat.get("UniqueID")
            name = feat.get("Name")
            if not name:
                name = "N/A"
            name = name.strip()
            location = feat.get("Location")
            type = feat.get("Type")
            if feat.geom.geom_type != "Polygon":
                bad_ct += 1
                continue
            obj = Stair(
                stairid=sid,
                name=name,
                type=type,
                location=location,
                geom=feat.geom.wkt
            )
            obj.save()
            ct += 1

        print(ct, "stairs loaded")
        print(bad_ct, "loading errors")
        
    def remove_stairs(self):
        
        print("removing all existing stairs in database")
        Stair.objects.all().delete()