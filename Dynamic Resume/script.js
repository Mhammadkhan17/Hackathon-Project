var updateResume = function () {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var education = document.getElementById("education").value;
    var experience = document.getElementById("experience").value;
    var skills = document.getElementById("skills").value;
    var projects = document.getElementById("projects").value;
    var references = document.getElementById("references").value;
    var resumeOutput = document.getElementById("resumeOutput");
    resumeOutput.innerHTML = "\n        <h2>".concat(name, "</h2>\n        <p><strong>Email:</strong> ").concat(email, "</p>\n        <p><strong>Phone:</strong> ").concat(phone, "</p>\n        <h3>Education</h3>\n        <p>").concat(education, "</p>\n        <h3>Work Experience</h3>\n        <p>").concat(experience, "</p>\n        <h3>Skills</h3>\n        <p>").concat(skills, "</p>\n        <h3>Projects</h3>\n        <p>").concat(projects, "</p>\n        <h3>References</h3>\n        <p>").concat(references, "</p>\n    ");
};
// Attach the updateResume function to input and textarea events
var inputs = document.querySelectorAll("input, textarea");
inputs.forEach(function (input) {
    input.addEventListener("input", updateResume);
});
