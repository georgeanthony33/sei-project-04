import requests
from rest_framework.views import APIView
from rest_framework.response import Response

class ProxyPlayerFetch(APIView):

    def get(self, _request):
        resp = requests.get('https://fantasy.premierleague.com/api/element-summary/1/')
        return Response(resp.json())