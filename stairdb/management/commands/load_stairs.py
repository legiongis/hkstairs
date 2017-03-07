from django.core.management.base import BaseCommand, CommandError
from django.conf import settings
import os
import shapefile
import pygeoif
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
    
        shp = os.path.join(settings.BASE_DIR,'stairdb','fixtures','stairs_WGS84_v4_Polygon.shp')
        
        print shp

        sf = shapefile.Reader(shp)
        recs = sf.shapeRecords()
    
        ct = 0
        bad_ct = 0
        for rec in recs:
            
            sid = rec.record[1]
            name = rec.record[2]
            location = rec.record[3]
            type = rec.record[4]
            g = pygeoif.geometry.as_shape(rec.shape)
            try:
                poly = pygeoif.Polygon(g)
            except:
                bad_ct+=1
                continue
            #m = pygeoif.MultiPolygon(g)
            poly_wkt = poly.wkt
            poly_wkt = poly_wkt.replace(")(","),(")
            # centroid_wkt = poly.centroid.wkt
            
            

            
            
            obj = Stair(stairid=sid,name=name,type=type,location=location,geom=poly_wkt)
            obj.save()
            ct += 1
            # except:
                # print "ERROR:", sid, name, location, type, wkt
        print ct, "stairs loaded"
        print bad_ct, "loading errors"
        
    def remove_stairs(self):
        
        print "removing all existing stairs in database"
        Stair.objects.all().delete()