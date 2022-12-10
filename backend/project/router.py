

from rest_framework.routers import DefaultRouter, SimpleRouter
from project import settings
from plc.views import ControllerViewSet

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router.register('plcs', ControllerViewSet, basename='plcs')

urlpatterns = router.urls
