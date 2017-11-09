import os
import csv
from django.conf import settings

def refresh_csv(table_name=""):
    print("refreshing CSV from StairQuest database...")
    
    outfile = os.path.join(settings.BASE_DIR,"stairdb","management","commands","tmp_data",table_name+'.csv')

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

    print("  -- done. file has",ct,"rows".)
    
    return outfile