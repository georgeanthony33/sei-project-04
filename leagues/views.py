# pylint: disable=no-member
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_202_ACCEPTED, HTTP_401_UNAUTHORIZED
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import League, Team
from .serializers import LeagueSerializer, PopulatedLeagueSerializer, TeamSerializer, NestedTeamSerializer

class LeagueListView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):

        leagues = League.objects.all()
        serialized_leagues = PopulatedLeagueSerializer(leagues, many=True)

        return Response(serialized_leagues.data)

    def post(self, request):

        request.data['creator'] = request.user.id
        league = LeagueSerializer(data=request.data)
        if league.is_valid():
            league.save()
            return Response(league.data, status=HTTP_201_CREATED)

        return Response(league.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class LeagueDetailView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request, pk):

        try:
            league = League.objects.get(pk=pk)
            serialized_league = PopulatedLeagueSerializer(league)
            return Response(serialized_league.data)
        except:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

    def put(self, request, pk):

        request.data['creator'] = request.user.id
        try:
            league = League.objects.get(pk=pk)
            if league.creator.id != request.user.id:
                return Response(status=HTTP_401_UNAUTHORIZED)
            updated_league = LeagueSerializer(league, data=request.data)
            if updated_league.is_valid():
                updated_league.save()
                return Response(updated_league.data)
            return Response(updated_league.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

    def delete(self, request, pk):

        try:
            league = League.objects.get(pk=pk)
            if league.creator.id != request.user.id:
                return Response(status=HTTP_401_UNAUTHORIZED)
            league.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        except League.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

class TeamJoinListView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def put(self, request, **kwargs):
        # get the leagues and teams
        league = League.objects.get(pk=kwargs['pk'])
        team = Team.objects.get(pk=kwargs['team_pk'])

        if team.manager.id != request.user.id:
            return Response(status=HTTP_401_UNAUTHORIZED)

        # serialize them in order to be able to manipulate the data
        serialized_team = NestedTeamSerializer(team)
        serialized_league = LeagueSerializer(league)
        serialized_league.data.get('teams').append(serialized_team.data.get('id'))

        # after appending the new team to the leagues' existing teams list, we use the serializer to 'serialize' the updated data
        data = serialized_league.data
        updated_league = LeagueSerializer(league, data=data)

        # if everything 'matches' up with the model
        if updated_league.is_valid():
            # then you can save the data
            updated_league.save()
            return Response(updated_league.data, status=HTTP_202_ACCEPTED)
        return Response(updated_league.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class TeamLeaveListView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def put(self, request, **kwargs):
        # get the leagues and teams
        league = League.objects.get(pk=kwargs['pk'])
        team = Team.objects.get(pk=kwargs['team_pk'])

        if team.manager.id != request.user.id:
            return Response(status=HTTP_401_UNAUTHORIZED)

        # serialize them in order to be able to manipulate the data
        serialized_team = NestedTeamSerializer(team)
        serialized_league = LeagueSerializer(league)
        serialized_league.data.get('teams').remove(serialized_team.data.get('id'))

        # after appending the new team to the leagues' existing teams list, we use the serializer to 'serialize' the updated data
        data = serialized_league.data
        updated_league = LeagueSerializer(league, data=data)

        # if everything 'matches' up with the model
        if updated_league.is_valid():
            # then you can save the data
            updated_league.save()
            return Response(updated_league.data, status=HTTP_202_ACCEPTED)
        return Response(updated_league.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)