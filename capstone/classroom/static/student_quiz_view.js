document.addEventListener('DOMContentLoaded', function(quiz_name){
    quiz_name = document.querySelector('#quiz_needed').value
    fetch(`/classroom/open_ques/${quiz_name}`)
    .then(response => response.json())
    .then (questions => {
        var count = 0
        console.log(questions)
        questions.forEach((question) => {
            document.querySelector('#question_form').innerHTML += `
            <br>Question: ${question.fields.question}
            <br>
            <input id = "option_one${count}" type = "radio" name = "option${count}${document.querySelector('#que_usr').value}" value = '(A) ${question.fields.option_one}'>
            <label for="option_one${count}">(A) ${question.fields.option_one}</label>
            <br>
            <input id = "option_two${count}" type = "radio" name = "option${count}${document.querySelector('#que_usr').value}" value = '(B) ${question.fields.option_two}'>
            <label for="option_two${count}">(B) ${question.fields.option_two}</label>
            <br>
            <input id = "option_three${count}" type = "radio" name = "option${count}${document.querySelector('#que_usr').value}" value = '(C) ${question.fields.option_three}'>
            <label for="option_three${count}">(C) ${question.fields.option_three}</label>
            <br>
            <input id = "option_four${count}" type = "radio" name = "option${count}${document.querySelector('#que_usr').value}" value = '(D) ${question.fields.option_four}'>
            <label for="option_four${count}">(D) ${question.fields.option_four}</label>
            <br>
            `;  
            count = count + 1  
        })    
    })
})