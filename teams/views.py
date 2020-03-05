# pylint: disable=no-member
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_202_ACCEPTED, HTTP_401_UNAUTHORIZED
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Team
from .serializers import TeamSerializer, PopulatedTeamSerializer, PlayerSerializer

class TeamListView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):

        teams = Team.objects.all()
        serialized_teams = PopulatedTeamSerializer(teams, many=True)

        return Response(serialized_teams.data)

    def post(self, request):

        request.data['manager'] = request.user.id
        team = TeamSerializer(data=request.data)
        if team.is_valid():
            team.save()
            return Response(team.data, status=HTTP_201_CREATED)

        return Response(team.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class TeamDetailView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request, pk):

        try:
            team = Team.objects.get(pk=pk)
            serialized_team = PopulatedTeamSerializer(team)
            return Response(serialized_team.data)
        except:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

    def put(self, request, pk):

        request.data['manager'] = request.user.id
        try:
            team = Team.objects.get(pk=pk)
            if team.manager.id != request.user.id:
                return Response(status=HTTP_401_UNAUTHORIZED)
            updated_team = TeamSerializer(team, data=request.data)
            if updated_team.is_valid():
                updated_team.save()
                return Response(updated_team.data)
            return Response(updated_team.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

    def delete(self, request, pk):

        try:
            team = Team.objects.get(pk=pk)
            if team.manager.id != request.user.id:
                return Response(status=HTTP_401_UNAUTHORIZED)
            team.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        except Team.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)