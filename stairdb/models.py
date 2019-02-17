from __future__ import unicode_literals

from django.contrib.gis.db import models
from django.utils.html import mark_safe
from django.core.serializers import serialize
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.cache import cache

from PIL import Image
from cStringIO import StringIO
import os
import exifread


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
    
    HANDRAIL_CHOICES = (
        ('Yes','Yes'),
        ('No','No')
    )

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
    
    def __str__(self):
        return str(self.stairid)
        
    # def as_json(self,centroid=False):
    #     '''CURRENTLY NOT IN USE 3/7/17'''
    #     """returns a feature dictionary that can be added to a FeatureCollection"""

    #     jdict = {
    #         'geometry': {
    #             'type':"Polygon",
    #             'coordinates':self.geom.coords
    #         },
    #         'type': "Feature",
    #         'properties': {
    #             'stairid': self.stairid,
    #             'name': self.name,
    #             'type': self.type,
    #             'coords_x': self.coords_x,
    #             'coords_y': self.coords_y
    #         }
    #     }
        
    #     return jdict
        
    def save(self, *args, **kwargs):
        cache.clear()
        print "cache cleared after update"

        self.coords_x = self.geom.centroid.coords[0]
        self.coords_y = self.geom.centroid.coords[1]
        super(Stair, self).save(*args, **kwargs)

class Photo(models.Model):
    image = models.ImageField(
        upload_to='photos'
    )
    thumbnail = models.ImageField(
        upload_to='photos',
        max_length=500,
        null=True,
        blank=True
    )
    stairid = models.ForeignKey(Stair,null=True, blank=True, related_name='photos', on_delete=models.CASCADE)
    geom = models.PointField(null=True, blank=True)
    
    def __str__(self):
        return "{} - {} - {}".format(os.path.basename(self.image.url),
            "geotagged" if self.geom else "",
            self.stairid)
    
    def image_tag(self):
        return u'<img src="{}" style="height:300px;max-width:100%;"/>'.format(self.image.url)
    image_tag.short_description = 'Image'
    image_tag.allow_tags = True

    def create_thumbnail(self,imagefile):
        # original code for this method came from
        # http://snipt.net/danfreak/generate-thumbnails-in-django-with-pil/

        # If there is no image associated with this.
        # do not create thumbnail
        if not self.image:
            return

        # Delete Thumbnail if it exists
        image_path = settings.BASE_DIR+self.thumbnail.url
        if os.path.isfile(image_path):
            #print "deleting existing thumbnail: "+image_path
            os.remove(image_path)

        # Set our max thumbnail size in a tuple (max width, max height)
        THUMBNAIL_SIZE = (150, 150)

        if self.image.name.lower().endswith(".jpg") or self.image.name.lower().endswith(".jpeg"):
            PIL_TYPE = 'jpeg'
            FILE_EXTENSION = 'jpg'
            DJANGO_TYPE = 'image/jpeg'

        elif self.image.name.lower().endswith(".png"):
            PIL_TYPE = 'png'
            FILE_EXTENSION = 'png'
            DJANGO_TYPE = 'image/png'

        # Open original photo which we want to thumbnail using PIL's Image
        image = Image.open(StringIO(self.image.read()))
        
        # We use our PIL Image object to create the thumbnail, which already
        # has a thumbnail() convenience method that contrains proportions.
        # Additionally, we use Image.ANTIALIAS to make the image look better.
        # Without antialiasing the image pattern artifacts may result.
        image.thumbnail(THUMBNAIL_SIZE, Image.ANTIALIAS)

        # Save the thumbnail
        temp_handle = StringIO()
        image.save(temp_handle, PIL_TYPE)
        temp_handle.seek(0)

        # Save image to a SimpleUploadedFile which can be saved into
        # ImageField
        suf = SimpleUploadedFile(os.path.split(self.image.name)[-1],
                temp_handle.read(), content_type=DJANGO_TYPE)
        # Save SimpleUploadedFile into image field
        self.thumbnail.save(
            '%s_thumbnail.%s' % (os.path.splitext(suf.name)[0], FILE_EXTENSION),
            suf,
            save=False
        )

    def get_geotags(self):

        tags = exifread.process_file(self.image)
        geotags = {}
        for k,v in tags.iteritems():
            if k.startswith("GPS"):
                geotags[k] = v
        if len(geotags) == 0:
            geotags = False
        return geotags
        
    def make_geom_from_geotags(self,geotags):
        
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

    def __unicode__(self):
        #return mark_safe(self.image_tag())
        return '{"thumbnail": "%s", "image": "%s"}' % (self.thumbnail.url, self.image.url)
    #__unicode__.allow_tags = True

    def save(self, *args, **kwargs):

        # MANAGE THUMBNAIL CREATION
        if not self.thumbnail:
            self.create_thumbnail(self.image)
        else:
            fname = os.path.splitext(self.image.url.split("/")[-1])[0]
            tname = os.path.splitext(self.thumbnail.url.split("/")[-1])[0]
            if tname <> fname+"_thumbnail":
                self.create_thumbnail(self.image)

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
            #print "no geo tags in photo"
            return

        necessary_tags = ['GPS GPSLongitude','GPS GPSLongitudeRef',
                          'GPS GPSLatitude','GPS GPSLatitudeRef']
        ok=True
        for nt in necessary_tags:
            if not nt in gts.keys():
                #print "not enough geo tags in photo (missing lat/long info)"
                return
            
        location = self.make_geom_from_geotags(gts)
        self.geom = location
        
        super(Photo, self).save(force_update=force_update)