from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from .models import User, MCQ_questions, scoring_MCQ_question
from django.http import JsonResponse
import json
from django.core.serializers import serialize

# Create your views here.
def index(request):
    return render(request, 'portal_view.html')

def register_student(request):
    return render(request,'register_student.html')

def register_teacher(request):
    return render(request, 'register_teacher.html')

def register(request):
    if request.POST['student_or_teacher'] == 'Student':
        name = request.POST['student_name']
        email_address = request.POST['student_email']
        password = request.POST['student_password']
        type_account = request.POST['student_or_teacher']
        save_student = User(username = name, email = email_address, account_type = type_account, password = password)
        save_student.save()
    else:
        name = request.POST['teacher_name']
        email_address = request.POST['teacher_email']
        password = request.POST['teacher_password']
        type_account = request.POST['student_or_teacher']
        save_teacher = User(username = name, email = email_address, account_type = type_account, password = password)
        save_teacher.save()
    return HttpResponseRedirect(reverse('index'))

def login(request):
    if request.method == "POST":
        email = request.POST['email']
        password = request.POST['password']
        try:
            user = User.objects.get(email=email, password = password)
            if user.account_type == 'Student':
                return render(request, 'student.html', {
                    "user": user.username
                })
            else: 
                return render(request, 'teacher.html',{
                    "user": user.username
                })
        except:
            return render(request, 'login.html', {
                "message": 'Invalid username and/or password.'
            })
    else:
        return render(request,'login.html')
    
def add_quiz(request):
    try:
        count = 1
        while -1 < 0:
            quiztitle = request.POST[f'quizTitle']
            quizInstructions = request.POST['quizInstructions']
            question = request.POST[f'question{count}']
            optionA = request.POST[f'optionA{count}']
            optionB = request.POST[f'optionB{count}']
            optionC = request.POST[f'optionC{count}']
            optionD = request.POST[f'optionD{count}']
            correctAns = request.POST[f'options{count}']
            create = MCQ_questions(quiz_name = quiztitle, quiz_instructions = quizInstructions, question = question, correct_ans = correctAns, option_one = optionA, option_two = optionB, option_three = optionC, option_four = optionD)
            create.save()
            count = count + 1
    except:
        username = request.POST['username']
        user_data = User.objects.get(username = username)
        email = user_data.email
        password = user_data.password
        return render(request, 'automate_login.html',{
            "email": email,
            "password": password
        })

def all_quizzes(request):
    quizzes = MCQ_questions.objects.all()
    return JsonResponse(json.loads(serialize("json",quizzes)), safe = False)

def student_quiz_view(request, quiz_name, username):
    all_data = MCQ_questions.objects.filter(quiz_name = quiz_name)
    for data in all_data:
        instructions = data.quiz_instructions
    #use quiz_name here to get instructions and pass them to the quiz's top
    return render(request, 'student_quiz_view.html',{
        "quiz_name":quiz_name,
        "user": username,
        "instructions": instructions
    })

def open_ques(request, quiz_name):
    questions = MCQ_questions.objects.filter(quiz_name = quiz_name)
    return JsonResponse(json.loads(serialize("json",questions)), safe = False)

def scoring(request):
    username = request.POST['users']
    quiz_name = request.POST['name_quiz']
    quiz_questions=MCQ_questions.objects.filter(quiz_name = quiz_name)
    count = 0
    score = 0
    for question in quiz_questions:
        correct_ans = question.correct_ans
        response = request.POST[f'option{count}{username}']
        response = response[1:2]
        if correct_ans == response:
            score = score + 1
        count = count + 1
    try:
        score = (score/count)*100
    except:
        return HttpResponse(f'Error, because the value of count was {count}')
    saving_scoring = scoring_MCQ_question(quiz_name = quiz_name, username = username, score = score)
    saving_scoring.save()
    if score == 0:
        score = '0'
    return render(request, 'student_quiz_view.html',{
        "score":score,
        "user": username
    })

def submittedquizzes(request, username):
    submitted_ques = scoring_MCQ_question.objects.filter(username = username)
    return JsonResponse(json.loads(serialize("json", submitted_ques)), safe = False)

def all_quiz_scores(request):
    all_ques = scoring_MCQ_question.objects.all()
    return JsonResponse(json.loads(serialize("json", all_ques)), safe = False)