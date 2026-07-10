const cases = [
    {
        sender:"support-banknasional-security.com",
        subject:"Akun Anda Akan Diblokir!",
        message:"Klik link berikut untuk verifikasi akun Anda dalam 24 jam.",
        type:"phishing",
        suspiciousElement:"sender", // Menandakan pengirim yang janggal
        reason:"Domain mencurigakan, bukan domain resmi bank."
    },
    {
        sender:"noreply@kampus.ac.id",
        subject:"Jadwal Ujian Semester",
        message:"Silakan cek jadwal ujian terbaru melalui portal akademik resmi.",
        type:"safe",
        suspiciousElement: null,
        reason:"Menggunakan domain resmi kampus dan tidak meminta klik data sensitif."
    },
    {
        sender:"hadiah-gratis@winner-prize.net",
        subject:"Selamat! Anda Menang Rp10.000.000",
        message:"Klik tautan berikut untuk mengklaim hadiah sekarang juga.",
        type:"phishing",
        suspiciousElement:"subject",
        reason:"Iming-iming hadiah besar mendadak adalah taktik social engineering kuno."
    },
    {
        sender:"admin@google.com",
        subject:"Aktivitas Login Baru",
        message:"Kami mendeteksi login baru ke akun Anda. Periksa aktivitas jika bukan Anda.",
        type:"safe",
        suspiciousElement: null,
        reason:"Alamat pengirim dari domain asli perusahaan tanpa tautan memaksa."
    },
    {
        sender:"security-update@paypa1.com",
        subject:"Verifikasi Akun Sekarang",
        message:"Akun Anda akan ditutup jika tidak melakukan verifikasi dengan segera.",
        type:"phishing",
        suspiciousElement:"sender",
        reason:"Perhatikan typo domain 'paypa1' menggunakan angka 1, bukan huruf l."
    }
];

let answered = false;
let current = 0;
let score = 0;
let investigationMode = false;

function showCase(){
    const item = cases[current];
    investigationMode = false;
    document.getElementById("feedback").innerHTML = "";
    
    // Memberikan ID pada elemen untuk bisa diklik saat investigasi
    document.getElementById("content").innerHTML = `
        <div class="email-box" id="emailBox">
            <p id="el-sender" class="investigate-item" onclick="flagElement('sender')"><strong>Dari:</strong><br>${item.sender}</p>
            <p id="el-subject" class="investigate-item" onclick="flagElement('subject')"><strong>Subjek:</strong><br>${item.subject}</p>
            <p id="el-message" class="investigate-item" onclick="flagElement('message')"><strong>Pesan:</strong><br>${item.message}</p>
        </div>
        
        <div id="actionButtons">
            <button class="safe" onclick="checkAnswer('safe')">✅ Aman</button>
            <button class="phishing" onclick="activateInvestigation()">🚨 Lapor Phishing!</button>
        </div>
    `;
}

// Fungsi Baru: Mengaktifkan mode interaktif
function activateInvestigation() {
    investigationMode = true;
    document.getElementById("actionButtons").style.display = "none";
    document.getElementById("feedback").innerHTML = `
        <div class="wrong-box" style="border-color: orange;">
            <p><strong>🔍 Mode Forensik:</strong> Klik bagian mana dari email (Dari, Subjek, atau Pesan) yang menurut Anda membuktikan ini adalah phishing!</p>
        </div>
    `;
    
    // Menambahkan efek visual kursor untuk menandakan elemen bisa diklik (membutuhkan sedikit CSS nantinya)
    document.getElementById("emailBox").style.cursor = "crosshair";
}

// Fungsi Baru: Menangani klik elemen
function flagElement(elementClicked) {
    if(!investigationMode) return;
    
    const item = cases[current];
    if(item.type === 'safe') {
        finishCase(false, `Email ini sebenarnya aman, tapi Anda mencurigai bagian <b>${elementClicked}</b>.`);
    } else {
        if(item.suspiciousElement === elementClicked) {
            score++;
            finishCase(true, `Tepat! Analisis Anda jeli pada bagian <b>${elementClicked}</b>.<br><br>${item.reason}`);
        } else {
            finishCase(false, `Meleset. Bagian <b>${elementClicked}</b> bukan indikator utama. Ancaman sebenarnya ada di <b>${item.suspiciousElement}</b>.<br><br>${item.reason}`);
        }
    }
}

// Menangani tombol Aman biasa
function checkAnswer(choice) {
    const item = cases[current];
    if(choice === item.type) {
        score++;
        finishCase(true, item.reason);
    } else {
        finishCase(false, item.reason);
    }
}

function finishCase(isCorrect, explanation) {
    investigationMode = false;
    document.getElementById("emailBox").style.cursor = "default";
    document.getElementById("actionButtons") ? document.getElementById("actionButtons").style.display = "none" : null;
    
    document.getElementById("feedback").innerHTML = `
        <div class="${isCorrect ? 'correct-box' : 'wrong-box'}">
            <h2>${isCorrect ? "✅ Analisis Tepat" : "❌ Analisis Gagal"}</h2>
            <p><strong>Log Sistem:</strong></p>
            <p>${explanation}</p>
            <button class="next" onclick="nextCase()">Kasus Berikutnya →</button>
        </div>
    `;
}

function nextCase(){
    current++;
    if(current < cases.length) showCase();
    else showResult();
}

function showResult(){
    let level = score <= 2 ? "🔴 Perlu Latihan Forensik" : score <= 4 ? "🟡 Cukup Waspada" : "🟢 Ahli Cyber Security";
    document.getElementById("content").innerHTML = `
        <div class="email-box">
            <h2>🎯 Simulasi Berakhir</h2>
            <h1>${score}/${cases.length}</h1>
            <h3>${level}</h3>
            <button class="next" onclick="restartSimulation()">🔄 Ulangi Simulasi</button>
        </div>
    `;
    document.getElementById("feedback").innerHTML = "";
}

function restartSimulation(){
    current = 0;
    score = 0;
    showCase();
}

showCase();
