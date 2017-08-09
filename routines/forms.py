from django import forms

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

