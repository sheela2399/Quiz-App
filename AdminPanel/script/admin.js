//Function for hamburger menu..
function toggleMenu() {
    
    const body = document.body;

    if (body.classList.contains('burger-deactivate')) {
        body.classList.remove('burger-deactivate');
        body.classList.add('burger-activate');
    } else {
        body.classList.remove('burger-activate');
        body.classList.add('burger-deactivate');
    }
}

// event listener for active class....
window.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('#menu a');
    // for currnt path
    const currentPage = window.location.pathname; 

    // Loop through each link and add the 'active' class if it matches the current page
    links.forEach(link => {
        // Get the href attribute from each <a> tag
        const linkHref = link.getAttribute('href');

        // If the href matches the current page path, add 'active' class
        if (linkHref === currentPage || currentPage.includes(linkHref)) {
            link.classList.add('active');
        }
    });
});

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

function questionTable(quizQuestions) {
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
    document.getElementById('right-part-div').classList.add('blur');

    disableIcons();  
}

function closeForm() {
    document.getElementById("addQuesForm").style.display = "none";
    document.getElementById('question').value = "";
    document.getElementById('Option1').value = "";
    document.getElementById('Option2').value = "";
    document.getElementById('Option3').value = "";
    document.getElementById('Option4').value = "";
    document.getElementById('correctOption').value = "";
    document.getElementById('right-part-div').classList.remove('blur');

        enableIcons();
}

function disableIcons(){
    let actionIcons = document.querySelectorAll(".fa-eye, .fa-pencil, .fa-trash");
    actionIcons.forEach(icon => {
        icon.style.pointerEvents = "none"; 
        icon.style.opacity = "0.5"; // Make icons visually appear disabled
    });
}

function enableIcons(){
    let actionIcons = document.querySelectorAll(".fa-eye, .fa-pencil, .fa-trash");
    actionIcons.forEach(icon => {
        icon.style.pointerEvents = "auto"; 
        icon.style.opacity = "1"; // Reset opacity to default
    });

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
    questionTable(quizQuestions);

    // clearing input fields..
    document.getElementById('question').value = "";
    document.getElementById('Option1').value = "";
    document.getElementById('Option2').value = "";
    document.getElementById('Option3').value = "";
    document.getElementById('Option4').value = "";
    document.getElementById('correctOption').value = "";

    closeForm();
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
        document.getElementById('right-part-div').classList.add('blur');
        disableIcons();

    } else {
        alert("Question not found.");
    }
}

function closeView() {
    let viewDiv = document.querySelector('.viewMcq');
    viewDiv.innerHTML = "";
    viewDiv.style.display = "none";
    document.getElementById('right-part-div').classList.remove('blur');
    enableIcons();
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
        document.getElementById('right-part-div').classList.add('blur');

    } else {
        alert("Question not found.");
    }
}

// Ensure that the table loads correctly
document.addEventListener("DOMContentLoaded", () => {
    const quizQuestions = JSON.parse(localStorage.getItem("quizQuestions")) || [];
    questionTable(quizQuestions);
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

// ************************** User Table Display code starts here ****************

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
            
            let latestScore ;
            if (testsGiven > 0) {
                userScoresData.sort((a, b) => new Date(b.date) - new Date(a.date)); //descending order
                latestScore = userScoresData[0].score || "N/A";
            }

            const tdTestsGiven = document.createElement("td");
            tdTestsGiven.innerHTML = testsGiven;
            tr.appendChild(tdTestsGiven);

            const tdScores = document.createElement("td");
            tdScores.textContent = latestScore || "N/A";
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

// Function for userhistory table...
function userHistory(index) {
    let testDetailsDiv = document.getElementById("testDetailsDiv");
    let userTableMain = document.getElementById("user-table-main");
    testDetailsDiv.style.display = "block";
    userTableMain.classList.add("blur");

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userScores = JSON.parse(localStorage.getItem("userScores")) || [];

    let user = users[index];

    if (!user) {
        console.log("User not found.");
        return;
    }

    let userTestScores = userScores.filter(scoreEntry => scoreEntry.testUserEmail === user.email);

    if (userTestScores.length === 0) {
        alert("This user has not taken any tests yet.");
        return ;
    }

    let userHeading = document.getElementById("userHeading");
    userHeading.innerHTML = `<h4>${user.fullName} | ${user.email}</h4>`;

    let userTestDetailsMain = document.getElementById("userTestDetailsMain");
    userTestDetailsMain.innerHTML = "";

    userTestScores.forEach((test, idx) => {
        const tr = document.createElement("tr");

        const tdTestNo = document.createElement("td");
        tdTestNo.innerHTML = idx + 1;
        tr.appendChild(tdTestNo);

        const tdTestDate = document.createElement("td");
        tdTestDate.innerHTML = test.date || "N/A";
        tr.appendChild(tdTestDate);

        const tdTestScore = document.createElement("td");
        tdTestScore.innerHTML = test.score || "N/A";
        tr.appendChild(tdTestScore);

        const tdTestCorrectAns = document.createElement("td");
        tdTestCorrectAns.innerHTML = test.correctAnswersCount || "N/A";
        tr.appendChild(tdTestCorrectAns);

        const tdViewTest = document.createElement("td");
        tdViewTest.innerHTML = `<a href="#" onclick="viewTestHistory(${index}, ${idx})">View Test</a>`;
        tr.appendChild(tdViewTest);

        userTestDetailsMain.appendChild(tr);
    });
}

function closeUserTable() {
    document.getElementById("testDetailsDiv").style.display = "none";
    document.getElementById("user-table-main").classList.remove("blur");
}

// function to display user's individual test details.....
function viewTestHistory(userIndex, testIndex) {
    
    document.getElementById("testDetailsDiv").classList.add("blur");
    document.getElementById("user-table-main").classList.add("blur");

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userScores = JSON.parse(localStorage.getItem("userScores")) || [];

    // Get the selected user and the specific test using the passed indices
    let user = users[userIndex];
    let test = userScores.filter(scoreEntry => scoreEntry.testUserEmail === user.email)[testIndex];

    if (!test) {
        alert("Test not found.");
        return;
    }

    let testDetails = document.getElementById("testDetails");
    testDetails.style.display = "block";

    let userNameHeading = document.getElementById("userNameHeading");
    userNameHeading.innerHTML = `${user.fullName} | ${user.email}`;

    // Set the test details: test number, score, date, and time
    document.getElementById("test-number").innerHTML = `Test No.${testIndex + 1}`;
    document.getElementById("test-score").innerHTML = `Score: ${test.score || "N/A"}`;
    document.getElementById("test-date").innerHTML = `Date: ${test.date || "N/A"}`;
    document.getElementById("test-time").innerHTML = `Time: ${test.time || "N/A"}`;

    let userTestData = document.getElementById("user-test-data");
    userTestData.innerHTML = "";

    // Loop to display all question, options, right ans, choosed ans
    test.selectedQuiz.forEach((question, idx) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question-detail");

        const questionText = document.createElement("h4");
        questionText.innerHTML = `Question ${idx + 1}: ${question.question || "N/A"}`;
        questionDiv.appendChild(questionText);

        if (question.options) {
            const optionsList = document.createElement("ul");
            optionsList.classList.add("options-list");

            question.options.forEach((option, optIdx) => {
                const optionItem = document.createElement("li");
                optionItem.innerHTML = `${optIdx + 1}.  ${option.value}`;

                optionsList.appendChild(optionItem);
            });
            questionDiv.appendChild(optionsList);
        }

        const correctAnswerText = document.createElement("p");
        correctAnswerText.innerHTML = `<strong>Correct Answer:</strong> ${question.rightAns || "N/A"}`;
        questionDiv.appendChild(correctAnswerText);

        const chosenAnswerText = document.createElement("p");
        chosenAnswerText.innerHTML = `<strong>Choosed Answer:</strong> ${question.choosedAnswer || "N/A"}`;
        questionDiv.appendChild(chosenAnswerText);

        userTestData.appendChild(questionDiv);
    });
}

function closeHistoryTable() {
    // Remove the blur effect from the background and hide the test details view
    document.getElementById("testDetailsDiv").classList.remove("blur");
    document.getElementById("user-table-main").classList.remove("blur");

    document.getElementById("testDetails").style.display = "none";
}


// ***********************************User Table part code ends here**************************************

// Attach input event listeners to each option input field to update the dropdown dynamically
['Option1', 'Option2', 'Option3', 'Option4'].forEach(id => {
    if (document.getElementById(id)) {
        document.getElementById(id).addEventListener('input', updateCorrectOptionDropdown);
    }
});