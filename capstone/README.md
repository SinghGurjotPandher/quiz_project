# Quiz Project

## Description
Designed a Google Classroom like website where teachers can assign multiple-choice quizzes to registered students. Teachers can create unlimited quizzes and for each of the quizzes, they can choose the number of questions they would like to add. Teacher registered accounts are given the special access, where only they can assign quizzes and view scores of all student scores. However, student registered accounts can only _view_ assigned quizzes and view their _own_ submitted quiz scores.

- **Login/Register Page**: users are given the option either login or register for a student account or a teacher accounts.
- **Teacher Accounts**:
	- **Class Page**:
		- The course page shows the class name, overview, and big ideas with class name being bold.
		- This page includes “Home,” “Quizzes Assigned,” and “View Student Quiz Scores” tabs.
	- **Create Quizzes**:
		- Clicking on “Create a New Quiz” under the “Quizzes Assigned” tab renders a new page where user can provide title of the quiz, instructions, and questions they would like to add.
		- When the “Add question” in “Create a New Quiz” is clicked, the teacher can specify the question and enter the four choices.
		- Below each question, a drop down menu asks to select the “Correct Answer” from ‘A’ or ‘B’ or ‘C’ or ‘D.’
	- **Scores**:
		- Clicking on “View Submitted Quiz Scores” takes user to a page where they can view the submitted quizzes for that student and their score.
- **Student Accounts**:
	- **Class Page**:
		- The course page shows the class name, overview, and big ideas with class name being bold.
		- This page includes “Home,” “View Assigned Quizzes,” and “View Scores” tabs.
	- **View Assigned Quizzes**:
		- This page shows the available quizzes can be submitted/attempted.
		- Clicking on a quiz title opens that quiz where student can select answer and then click the submit button.
		- Clicking on the “Submit” button renders a page that shows the score the student received on that particular quiz.
	- **Viewing Scores**:
		- Clicking on this tab shows the scores for the assignments that the student has submitted.

## Distinctiveness and Complexity
The project utilized Microsoft Visual Studio Code to create a website using Django Web Framework. This involved using multiple programming language to accomplish the key task of designing a dynamic website. This complex website was implemented by using HTML, CSS files for rendering pages via the use of Python in views.py file. In addition to Python, JavaScript was used for creating user interfaces that captured events, used local storage, and extracted data from SQLite database through API Fetch. JavaScript used AJAX, which allowed for ensuring scalability for this project since server-side memory was used to ensure that our applications work with high efficiency. A combination of several technologies and technical tools were required for proper implementation of this project. Not only was this project complex but was also significantly distinct from all the other projects. This project did not involve adding items to a cart/watchlist or having customers that purchase merchandise from the seller. There was no option to bid on any items, since the items were quizzes so they cannot be purchased. In other projects, you could view something without signing in, however in this project, you must be signed in as either student or teacher in order to carry out any actions. This project did not involve making comments or posting on a social network, instead it had a structure where students submit scores and then the back-end software grades it for display. The use of tools and technologies did overlap however the ideas were different.

## File Contents 
- _db.sqlite3_ – contains data submitted by the user.
- _views.py_ - includes functions for registering and logging in a user while other functions take care of tasks like adding the new added quiz by the teacher, send JSON responses for _Fetch API_ routes, renders specific files when a quiz is submitted, displays a quiz, and compares response and correct answers for scoring. 
- _models.py_ - tracks data of registered users, quizzes created by teachers, and scored quizzes.
- _teacher.html_ - rendered when a teacher logs in, this provides access to viewing student scores and creating new quizzes.
- _student.html_ - rendered when a student logs in, this allows for quiz submissions and viewing your _own_ scores only.
- _student_quiz_view.html_ - when a student clicks on a quiz, this page is rendered that displays each quiz with quiz instructions, questions, and options for each of the questions.
- _register_teacher.html_ - registers a teacher to the "User" Django model.
- _register_student.html_ - registers a student to the "User" Django model.
- _portal_view.html_ - this is the main first page rendered which provides links to register for a student account or register for a teacher account unless you already have login information to click "Login"
- _portal_layout.html_ - this file handles most of the design for the teacher.html and student.html since it overlaps.
- _login.html_ - this page is rendered when a user does not want to register but login.
- _automate_login.html_ - this page is not rendered directly however it is used as a middle hand when the user needs to be logged in while the software itself has the information needed.
- _teacher.js_ - this controls the specific html that needs to be displayed on each button click event and takes appropriate action of displaying the correct html. This file is specifically for what should be rendered when a teacher logs in.
- _student.js_ this controls the specific html that needs to be displayed on each button click event and takes appropriate action of displaying the correct html. This file is specifically for what should be rendered when a student logs in.
- _student_quiz_view.js_ - this file plays a key role of extracting data from the database using Fetch API and display that data to the user in the form of quiz questions.