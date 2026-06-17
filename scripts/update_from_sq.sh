#! /usr/bin/env bash

## get the path to this script's directory
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
## set path to project root (parent of scripts directory)
PROJECT_ROOT=$(dirname $SCRIPT_DIR)

cd $PROJECT_ROOT

## run update commands
uv run manage.py update_from_sq --stage
uv run manage.py update_from_sq --run
