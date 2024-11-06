
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

localStorage.getItem(JSON.stringify("quizQuestions")) || []

function questiontable(quizQuestions) {
    let table = document.getElementById("question-table");
    console.log(table);
    table.innerHTML = "";

        for(index = 0; index < quizQuestions.length; index++) {
            let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.innerHTML = index + 1;

        let td2 = document.createElement("td");
        td2.innerHTML = quizQuestions[index].question;

        let td3 = document.createElement("td");
        td3.innerHTML = `
            <i class="fa-solid fa-eye" onclick="viewMCQ(${index})"></i>
            <i class="fa-solid fa-pencil" onclick="editMCQ(${index})"></i>
            <i class="fa-solid fa-trash" onclick="deleteMCQ(this, ${index})"></i>
        `;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        table.appendChild(tr);
    }
}

// functions for add new question part..
function openForm() {
    document.getElementById("addQuesForm").style.display = "block";
}

function closeForm() {
    document.getElementById("addQuesForm").style.display = "none";
    document.getElementById('question').value = "";
    document.getElementById('Option1').value = "";
    document.getElementById('Option2').value = "";
    document.getElementById('Option3').value = "";
    document.getElementById('Option4').value = "";
    document.getElementById('correctOption').value = "";
}

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
        options: [{value:option1}, {value:option2}, {value:option3}, {value :option4}],
        rightAns: correctOption,
    };

    let quizQuestions = JSON.parse(localStorage.getItem("quizQuestions")) || [];

    if (editIndex !== null) {
        // Update existing question
        quizQuestions[editIndex] = createdQuiz;
        editIndex = null; // Reset after editing
    } else {
        // Add new question
        quizQuestions.push(createdQuiz);
    }
    localStorage.setItem("quizQuestions", JSON.stringify(quizQuestions));
    // console.log("after adding question")
    // console.log(quizQuestions);
    questiontable(quizQuestions);

    // clearing input fields..
    document.getElementById('question').value = "";
    document.getElementById('Option1').value = "";
    document.getElementById('Option2').value = "";
    document.getElementById('Option3').value = "";
    document.getElementById('Option4').value = "";
    document.getElementById('correctOption').value = "";
}

// Function for Actions in Question Table....

let editIndex = null;
function editMCQ(index) {
    const quizQuestions = JSON.parse(localStorage.getItem("quizQuestions")) || [];
    const question = quizQuestions[index];

    if (question) {
        // Populate form fields with the existing question data
        document.getElementById("question").value = question.question;

        // Check if each option exists, otherwise set to an empty string
        document.getElementById("Option1").value = question.options[0]?.value || "";
        document.getElementById("Option2").value = question.options[1]?.value || "";
        document.getElementById("Option3").value = question.options[2]?.value || "";
        document.getElementById("Option4").value = question.options[3]?.value || "";

        // Set the correct answer
        document.getElementById("correctOption").value = question.rightAns;

        // Open the form and track the question being edited
        editIndex = index;
        openForm();
        updateCorrectOptionDropdown();
    } else {
        alert("Question not found.");
    }
}

// Ensure that the table loads correctly
document.addEventListener("DOMContentLoaded", () => {
    const quizQuestions = JSON.parse(localStorage.getItem("quizQuestions")) || [];
    questiontable(quizQuestions);
});

// Function to deleteMCQ
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

function loadQuestions() {
    const quizQuestions = JSON.parse(localStorage.getItem("quizQuestions")) || [];
questiontable(quizQuestions)
}

window.onload = loadQuestions;

// function to viewMCQ
function viewMCQ(index) {
    const quizQuestions = JSON.parse(localStorage.getItem("quizQuestions")) || [];
    const question = quizQuestions[index];
    
    if (question) {

        let viewDiv = document.querySelector('.viewMcq');
        viewDiv.innerHTML = `
       <div class="dis-row-between"><h3>View Question</h3><button onclick="closeView()"> X </button></div>
        <p><strong>Question:</strong> ${question.question}</p>
        <p><strong>Options:</strong></p>
        <ul>
        <li>1.${question.options[0].value}</li>
        <li>2.${question.options[1].value}</li>
        <li>3.${question.options[2].value}</li>
        <li>4.${question.options[3].value}</li>
        </ul>
        <p><strong>Correct Answer:</strong> ${question.rightAns}</p> 
        `;
        viewDiv.style.display = "block";
        
    } else {
        alert("Question not found.");
    }
}

function closeView() {
    let viewDiv = document.querySelector('.viewMcq');
    viewDiv.innerHTML = "";
    viewDiv.style.display = "none";
}

// function for dynamic correct option dropdown..
function updateCorrectOptionDropdown() {
    const correctOptionSelect = document.getElementById('correctOption');
    correctOptionSelect.innerHTML = ""; 

    const option1 = document.getElementById('Option1').value;
    const option2 = document.getElementById('Option2').value;
    const option3 = document.getElementById('Option3').value;
    const option4 = document.getElementById('Option4').value;

    const options = [option1, option2, option3, option4];

    // Populate the dropdown with non-empty options
    options.forEach((optionText) => {
        if (optionText.trim()) {
            const optionElement = document.createElement('option');
            optionElement.value = optionText;
            optionElement.textContent = `${optionText}`;
            correctOptionSelect.appendChild(optionElement);
        }
    });
}

// Attach input event listeners to each option input field to update the dropdown in real-time
['Option1', 'Option2', 'Option3', 'Option4'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateCorrectOptionDropdown);
});

// function for user table..

// document.addEventListener("DOMContentLoaded", () => {
//     displayUserList();
// });

// function displayUserList() {
//     let userTable = document.getElementById("user-table");
//     const users = JSON.parse(localStorage.getItem("users")) || []; // Assume 'users' key contains user data array
//     console.log(userTable, users);

//     userTable.innerHTML = ""; // Clear the table before inserting rows

//     users.forEach((user, index) => {
//         const row = document.createElement("tr");

//         // Create cells with user data
//         row.innerHTML = `
//             <td>${index + 1}</td>
//             <td>${user.name}</td>
//             <td>${user.email}</td>
//             <td>${user.testsGiven}</td>
//             <td>${user.scores}</td>
//             <td><button onclick="viewUser(${index})">View More</button></td>
//         `;

//         userTable.appendChild(row);
//     });
// }

// function viewUser(index) {
//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     const user = users[index];
//     if (user) {
//         alert(`Name: ${user.name}\nEmail: ${user.email}\nTests Given: ${user.testsGiven}\nScores: ${user.scores}`);
//     } else {
//         alert("User not found.");
//     }
// }

