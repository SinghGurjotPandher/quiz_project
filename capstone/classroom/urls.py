from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name = "index"),
    path("register_student", views.register_student, name = "register_student"),
    path("register_teacher", views.register_teacher, name = "register_teacher"),
    path("register", views.register, name = "register"),
    path("login", views.login, name = "login"),
    path("add_quiz", views.add_quiz, name = "add_quiz"),
    path("all_quizzes", views.all_quizzes, name ="all_quizzes"), #API Route
    path("student_quiz_view/<str:quiz_name>/<str:username>", views.student_quiz_view, name = "student_quiz_view"),
    path("open_ques/<str:quiz_name>", views.open_ques, name = "open_ques"), #API Route
    path("scoring", views.scoring, name="scoring"),
    path("submittedquizzes/<str:username>", views.submittedquizzes, name = "submittedquizzes"), #API Route
    path("all_quiz_scores", views.all_quiz_scores, name = "all_quiz_scores") #API Route
]