from django import forms
from django.forms import inlineformset_factory
from .models import Routine, Workout, Excercise

class ExcerciseForm(forms.ModelForm):
        class Meta:
                model = Excercise
                fields = ['name','workout','reps','sets','order']

class WorkoutForm(forms.ModelForm):
        class Meta:
               model = Workout
               fields = ['name','day']
class RoutineForm(forms.ModelForm):
        class Meta:
                model = Routine
                fields = ['name','num_days','desc']

#Formsets

WorkoutFormSet = inlineformset_factory(Routine, Workout, fields=('name','day',), 
        extra = 0, can_delete=True, 
        widgets = {
            'name':forms.TextInput(attrs={'class':'wo_name'}),
             'day':forms.TextInput(attrs={'class':'wo_day'}), 
            })
