
const cases = [


{
sender:"support-banknasional-security.com",
subject:"Akun Anda Akan Diblokir!",
message:"Klik link berikut untuk verifikasi akun Anda dalam 24 jam.",
correct:"phishing",
reason:"Domain mencurigakan dan menggunakan tekanan waktu agar korban panik."
},

{
sender:"noreply@kampus.ac.id",
subject:"Jadwal Ujian Semester",
message:"Silakan cek jadwal ujian terbaru melalui portal akademik resmi.",
correct:"safe",
reason:"Menggunakan domain resmi kampus dan tidak meminta data sensitif."
},

{
sender:"hadiah-gratis@winner-prize.net",
subject:"Selamat! Anda Menang Rp10.000.000",
message:"Klik tautan berikut untuk mengklaim hadiah sekarang juga.",
correct:"phishing",
reason:"Iming-iming hadiah besar adalah ciri umum phishing."
},

{
sender:"admin@google.com",
subject:"Aktivitas Login Baru",
message:"Kami mendeteksi login baru ke akun Anda. Periksa aktivitas jika bukan Anda.",
correct:"safe",
reason:"Alamat pengirim resmi dan isi email informatif."
},

{
sender:"security-update@paypa1.com",
subject:"Verifikasi Akun Sekarang",
message:"Akun Anda akan ditutup jika tidak melakukan verifikasi.",
correct:"phishing",
reason:"Domain palsu menggunakan angka 1 menggantikan huruf l."
}

];

let answered = false;
let current = 0;
let score = 0;

function showCase(){

const item = cases[current];

document.getElementById("feedback").innerHTML = "";

document.getElementById("content").innerHTML = `
<div class="email-box">

<p><strong>Dari:</strong><br>${item.sender}</p>

<p><strong>Subjek:</strong><br>${item.subject}</p>

<p><strong>Pesan:</strong><br>${item.message}</p>

</div>

<button class="safe" onclick="checkAnswer('safe')">
✅ Aman
</button>

<button class="phishing" onclick="checkAnswer('phishing')">
🚨 Phishing
</button>
`;
}

function checkAnswer(choice){

    if(answered) return;

answered = true;

const item = cases[current];

const correct = choice === item.correct;

if(correct){
score++;
}

document.getElementById("feedback").innerHTML = `
<div class="${correct ? 'correct-box' : 'wrong-box'}">

<h2>${correct ? "✅ Jawaban Benar" : "❌ Jawaban Salah"}</h2>

<p><strong>Penjelasan:</strong></p>

<p>${item.reason}</p>

<button class="next" onclick="nextCase()">
Kasus Berikutnya →
</button>

</div>


`;
}

function nextCase(){
    answered = false;

current++;

if(current < cases.length){
showCase();
}
else{
showResult();
}
}

function showResult(){

let level = "";

if(score <= 2){
    level = "🔴 Perlu Latihan Lagi";
}
else if(score <= 4){
    level = "🟡 Cukup Waspada";
}
else{
    level = "🟢 Ahli Mendeteksi Phishing";
}

document.getElementById("content").innerHTML = `
<div class="email-box">

<h2>🎯 Simulasi Selesai</h2>

<h1>${score}/${cases.length}</h1>

<h3>${level}</h3>

<p>
Kemampuan Anda dalam mengenali email phishing telah diuji.
Terus tingkatkan kewaspadaan terhadap email mencurigakan.
</p>

<button class="next" onclick="restartSimulation()">
🔄 Ulangi Simulasi
</button>

</div>
`;

document.getElementById("feedback").innerHTML = "";
}


function restartSimulation(){
current = 0;
score = 0;
answered = false;
showCase();
}

showCase();

