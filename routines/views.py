from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect, Http404
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
#import models, forms
from .models import Routine,Workout,Excercise
from .forms import RoutineForm,WorkoutForm,WorkoutFormSet,ExcerciseFormSet, Extra_ExcerciseFormSet


# Create your views here.

def index(request):
        routines = Routine.objects.all()
        context = {'routines' : routines}
        return render(request, 'routines/index.html', context)

def routine(request,routine_id):
        routine = Routine.objects.get(id=routine_id)
        workouts = Workout.objects.filter(routine__id=routine_id).order_by('day')
        excercises = Excercise.objects.filter(workout__routine__id=routine.id)
        #create a workout dict (to be used in the template)
        wo_dict = {}
        ex_dict = {}
        for d in range(0,routine.num_days):
                wo = list(workouts.filter(day=d).values('name'))
                if(wo != []):
                        wo_dict[d] = wo 
        for d in wo_dict:
                ex = list(excercises.filter(workout__day = d).order_by('order').order_by('workout__id'))
                if(ex != []):
                        ex_dict[d] = ex
        context = {'routine':routine, 'workouts':workouts, 'wo_dict':wo_dict, 'ex_dict':ex_dict}
        return render(request,'routines/routine.html', context)

@login_required
def new_routine(request):
        if request.method != 'POST':
                form = RoutineForm()
        else:
                form = RoutineForm(request.POST)
                if form.is_valid():
                        routine = form.save(commit=False)
                        routine.owner = request.user
                        routine.save
                        return HttpResponseRedirect(reverse('routines:edit_routine', kwargs={"routine_id":routine.id}))
        context = {'form':form}
        return render(request,'routines/new_routine.html', context)

@login_required
def edit_routine(request,routine_id):
    routine = get_object_or_404(Routine, id=routine_id)
    #routine = Routine.objects.get_object_or_404(id=routine_id)
    if routine.owner != request.user:
        raise Http404
    workouts = Workout.objects.filter(routine=routine_id).order_by('day')
    excercises = Excercise.objects.filter(workout__routine = routine_id)
    if request.method == 'POST':
        #Process the excercises
        for wo in workouts:
            ex_formset = ExcerciseFormSet(request.POST, request.FILES,
                    prefix = "excercises-"+str(wo.id),instance = wo)
            for form in ex_formset.forms:
                if form.is_valid():
                    if (not 'DELETE' in form.cleaned_data.keys()):
                        continue
                    if(form.cleaned_data['DELETE']):
                        excercise = form.cleaned_data['id']
                        Excercise.objects.get(id = excercise.id).delete()
                    else:
                        form.save()
        #Process the workouts
        wo_formset = WorkoutFormSet(request.POST, request.FILES, instance=routine)
        for form in wo_formset.forms:
            #Check that form is valid AND namefield is non-empty
            if form.is_valid() and 'name' in form.cleaned_data.keys():
                if(form.cleaned_data['DELETE']):
                    workout = form.cleaned_data['id']
                    Workout.objects.get(id=workout.id).delete()
                else:
                    form.save()
            else:
                print(str(form.errors))
        return HttpResponseRedirect(reverse('routines:edit_routine', kwargs={"routine_id":routine_id}))
    else:
        blank_ex = Extra_ExcerciseFormSet(prefix = "excercises-[WO]")
        wo_formset = WorkoutFormSet(instance = routine)
        ex_fs_dict = {}
        for wo in workouts:
            ex_fs_dict[wo.id] = ExcerciseFormSet(prefix = "excercises-"+ str(wo.id), instance = wo)
        
        context = {'wo_formset':wo_formset, 'ex_fs_dict': ex_fs_dict, 'blank_ex':blank_ex, 'routine':routine}
        return render(request, 'routines/edit_routine.html', context)
