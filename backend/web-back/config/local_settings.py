from .settings import *

DEBUG = True

ALLOWED_HOSTS = ['*']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'youtubeTrend',
        'USER': 'sample',
        'PASSWORD': 'sample',
        'HOST': 'db',
        'PORT': '3306',
    }
}