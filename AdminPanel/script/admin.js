
let admin_email = "admin123@gmail.com";
let admin_password = "Admin$789"
let admin_credential = {
    admin_email: admin_email,
    admin_password: admin_password,
}
// const email = document.getElementById('email').value;
// const password = document.getElementById('password').value;
// let invalidMsgPassword = document.getElementById("invalid-password");
// let invalidMsgEmail = document.getElementById("invalid-email");

// Function for admin Validation..
// function adminLoginValidation() {
//     if (email === admin_email && password === admin_password) {
//         localStorage.setItem("admin_credential", JSON.stringify(admin_credential));
//         window.location.href = "admin.html"
//     }
// }

// functions for add new question part..
function openForm(event) {
    document.getElementById("addQuesForm").style.display = "block";
}

function closeForm() {
    document.getElementById("addQuesForm").style.display = "none";
}

// function addQuestion() {
//     let question = document.getElementById('question')
//     let option1 = document.getElementById('Option1')
//     let option2 = document.getElementById('Option2')
//     let option3 = document.getElementById('Option3')
//     let option4 = document.getElementById('Option4')
//     let rightAnswer = document.getElementById('correctOption')


//     let createdQuiz = {
//         question: question,
//         options: [{ value: option1 }, { value: option2 }, { value: option3 }, { value: option4 }],
//         rightAns: rightAnswer,
//     }
//     createdQuiz.push(quizQuestions);
//     localStorage.setItem(JSON.parse("quizQuestions"), quizQuestions)
//     questiontable()
// }
// function questiontable() {
//     localStorage.getItem(JSON.stringify("quizQuestions")) || []
//     console.log(quizQuestions)

//     for (let index = 0; index < quizQuestions.length; index++) {
//         let table = document.getElementById("question-table")
//         let tr = document.createElement("tr")
//         let td1 = document.createElement('td');
//         let td2 = document.createElement('td');
//         let td3 = document.createElement('td')

//         tr.appendChild(td1), tr.appendChild(td2), tr.appendChild(td3)
//         table.appendChild(tr);
//         // console.log(tr, td1, td2)

//         td1.innerHTML = [index + 1];
//         td2.innerHTML = quizQuestions[index].question;
//         td3.innerHTML = `<i class="fa-solid fa-eye" onclick ="viewMCQ(index)"></i><i class="fa-solid fa-pencil" onclick ="editMCQ()"></i><i class="fa-solid fa-trash" onclick = "deleteMCQ(this)"></i>`
//     }

// }

// Function for Actions in Question Table....
function viewMCQ(index) {
    console.log("view")

    // Retrieve the data from localStorage
    JSON.parse(localStorage.getItem('quizQuestions'));

    // Check if quiz data exists
    if (!quizQuestions) {
        console.log("No quiz data found.");
        return;
    }

    // Find the question with the specified questionId
    const question = quizQuestions.find(q => q.index === index);
    console.log(question)
    // If question is found, display it
    if (question) {
        console.log("Question:", question.text);
        console.log("Options:");

        // Loop through each option
        question.options.forEach((option, index) => {
            console.log(`Option ${index + 1}: ${option}`);
        });

        // Display the correct answer
        console.log("Correct Answer:", question.correctAnswer);
    } else {
        console.log("Question not found.");
    }
}


function editMCQ() {
    console.log("edit")

}

// Function to delete a question from the table and update localStorage
function deleteMCQ(row, questionIndex) {
    console.log("delete");
    let confirmMsg = confirm("Are you sure you want to delete this question ?")
    if (confirmMsg == true) {

        let quizQuestions = JSON.parse(localStorage.getItem("quizQuestions")) || [];
        quizQuestions = quizQuestions.filter(q => q.id !== questionIndex);
        localStorage.setItem("quizQuestions", JSON.stringify(quizQuestions));

        let trTag = row.closest("tr");
        trTag.remove();

        resetSerialNumbers();
    }
    else {
        return false;
    }
}

// Function to reset serial numbers in the table
function resetSerialNumbers() {
    const rows = document.querySelectorAll("tbody tr");
    rows.forEach((row, index) => {
        const td1 = row.cells[0];
        if (td1) {
            td1.innerText = index + 1;
        }
    });
}

//   function to get question in Table..

// Initialize the quiz questions array
let quizQuestions = JSON.parse(localStorage.getItem("quizQuestions")) || [];

function addQuestion(event) {
    
    event.preventDefault();

    let question = document.getElementById('question').value;
    let option1 = document.getElementById('Option1').value;
    let option2 = document.getElementById('Option2').value;
    let option3 = document.getElementById('Option3').value;
    let option4 = document.getElementById('Option4').value;
    let correctOption = document.getElementById('correctOption').value;

    // Create the question object
    let createdQuiz = {
        question: question,
        options: [option1, option2, option3, option4],
        rightAns: correctOption
    };

    quizQuestions.push(createdQuiz);

    // Save the updated quizQuestions array to localStorage
    localStorage.setItem("quizQuestions", JSON.stringify(quizQuestions));

    questionTable();

    // Clear the form inputs
    document.getElementById('addQuesForm').reset();
    closeForm(); 
}

// Function to display questions in the table
function questionTable() {
    
    quizQuestions = JSON.parse(localStorage.getItem("quizQuestions")) || [];

    // Get the table body element
    let table = document.getElementById("question-table");
    table.innerHTML = ""; // Clear the table before adding new rows

    // Loop through each question and add a row to the table
    quizQuestions.forEach((quiz, index) => {
        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.innerHTML = index + 1;

        let td2 = document.createElement("td");
        td2.innerHTML = quiz.question;

        let td3 = document.createElement("td");
        td3.innerHTML = `
            <i class="fa-solid fa-eye" onclick="viewMCQ(${index})"></i>
            <i class="fa-solid fa-pencil" onclick="editMCQ(${index})"></i>
            <i class="fa-solid fa-trash" onclick="deleteMCQ(${index})"></i>
        `;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        table.appendChild(tr);
    });
}

// Call questionTable on page load to display any saved questions
document.addEventListener("DOMContentLoaded", questionTable);




