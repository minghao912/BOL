from django.urls import path, include
from . import views
from . import messaging

urlpatterns = [
    path('test/', views.test),
    path('sources/', views.sources),
    path('sources/get/<int:id>', views.getSource),
    path('sources/get/all', views.getAll),
    path('sources/create/', views.createSource),
    path('sources/update/<int:id>', views.updateSource),
    path('sources/delete/<int:id>', views.deleteSource),

    # GAMERS
    path('sources/getMessages/<str:userID>', messaging.getMessages),
    path('sources/addMessage', messaging.addMessage)
]