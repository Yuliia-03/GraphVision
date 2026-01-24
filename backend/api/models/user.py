from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.core.validators import RegexValidator

class UserManager(BaseUserManager):
      """
      Custom User Manager to handle user creation
      """
      def create_user(self, email, password):
            """
            Create and save a user
            """
            if not email:
                raise ValueError(("The Email must be set"))
            if not password:
                raise ValueError("Password must be set")
            
            ''' Normalises email by lowercasing the domain part '''
            email = self.normalize_email(email) 
            user = self.model(email=email)
            ''' Automatically hashes password before saving '''
            user.set_password(password)         
            user.save(using=self._db)
            return user

class User(AbstractBaseUser, PermissionsMixin):
     
     email = models.EmailField(max_length=100, unique=True, blank=False)
     objects = UserManager()
     USERNAME_FIELD = 'email' 
     
     def __str__(self):
        return self.email
     