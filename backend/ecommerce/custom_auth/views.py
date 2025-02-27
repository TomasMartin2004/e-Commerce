from rest_framework import generics
from .models import User
from .serializers import UserSerializer, UserDetailSerializer, UserIdSerializer, ChangePasswordSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
import random

#quiero ponerle a las clases permisos para consumir su endpoint
#para eso debo importar la clase IsAuthenticated de rest_framework.permissions
#y agregarle el atributo permission_classes = [IsAuthenticated] a la clase

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    #permission_classes = [IsAuthenticated] 

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = [IsAuthenticated]

class UserData(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserIdSerializer
    permission_classes = (IsAuthenticated,)
    
    def get_object(self, queryset=None):
    # Retrieve the authenticated user from the request
        return self.request.user

class ChangePassword(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = ChangePasswordSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        return self.request.user

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            if not user.check_password(serializer.data.get('old_password')):
                return Response({'old_password': 'Wrong password.'}, status=400)
            if serializer.data.get('new_password') != serializer.data.get('confirm_password'):
                return Response({'new_password': 'Passwords do not match.'}, status=400)
            user.set_password(serializer.data.get('new_password'))
            user.save()
            return Response({'status': 'Password updated.'})
        return Response(serializer.errors, status=400)
    
selected_users = None

class SimulateKinesiologyAPI(APIView):
    def get(self, request, *args, **kwargs):
        data = [
            {"correo": "john@doe.com"},
            {"correo": "tomasito@gmail.com"}
        ]
        return Response(data)
