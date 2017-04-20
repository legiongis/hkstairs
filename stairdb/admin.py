from leaflet.admin import LeafletGeoAdmin

from django.contrib import admin
from models import Stair

class OverrideLeafletGeoAdmin(LeafletGeoAdmin):
    
    # straight hint @https://github.com/makinacorpus/django-leaflet/pull/28#issuecomment-23943492
    settings_overrides = {
        'TILES': [
            # base layers by preference
            ('OSM', 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', '<a href="http://www.openstreetmap.org/copyright" target="_blank"> OpenStreetMap</a> contributors'),
        ],    
        'MINIMAP': False, # <--- here
    }

class StairAdmin(OverrideLeafletGeoAdmin):
    search_fields = ['stairid','type','location']

admin.site.register(Stair,StairAdmin)
