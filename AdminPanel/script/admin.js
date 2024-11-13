// function to handle logout Alert

let logoutDivCon = document.getElementById("confirmLogoutOptionDiv");
let flags = 0;
function confirmLog() {
    if (flags == 1) {
        logoutDivCon.style.display = "none";
        flags = 0;
    }
    else {
        logoutDivCon.style.display = "block";
        flags = 1;
    }
}

function logoutAdmin() {
    localStorage.removeItem("adminLoggedIn");
    // console.log("in")
    window.location.assign("../index.html");
}

//  ***************** quiz main page started ************************************
localStorage.getItem(JSON.stringify("quizQuestions")) || []

function questiontable(quizQuestions) {
    let quizTable = document.getElementById("question-table");
    console.log(quizTable);
    if (quizTable) {
        quizTable.innerHTML = "";
        for (let index = 0; index < quizQuestions.length; index++) {
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
            quizTable.appendChild(tr);
        }
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
    updateCorrectOptionDropdown();

    // Create the question object
    let createdQuiz = {
        question: question,
        options: [{ value: option1 }, { value: option2 }, { value: option3 }, { value: option4 }],
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

//*************/ Function for Actions in Question Table....***********************************

// function to viewMCQ
function viewMCQ(index) {
    const quizQuestions = JSON.parse(localStorage.getItem("quizQuestions")) || [];
    const question = quizQuestions[index];

    if (question) {

        let viewDiv = document.querySelector('.viewMcq');
        viewDiv.innerHTML = `
       <div class="dis-row-between"><h3>View Question</h3><button onclick="closeView()"> X </button></div> <br>
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

// function to editMCQ...
let editIndex = null;
function editMCQ(index) {
    const quizQuestions = JSON.parse(localStorage.getItem("quizQuestions")) || [];
    const question = quizQuestions[index];

    if (question) {

        document.getElementById("question").value = question.question;
        document.getElementById("Option1").value = question.options[0].value || "";
        document.getElementById("Option2").value = question.options[1].value || "";
        document.getElementById("Option3").value = question.options[2].value || "";
        document.getElementById("Option4").value = question.options[3].value || "";

        document.getElementById("correctOption").value = question.rightAns;

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
    const confirmMsg = confirm("Are you sure you want to delete this question?");
    if (confirmMsg) {
        let quizQuestions = JSON.parse(localStorage.getItem("quizQuestions")) || [];
        quizQuestions.splice(questionIndex, 1);
        localStorage.setItem("quizQuestions", JSON.stringify(quizQuestions));

        row.closest("tr").remove();
        resetSerialNumbers();
    }
}

// Display serial numbers in order after deletion
function resetSerialNumbers() {
    const rows = document.querySelectorAll("tbody tr");
    rows.forEach((row, index) => {
        row.cells[0].innerText = index + 1;
    });
}

//  ************************* Quiz-Main-Page ends here ***************************

// ************************** User Table Display code starts here **********************88888

// Function to display users in the user table-- userlist.html
function displayUserList() {
    const userTableBody = document.getElementById("user-table");
    console.log(userTableBody);
    if (userTableBody) {
        userTableBody.innerHTML = "";

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let userScores = JSON.parse(localStorage.getItem("userScores")) || [];

        users.forEach((user, index) => {
            const tr = document.createElement("tr");

            const tdIndex = document.createElement("td");
            tdIndex.innerHTML = index + 1;
            tr.appendChild(tdIndex);

            const tdName = document.createElement("td");
            tdName.innerHTML = user.fullName;
            tr.appendChild(tdName);

            const tdEmail = document.createElement("td");
            tdEmail.innerHTML = user.email;
            tr.appendChild(tdEmail);

            // const tdTestsGiven = document.createElement("td");
            // tdTestsGiven.innerHTML = user.playCount || 0;
            // tr.appendChild(tdTestsGiven);

            // const tdScores = document.createElement("td");
            // tdScores.textContent = user.score || "N/A";
            // tr.appendChild(tdScores);

            const userScoresData = userScores.filter(scoreEntry => scoreEntry.testUserEmail === user.email);
            const testsGiven = userScoresData.length;
            const totalScore = userScoresData.reduce((acc, curr) => acc + (curr.score || 0), 0);

            const tdTestsGiven = document.createElement("td");
            tdTestsGiven.innerHTML = testsGiven;
            tr.appendChild(tdTestsGiven);

            const tdScores = document.createElement("td");
            tdScores.textContent = totalScore || "N/A";
            tr.appendChild(tdScores);

            const tdAction = document.createElement("td");
            tdAction.innerHTML = `<a onclick="userHistory(${index})"> View Tests </a>`;
            tr.appendChild(tdAction);

            userTableBody.appendChild(tr);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    displayUserList();
});

function userHistory(index) {

    let testDetailsDiv = document.getElementById("testDetailsDiv");

    testDetailsDiv.style.display = "block";
    // Fetch userScores and users data from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userScores = JSON.parse(localStorage.getItem("userScores")) || [];

    // Get the specific user using the index passed
    let user = users[index];

    if (!user) {
        console.log("User not found.");
        return;
    }

    // Get the user's test data based on the email
    let userTestScores = userScores.filter(scoreEntry => scoreEntry.testUserEmail === user.email);

    if (userTestScores.length === 0) {
        alert("This user has not taken any tests yet.");
        return;
    }

    // Display the user's name and email at the top of the table
    let userHeading = document.getElementById("userHeading");
    userHeading.innerHTML = `<h2>${user.fullName} | ${user.email}</h2>`;

    // Get the table body element where we will append the test details
    let userTestDetailsMain = document.getElementById("userTestDetailsMain");

    // Clear any previous content in the table
    userTestDetailsMain.innerHTML = "";

    // Loop through the tests and display them in the table
    userTestScores.forEach((test, idx) => {
        const tr = document.createElement("tr");

        // Create Test No. column
        const tdTestNo = document.createElement("td");
        tdTestNo.innerHTML = idx + 1;  // Display test number (1-based index)
        tr.appendChild(tdTestNo);

        // Create Test Date column
        const tdTestDate = document.createElement("td");
        tdTestDate.innerHTML = test.date || "N/A";  // If no date, show "N/A"
        tr.appendChild(tdTestDate);

        // Create Score column
        const tdTestScore = document.createElement("td");
        tdTestScore.innerHTML = test.score || "N/A";  // If no score, show "N/A"
        tr.appendChild(tdTestScore);

        // Calculate the count of correct answers (assuming "choosedAnswer" contains the answers)
        const correctAnswersCount = test.choosedAnswer ? test.choosedAnswer.filter(ans => ans.correct).length : 0;

        // Create Correct Answers column
        const tdTestCorrectAns = document.createElement("td");
        tdTestCorrectAns.innerHTML = correctAnswersCount || "N/A";  // Display the count of correct answers
        tr.appendChild(tdTestCorrectAns);

        // Create View Test link column (you can add functionality to view test details if required)
        const tdViewTest = document.createElement("td");
        tdViewTest.innerHTML = `<a href="#" onclick="viewTestHistory(${index}, ${idx})">View Test</a>`;
        tr.appendChild(tdViewTest);

        // Append the row to the table body
        userTestDetailsMain.appendChild(tr);
    });
}

// Optional: Implement the function to view detailed test history (if needed)
// function viewTestHistory(userIndex, testIndex) {


//     // Fetch userScores and users data from localStorage
//     let users = JSON.parse(localStorage.getItem("users")) || [];
//     let userScores = JSON.parse(localStorage.getItem("userScores")) || [];

//     let user = users[userIndex];
//     let test = userScores.filter(scoreEntry => scoreEntry.testUserEmail === user.email)[testIndex];

//     if (!test) {
//         alert("Test not found.");
//         return;
//     }

//     console.log("Test Details: ", test);
//     // You can display detailed test data here, e.g., show a modal or redirect to another page for more details
// }


// function viewTestHistory(userEmail, testIndex) {
//     // Fetch userScores from localStorage
//     let userScores = JSON.parse(localStorage.getItem("userScores")) || [];
    
//     // Find the user based on the provided email
//     let user = userScores.find(u => u.testUserEmail === userEmail);
    
//     if (!user) {
//         console.log("User not found.");
//         return;
//     }

//     // Get the specific test based on the index
//     let test = user.selectedQuiz[testIndex];

//     if (!test) {
//         console.log("Test not found.");
//         return;
//     }

//     // Display the test details (example)
//     console.log("Test Details: ", test);
    
//     // You can populate a section in your HTML to display the test details
//     // Example: display the test date, score, and correct answers
//     let testDetailsDiv = document.getElementById("testDetailsDiv");
//     testDetailsDiv.innerHTML = `
//         <h3>Test Details for ${test.date}</h3>
//         <p>Score: ${test.score || "N/A"}</p>
//         <p>Correct Answers: ${test.choosedAnswer ? test.choosedAnswer.filter(ans => ans.correct).length : 0}</p>
//     `;
// }


// function userHistory(index) {
//     // Fetch userScores from localStorage
//     let userScores = JSON.parse(localStorage.getItem("userScores")) || [];
    
//     // Get the specific user based on email ID
//     let user = userScores.find(u => u.testUserEmail === userScores[index].testUserEmail); 

//     if (!user) {
//         console.log("User not found.");
//         return;
//     }

//     // Get references to the DOM elements where you want to display the user data
//     let userTestDetailsMain = document.getElementById("userTestDetailsMain");
//     let userHeading = document.getElementById("userHeading");
//     let testDetailsDiv = document.getElementById("testDetailsDiv");

//     testDetailsDiv.style.display = "block"; // Make the test details div visible

//     // Set the user heading with the user's name and email
//     userHeading.innerHTML = `${user.testUserName} | ${user.testUserEmail}`;

//     // Clear the table body before populating
//     userTestDetailsMain.innerHTML = "";

//     // Check if the user has any tests in selectedQuiz
//     if (!user.selectedQuiz || user.selectedQuiz.length === 0) {
//         const noTestsMessage = document.createElement("tr");
//         const tdNoTests = document.createElement("td");
//         tdNoTests.colSpan = 5; // Span across all columns
//         tdNoTests.innerHTML = "No tests found for this user.";
//         noTestsMessage.appendChild(tdNoTests);
//         userTestDetailsMain.appendChild(noTestsMessage);
//         return;
//     }

//     // Loop through the user's selectedQuiz and create a row for each test
//     user.selectedQuiz.forEach((test, idx) => {
//         const tr = document.createElement("tr");

//         // Create Test No. column (1-based index)
//         const tdTestNo = document.createElement("td");
//         tdTestNo.innerHTML = idx + 1;  // Display test number (1-based index)
//         tr.appendChild(tdTestNo);

//         // Create Test Date column
//         const tdTestDate = document.createElement("td");
//         tdTestDate.innerHTML = test.date || "N/A";  // If no date, show "N/A"
//         tr.appendChild(tdTestDate);

//         // Create Score column (from test.score)
//         const tdTestScore = document.createElement("td");
//         tdTestScore.innerHTML = test.score || "N/A";  // If no score, show "N/A"
//         tr.appendChild(tdTestScore);

//         // Calculate Count of Correct Answers
//         const correctAnswersCount = test.choosedAnswer ? test.choosedAnswer.filter(ans => ans.correct).length : 0;

//         // Create Count of Correct Answers column
//         const tdTestCorrectAns = document.createElement("td");
//         tdTestCorrectAns.innerHTML = correctAnswersCount || "N/A";  // Display the count of correct answers
//         tr.appendChild(tdTestCorrectAns);

//         // Create View Test link column
//         const tdViewTest = document.createElement("td");
//         tdViewTest.innerHTML = `<a href="#" onclick="viewTestHistory(${user.testUserEmail}, ${idx})">View Test</a>`;  // Pass user email and test index to viewTestHistory
//         tr.appendChild(tdViewTest);

//         // Append the row to the table body
//         userTestDetailsMain.appendChild(tr);
//     });
// }


function viewTestHistory(userIndex, testIndex) {
    // Fetch users and userScores from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userScores = JSON.parse(localStorage.getItem("userScores")) || [];

    // Get the selected user and the specific test using the passed indices
    let user = users[userIndex];
    let test = userScores.filter(scoreEntry => scoreEntry.testUserEmail === user.email)[testIndex];

    if (!test) {
        alert("Test not found.");
        return;
    }

    // Get the testDetails section and make it visible
    let testDetails = document.getElementById("testDetails");
    testDetails.style.display = "block";

    // Set the user heading (name and email)
    let userHeading = document.getElementById("userHeading");
    userHeading.innerHTML = `${user.fullName} | ${user.email}`;

    // Set the test details: test number, score, date, and time
    document.getElementById("test-number").innerHTML = `Test #${testIndex + 1}`;
    document.getElementById("test-score").innerHTML = `Score: ${test.score || "N/A"}`;
    document.getElementById("test-date").innerHTML = `Date: ${test.date || "N/A"}`;
    document.getElementById("test-time").innerHTML = `Time: ${test.time || "N/A"}`;

    // Get the div to display the questions and answers
    let userTestData = document.getElementById("user-test-data");
    userTestData.innerHTML = ""; // Clear any previous content

    // Loop through the test questions and display each question with the correct and chosen answer
    test.choosedAnswer.forEach((answer, idx) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question-detail");

        // Create the question text
        const questionText = document.createElement("p");
        questionText.innerHTML = `<strong>Question ${idx + 1}:</strong> ${answer.question || "N/A"}`;
        questionDiv.appendChild(questionText);

        // Create the correct answer text
        const correctAnswerText = document.createElement("p");
        correctAnswerText.innerHTML = `<strong>Correct Answer:</strong> ${answer.correctAnswer || "N/A"}`;
        questionDiv.appendChild(correctAnswerText);

        // Create the user's chosen answer text
        const chosenAnswerText = document.createElement("p");
        chosenAnswerText.innerHTML = `<strong>Your Answer:</strong> ${answer.chosenAnswer || "N/A"}`;
        questionDiv.appendChild(chosenAnswerText);

        // Append the question details to the main user-test-data section
        userTestData.appendChild(questionDiv);
    });
}

function closeTable() {
    // Hide the test details section when the close button is clicked
    let testDetailsDiv = document.getElementById("testDetails");
    testDetailsDiv.style.display = "none";
}



function closeTable() {
    document.getElementById("testDetailsDiv").style.display = "none";
}

function viewTestHistory(index) {
    console.log("hii");

}

// Attach input event listeners to each option input field to update the dropdown dynamically
['Option1', 'Option2', 'Option3', 'Option4'].forEach(id => {
    if (document.getElementById(id)) {
        document.getElementById(id).addEventListener('input', updateCorrectOptionDropdown);
    }
});