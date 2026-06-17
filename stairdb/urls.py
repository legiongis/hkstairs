from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('stair', views.StairViewSet)

urlpatterns = [
    path("", views.index, name='index'),
    path("", include(router.urls)),
    path("stairquest/<int:stairid>/", views.StairQuestView.as_view())
    # url(r'^json/(?P<stairid>[\w-]+)/$', views.get_stairs, name='stair_json'),
]