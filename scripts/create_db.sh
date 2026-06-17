#! /usr/bin/bash

DBNAME=hkstairs

psql -U postgres -c "DROP DATABASE IF EXISTS $DBNAME;"
psql -U postgres -c "CREATE DATABASE $DBNAME;"
psql -U postgres -d hkstairs -c "CREATE EXTENSION PostGIS;"
