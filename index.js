// Signup form code
// document.getElementById('signupForm').addEventListener('submit', function (event) {
//     event.preventDefault();

// const url = window.location.pathname;
// const isLoggedIn = localStorage.getItem('isLoggedIn');

// if ((url === '/question.html' || url === '/quiz.html') && !isLoggedIn) {
//     window.location = "/index.html"
//     // return;
// }

function validateSignup() {
    console.log("in")
    let fullName = document.getElementById('fullName').value;
    let email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let invalidMsgFullName = document.getElementById("invalid-msg-fullname");
    let invalidMsgPassword = document.getElementById("invalid-msg-password");
    let invalidMsgEmail = document.getElementById("invalid-msg-email");
    let reName = /^[a-zA-Z].*[\s\.]*$/g;
    let reEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    let rePass = /^(?=.*\d)(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])(?=.*[a-z])(?=.*[A-Z]).{5,15}$/;
    let checkbox = document.getElementById("terms").checked

    if (fullName == "" || !reName.test(fullName)) {
        invalidMsgFullName.innerHTML = "Enter a Name";
        return false;
    }

    if (!reEmail.test(email) || email == "") {
        invalidMsgEmail.innerHTML = "Enter a valid Email";
        return false;
    }

    if (!rePass.test(password) || password == "") {
        invalidMsgPassword.innerHTML = "Enter a valid Password with one uppercase letter, one lowercase letter, and at least one special character.";
        return false;
    }

    if (!checkbox) {
        alert("Please check terms and condition")
        return false;
    }
    else {
        invalidMsgEmail.innerHTML = `<i class="fa-regular fa-circle-check"></i>`;
        invalidMsgPassword.innerHTML = `<i class="fa-regular fa-circle-check"></i>`;
        invalidMsgFullName.innerHTML = `<i class="fa-regular fa-circle-check"></i>`;
        const userData = {
            fullName: fullName,
            email: email,
            password: password
        };
        saveUserData(userData);
    }
    document.getElementById('fullName').value = "";
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
}

function saveUserData(userData) {
    const storedUserData = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = storedUserData.some(user => user.email === userData.email);
    if (userExists) {
        alert("User already exists");
        return;
    }
    storedUserData.push(userData);
    localStorage.setItem('users', JSON.stringify(storedUserData));
    alert("Registration Done Successfully");
    window.location.href = "index.html";
}

function passwordHideShow() {
    let showPassword = document.getElementById("Show-password")
    let password = document.querySelector("#password");
    if (password.type === "password") {
        password.type = "text";
        showPassword.style.color = "blue";
    } else if (password.type === "text") {
        password.type = "password";
        showPassword.style.color = "black";
    }
}

// signup code ends..


// login code start...
function validateLogin() {
    let adminLoggedIn = [];
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let invalidMsgPassword = document.getElementById("invalid-password");
    let invalidMsgEmail = document.getElementById("invalid-email");

    // Retrieve stored user data from local storage
    const storedUserData = JSON.parse(localStorage.getItem('users')) || [];
    console.log(storedUserData)

    // Check if the user exists and the password matches
    const user = storedUserData.find(user => user.email === email);
    console.log(user)

    if (email == "") {
        invalidMsgEmail.innerHTML = "Please enter your email"
    }

    if (password == "") {
        invalidMsgPassword.innerHTML = "Please enter your password"
    }

    if (!user) {
        invalidMsgEmail.innerHTML = "Email not registered";
        return;
    }

    if (email === "admin@gmail.com" && password === "Admin@123") {
        console.log("Admin Login Successfull");
        window.location.assign("/AdminPanel/admin.html");
        adminLoggedIn.push({ fullName: "Admin", email: email, password: password });
        localStorage.setItem("adminLoggedIn", JSON.stringify(adminLoggedIn));
        return;
    }

    else if (user.password !== password) {
        invalidMsgPassword.innerHTML = "Incorrect password";
        return;
    }

    else {
        // adminLoginValidation(email,password)
        // If login is successful
        invalidMsgEmail.innerHTML = `<i class="fa-regular fa-circle-check"></i>`;
        invalidMsgPassword.innerHTML = `<i class="fa-regular fa-circle-check"></i>`;

        // flag in localstorage to indicate that the user is logged in
        localStorage.setItem("isLoggedin", JSON.stringify(user));

        // Redirect to the quiz page
        window.location.href = "quiz.html";
        // window.onload = displayUserInfo(rankDisplay);
    }
};

// login code ends...

let userLoggedIn = (localStorage.getItem('isLoggedin'));

// getting name and email when user logged in and setting as testUser
let testUser = (JSON.parse(userLoggedIn));
console.log(testUser);
console.log(testUser.fullName);

// quiz page code to get Name at top starts and log out

// Function to get user initials from full name
function getUserInitials() {
    const names = testUser.fullName.split(' ');
    // console.log(names);
    if (names.length >= 2) {
        return names[0][0].toUpperCase() + names[1][0].toUpperCase(); // Initials of first and last name
    } else {
        return names[0][0].toUpperCase(); // Initial if only one name
    }
}

// Function to display the user's name or initials near the logo
function displayUserName() {
    if (testUser.fullName) {
        const userNameElement = document.getElementById("userName");
        const initials = getUserInitials(testUser.fullName);
        userNameElement.innerHTML = `Welcome, ${initials}`
        // userNameElement.innerHTML = `Welcome, ${testUser.fullName.toUpperCase()}`
    }
}
displayUserName()

// function to handle logout Alert

let logoutDiv = document.getElementById("confirmLogoutOptionDiv");
let flag = 0;
function confirmLogout() {

    if (flag == 1) {
        logoutDiv.style.display = "none";
        // document.querySelector(".user-info").style.flexDirection = "column";
        flag = 0;
    }
    else {
        logoutDiv.style.display = "block";
        document.getElementById("userNameDisplay").innerHTML = `Hii ${testUser.fullName}`;
        document.getElementById("userEmailDisplay").innerHTML = testUser.email;
        flag = 1;
    }
}

// Function to handle logout
function logout() {
    localStorage.removeItem("isLoggedin"); // Optionally remove login status
    window.location.href = "index.html"; // Redirect to login page
}

// Function to take image input.....

// Get the required elements
let editOption = document.getElementsByClassName("edit-button")[0];
let AvatarPic = document.getElementById("AvatarPic");
let fileInput = document.getElementById("fileInput");

// Check if an avatar image is stored in localStorage when the page loads
window.onload = function () {
    const savedAvatar = localStorage.getItem("avatar");
    if (savedAvatar) {
        AvatarPic.src = savedAvatar;
    }
};

// Function to file input when "Edit Picture" button is clicked
function editPic() {
    fileInput.click();
}

// Function to resize the image and then save it in localStorage
function resizeAndSaveImage(imageUrl) {
    const img = new Image();
    img.src = imageUrl;

    img.onload = function () {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 150;  // Set the maximum width of the resized image
        const MAX_HEIGHT = 150; // Set the maximum height of the resized image
        let width = img.width;
        let height = img.height;

        // Resize the image proportionally
        if (width > height) {
            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }
        } else {
            if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
            }
        }
        canvas.width = width;
        canvas.height = height;

        // Draw the resized image onto the canvas
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Convert the canvas image to base64 and save it to localStorage
        const resizedImageUrl = canvas.toDataURL("image/jpeg", 0.7); // Adjust the quality if needed (0.7 = 70%)
        AvatarPic.src = resizedImageUrl;

        try {
            localStorage.setItem("avatar", resizedImageUrl);
        } catch (e) {
            console.error("Resized image still too large for localStorage", e);
        }
    };
}

// Function to handle the file input change event
function previewImage(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageUrl = e.target.result;  // The base64-encoded image

            // Resize and save the image
            resizeAndSaveImage(imageUrl);
        };
        reader.readAsDataURL(file);
    }
}

// quiz page code ends....

//questions display starts..

let quizQuestions = [
    {
        question: "Which animal is known as the 'Ship of the Desert ?",
        options: [
            { value: "Lion" },
            { value: "Camel" },
            { value: "Elephant" },
            { value: "Tiger" },
        ],
        rightAns: "Camel"
    },
    {
        question: "Name the biggest continent in the world ?",
        options: [
            { value: "Europe" },
            { value: "Antarctica" },
            { value: "Asia" },
            { value: "Africa" },
        ],
        rightAns: "Asia"
    },
    {
        question: "Name the largest mammal ?",
        options: [
            { value: "Blue Whale" },
            { value: "Elephant" },
            { value: "Monkey" },
            { value: "Human" },
        ],
        rightAns: "Blue Whale"
    },
    {
        question: "Name the largest planet of our Solar System?",
        options: [
            { value: "Venus" },
            { value: "Earth" },
            { value: "Mars" },
            { value: "Jupiter" }
        ],
        rightAns: "Jupiter"
    },
    {
        question: "Who was the first Prime Minister of India?",
        options: [
            { value: "Pandit Jawaharlal Nehru" },
            { value: "Indira Gandhi" },
            { value: "Dr. Rajendra Prasad" },
            { value: "Mahatma Gandhi" },
        ],
        rightAns: "Pandit Jawaharlal Nehru"
    },
    {
        question: "How many states are there in India?",
        options: [
            { value: "28" },
            { value: "26" },
            { value: "29" },
            { value: "27" },
        ],
        rightAns: "28"
    },
    {
        question: "Name a bird that lays the largest eggs ?",
        options: [
            { value: "Ostrich" },
            { value: "Crow" },
            { value: "Sparrow" },
            { value: "Duck" },
        ],
        rightAns: "Ostrich"
    },
    {
        question: "Which is the tallest mountain in the world ?",
        options: [
            { value: "Kangchenjunga" },
            { value: "K2" },
            { value: "Mount Everest" },
            { value: "Himalaya" },
        ],
        rightAns: "Mount Everest"
    },
    {
        question: "How many bones are there in the Human Body?",
        options: [
            { value: "200" },
            { value: "208" },
            { value: "207" },
            { value: "206" },
        ],
        rightAns: "206"
    },
    {
        question: "What is the launch date for Chandrayaan 3 mission ?",
        options: [
            { value: "July 14, 2023" },
            { value: "June 14, 2023" },
            { value: "July 14, 2022" },
            { value: "June 14, 2022" },
        ],
        rightAns: "July 14, 2023"
    },
    {
        question: "Who is the Father of our Nation ?",
        options: [
            { value: "Mahatma Gandhi" },
            { value: "B.R. Ambedkar" },
            { value: "Dr. Rajendra Prasad" },
            { value: "Subhash Chandra Bose" },
        ],
        rightAns: "Mahatma Gandhi"
    },
    {
        question: "Highest dam of India is?",
        options: [
            { value: "Mettur Dam" },
            { value: "Indira Sagar Dam" },
            { value: "Tehri Dam" },
            { value: "Cheruthoni Dam" },
        ],
        rightAns: "Tehri Dam"
    },
    {
        question: "Smallest state of India is ?",
        options: [
            { value: "Goa" },
            { value: "Maharashtra" },
            { value: "Rajasthan" },
            { value: "Odisha" },
        ],
        rightAns: "Goa"
    },
    {
        question: "Who is the current President of India ?",
        options: [
            { value: "Narendra Modi" },
            { value: "Amit Shah" },
            { value: "Arvind Kejriwal" },
            { value: "Droupadi Murmu" },
        ],
        rightAns: "Droupadi Murmu"
    },
    {
        question: "What is the Full form of ISRO ?",
        options: [
            { value: "Indian Space Research Organization" },
            { value: "International Space Research Organization" },
            { value: "International Space Retail Organization" },
            { value: "India Spain Russia Oman" },
        ],
        rightAns: "Indian Space Research Organization"
    }
];

quizQuestions = JSON.parse(localStorage.getItem('quizQuestions')) || [];
// console.log(quiz)
localStorage.setItem("quizQuestions", JSON.stringify(quizQuestions));

let score = 0;
let questionNumber = 1;
let quizUsedIndexes = new Set();
let randomQuestion = [];
let totalQuestions = 10;
let index = 0;
let selectedAnswers = [];

const progressBarElement = document.getElementById("progress");
const questionHeading = document.getElementById("questionHead");
const questionNumberElement = document.getElementById("questionNum");
const questionElement = document.getElementById("question");
const optionElement = document.getElementById("options");
const nextButton = document.getElementById("nextquestion");
const previousButton = document.getElementById("previousquestion");
const displayScore = document.getElementById("displayScore");
let quizStartTime;

// Fetch the quiz questions from localStorage
const fetchQuize = (localStorage.getItem("quizQuestions"));

//  function to get a random index that's not repeated
function getRandomIndex() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * quizQuestions.length);
    } while (quizUsedIndexes.has(randomIndex));
    quizUsedIndexes.add(randomIndex);
    return randomIndex;
}

// Populate randomQuestion with unique questions
for (let i = 0; i < totalQuestions; i++) {
    const randomIndex = getRandomIndex();
    randomQuestion.push(quizQuestions[randomIndex]);
}

// function to start quiz that will update count and recort start time..
function startQuiz() {
  let quizStartTime = new Date();
}

// Function to display a question
function displayQuestion() {
    if (questionElement && optionElement) {
        let currentQuestion = randomQuestion[index];

        // question heading and question content
        questionHeading.innerHTML = `<h1>Question ${questionNumber} of ${totalQuestions}</h1>`;
        questionNumberElement.innerHTML = `${index + 1}.`;
        questionElement.innerHTML = currentQuestion.question;

        // Display 4 options..
        optionElement.innerHTML = currentQuestion.options.map((option, optionIndex) =>
            `<div class="optionText">
                <input type="radio" name="options" id="option${optionIndex}" value="${option.value}">
                <label for="option${optionIndex}">${optionIndex + 1}. ${option.value}</label>
            </div>`).join("");

        // Attach event listeners for option selection
        attachOptionSelector();

        // Show previously selected answer if available
        showSelectedAnswer();

        // Handle Next/Previous buttons display..
        if (index > 0) {
            previousButton.innerHTML = "<i class='fa-solid fa-arrow-left'></i> Previous";
        }
        if (index === 8) {
            questionHeading.innerHTML = "<h1>Last 2 Questions Left..</h1>";
        }
        if (index === 9) {
            questionHeading.innerHTML = "<h1>Hey, this is the Last Question</h1>";
        }
        nextButton.innerHTML = index === totalQuestions - 1
            ? "Submit and Continue <i class='fa-solid fa-arrow-right'></i>"
            : "Next <i class='fa-solid fa-arrow-right'></i>";
    }
    updateProgressBar();
}

// Function to update the progress bar
function updateProgressBar() {
    const progress = ((index + 1) / totalQuestions) * 100;
    if (progressBarElement) {
        progressBarElement.style.width = `${progress}%`;
    }
}

// Function to attach listeners to the options
function attachOptionSelector() {
    const options = document.querySelectorAll('input[name="options"]');
    options.forEach(option => {
        option.addEventListener('change', (event) => {
            const selectedDiv = event.target.closest('.optionText');
            // Remove selected-option class from all options
            const allOptions = document.querySelectorAll('.optionText');
            allOptions.forEach(opt => opt.classList.remove('selected-option'));

            // Add selected-option class to the selected one
            selectedDiv.classList.add('selected-option');

            // Store the selected answer
            randomQuestion[index].choosedAnswer = event.target.value;

            // Save selected answer for this question
            selectedAnswers[index] = event.target.value;

        });
    });
}

// Function to show the previously selected answer
function showSelectedAnswer() {
    const previousAnswer = selectedAnswers[index];
    if (previousAnswer) {
        const selectedPrevOption = document.querySelector(`input[value="${previousAnswer}"]`);
        if (selectedPrevOption) {
            selectedPrevOption.checked = true;
            selectedPrevOption.closest('.optionText').classList.add('selected-option');
        }
    }
}

// Function to move to the next question
function nextQuestion() {
    const selectedOption = document.querySelector('input[name="options"]:checked');

    if (!selectedOption) {
        alert("Please select an option.");
        return;
    }

    // Save the selected answer
    randomQuestion[index].choosedAnswer = selectedOption.value;

    // Move to the next question or submit the quiz
    if (index < totalQuestions - 1) {
        index++;
        questionNumber++;
        displayQuestion();
    } else {
        submitQuiz();
    }
}


let correctAnswers = 0;
function updateScore() {
    score = randomQuestion.reduce((acc, question) => {
        return acc + (question.choosedAnswer === question.rightAns ? 2 : 0);
    }, 0);
    if(question.choosedAnswer === question.rightAns){
        correctAnswers ++;
    }
}

// Function to go back to the previous question
function previousQuestion() {
    if (index > 0) {
        index--;
        questionNumber--;
        displayQuestion();
    }
}


// Function to submit the quiz and calculate the score

function submitQuiz() {
    const quizEndTime = new Date();
    const timeTaken = calculateTimeTaken(quizStartTime, quizEndTime);
    let confirmAlert = confirm("Are you sure want to submit the quiz?");

    if (confirmAlert) {
        updateScore();
        // let userLogedIn = JSON.parse(localStorage.getItem('isLoggedin'));
        // let testUser = userLogedIn;

        const userScore = {
            testUserName: testUser.fullName,
            testUserEmail: testUser.email,
            score: score,
            selectedQuiz: randomQuestion,
        };

        let storedScores = JSON.parse(localStorage.getItem('userScores')) || [];
        storedScores.push(userScore);

        localStorage.setItem('userScores', JSON.stringify(storedScores));

        console.log(score)
        window.location.href = "leaderboard.html";
    }}

// Function to calculate time taken
function calculateTimeTaken(startTime, endTime) {
    const timeDiff = Math.floor((endTime - startTime) / 1000); // Time difference in seconds
    const minutes = Math.floor(timeDiff / 60);
    const seconds = timeDiff % 60;
    return `${minutes} minutes and ${seconds} seconds`;
}


// Function to show top 6 leaderboard
function showLeaderboard() {
    let userScores = JSON.parse(localStorage.getItem('userScores')) || [];

    // Sort the users by score in descending order
    let sortedUsers = userScores.sort((a, b) => b.score - a.score).slice(0, 6);

    // Update leaderboard display
    sortedUsers.forEach((user, index) => {
        document.getElementById(`top${index + 1}Name`).innerHTML = user.testUserName;
        document.getElementById(`top${index + 1}Score`).innerHTML = user.score;
        console.log(user.testUserName)
    });
}

// Function to show the user's rank
function rankDisplay() {
    let userScores = JSON.parse(localStorage.getItem('userScores')) || [];
    let sortedUsers = userScores.sort((a, b) => b.score - a.score);
    // console.log(sortedUsers)

    let currentUserName = JSON.parse(localStorage.getItem('isLoggedin')).fullName;
    let currentUser = sortedUsers.find(user => user.testUserName === currentUserName);

    if (currentUser) {
        let userRank = sortedUsers.findIndex(user => user.testUserName === currentUserName) + 1;

        // condition for 1st, 2nd, 3rd display
        if (userRank == 1) {
            document.getElementById("currentscore").style.display = "none"

            document.getElementById("rankDisplay").innerHTML = `Wow Your Rank is: ${userRank}st`;
        }
        else if (userRank == 2) {
            document.getElementById("currentscore").style.display = "none"

            document.getElementById("rankDisplay").innerHTML = ` Wow Your Rank is: ${userRank}nd`;
        }
        else if (userRank == 3) {
            document.getElementById("currentscore").style.display = "none"

            document.getElementById("rankDisplay").innerHTML = `Wow Your Rank is: ${userRank}rd`;
        }
        // condition for userrank greater than 6 display on 4th place div
        else if (userRank > 6) {
            console.log('hi', currentUserName)
            document.getElementById("currentscore").style.backgroundColor = " #E8BE21"

            document.getElementById("currentUserRank").innerHTML = `#${userRank}`;
            document.getElementById("currentUserName").innerHTML = ` ${currentUserName}`;
            document.getElementById("currentUserScore").innerHTML = currentUser.score
        }

        if (userRank > 3) {
            document.getElementById("rankDisplay").innerHTML = `Your Rank is : ${userRank}th`;
        }
        document.getElementById("rankScore").innerHTML = `Your Score: ${currentUser.score}`;
    }
    else {
        document.getElementById("rankDisplay").innerHTML = "User not found.";
    }
}

// Initial call to display the first question
displayQuestion();

document.addEventListener("DOMContentLoaded", function () {
    let userLoggedIn = JSON.parse(localStorage.getItem('isLoggedin'));

    // If user is not logged in, redirect to login page
    if (!userLoggedIn) {
        alert("Please login first");
        window.location.href = "index.html";
    }
});

if (userNameElement || userNameDisplay || userEmailDisplay || admin_credential || testUser) {
    confirmLogout();
    displayUserName();
    adminLoginValidation();
}


