console.log("Checker 2.0 Loaded - Entropy Based");

const passwordInput = document.getElementById("password");
const result = document.getElementById("result");
const barFill = document.getElementById("barFill");

// Membuat elemen baru untuk menampilkan estimasi waktu retak
const timeEstimate = document.createElement("p");
timeEstimate.style.fontSize = "0.9rem";
timeEstimate.style.marginTop = "10px";
timeEstimate.style.fontFamily = "monospace";
result.parentNode.insertBefore(timeEstimate, result.nextSibling);

passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;

    if(password.length === 0){
        result.innerHTML = "";
        barFill.style.width = "0%";
        timeEstimate.innerHTML = "";
        return;
    }

    // Menghitung Ukuran Pool Karakter (R)
    let poolSize = 0;
    if(/[a-z]/.test(password)) poolSize += 26;
    if(/[A-Z]/.test(password)) poolSize += 26;
    if(/[0-9]/.test(password)) poolSize += 10;
    if(/[^A-Za-z0-9]/.test(password)) poolSize += 32;

    // Kalkulasi Entropi: E = L * log2(R)
    const entropy = poolSize === 0 ? 0 : password.length * Math.log2(poolSize);

    // Asumsi peretas dapat menebak 10 Miliar password per detik
    const guesses = Math.pow(2, entropy);
    const secondsToCrack = guesses / 1e10;

    let timeStr = "";
    if(secondsToCrack < 1) timeStr = "Instan 💀";
    else if(secondsToCrack < 3600) timeStr = `${Math.round(secondsToCrack/60)} menit ⚠️`;
    else if(secondsToCrack < 86400) timeStr = `${Math.round(secondsToCrack/3600)} jam 🟠`;
    else if(secondsToCrack < 31536000) timeStr = `${Math.round(secondsToCrack/86400)} hari 🟡`;
    else timeStr = `${Math.round(secondsToCrack/31536000)} tahun 🟢`;

    timeEstimate.innerHTML = `⏳ Estimasi waktu retak: <strong style="color: var(--accent);">${timeStr}</strong>`;

    // Evaluasi berdasarkan kekuatan bit Entropi
    if(entropy < 40){
        result.innerHTML = `❌ Weak Password (${Math.round(entropy)} bits)`;
        result.style.color = "red";
        barFill.style.width = "33%";
        barFill.style.background = "red";
    }
    else if(entropy < 60){
        result.innerHTML = `⚠️ Medium Password (${Math.round(entropy)} bits)`;
        result.style.color = "orange";
        barFill.style.width = "66%";
        barFill.style.background = "orange";
    }
    else{
        result.innerHTML = `✅ Strong Password (${Math.round(entropy)} bits)`;
        result.style.color = "green";
        barFill.style.width = "100%";
        barFill.style.background = "green";
    }
});
