from django.conf import settings

def local_url(request):
    return {
        'local_url': settings.LOCAL_URL
    }
    
def mapbox_api_key(request):
    return {
        'mapbox_api_key': settings.MAPBOX_API_KEY
    }