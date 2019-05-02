from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.contrib.gis.db.models.functions import Centroid,AsGeoJSON
from django.core.serializers import serialize
import json
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page, never_cache
from models import Stair, Photo
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, response
from .serializers import StairSerializer, MapSerializer
import time
from management.commands._utils import getSQStair
from django.views.generic import View

#@never_cache
def index(request):
    return render(request, 'index.html')

class StairList(APIView):

    def get(self, request):
        print(request)
        stairs = Stair.objects.all()
        serializer = StairSerializer(stairs, many=True)
        return Response(serializer.data)

    def post(self):
        pass


class StairViewSet(viewsets.ModelViewSet):
    #queryset = Stair.objects.all()
    ### use prefetch_related to avoid N+1 select problem ###
    queryset = Stair.objects.prefetch_related('photos').all()

    serializer_class = MapSerializer
    
    # Implement the Cache
    if settings.USE_CACHE:
        @method_decorator(cache_page(None))
        def dispatch(self, *args, **kwargs):
            return super(StairViewSet, self).dispatch(*args, **kwargs)


class StairQuestView(APIView):
    #queryset = Stair.objects.prefetch_related('photos').all()

    def get(self, request, *args, **kwargs):
        sq_stair = getSQStair(1272)

        print(sq_stair)
        return Response(sq_stair[0])


# def get_stairs(self,stairid="all"):

#     start = time.time()
#     if stairid == "all":
#         q1 = Stair.objects.all()

#     else:
#         q1 = [Stair.objects.get(stairid=str(int(stairid)+1))]

#     r = time.time()
#     # serializer_class = MapSerializer(q1, many=True)
#     jsond = serialize('geojson',q1,geometry_field="geom",
#           fields=('name','type','coords_x','coords_y','stairid','location', 'photos'))
#     s = time.time()
#     print "objects serialized:", s-r
    
    # print serializer_class
    ## custom serializing code is currently not in use
    # centroid = False
    # super_serial = {
        # 'type': "FeatureCollection",
        # 'features': []
    # }
    
    # for a in q1:
        # super_serial['features'].append(a.as_json(centroid))
        
    # ret = json.dumps(super_serial)

    # return HttpResponse(jsond, content_type='application/json')
