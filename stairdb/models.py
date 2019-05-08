from __future__ import unicode_literals

from django.conf import settings
from django.contrib.gis.db import models
# from django.utils.html import mark_safe
# from django.core.serializers import serialize
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.files.storage import FileSystemStorage
from django.core.cache import cache
from django.dispatch import receiver
from multiselectfield import MultiSelectField
import reversion
# from functools import partial
from PIL import Image
from PIL.ExifTags import TAGS
import os
import hashlib
import exifread


class PrepareStorage(FileSystemStorage):
    def _save(self, name, content):
        # print "preparing dirs for "+name
        dirpath = os.path.dirname(name)
        try:
            os.makedirs(dirpath)
        except OSError:
            if not os.path.isdir(dirpath):
                raise
        return super(PrepareStorage, self)._save(name, content)


@reversion.register()
class Stair(models.Model):
    
    TYPE_CHOICES = (
        ('Alley Stairs','Alley Stairs'),
        ('Building Access','Building Access'),
        ('Country Park Stairs','Country Park Stairs'),
        ('Curb Stairs','Curb Stairs'),
        ('Elevated Walkway','Elevated Walkway'),
        ('Escalator','Escalator'),
        ('Footpath','Footpath'),
        ('Maintenance Stairs','Maintenance Stairs'),
        ('Pier Stairs','Pier Stairs'),
        ('Park Stairs','Park Stairs'),
        ('Plaza Stairs','Plaza Stairs'),
        ('Street Stairs','Street Stairs'),
        ('Subway','Subway'),
    )

    MATERIALS = (('stone', 'Stone'),
                ('pre-cast', 'Pre-cast concrete'),
                ('cast-in-place', 'Cast in place concrete (CIP)'),
                ('tile', 'Tile'),
                ('brick', 'Brick'),
                ('wood', 'Wood'),
                ('metal', 'Metal'),
                ('plastic', 'Plastic/composite'),
                ('other', 'Other'))
    
    HANDRAIL_CHOICES = (
        ('Yes','Yes'),
        ('No','No')
    )

    id = models.AutoField(primary_key=True)
    stairid = models.IntegerField()
    name = models.CharField(max_length=100,null=True,default="N/A",blank=True)
    type = models.CharField(max_length=25,choices=TYPE_CHOICES,null=True,blank=True)
    location = models.CharField(max_length=100,null=True,default="N/A",blank=True)
    handrail = models.CharField(max_length=25,choices=HANDRAIL_CHOICES,null=True,default="N/A",blank=True)
    stair_ct = models.IntegerField(null=True,blank=True)
    geom = models.PolygonField(null=True)
    coords_x = models.FloatField(null=True,editable=False)
    coords_y = models.FloatField(null=True,editable=False)
    objects = models.GeoManager()
    featured = models.BooleanField(default=False)
    materials = MultiSelectField(choices=MATERIALS,null=True,blank=True)
    
    def __str__(self):
        return str(self.stairid)

    def materials_formatted(self):
        if self.materials is not None:
            MATERIALS_DICT = dict(self.MATERIALS)
            return ", ".join([
                MATERIALS_DICT[material] for material in self.materials
            ])
        else:
            return []
        
    def save(self, *args, **kwargs):
        cache.clear()
        print "cache cleared after update"

        self.coords_x = self.geom.centroid.coords[0]
        self.coords_y = self.geom.centroid.coords[1]
        super(Stair, self).save(*args, **kwargs)


@reversion.register()
class Photo(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.ImageField(
        upload_to='photos/',
        storage=PrepareStorage()
    )
    stairid = models.ForeignKey(Stair, null=True, blank=True, related_name='photos', on_delete=models.CASCADE)
    geom = models.PointField(null=True, blank=True)
    md5sum = models.CharField(max_length=36, null=True, blank=True,)

    def __str__(self):
        return "{} - {} - {}".format(os.path.basename(self.image.url),
            "geotagged" if self.geom else "",
            self.stairid)

    def __unicode__(self):
        #return '{"image": "%s"}' % (self.image.url)
        return self.image.name
    #__unicode__.allow_tags = True

    def display_thumbnail(self):
        return u'<div class="thumbnails" style="width:120px"><img src="%s"/></div>' % (self.image.url)
    display_thumbnail.short_description = 'Image'
    display_thumbnail.allow_tags = True

    def has_geodata(self):
        if self.geom is None:
            return 'No'
        else:
            return 'Yes'
    has_geodata.short_description = 'Has Geodata'

    def image_tag(self):
        return u'<img src="{}" style="height:300px;max-width:100%;"/>'.format(self.image.url)
    image_tag.short_description = 'Image'
    image_tag.allow_tags = True

    def upload_image_location(instance, filename, thumbnail=False):
        _, ext = os.path.splitext(filename)
        #return f'photos/{instance.slug}{f"_thumbnail" if thumbnail else ""}{ext}'
        return 'photos/{instance.slug}{ext}'

    # def create_thumbnail(self,imagefile):
    #     # original code for this method came from
    #     # http://snipt.net/danfreak/generate-thumbnails-in-django-with-pil/

    #     # If there is no image associated with this.
    #     # do not create thumbnail
    #     if not self.image:
    #         return

    #     # Delete Thumbnail if it exists
    #     if self.thumbnail:
    #         image_path = settings.BASE_DIR+self.thumbnail.url
    #         if os.path.isfile(image_path):
    #             # print "deleting existing thumbnail: "+image_path
    #             os.remove(image_path)

    #     # Set our max thumbnail size in a tuple (max width, max height)
    #     THUMBNAIL_SIZE = (150, 150)

    #     if self.image.name.lower().endswith(".jpg") or self.image.name.lower().endswith(".jpeg"):
    #         PIL_TYPE = 'jpeg'
    #         FILE_EXTENSION = 'jpg'
    #         DJANGO_TYPE = 'image/jpeg'

    #     elif self.image.name.lower().endswith(".png"):
    #         PIL_TYPE = 'png'
    #         FILE_EXTENSION = 'png'
    #         DJANGO_TYPE = 'image/png'

    #     # Open original photo which we want to thumbnail using PIL's Image
    #     # image_file = StringIO(self.image.read())
    #     with Image.open(settings.BASE_DIR+self.image.url) as image:
        
    #         # We use our PIL Image object to create the thumbnail, which already
    #         # has a thumbnail() convenience method that contrains proportions.
    #         # Additionally, we use Image.ANTIALIAS to make the image look better.
    #         # Without antialiasing the image pattern artifacts may result.
    #         image.thumbnail(THUMBNAIL_SIZE, Image.ANTIALIAS)

    #         # Save the thumbnail
    #         temp_handle = StringIO()
    #         image.save(temp_handle, PIL_TYPE)
    #         temp_handle.seek(0)

    #         # Save the thumbnail field (save to SimpleUploadedFile which can be saved into
    #         # ImageField
    #         suf = SimpleUploadedFile(os.path.split(self.image.name)[-1],
    #                 temp_handle.read(), content_type=DJANGO_TYPE)
    #         # Save SimpleUploadedFile into image field
    #         self.thumbnail.save(
    #             '%s_thumbnail.%s' % (os.path.splitext(suf.name)[0], FILE_EXTENSION),
    #             suf,
    #             save=False
    #         )

    #         temp_handle.close()

    #         image.close()

    def get_geotags(self):

        tags = exifread.process_file(self.image)
        geotags = {}
        for k,v in tags.iteritems():
            if k.startswith("GPS"):
                geotags[k] = v
        if len(geotags) == 0:
            geotags = False
        return geotags
        
    def make_geom_from_geotags(self, geotags):
        
        raw_lat = geotags['GPS GPSLatitude']
        raw_long = geotags['GPS GPSLongitude']
        ew = str(geotags['GPS GPSLongitudeRef'])
        ns = str(geotags['GPS GPSLatitudeRef'])
        
        # create latitute from tags
        lat_str = str(raw_lat).lstrip('[').rstrip(']')
        lat_list = lat_str.split(",")
        la_deg = int(lat_list[0])
        la_dec_deg_num = float(lat_list[1].split("/")[0].lstrip())
        la_dec_deg_denom = float(lat_list[1].split("/")[1].lstrip())
        la_dec_deg = (la_dec_deg_num/la_dec_deg_denom)/60
        lat = str(la_deg+la_dec_deg)
        
        # create longitude from tags
        lon_str = str(raw_long).lstrip('[').rstrip(']')
        lon_list = lon_str.split(",")
        lo_deg = int(lon_list[0])
        lo_dec_deg_num = float(lon_list[1].split("/")[0].lstrip())
        lo_dec_deg_denom = float(lon_list[1].split("/")[1].lstrip())
        lo_dec_deg = (lo_dec_deg_num/lo_dec_deg_denom)/60
        long = str(lo_deg+lo_dec_deg)
        
        wkt = "POINT ({} {})".format(long,lat)
        return wkt

    def rotate_image(self, filepath):
        try:
            image = Image.open(filepath)
            
            for orientation in TAGS.keys():
                if TAGS[orientation] == 'Orientation':
                    break
            exif = dict(image._getexif().items())

            update = False
            if exif[orientation] == 3:
                image = image.rotate(180, expand=True)
                degrees = 180
                update = True
            elif exif[orientation] == 6:
                image = image.rotate(270, expand=True)
                degrees = 270
                update = True
            elif exif[orientation] == 8:
                image = image.rotate(90, expand=True)
                degrees = 90
                update = True

            if update:
                print " Rotating image by "+str(degrees)
                image.save(filepath)
            
            Image.close(image)
        except (AttributeError, KeyError, IndexError):
            # cases: image don't have getexif
            pass

    def save(self, *args, **kwargs):
        print('Saving: '+str(self.image))

        self.rotate_image(settings.BASE_DIR+self.image.url);

        # Create Hash of file
        if not self.md5sum:  # file is new
            md5 = hashlib.md5()
            for chunk in self.image.chunks():
                md5.update(chunk)
            self.md5sum = md5.hexdigest()

        # Check if hash already exists when working with new images
        if( not self.pk and Photo.objects.filter(md5sum=self.md5sum) ):
            print "We already have that image in the system"
            os.remove(os.path.join(settings.MEDIA_ROOT, self.image.name))
            return


        force_update = False

        # If the instance already has been saved, it has an id and we set
        # force_update to True
        if self.id:
            force_update = True

        # Force an UPDATE SQL query if we're editing the image to avoid integrity exception
        super(Photo, self).save(force_update=force_update)
        
        # GET AND CREATE GEOM FROM EXIF TAGS
        gts = self.get_geotags()
        if not gts:
            # print "  no geo tags in photo"
            return

        necessary_tags = ['GPS GPSLongitude','GPS GPSLongitudeRef',
                          'GPS GPSLatitude','GPS GPSLatitudeRef']
        ok=True
        for nt in necessary_tags:
            if not nt in gts.keys():
                # print "not enough geo tags in photo (missing lat/long info)"
                return
            
        location = self.make_geom_from_geotags(gts)
        self.geom = location
        
        super(Photo, self).save(force_update=force_update)




# @receiver(models.signals.pre_save, sender=Photo)
# def prepare_images(sender, instance, **kwargs):
#     image = Image.open(os.path.join(settings.MEDIA_ROOT, instance.image))
#     info = image._getexif()
     
#     for tag, value in info.items():
#         key = TAGS.get(tag)
#         if key == 'Orientation' and value == 1:
#             print(key + ': ' + str(value))

    # if instance.pk:
    #     try:
    #         article = Photo.objects.get(pk=instance.pk)
    #         old_image = article.image
    #         old_thumbnail_image = article.thumbnail_image
    #     except Article.DoesNotExist:
    #         return
    #     else:
    #         new_image_extension = os.path.splitext(instance.image.name)[1]
    #         if old_image and not old_image.name.endswith(new_image_extension):
    #             old_image.delete(save=False)
    #             old_thumbnail_image.delete(save=False)

    # if not instance.thumbnail_image or not instance.image._committed:
    #     instance.create_thumbnail()