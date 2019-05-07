from django.contrib import admin
from reversion.admin import VersionAdmin
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
                'maxZoom':21,
            }),
            ('OSM', 'https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token='+settings.MAPBOX_API_KEY,{
                'maxNativeZoom':20,
                'maxZoom':21,
                'attribution':'<a href="http://www.openstreetmap.org/copyright" target="_blank"> OpenStreetMap</a> contributors'
            }),
        ],
        'MINIMAP': False,  # instantiate this later in  the admin-map.js file to set basemap
        'MAX_ZOOM': 21,
        'DEFAULT_ZOOM': 21,
    }
    

class PhotoInline(admin.TabularInline):
    model = Photo
    fields = ('id','display_thumbnail','has_geodata')
    readonly_fields = ['id','display_thumbnail','has_geodata']
    extra = 0


def make_featured(modeladmin, request, queryset):
    queryset.update(featured=True)
make_featured.short_description = "Mark selected stairs as featured"


class StairAdmin(VersionAdmin, OverrideLeafletGeoAdmin):
    list_display = ['stairid','name','type','location','featured','materials_formatted','handrail','stair_ct','featured_photo']
    fields = ['stairid','name','type','location','featured','materials','handrail','stair_ct','geom']
    search_fields = ['stairid','name','type','location']
    inlines = [PhotoInline,]
    ordering = ('stairid',)
    readonly_fields = ['stairid','featured_photo']
    actions = [make_featured]

    # def stair_name(self, obj):
    #     return obj.name

    def featured_photo(self, obj):
        return " ".join([
            u'<a href="/admin/stairdb/photo/{}/change/"><img src="{}" style="height:100px;max-width:100%;"/></a>'.format(child.id,child.image.url) for child in obj.photos.all()
        ])
    featured_photo.short_description = "Photos"
    featured_photo.allow_tags = True


    # def material_formatted(self, obj):
    #     if obj.materials is not None:
    #         MATERIALS_DICT = dict(obj.MATERIALS)
    #         return ", ".join([
    #             MATERIALS_DICT[material] for material in obj.materials
    #         ])
    #     else:
    #         return []

    
class PhotoAdmin(VersionAdmin, OverrideLeafletGeoAdmin):
    list_display = ['id','image']
    fields = ('image_tag','image','stairid','geom')
    search_fields = ['image']
    readonly_fields = ('image_tag',)
    ordering = ('geom','stairid')


admin.site.register(Stair,StairAdmin)
admin.site.register(Photo,PhotoAdmin)
