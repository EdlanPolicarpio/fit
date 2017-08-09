"""Define URL patterns for routines"""
from django.conf.urls import url
from . import views
urlpatterns = [
	#Home page
	url(r'^$',views.index,name='index'),
	#Individual Routine Page
	url(r'^routine/(?P<routine_id>\d+)$',views.routine,name='routine'),
	#Create a New Routine
	url(r'^new_routine/$',views.new_routine,name='new_routine'),
]
