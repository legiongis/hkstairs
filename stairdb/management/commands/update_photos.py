import os
from datetime import datetime
from django.core import management
from django.core.management.base import BaseCommand, CommandError
from django.conf import settings
from stairdb.models import Photo
import requests
from django.core.files.images import ImageFile
from django.core.files.base import ContentFile
from PIL import Image
from PIL.ExifTags import TAGS
import hashlib


class Command(BaseCommand):
    help = 'update photos'

    def handle(self, *args, **options):
        self.update_photos()

    def update_photos(self):
        allphotos = Photo.objects.all()

        for p in allphotos:
            p.save()