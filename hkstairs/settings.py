"""
Django settings for hkstairs project.

Generated by 'django-admin startproject' using Django 1.10.5.

For more information on this file, see
https://docs.djangoproject.com/en/1.10/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.10/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.10/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'XXX-XX-XXXX'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# Enables cache
USE_CACHE = True

ALLOWED_HOSTS = ['localhost','projects.legiongis.com']

# Application definition

INSTALLED_APPS = [
    'stairdb',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.gis',
    'leaflet',
    'rest_framework',
    'rest_framework_gis',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'hkstairs.urls'

# string that can be passed to js to fix up the subdirectory url structure
# this should be left empty here and only defined in settings_local
LOCAL_URL = ''

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'stairdb.context_processors.local_url',
                'stairdb.context_processors.mapbox_api_key',
            ],
        },
    },
]

WSGI_APPLICATION = 'hkstairs.wsgi.application'

# Database
# https://docs.djangoproject.com/en/1.10/ref/settings/#databases

# XX settings will be defined locally
DATABASES = {
    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': 'hkstairs',
        'USER': 'XXX-XX-XXXX',
        'PASSWORD': 'XXX-XX-XXXX',
        'HOST': 'localhost',
        'PORT': '5432',
        'POSTGIS_TEMPLATE': 'XXX-XX-XXXX',
    }
}


# Password validation
# https://docs.djangoproject.com/en/1.10/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/1.10/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.10/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR,"stairdb","static"),
]

LEAFLET_CONFIG = {
    'DEFAULT_CENTER': (22.28,114.15),
    'DEFAULT_ZOOM': 14,
    'MIN_ZOOM': 13,
    'MAX_ZOOM': 19,
    'SPATIAL_EXTENT': (114, 22.2, 114.25, 22.35),
    'SCALE': None,
    'TILES': [],
    'MINIMAP': False,
    'PLUGINS': {
        'fullscreen': {
            'css': ['https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/leaflet.fullscreen.css'],
            'js': 'https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/Leaflet.fullscreen.min.js',
            'auto-include': True,
        },
        'markercluster': {
            'css': ['https://unpkg.com/leaflet.markercluster@1.0.3/dist/MarkerCluster.Default.css','https://unpkg.com/leaflet.markercluster@1.0.3/dist/MarkerCluster.css'],
            'js': 'https://unpkg.com/leaflet.markercluster@1.0.3/dist/leaflet.markercluster.js',
            'auto-include': True,
        },
        'minimap': {
            'css': [STATIC_URL + 'plugins/Control.MiniMap.min.css'],
            'js': STATIC_URL + 'plugins/Control.MiniMap.min.js',
            'auto-include': True,
        },
        'leaflet-hash': {
            'css': [],
            'js': STATIC_URL + 'plugins/leaflet-hash.js',
            'auto-include': True,
        },
        'leaflet-search': {
            'css': [STATIC_URL + 'plugins/leaflet-search/leaflet-search.min.css'],
            'js': STATIC_URL + 'plugins/leaflet-search/leaflet-search.src.js',
            'auto-include': True,
        },
    }
}

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
        'LOCATION': os.path.join(BASE_DIR,'stairdb','cache')
    }
}

X_FRAME_OPTIONS = 'ALLOWALL' #'ALLOW-FROM https://stairculture.com/'

try:
    from settings_local import *
except ImportError:
    raise Exception("A local_settings.py file is required to run this project")
