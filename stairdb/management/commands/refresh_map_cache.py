from django.core.management.base import BaseCommand, CommandError
from django.conf import settings
import os
import urllib2

class Command(BaseCommand):
    help = 'refreshes the cache'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        self.refresh_map_cache()
        
    def refresh_map_cache(self,table_name='',verbose=False):
    
        cache_dir = settings.CACHES['default']['LOCATION']
        for f in os.listdir(cache_dir):
            if f.endswith(".djcache"):
                os.remove(os.path.join(cache_dir,f))
        
        stair_json = 'http://localhost'+settings.LOCAL_URL+'/stair/?format=json'
        if settings.DEBUG:
            stair_json = 'http://localhost:8000'+settings.LOCAL_URL+'/stair/?format=json'
       
        req = urllib2.Request(url=stair_json)
        
        ## this header needs to be added to correctly mimic the ajax requests
        ## that are made in the map js. if absent, django will make a new
        ## cache file next time the url is requested, and will ignore the one
        ## created below
        req.add_header('Accept', 'application/json, text/javascript, */*; q=0.01')
        
        response = urllib2.urlopen(req)
