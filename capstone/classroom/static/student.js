localStorage.setItem('count',1)
document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('#home').addEventListener('click', () => home());
    document.querySelector('#due').addEventListener('click', () => assignments_due());
    document.querySelector('#submitted').addEventListener('click', () => quizzes_submitted());

    home()
})

function home() {
    document.querySelector('#due_content').style.display = 'none';
    document.querySelector('#home_content').style.display = 'block';
    document.querySelector('#submitted_content').style.display = 'none';

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

function assignments_due() {
    already_added = []
    localStorage.setItem('already_added', JSON.stringify(already_added));
    addition = JSON.parse(localStorage.getItem('already_added'))

    document.querySelector('#due_content').style.display = 'block';
    document.querySelector('#home_content').style.display = 'none';
    document.querySelector('#submitted_content').style.display = 'none';

    document.querySelector('#due_content').innerHTML = `<h2>To Be Completed</h2>`;
    fetch('all_quizzes')
    .then(response => response.json())
    .then(emails => {
        console.log(emails)
        emails.reverse().forEach((email) => {
            if (addition.includes(`${email.fields.quiz_name}`)) {
                console.log('included')
            }
            else {
                document.querySelector('#due_content').innerHTML += `<a href = 'student_quiz_view/${email.fields.quiz_name}/${document.querySelector('#username').value}'>${email.fields.quiz_name}</a> <hr>`;
                addition.push(email.fields.quiz_name)
            }
            localStorage.setItem('already_added', JSON.stringify(addition));      
        })
    });
}

function quizzes_submitted() {
    document.querySelector('#home_content').style.display = 'none';
    document.querySelector('#due_content').style.display = 'none';
    document.querySelector('#submitted_content').style.display = 'block';

    var username = document.querySelector('#username').value
    document.querySelector('#submitted_content').innerHTML = `<h2>Submitted Assignments Scores</h2>`;
    fetch(`submittedquizzes/${username}`)
    .then(response => response.json())
    .then(submitted_quizzes => {
        console.log(submitted_quizzes)
        submitted_quizzes.reverse().forEach((submitted_quiz) => {
            document.querySelector('#submitted_content').innerHTML += `<h4>${submitted_quiz.fields.quiz_name}</h4>`;
            document.querySelector('#submitted_content').innerHTML += `<h4>Score: ${submitted_quiz.fields.score}</h4> <hr>`;
        })
    })
}