# pylint: disable=no-member
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Player
from .serializers import PlayerSerializer

class PlayerListView(APIView):

    def get(self, _request):

        players = Player.objects.all()
        serialized_players = PlayerSerializer(players, many=True)

        return Response(serialized_players.data)