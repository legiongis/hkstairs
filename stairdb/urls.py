from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^json/(?P<stairid>[\w-]+)/$', views.get_stairs, name='stair_json'),
]
