from django.conf import settings

def local_url(request):
    return {
        'local_url': settings.LOCAL_URL
    }