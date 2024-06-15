"""
URL configuration for greenhouse project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path, re_path
from websev import views
from rest_framework import routers, permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

router = routers.DefaultRouter()

schema_view = get_schema_view(
    openapi.Info(
        title="Snippets API",
        default_version='v1',
        description="Test description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),

    path(r'<int:id>/greenhouses', views.getGreenHouses), #Список теплиц оп id пользователя
    path(r'greenhouse/add', views.addGreenHouse, name='addGreenHouse'), #добавление теплицы
    path(r'greenhouse/<int:id>', views.getGreenHouse), #получение теплицы по id
    path(r'greenhouse/<int:id>/edit', views.editGreenHouse), #изменение теплицы
    path(r'greenhouse/<int:id>/delete', views.deleteGreenHouse), #удаление теплицы
    path(r'sensor/add', views.addSensor), #добавление датчика
    path(r'sensor/<int:id>/edit', views.editSensor),
    path(r'sensor/delete/<int:id>', views.deleteSensor), #удаление датчика по id
    path(r'greenhouse/<int:id>/climates', views.getClimate), #получение климата по id теплицы
    path(r'statistic/<int:id>/get', views.getClimates), #получение климатов по id датчика
    path(r'climate/add', views.addClimate), #добавление климата 
    path(r'sensors/<int:id>', views.getSensor),
    path(r'ping', views.ping),

    path(r'auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),

    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
