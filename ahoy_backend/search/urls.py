from django.urls import path

from search.views import search_view

urlpatterns = [path("<str:search_text>/", search_view, name="search")]
