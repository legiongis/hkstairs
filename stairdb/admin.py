from leaflet.admin import LeafletGeoAdmin

from django.contrib import admin
from models import Stair

admin.site.register(Stair,LeafletGeoAdmin)
#admin.site.register(Stair)

