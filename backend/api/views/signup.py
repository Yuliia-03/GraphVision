from api.models import User

from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import IntegrityError
from django.core.exceptions import ValidationError
from rest_framework import status

class SignUpView(APIView):

    def post(self, request):
        try:
            data = request.data

            email = data.get("email", "").strip()
            password = data.get("password", "").strip()
            password_confirmation = data.get("passwordConfirmation")

            user = User.objects.create_user(email=email, password=password)
            user.full_clean() 
            user.save()

            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        
        except IntegrityError:
            return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

        except ValidationError as e:
            return Response({"error": e.message_dict}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"error": "An unexpected error occurred", "details": str(e)}, status=status.HTTP_400_BAD_REQUEST)
