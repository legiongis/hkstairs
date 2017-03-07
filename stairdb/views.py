from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.gis.db.models.functions import Centroid,AsGeoJSON
from django.core.serializers import serialize
import json
from models import Stair

def index(request):

    return render(request, 'index.html')
    
def get_stairs(self,stairid="all"):

    if stairid == "all":
        q1 = Stair.objects.all()

    else:
        #q1 = [Stair.objects.get(stairid=stairid),Stair.objects.get(stairid=str(int(stairid)+1))]
        q1 = [Stair.objects.get(stairid=stairid)]
    
    jsond = serialize('geojson',q1,geometry_field="geom",
          fields=('name','type','coords_x','coords_y'))
    
    ## custom serializing code is currently not in use
    # centroid = False
    # super_serial = {
        # 'type': "FeatureCollection",
        # 'features': []
    # }
    
    # for a in q1:
        # super_serial['features'].append(a.as_json(centroid))
        
    # ret = json.dumps(super_serial)

    return HttpResponse(jsond, content_type='application/json')
