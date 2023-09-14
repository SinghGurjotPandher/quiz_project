from django.db import models

# Create your models here.
class User(models.Model):
    account_type = models.CharField(max_length=64, default = None)
    username = models.CharField(max_length=64, default = None)
    password = models.CharField(max_length=64, default = None)
    email = models.CharField(max_length=70, default = None)

class MCQ_questions(models.Model):
    quiz_name = models.CharField(max_length=64, default = None)
    quiz_instructions = models.CharField(max_length=64, default = None)
    question = models.CharField(max_length=500, default = None)
    correct_ans = models.CharField(max_length=100, default = None)
    option_one = models.CharField(max_length=100, default = None)
    option_two = models.CharField(max_length=100, default = None)
    option_three = models.CharField(max_length=100, default = None)
    option_four = models.CharField(max_length=100, default = None)

class scoring_MCQ_question(models.Model):
    quiz_name = models.CharField(max_length=64, default = None)
    username = models.CharField(max_length=64, default = None)
    score = models.IntegerField(default = None)