import os
import csv
from datetime import datetime
from django.conf import settings
from PIL import Image
from PIL.ExifTags import TAGS


def refresh_csv(table_name=""):
    print("refreshing CSV from StairQuest database...")

    filename = "{}_{}.csv".format(table_name, datetime.today().strftime("%m%d%Y"))
    outfile = os.path.join(settings.BASE_DIR, "stairdb", "management", "commands", "tmp_data", filename)

    try:
        import mysql.connector
        cnx = mysql.connector.connect(**settings.SQ_DATABASE)
        print("  -- connected to db")
    except:
        print("  -- unable to connect to db, using cached data")
        if not os.path.isfile(outfile):
            print("  -- no cached data found, operation cancelled")
            return
        return outfile

    print("  -- updating " + table_name)
    cur = cnx.cursor(buffered=True)
    cur.execute("DESCRIBE {};".format(table_name))
    colnames = [i[0] for i in cur]

    query = "SELECT * from {};".format(table_name)
    cur.execute(query)

    with open(outfile, 'wb') as out_csv:
        write = csv.writer(out_csv)
        write.writerow(colnames)
        ct = 0
        for row in cur:
            ct += 1
            write.writerow(row)

    print("  -- done. file has", ct, "rows")

    return outfile
    
def rotate_image(filepath):
    try:
        image = Image.open(filepath)
        for orientation in TAGS.keys():
            if ExifTags.TAGS[orientation] == 'Orientation':
                break
        exif = dict(image._getexif().items())

        if exif[orientation] == 3:
            image = image.rotate(180, expand=True)
        elif exif[orientation] == 6:
            image = image.rotate(270, expand=True)
        elif exif[orientation] == 8:
            image = image.rotate(90, expand=True)
        image.save(filepath)
        image.close()
    except (AttributeError, KeyError, IndexError):
        # cases: image don't have getexif
        pass

def getSQStair(stair_id):
    import requests

    url = settings.SQ_REST_API + '?search=Stair+'+str(stair_id)
    # oauth_consumer_key = settings.SQ_CONSUMER_KEY
    # oauth_consumer_secret = settings.SQ_CONSUMER_SECRET
    # oauth_token = "A9HPkYFtM8Yw5HCGxfcYB6Sc"
    # oauth_token_secret = "8hYLZPVGu6R7TTsrf0o0fDk67Ic8WLNhIM5o2dnQBB1x2FKh"

    # auth = OAuth1(oauth_consumer_key, oauth_consumer_secret, oauth_token, oauth_token_secret)

    # move CA into repo
    r = requests.get(url) #, verify="/Users/darcy/Drive/Aporia/Server/CA/Aporia.pem")

    return r.json()


def getStairs():
    import requests
    # from requests_oauthlib import OAuth1
    # import json

    url = settings.SQ_REST_API + '?per_page=100'
    #url = settings.SQ_REST_API + '?after=2019-04-01T00:00:00&date_query_column=post_modified&per_page=100'
    # oauth_consumer_key = settings.SQ_CONSUMER_KEY
    # oauth_consumer_secret = settings.SQ_CONSUMER_SECRET
    # oauth_token = "A9HPkYFtM8Yw5HCGxfcYB6Sc"
    # oauth_token_secret = "8hYLZPVGu6R7TTsrf0o0fDk67Ic8WLNhIM5o2dnQBB1x2FKh"

    # auth = OAuth1(oauth_consumer_key, oauth_consumer_secret, oauth_token, oauth_token_secret)

    # move CA into repo
    r = requests.get(url) #, verify="/Users/darcy/Drive/Aporia/Server/CA/Aporia.pem")
    # print('Total: '+str(r.headers['X-WP-Total']))
    # print('Total pages: '+str(r.headers['X-WP-TotalPages']))

    stairs = r.json()

    if( r.headers['X-WP-Total'] ):
        while( len(stairs) != int(r.headers['X-WP-Total']) ):
            offset = len(stairs)
            print('getting '+str(offset)+' out of '+str(r.headers['X-WP-Total'])+'...')
            r = requests.get(url+"&offset="+str(offset)) #, verify="/Users/darcy/Drive/Aporia/Server/CA/Aporia.pem")
            stairs.extend(r.json())

    return stairs
