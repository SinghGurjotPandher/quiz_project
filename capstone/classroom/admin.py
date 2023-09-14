from django.contrib import admin
from .models import User, MCQ_questions, scoring_MCQ_question

# Register your models here.
admin.site.register(User)
admin.site.register(MCQ_questions)
admin.site.register(scoring_MCQ_question)