from .models import Stair, Photo
from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from sorl_thumbnail_serializer.fields import HyperlinkedSorlImageField


class PhotoSerializer(serializers.ModelSerializer):
    thumbnail = HyperlinkedSorlImageField(
        '128x128',
        # options={"crop": "center"},
        source='image',
        read_only=True
    )

    class Meta:
        model = Photo
        fields = ('image','thumbnail')


class StairSerializer(serializers.HyperlinkedModelSerializer):
    photos = PhotoSerializer(many=True)

    class Meta:
        model = Stair
        fields = ('url', 'name', 'type', 'coords_x', 'coords_y', 'stairid', 'location', 'photos', 'geom')


class MapSerializer(GeoFeatureModelSerializer):
    photos = PhotoSerializer(many=True)
    #photos = serializers.StringRelatedField(many=True)

    class Meta:
        model = Stair
        geo_field = "geom"
        fields = ('id', 'url', 'name', 'type', 'coords_x', 'coords_y', 'stairid', 'location', 'photos', 'geom', 'handrail', 'stair_ct', 'featured', 'materials_formatted')
