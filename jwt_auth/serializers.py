from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from teams.models import Team
from leagues.models import League
from players.models import Player

User = get_user_model()

class TeamSerializer(serializers.ModelSerializer):

    class Meta:
        model = Team
        fields = '__all__'

class LeagueSerializer(serializers.ModelSerializer):

    class Meta:
        model = League
        fields = '__all__'

class PlayerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Player
        fields = '__all__'

class PopulatedTeamSerializer(TeamSerializer):

    leagues = LeagueSerializer(many=True)
    goalkeepers = PlayerSerializer(many=True)
    defenders = PlayerSerializer(many=True)
    midfielders = PlayerSerializer(many=True)
    forwards = PlayerSerializer(many=True)

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):

        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise serializers.ValidationError({'password_confirmation': 'Does Not Match'})

        # try:
        #     validations.validate_password(password=password)
        # except ValidationError as err:
        #     raise serializers.ValidationError({'password_confirmation': err.messages})

        data['password'] = make_password(password)

        return data

    class Meta:
        model = User
        fields = '__all__'

class EditUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'first_name', 'second_name', 'email', 'user_image')

class PopulatedUserSerializer(UserSerializer):

    teams = PopulatedTeamSerializer(many=True)
    leagues = LeagueSerializer(many=True)