from rest_framework import serializers
from django.contrib.auth import get_user_model
from players.models import Player
from .models import Team
from leagues.models import League

User = get_user_model()

class LeagueSerializer(serializers.ModelSerializer):

    class Meta:
        model = League
        fields = ('name',)

class ManagerSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'

class PlayerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Player
        fields = '__all__'

class TeamSerializer(serializers.ModelSerializer):

    def validate(self, data):

        goalkeepers = data.get('goalkeepers')
        defenders = data.get('defenders')
        midfielders = data.get('midfielders')
        forwards = data.get('forwards')

        if len(goalkeepers) != 1:
            raise serializers.ValidationError({'goalkeepers': 'Must select 1 goalkeeper'})

        if len(defenders) != 4:
            raise serializers.ValidationError({'defenders': 'Must select 4 defenders'})

        if len(midfielders) != 4:
            raise serializers.ValidationError({'midfielders': 'Must select 4 midfielders'})

        if len(forwards) != 2:
            raise serializers.ValidationError({'forwards': 'Must select 2 forwards'})
        
        if sum(goalkeeper.cost for goalkeeper in goalkeepers) + sum(defender.cost for defender in defenders) + sum(midfielders.cost for midfielders in midfielders) + sum(forwards.cost for forwards in forwards) > 90:
            raise serializers.ValidationError({'cost': 'You have exceeded the budget'})

        data['goalkeepers'] = goalkeepers
        data['defenders'] = defenders
        data['midfielders'] = midfielders
        data['forwards'] = forwards

        return data

    class Meta:
        model = Team
        fields = '__all__'

class PopulatedTeamSerializer(TeamSerializer):
    
    goalkeepers = PlayerSerializer(many=True)
    defenders = PlayerSerializer(many=True)
    midfielders = PlayerSerializer(many=True)
    forwards = PlayerSerializer(many=True)
    manager = ManagerSerializer()
    leagues = LeagueSerializer(many=True)