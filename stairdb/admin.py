from django.contrib import admin
from leaflet.admin import LeafletGeoAdmin
from models import Stair, Photo
from django.conf import settings

class OverrideLeafletGeoAdmin(LeafletGeoAdmin):
    
    # straight hint @ https://github.com/makinacorpus/django-leaflet/pull/28#issuecomment-23943492
    settings_overrides = {
        'TILES': [
            # base layers by preference
            ('City Map','https://tiles.legiongis.com/hk_clr1_2/{z}/{x}/{y}.png',{
                'maxNativeZoom':19,
                'maxZoom':21
            }),
            ('OSM', 'https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token='+settings.MAPBOX_API_KEY,{
                'maxNativeZoom':20,
                'maxZoom':21,
                'attribution':'<a href="http://www.openstreetmap.org/copyright" target="_blank"> OpenStreetMap</a> contributors'
            }),
        ],
        'MINIMAP': False, # instantiate this later in the admin-map.js file to set basemap
        'MAX_ZOOM': 21,
    }
    
class PhotoInline(admin.TabularInline):
    model = Photo
    extra = 0
    exclude = ('thumbnail',)

class StairAdmin(OverrideLeafletGeoAdmin):
    list_display = ['stairid','name','type','handrail','stair_ct']
    search_fields = ['stairid','type','location']
    inlines = [PhotoInline,]
    ordering = ('stairid',)

    # def stair_name(self, obj):
    #     return obj.name
    
class PhotoAdmin(OverrideLeafletGeoAdmin):
    fields = ('image_tag','image','stairid','geom')
    readonly_fields = ('image_tag',)
    ordering = ('geom','stairid')

admin.site.register(Stair,StairAdmin)
admin.site.register(Photo,PhotoAdmin)
