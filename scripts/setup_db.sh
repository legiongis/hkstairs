#! /usr/bin/bash

source ./create_db.sh

uv run manage.py migrate

export DJANGO_SUPERUSER_USERNAME=admin
export DJANGO_SUPERUSER_EMAIL=admin@example.com
export DJANGO_SUPERUSER_PASSWORD=admin

uv run manage.py createsuperuser --noinput
