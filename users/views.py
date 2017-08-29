from django.shortcuts import render
from django.core.urlresolvers import reverse
from django.contrib.auth import logout

# Create your views here.
def logout_view(request):
    """Log the user out"""
    logout(request)
    return HttpResponseRedirect(reverse('routines:index'))
