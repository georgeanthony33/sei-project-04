from django.urls import path
from .views import DenzelListView

urlpatterns = [
    path('', DenzelListView.as_view())
]