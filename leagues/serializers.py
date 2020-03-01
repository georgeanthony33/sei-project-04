from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import League, Team

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'

class TeamSerializer(serializers.ModelSerializer):

    class Meta:
        model = Team
        fields = '__all__'

class NestedTeamSerializer(serializers.ModelSerializer):

    class Meta:
        model = Team
        fields = ('id', 'teamName', 'manager', 'teamPoints')

class LeagueSerializer(serializers.ModelSerializer):

    class Meta:
        model = League
        fields = '__all__'

class PopulatedTeamSerializer(TeamSerializer):

    manager = UserSerializer()
    # leagues = LeagueSerializer(many=True)

class PopulatedLeagueSerializer(LeagueSerializer):

    creator = UserSerializer()
    teams = TeamSerializer(many=True)