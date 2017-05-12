from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.contrib.gis.db.models.functions import Centroid,AsGeoJSON
from django.core.serializers import serialize
import json
from models import Stair
from rest_framework.views import APIView
from rest_framework import viewsets, response
from .serializers import StairSerializer, MapSerializer
import time

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
    queryset = Stair.objects.all()
    serializer_class = MapSerializer
    
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
