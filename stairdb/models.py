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

    stairid = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=25,choices=TYPE_CHOICES,null=True,)
    location = models.CharField(max_length=100)
    geom = models.PointField()
    
    def __str__(self):
        return str(self.stairid)