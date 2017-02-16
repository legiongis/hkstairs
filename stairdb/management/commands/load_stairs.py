from django.core.management.base import BaseCommand, CommandError
from django.conf import settings
import os
import shapefile
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
    
        shp = os.path.join(settings.BASE_DIR,'stairdb','fixtures','stairs_WGS84_v4_Point.shp')
        
        print shp

        sf = shapefile.Reader(shp)
        recs = sf.shapeRecords()

        wkt = None
        ct = 0
        for rec in recs:
            #print rec.record
            
            sid = rec.record[1]
            name = rec.record[2]
            location = rec.record[3]
            type = rec.record[4]
            
            x,y = rec.shape.points[0][0],rec.shape.points[0][1]
            wkt = 'POINT({} {})'.format(x,y)
            
            print sid, name, location, type, wkt
            
            obj = Stair(stairid=sid,name=name,type=type,location=location,geom=wkt)
            obj.save()
            
            print "saved"
            
            ct+=1
            if ct == 5:
                break
                
        print "now loading new ones!"
        
    def remove_stairs(self):
        
        print "removing all existing stairs in database"
        #Stair.objects.all().delete()
