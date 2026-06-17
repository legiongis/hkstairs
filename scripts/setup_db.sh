#! /usr/bin/bash

## get the path to this script's directory
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
## set path to project root (parent of scripts directory)
PROJECT_ROOT=$(dirname $SCRIPT_DIR)

source $SCRIPT_DIR/create_db.sh

cd $PROJECT_ROOT

uv run manage.py migrate

export DJANGO_SUPERUSER_USERNAME=admin
export DJANGO_SUPERUSER_EMAIL=admin@example.com
export DJANGO_SUPERUSER_PASSWORD=admin

uv run manage.py createsuperuser --noinput
