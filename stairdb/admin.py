from django.contrib import admin
from leaflet.admin import LeafletGeoAdmin
from models import Stair, Photo

class OverrideLeafletGeoAdmin(LeafletGeoAdmin):
    
    # straight hint @https://github.com/makinacorpus/django-leaflet/pull/28#issuecomment-23943492
    settings_overrides = {
        'TILES': [
            # base layers by preference
            ('OSM', 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', '<a href="http://www.openstreetmap.org/copyright" target="_blank"> OpenStreetMap</a> contributors'),
            ('City Map','http://stairculture.com/tiles/hk_clr1_2/{z}/{x}/{y}.png',{'maxZoom':19})
        ],
        'OVERLAYS': [],        
        'MINIMAP': False, # <--- here
    }
    
class PhotoInline(admin.TabularInline):
    model = Photo
    extra = 0
    exclude = ('thumbnail',)

class StairAdmin(OverrideLeafletGeoAdmin):
    search_fields = ['stairid','type','location']
    inlines = [PhotoInline,]
    ordering = ('stairid',)
    
class PhotoAdmin(OverrideLeafletGeoAdmin):
    fields = ('image_tag','image','stairid','geom')
    readonly_fields = ('image_tag',)
    ordering = ('geom','stairid')

admin.site.register(Stair,StairAdmin)
admin.site.register(Photo,PhotoAdmin)
