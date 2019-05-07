from django.core.management.base import BaseCommand, CommandError
from django.conf import settings
from django.core.files import File
from django.core.files.images import ImageFile
import os
import shapefile
import pygeoif
from stairdb.models import Photo
import exifread
from PIL import Image
from cStringIO import StringIO
import shutil

class Command(BaseCommand):
    help = 'import photos into media/photos and database.'

    def add_arguments(self, parser):
        
        parser.add_argument('source',nargs="?",type=str)
    
        parser.add_argument(
            '-f',
            '--flush',
            action='store_true',
            dest='flush',
            default=False,
            help='delete all existing photos before loading process',
        )

    def handle(self, *args, **options):
        if options['flush']:
            self.flush()

        self.load_photos(options['source'])

    def load_photos(self,topdir):
        if not os.path.isdir(topdir):
            print "invalid source directory"
            return
    
        filelist = []
        for path, dirs, files in os.walk(topdir):
            for f in files:
                if f.lower().endswith(".png") or f.lower().endswith(".jpg"):
                    filelist.append(os.path.join(path,f))
        n_photos = len(filelist)
        
        print "loading images from:",topdir
        print "total images to load:",n_photos
        print "loading photos..."

        ct = 0
        geoms=0
        dupes=0
        for fp in filelist:
            
            # skipping duplicate images
            if "(1)" in fp:
                if os.path.isfile(fp.replace(" (1)","")):
                    continue
            with open(fp,"rb") as imgfile:
                # make sure the file is saved into the media/photo dir
                photofilepath = settings.MEDIA_ROOT+'/photos/'+str(os.path.basename(fp))
                with open(photofilepath, "w") as photofile:
                    for line in imgfile:
                        photofile.write(line)
                photofile.close()

                # prepend 'photos/' to name
                img = ImageFile(name='photos/'+str(os.path.basename(fp)),file=imgfile)
                obj = Photo(image=img)
                obj.save()
                if obj.geom:
                    geoms+=1
                ct += 1
        
        print "    done."
        print "total images loaded:",ct
        print "images with valid geolocation:",geoms
        

    def flush(self):
        print "removing all existing photos in database"
        Photo.objects.all().delete()