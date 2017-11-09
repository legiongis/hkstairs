from .models import Stair, Photo
from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer

class StairSerializer(serializers.HyperlinkedModelSerializer):
	# photos = serializers.StringRelatedField(many=True)
	class Meta:
		model = Stair
		fields = ('url', 'name', 'type', 'coords_x', 'coords_y', 'stairid', 'location', 'photos', 'geom')

class MapSerializer(GeoFeatureModelSerializer):
	photos = serializers.StringRelatedField(many=True)
	class Meta:
		model = Stair
		geo_field = "geom"
		fields = ('url', 'name','type','coords_x','coords_y','stairid','location', 'photos', 'geom','handrail','stair_ct')
