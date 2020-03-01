from django.urls import path
from .views import LeagueListView, LeagueDetailView, TeamJoinListView, TeamLeaveListView

urlpatterns = [
    path('', LeagueListView.as_view()),
    path('<int:pk>/', LeagueDetailView.as_view()),
    path('<int:pk>/join/<int:team_pk>/', TeamJoinListView.as_view()),
    path('<int:pk>/leave/<int:team_pk>/', TeamLeaveListView.as_view())
]