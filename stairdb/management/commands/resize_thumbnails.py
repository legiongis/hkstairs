from django.core.management.base import BaseCommand
from stairdb.models import Photo


class Command(BaseCommand):
    help = 'resize thumbnails'

    # def add_arguments(self, parser):
        #parser.add_argument('source',nargs="?",type=str)
    
        # parser.add_argument(
        #     '-f',
        #     '--flush',
        #     action='store_true',
        #     dest='flush',
        #     default=False,
        #     help='delete all existing photos before loading process',
        # )

    def handle(self, *args, **options):
        # if options['flush']:
        #     self.flush()

        self.resize_thumbnails()

    def resize_thumbnails(self):
        allphotos = Photo.objects.all()

        for p in allphotos:
            print("resizing "+str(p.image))
            p.create_thumbnail(p.image)
            #exit()
