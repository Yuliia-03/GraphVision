from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.core.validators import RegexValidator

class UserManager(BaseUserManager):
      """
      Custom User Manager to handle user creation
      """
      def create_user(self, email, username, password):
            """
            Create and save a user
            """
            if not email:
                raise ValueError(("The Email must be set"))
            if not username:
                raise ValueError("Users must have a username")
            if not password:
                raise ValueError("Password must be set")
            
            ''' Normalises email by lowercasing the domain part '''
            email = self.normalize_email(email) 
            user = self.model(email=email, username=username)
            ''' Automatically hashes password before saving '''
            user.set_password(password)         
            user.save(using=self._db)
            return user

class User(AbstractBaseUser, PermissionsMixin):
     
     email = models.EmailField(max_length=100, unique=True, blank=False)
     username = models.CharField(max_length=30,
        unique=True,
        validators=[RegexValidator(
            regex=r'^@\w{3,}$',
            message='Username must consist of @ followed by at least three alphanumericals'
        )])
     USERNAME_FIELD = 'email' 
     
     def __str__(self):
        return self.username
     