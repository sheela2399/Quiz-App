
let admin_email = "admin123@gmail.com";
let admin_password = "Admin$789"
let admin_credential = {
    admin_email: admin_email,
    admin_password: admin_password,
}
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
let invalidMsgPassword = document.getElementById("invalid-password");
let invalidMsgEmail = document.getElementById("invalid-email");

// Function for admin Validation..
function adminLoginValidation() {
    if (email === admin_email && password === admin_password) {
        localStorage.setItem("admin_credential", JSON.stringify(admin_credential));
        window.location.href = "admin.html"
    }
}


