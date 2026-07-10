console.log("Checker Loaded");

const passwordInput = document.getElementById("password");
const result = document.getElementById("result");
const barFill = document.getElementById("barFill");

passwordInput.addEventListener("input", () => {

   const password = passwordInput.value;

if(password.length === 0){

    result.innerHTML = "";

    barFill.style.width = "0%";

    return;
}
    let score = 0;

    if(password.length >= 8) score++;
    if(/[A-Z]/.test(password)) score++;
    if(/[a-z]/.test(password)) score++;
    if(/[0-9]/.test(password)) score++;
    if(/[^A-Za-z0-9]/.test(password)) score++;

    if(score <= 2){

        result.innerHTML = "❌ Weak Password";
        result.style.color = "red";

        barFill.style.width = "33%";
        barFill.style.background = "red";

    }
    else if(score <= 4){

        result.innerHTML = "⚠️ Medium Password";
        result.style.color = "orange";

        barFill.style.width = "66%";
        barFill.style.background = "orange";

    }
    else{

        result.innerHTML = "✅ Strong Password";
        result.style.color = "green";

        barFill.style.width = "100%";
        barFill.style.background = "green";
    }

});