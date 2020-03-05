from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_422_UNPROCESSABLE_ENTITY, HTTP_401_UNAUTHORIZED, HTTP_404_NOT_FOUND, HTTP_204_NO_CONTENT
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt

from .serializers import UserSerializer, PopulatedUserSerializer, EditUserSerializer
User = get_user_model()

class RegisterView(APIView):

    def post(self, request):

        serialized_user = UserSerializer(data=request.data)

        if serialized_user.is_valid():
            serialized_user.save()
            return Response({'message': 'Registration Succesful'})

        return Response(serialized_user.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class LoginView(APIView):
  
    def post(self, request):

        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = User.objects.get(email=email)

            if not user.check_password(password):
                raise PermissionDenied({'message': 'Invalid Credentails'})

            dt = datetime.now() + timedelta(days=7)
            token = jwt.encode({'sub': user.id, 'exp': int(dt.strftime('%s'))}, settings.SECRET_KEY, algorithm='HS256')

            serialized_user = UserSerializer(user)

            return Response({
                'token': token,
                'message': f'Welcome back {user.first_name}',
                'user': serialized_user.data
            })

        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid Credentails'})

class ProfileView(APIView):

    # permission_classes = (IsAuthenticated, )

    # def get(self, request):
    #     user = User.objects.get(pk=request.user.id)
    #     serialized_user = UserSerializer(user)
    #     return Response(serialized_user.data)

    def get(self, request, pk):
        user = User.objects.get(pk=pk)
        serialized_user = PopulatedUserSerializer(user)
        return Response(serialized_user.data)

    def put(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
            serialized_user = UserSerializer(user)
            if serialized_user.data['id'] != request.user.id:
                return Response(status=HTTP_401_UNAUTHORIZED)
            updated_user = EditUserSerializer(user, data=request.data)
            if updated_user.is_valid():
                updated_user.save()
                return Response(updated_user.data)
            return Response(updated_user.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
            if user.id != request.user.id:
                return Response(status=HTTP_401_UNAUTHORIZED)
            user.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)