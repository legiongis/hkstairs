#!/bin/bash
# full deployment of django app

. ENV/bin/activate
cd hkstairs
git pull
python manage.py collectstatic --noinput

echo -----------------------
echo "migrate db?"
select yn in "yes" "no"; do
    case $yn in
        yes ) python manage.py migrate; break;;
        no ) break;;
    esac
done

echo -----------------------
echo "setup db? (this will delete and recreate the db)"
select yn in "yes" "no"; do
    case $yn in
        yes ) python manage.py setup_db; break;;
        no ) break;;
    esac
done

echo -----------------------
echo "reload stairs? (this will delete all stairs and reload from shapefile)"
select yn in "yes" "no"; do
    case $yn in
        yes ) python manage.py load_stairs -f; break;;
        no ) break;;
    esac
done

sudo /sbin/service httpd restart
cd ..
