#! /usr/bin/env bash

source ../ENV/bin/activate
cd ../hkstairs
python manage.py update_from_sq --stage
python manage.py update_from_sq --run
deactivate
