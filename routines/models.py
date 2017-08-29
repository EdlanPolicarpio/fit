from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Movement(models.Model):
        """Name, Description(blank = True)"""
        name = models.CharField(max_length = 100)
        desc = models.TextField(blank=True,default='')
        def __str__(self):
                return self.name

class Routine(models.Model):
        """name, Day(PK), Workout(FK), Cycle Length"""
        name = models.CharField(max_length = 100)
        desc = models.TextField(blank = True)
        owner = models.ForeignKey(User)
        def __str__(self):
                return self.name

class Workout(models.Model):
        """"""
        routine = models.ForeignKey(Routine)
        day = models.PositiveIntegerField(default = 0)
        name = models.CharField(max_length = 100, default = '')
        def __str__(self):
                return self.name


class Excercise(models.Model):
        """Movement(FK), Set Scheme, Rep Scheme"""
        #name = models.CharField(max_length = 100)
        name = models.ForeignKey(Movement)
        workout = models.ForeignKey(Workout)
        reps = models.PositiveIntegerField()
        sets = models.PositiveIntegerField()
        order = models.PositiveIntegerField()
        def __str__(self):
                string = str(self.name)
                string += " (" + str(self.sets) + "X" + str(self.reps) + ")"
                return string

