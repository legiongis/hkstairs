from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.gis.db.models.functions import Centroid,AsGeoJSON
from django.core.serializers import serialize
import json
from geojson import Feature
from models import Stair

def index(request):

    return render(request, 'index.html')
    
def get_stairs(self,stairid="all"):

    if stairid == "all":
        q1 = Stair.objects.all()

    else:
        q1 = [Stair.objects.get(stairid=stairid),Stair.objects.get(stairid=str(int(stairid)+1))]
        q1 = [Stair.objects.get(stairid=stairid)]
        

    # space_qs = Stair.objects.all()
    # centroid_result = Stair.objects.annotate(json=AsGeoJSON(Centroid('geom'))).all()

    # att = space_qs.values()[0]

    # do NOT include the original polygon geometry, so set it to None
    # if att['geom']:
        # att['geom'] = None

    # res = Feature(geometry=json.loads(centroid_result), properties=att)
    # print res
    
    jsond = serialize('geojson',q1,geometry_field="geom",
          fields=('name','type'))
          
    centroid = False

    super_serial = {
        'type': "FeatureCollection",
        # 'crs': {
            # 'type': "name",
            # 'properties': {
                # 'name': "EPSG:4326"
            # }
        # },
        'features': []
    }
    
    for a in q1:
        super_serial['features'].append(a.as_json(centroid))
        
    ret = json.dumps(super_serial)
    # print super_serial

    
    #return JsonResponse(json, safe=False)
    return HttpResponse(ret, content_type='application/json')
