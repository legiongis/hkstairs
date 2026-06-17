# Hong Kong Stair Archive

You will need Postgres/PostGIS and [uv](https://docs.astral.sh/uv/). `uv` is a Python package manager that will handle the installation of the correct Python version, as well as all dependency packages. There is no need to explicitly create and activate a virtual environment.

+ clone this repo

    `git clone https://github.com/legiongis/hkstairs

+ enter repo and run

    `uv sync`

+ create a settings_local.py file that contains your necessary postgres credentials AND a MAPBOX_API_KEY with your key

+ setup the database with

    `uv run manage.py setup_db`
    
+ populate the database from the included shapefile with

    `uv run manage.py load_stairs -f`
    
+ run the django dev server as usual and view in browser at `localhost:8000`

    `uv run manage.py runserver`


## Images

The database uploads, gets geo data, rotates the images and saves it to the database

Other image sizes are available. At the moment, it is just a thumbnail, generated dynamically using sorl-thumbnails

You can add additional sizes in serializers.py and regenerate them with:

	`uv run manage.py thumbnail clear_delete_all`


## Cache

There is a cache for the map data (json), which can be cleared with:

	`uv run manage.py refresh_map_cache`


## Revisions

I found a way to add revisions, but in order to have initial revisions before running my script to grab new data from StairQuest, you need to run:

	`uv run manage.py createinitialrevisions`
