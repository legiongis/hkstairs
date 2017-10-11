import os
import csv
from django.conf import settings

def refresh_csv(table_name=""):
    print("refreshing CSV from StairQuest database...")

    try:
        import mysql.connector
        cnx = mysql.connector.connect(**settings.SQ_DATABASE)
        print("  -- connected to db")
    except:
        print("  -- unable to connect to db, using cached data")
        return
    
    print("  -- updating "+table_name)
    cur = cnx.cursor(buffered=True)
    cur.execute("DESCRIBE {};".format(table_name))
    colnames = [i[0] for i in cur]

    query = "SELECT * from {};".format(table_name)
    cur.execute(query)

    with open(os.path.join(settings.BASE_DIR,"stairdb","management","commands","tmp_data",table_name+'.csv'),'wb') as out_csv:
        write = csv.writer(out_csv)
        write.writerow(colnames)
        for row in cur:
            write.writerow(row)

    print("  -- done")