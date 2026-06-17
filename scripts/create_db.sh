#! /usr/bin/bash

psql -U postgres -h localhost -c "DROP DATABASE IF EXISTS hkstairs;"
psql -U postgres -h localhost -c "CREATE DATABASE hkstairs;"
psql -U postgres -h localhost -d hkstairs -c "CREATE EXTENSION PostGIS;"