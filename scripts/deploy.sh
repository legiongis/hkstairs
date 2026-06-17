#!/bin/bash
# full deployment of django app

## get the path to this script's directory
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
## set path to project root (parent of scripts directory)
PROJECT_ROOT=$(dirname $SCRIPT_DIR)

cd $PROJECT_ROOT

git pull
uv run manage.py collectstatic --noinput

echo -----------------------
echo "migrate db?"
select yn in "yes" "no"; do
    case $yn in
        yes ) uv run manage.py migrate; break;;
        no ) break;;
    esac
done

echo -----------------------
echo "setup db? (this will delete and recreate the db)"
select yn in "yes" "no"; do
    case $yn in
        yes ) uv run manage.py setup_db; break;;
        no ) break;;
    esac
done

echo -----------------------
echo "reload stairs? (this will delete all stairs and reload from shapefile)"
select yn in "yes" "no"; do
    case $yn in
        yes ) uv run manage.py load_stairs -f; break;;
        no ) break;;
    esac
done

sudo systemctl restart gunicorn.service
cd ..
