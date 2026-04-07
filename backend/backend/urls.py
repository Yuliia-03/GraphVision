"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from api.views import SignUpView, LogInView, SaveGraph, SampleGraphs, GraphDetail

urlpatterns = [
    path('admin/', admin.site.urls),
    path('signup/', SignUpView.as_view()),
    path('login/', LogInView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('get_samples/', SampleGraphs.as_view(), name='token_refresh'),
    path('save_graph/', SaveGraph.as_view(), name='token_refresh'),

    path("get_graph/<int:graph_id>/", GraphDetail.as_view(), name="graph-detail"),
    path("edit_graph/<int:graph_id>/", GraphDetail.as_view(), name="edit_graph"),
    path("delete_graph/<int:graph_id>/", GraphDetail.as_view(), name="delete_graph"),
]
