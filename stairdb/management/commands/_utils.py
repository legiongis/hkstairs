import os
import csv
from datetime import datetime
from django.conf import settings

def refresh_csv(table_name=""):
    print("refreshing CSV from StairQuest database...")
    
    filename = "{}_{}.csv".format(table_name,datetime.today().strftime("%m%d%Y"))
    outfile = os.path.join(settings.BASE_DIR,"stairdb","management","commands","tmp_data",filename)

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
    
    print("  -- updating "+table_name)
    cur = cnx.cursor(buffered=True)
    cur.execute("DESCRIBE {};".format(table_name))
    colnames = [i[0] for i in cur]

    query = "SELECT * from {};".format(table_name)
    cur.execute(query)

    
    with open(outfile,'wb') as out_csv:
        write = csv.writer(out_csv)
        write.writerow(colnames)
        ct=0
        for row in cur:
            ct+=1
            write.writerow(row)

    print("  -- done. file has",ct,"rows")
    
    return outfile


def getStairs():
    import requests
    from requests_oauthlib import OAuth1
    import json

    url = settings.SQ_HOST+"/wp-json/stairquest/v1/stairs"
    oauth_consumer_key = settings.SQ_CONSUMER_KEY
    oauth_consumer_secret = settings.SQ_CONSUMER_SECRET
    oauth_token = "A9HPkYFtM8Yw5HCGxfcYB6Sc"
    oauth_token_secret = "8hYLZPVGu6R7TTsrf0o0fDk67Ic8WLNhIM5o2dnQBB1x2FKh"

    auth = OAuth1(oauth_consumer_key, oauth_consumer_secret, oauth_token, oauth_token_secret)

    ## move CA into repo
    r = requests.get(url, verify = "/Users/darcy/Drive/Aporia/Server/CA/Aporia.pem")
    stairs = r.json()

    return stairs
