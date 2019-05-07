# Hong Kong Stair Archive

You will need Postgres/PostGIS and Python 2.7, and then installing this app locally should be very straight-forward.

+ make a virtual environment and activate it

+ clone this repo

+ enter repo and run

    `pip install -r requirements.txt`
    
+ create a settings_local.py file that contains your necessary postgres credentials AND a MAPBOX_API_KEY with your key

+ setup the database with

    `python manage.py setup_db`
    
+ populate the database from the included shapefile with

    `python manage.py load_stairs -f`
    
+ run the django dev server as usual and view in browser at `localhost:8000`

    `python manage.py runserver`




## Images

The database uploads, gets geo data, rotates the images and saves it to the database

Other image sizes are available. At the moment, it is just a thumbnail, generated dynamically using sorl-thumbnails

You can add additional sizes in serializers.py and regenerate them with:

	`python manage.py thumbnail clear_delete_all`


## Cache

There is a cache for the map data (json), which can be cleared with:

	`python manage.py refresh_map_cache`


## Revisions

I found a way to add revisions, but in order to have initial revisions before running my script to grab new data from StairQuest, you need to run:

	`python manage.py createinitialrevisions`