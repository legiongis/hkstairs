import os
import csv
from django.core import management
from django.core.management.base import BaseCommand, CommandError
from django.conf import settings
import psycopg2 as db
from _utils import refresh_csv
from stairdb.models import Stair


class Command(BaseCommand):
    help = 'gets handrail and stair count info from stairquest and tranfers these values to stairdb objects.'

    def add_arguments(self, parser):
        parser.add_argument('--fake',action='store_true',
            default=False,
            help="updates the csv and prints the output, but doesn't modify the db",
        )

    def handle(self, *args, **options):

        src_csv = refresh_csv(table_name="wp_gq_stair_vote")
        data = self.prepare_data(src_csv,verbose=options['fake'])
        self.update_info(data,fake=options['fake'])
        
    def prepare_data(self,csvfile,verbose=False):
        
        data = {}
        with open(csvfile,"rb") as incsv:
            reader = csv.reader(incsv)
            headers = reader.next()
            id_i = headers.index('stair_id')
            vt_i = headers.index('type')
            n_i = headers.index('number_value')
            tv_i = headers.index('text_value')
            
            for row in reader:
                stairid = row[id_i]
                ## prepare entry in the dictionary if it doesn't yet exist
                try:
                    data[stairid]
                except KeyError:
                    data[stairid] = {'handrail':[],'stair_ct':[]}

                ## process row differently depending on what type of vote it is
                vt = row[vt_i]
                ## if 1 this is a vote on handrail presence, use text value
                if vt == "1":
                    val = row[tv_i]
                    data[stairid]['handrail'].append(val)
                ## if 2 this is a vote on tread count, use number value
                elif vt == "2":
                    val = row[n_i]
                    data[stairid]['stair_ct'].append(val)
                ## if 3 this is a vote on stair type, not implemented here at this time
                elif vt == "3":
                    pass
                else:
                    pass
        
        ## evaluate and transform all values in data from vote lists to single strings
        ## in both cases use the mode of the list
        for k,v in data.iteritems():
            for cat,votes in v.iteritems():
                if len(votes) == 0:
                    data[k][cat] = ''
                else:
                    data[k][cat] = max(set(votes), key=votes.count)
        if verbose:
            print "---prepared dictionary---"
            print data
        return data
        
    def update_info(self,data,fake=False):
        print("\nupdating handrail and stair count information")
        ct=0
        for k,v in data.iteritems():
            item = Stair.objects.get(stairid=k)
            if fake:
                print "stair",item.stairid," | handrail:",item.handrail,"stair_ct:",item.stair_ct
                print "  -- new values | handrail:",v['handrail'],"stair_ct:",v['stair_ct']
            if v['handrail']:
                item.handrail = v['handrail']
            if v['stair_ct']:
                item.stair_ct = int(v['stair_ct'])
                
            if not fake:
                ct+=1
                item.save()
        print " --",ct,"stair records updated"
            
        return

