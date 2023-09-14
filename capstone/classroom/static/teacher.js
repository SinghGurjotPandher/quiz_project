localStorage.setItem('count',1)
document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('#home').addEventListener('click', () => home());
    document.querySelector('#quizzes').addEventListener('click', () => quizzes_assigned());
    document.querySelector('#students_scores').addEventListener('click', () => students_scores());
    home()
})

function home() {
    document.querySelector('#quiz_list').style.display = 'none';
    document.querySelector('#home_content').style.display = 'block';
    document.querySelector('#form_form').style.display = 'none';
    document.querySelector('#student_scores').style.display = 'none';

    document.querySelector('#home_content').innerHTML = `<h1>AP Computer Science Principles</h1>`;
    document.querySelector('#home_content').innerHTML += `<h3>Course Overview</h3>`;
    document.querySelector('#home_content').innerHTML += `<p>AP Computer Science Principles is an introductory college-level computing course that introduces students to the breadth of the field of computer science. Students learn to design and evaluate solutions and to apply computer science to solve problems through the development of algorithms and programs. They incorporate abstraction into programs and use data to discover new knowledge. Students also explain how computing innovations and computing systems—including the internet—work, explore their potential impacts, and contribute to a computing culture that is collaborative and ethical. </p>`;
    document.querySelector('#home_content').innerHTML += `<h3>Big Ideas</h3>`;
    document.querySelector('#home_content').innerHTML += `
    <table>
        <tr>
            <th> Big Idea</th>
            <th> Exam Weighting (Multiple-Choice Section) </th>
        </tr>
        <tr>
            <td>Big Idea 1: Creative Development</td>
            <td> 10%-13% </td>
        </tr>
        <tr>
            <td>Big Idea 2: Data</td>
            <td> 17%-22% </td>
        </tr>
        <tr>
            <td>Big Idea 3: Algorithms and Programming</td>
            <td> 30%-35% </td>
        </tr>
        <tr>
            <td>Big Idea 4: Computer Systems and Networks</td>
            <td> 11%-15% </td>
        </tr>
        <tr>
            <td>Big Idea 5: Impact of Computing</td>
            <td> 21%-26% </td>
        </tr>
    </table>
    `;
    document.querySelector('#home_content').innerHTML += `<h3>Acknowledgement</h3>`;
    document.querySelector('#home_content').innerHTML += `<p>AP Computer Science Principles was created with significant support from the National Science Foundation and more than 50 leading high school and higher education computer science educators who piloted the program at their institutions. </p>`;
}

function createQuiz() {
    document.querySelector('#quiz_list').innerHTML = `<h2>Create a New Quiz</h2>`;
    document.querySelector('#form_form').style.display = 'block';
}

function addQuestion() {
    count = parseInt(localStorage.getItem('count'))
    document.querySelector('#question_form').innerHTML += `
    <br>Question:
    <input type = "text" name = "question${count}">
    <br>
    A:
    <input type = "text" name = "optionA${count}">
    <br>
    B:
    <input type = "text" name = "optionB${count}">
    <br>
    C:
    <input type = "text" name = "optionC${count}">
    <br>
    D:
    <input type = "text" name = "optionD${count}">
    <br>
    Correct Answer:
    <select name = "options${count}">
        <option>A</option>
        <option>B</option>
        <option>C</option>
        <option>D</option>
    </select>
    <br>
    <br>
    `;
    count = count + 1
    localStorage.setItem('count',count)
}

function quizzes_assigned() {
    already_added = []
    localStorage.setItem('already_added', JSON.stringify(already_added));
    addition = JSON.parse(localStorage.getItem('already_added'))

    document.querySelector('#home_content').style.display = 'none';
    document.querySelector('#quiz_list').style.display = 'block';
    document.querySelector('#student_scores').style.display = 'none';

    document.querySelector('#quiz_list').innerHTML = `<br><button class = "unique_button" onclick = 'createQuiz()'>Create a New Quiz</button>`;
    document.querySelector('#quiz_list').innerHTML += `<h2>Quizzes</h2>`;

    fetch('all_quizzes')
    .then(response => response.json())
    .then(emails => {
        console.log(emails)
        emails.reverse().forEach((email) => {
            if (addition.includes(`${email.fields.quiz_name}`)) {
                console.log('included')
            }
            else {
                document.querySelector('#quiz_list').innerHTML += `<h4>${email.fields.quiz_name}</h4><hr>`;
                addition.push(email.fields.quiz_name)
            }
            localStorage.setItem('already_added', JSON.stringify(addition));      
        })
    });
}

function students_scores(){
    document.querySelector('#home_content').style.display = 'none';
    document.querySelector('#quiz_list').style.display = 'none';
    document.querySelector('#student_scores').style.display = 'block';

    document.querySelector('#student_scores').innerHTML = `<h2>Student Quizzes Scores</h2>`;
    fetch(`all_quiz_scores`)
    .then(response => response.json())
    .then(submitted_quizzes => {
        console.log(submitted_quizzes)
        submitted_quizzes.reverse().forEach((submitted_quiz) => {
            document.querySelector('#student_scores').innerHTML += `<h4>Student Name: ${submitted_quiz.fields.username}</h4>`;
            document.querySelector('#student_scores').innerHTML += `<h4>Quiz Name: ${submitted_quiz.fields.quiz_name}</h4>`;
            document.querySelector('#student_scores').innerHTML += `<h4>Score: ${submitted_quiz.fields.score}%</h4> <hr>`;
        })
    })
}