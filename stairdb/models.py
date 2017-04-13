from __future__ import unicode_literals

from django.contrib.gis.db import models
from django.core.serializers import serialize

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

    stairid = models.IntegerField(editable=False)
    name = models.CharField(max_length=100,null=True,default="N/A")
    type = models.CharField(max_length=25,choices=TYPE_CHOICES,null=True,)
    location = models.CharField(max_length=100,null=True,default="N/A")
    geom = models.PolygonField(null=True)
    coords_x = models.FloatField(null=True,editable=False)
    coords_y = models.FloatField(null=True,editable=False)
    objects = models.GeoManager()
    
    def __str__(self):
        return str(self.stairid)
        
    def as_json(self,centroid=False):
        '''CURRENTLY NOT IN USE 3/7/17'''
        """returns a feature dictionary that can be added to a FeatureCollection"""

        jdict = {
            'geometry': {
                'type':"Polygon",
                'coordinates':self.geom.coords
            },
            'type': "Feature",
            'properties': {
                'stairid': self.stairid,
                'name': self.name,
                'type': self.type,
                'coords_x': self.coords_x,
                'coords_y': self.coords_y
            }
        }
        
        # if centroid:
            # jdict['geometry']['type'] = "Point"
            # jdict['geometry']['coordinates'] = self.geom.centroid.coords
        # else:
            # jdict['geometry']['type'] = "Polygon"
            # jdict['geometry']['coordinates'] = self.geom.coords
        
        return jdict
        
    def save(self, *args, **kwargs):
        self.coords_x = self.geom.centroid.coords[0]
        self.coords_y = self.geom.centroid.coords[1]
        super(Stair, self).save(*args, **kwargs)