import os
from datetime import datetime
# from django.core import management
from django.core.management.base import BaseCommand
# from django.conf import settings
# import psycopg2 as db
from _utils import refresh_csv, getStairs
from stairdb.models import Stair, Photo
import requests
from django.core.files.base import ContentFile
from PIL import Image
import tempfile


class Command(BaseCommand):
    help = 'gets handrail and stair count info from stairquest, writes that to a  and tranfers these values to stairdb objects. run first with --stage to update the csv, and then with --run to actually modify values in the hkstairs db.'

    def add_arguments(self, parser):
        parser.add_argument('--stage', action='store_true',
            default=False,
            help="updates the csv and prints the output, but doesn't modify the db.",
        )
        parser.add_argument('--run', action='store_true',
            default=False,
            help="uses the csv to modify values in the hkstairs db.",
        )
        parser.add_argument('--test_run', action='store_true',
            default=False,
            help="does a mock version of the run command with verbose messages, but doesn't modify the db.",
        )
        parser.add_argument('--verbose',action='store_true',
            default=False,
            help="adds a bunch of print statements.",
        )

    def handle(self, *args, **options):
        if not options['stage'] and not options['run'] and not options['test_run']:
            print "you must use this command with either --stage or --run or --test-run. for more info, run with --help."
            return

        if options['stage']:
            refresh_csv(table_name="wp_gq_stair_vote")

        if options['test_run']:
            data = self.prepare_data(table_name="wp_gq_stair_vote", verbose=True)
            if data:
                self.update_info(data, fake=True)
            return

        if options['run']:
            data = self.prepare_data(table_name="wp_gq_stair_vote", verbose=options['verbose'])
            if data:
                self.update_info(data)

    def prepare_data(self, table_name='', verbose=False):
        from django.core.cache import cache

        if not cache.get('sq_stairs'):
            sq_stairs = getStairs()
            cache.set('sq_stairs', sq_stairs)
        else:
            sq_stairs = cache.get('sq_stairs')

        print('Processing '+str(len(sq_stairs)))+' SQ Stairs:'
        for sq_stair in sq_stairs:
            # print str(sq_stair.get('stair_id'))+' '+str(sq_stair.get('name'))+' '+str(sq_stair.get('current_name'))+' '+str(sq_stair.get('stepcount'))+' '+str(sq_stair.get('handrails'))
            print str(sq_stair.get('stair_id'))
            stair_id = int(sq_stair.get('stair_id'))

            # if stair_id != 2180:
            #     continue

            try:
                item = Stair.objects.get(stairid=stair_id)
            except Stair.DoesNotExist:
                # print "does not exist"
                continue

            update = False

            if(item):
                if(item.name != sq_stair.get('name') and sq_stair.get('name') != 'Stair '+str(stair_id)):
                    print('  updating name for '+str(stair_id)+' - from '+str(item.name)+' to '+str(sq_stair.get('name')))
                    item.name = sq_stair.get('name')
                    update = True

                if(item.stair_ct != sq_stair.get('stepcount') and sq_stair.get('stepcount') != 'Unknown'):
                    print('  updating stair_ct for '+str(stair_id)+' - from '+str(item.stair_ct)+' to '+str(sq_stair.get('stepcount')))
                    item.stair_ct = sq_stair.get('stepcount')
                    update = True

                if(item.handrail != sq_stair.get('handrails') and sq_stair.get('handrails') != 'Unknown'):
                    print('  updating handrails for '+str(stair_id)+' - from '+str(item.handrail)+' to '+str(sq_stair.get('handrails')))
                    item.handrail = sq_stair.get('handrails')
                    update = True

                if(item.location != sq_stair.get('location') and sq_stair.get('location') != 'Unknown'):
                    print('  updating location for '+str(stair_id)+' - from '+str(item.location)+' to '+str(sq_stair.get('location')))
                    item.handrail = sq_stair.get('location')
                    update = True
                    
                if(item.type != sq_stair.get('type') and sq_stair.get('type') is not False):
                    print('  updating type for '+str(stair_id)+' - from '+str(item.type)+' to '+str(sq_stair.get('type')))
                    item.type = sq_stair.get('type')
                    update = True

                for photo in sq_stair.get('photos'):
                    filename = photo['orig_url']
                    # print " saving "+str(filename)

                    # Save original to photos
                    response = requests.get(photo['orig_url'])
                    tempimagefile = tempfile.NamedTemporaryFile()
                    tempimagefile.write(response.content)

                    if self.validateImage(tempimagefile.name):
                        year = datetime.now().strftime('%Y')
                        month = datetime.now().strftime('%m')
                        # Add stair_id to name
                        photofilename = year+'/'+month+'/stairid_'+str(stair_id)+'-'+str(os.path.basename(filename))

                        # Create Photo
                        stair = Stair.objects.get(stairid=stair_id)
                        newphoto = Photo(stairid=stair)
                        # Save File in media directory
                        newphoto.image.save(photofilename, tempimagefile, save=False)
                        print " saving "+str(photofilename)
                        newphoto.save()

                    tempimagefile.close()

                if update:
                    item.save()

    def validateImage(self, file):
        try:
            img = Image.open(file)
            try:
                if img.verify():
                    return True
                else:
                    return False
            except Exception:
                return False
        except IOError:
            return False

    def update_info(self, data, fake=False):
        print("\nupdating handrail and stair count information")
        ct = 0
        for k, v in data.iteritems():
            item = Stair.objects.get(stairid=k)
            ct += 1
            if fake:
                print "stair", item.stairid, " | handrail:", item.handrail, "stair_ct:", item.stair_ct
                print "  -- new values | handrail:", v['handrail'], "stair_ct:", v['stair_ct']
            if v['handrail']:
                item.handrail = v['handrail']
            if v['stair_ct']:
                item.stair_ct = int(v['stair_ct'])

            if not fake:
                item.save()
        print "\n", ct, "stair records {}updated".format("would be " if fake else "")

        return
