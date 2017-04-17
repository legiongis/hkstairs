# hkstairs

Installing this app locally should be very straight-forward.

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


