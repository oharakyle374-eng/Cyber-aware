const questionBank = [

{
question:"Apa tujuan utama phishing?",
options:["Mencuri data","Mempercepat internet","Menghapus virus","Membuat akun"],
answer:0
},

{
question:"Apa fungsi 2FA?",
options:["Menambah keamanan","Menghapus password","Menginstal antivirus","Mempercepat login"],
answer:0
},

{
question:"Apa itu malware?",
options:["Program berbahaya","Browser","Antivirus","Firewall"],
answer:0
},

{
question:"Password paling kuat adalah?",
options:["123456","password","Budi123","M@h4sisw@2025!"],
answer:3
},

{
question:"HTTPS menandakan?",
options:["Website lebih aman","Website offline","Website lambat","Website rusak"],
answer:0
},

{
question:"WiFi publik berisiko karena?",
options:["Bisa disadap","Lebih cepat","Gratis","Tidak aman untuk game"],
answer:0
},

{
question:"Apa itu ransomware?",
options:["Virus penyandera data","Browser","Firewall","VPN"],
answer:0
},

{
question:"Data pribadi yang sensitif?",
options:["Nomor KTP","Nama Kota","Nama Jalan","Kode Pos"],
answer:0
},

{
question:"Kapan password harus diganti?",
options:["Jika bocor","10 tahun sekali","Tidak perlu","Saat beli HP"],
answer:0
},

{
question:"Apa fungsi antivirus?",
options:["Mendeteksi ancaman","Mempercepat internet","Menghapus akun","Mengunci file"],
answer:0
},

{
question:"VPN digunakan untuk?",
options:["Melindungi koneksi","Menambah RAM","Menghapus malware","Mengganti browser"],
answer:0
},

{
question:"Social engineering adalah?",
options:["Manipulasi manusia","Virus","Firewall","Software"],
answer:0
},

{
question:"Apa yang harus dilakukan pada email mencurigakan?",
options:["Verifikasi pengirim","Klik link","Forward","Balas"],
answer:0
},

{
question:"Backup data berguna untuk?",
options:["Mencegah kehilangan data","Mempercepat PC","Menghapus virus","Menambah storage"],
answer:0
},

{
question:"Ciri website phishing?",
options:["Domain mencurigakan","HTTPS","Logo jelas","Alamat resmi"],
answer:0
}

];

let questions = [];
let currentQuestion = 0;
let score = 0;

function shuffle(array){
return array.sort(() => Math.random()-0.5);
}

function startQuiz(){

questions = shuffle([...questionBank])
    .slice(0,10)
    .map(q => shuffleOptions(q));

currentQuestion = 0;
score = 0;

showQuestion();
}

function shuffleOptions(question){

    const options = [...question.options];

    const correctAnswer = question.options[question.answer];

    options.sort(() => Math.random() - 0.5);

    const newAnswer = options.indexOf(correctAnswer);

    return {
        question: question.question,
        options: options,
        answer: newAnswer,
        explanation: question.explanation
    };
}

function showQuestion(){

let q = questions[currentQuestion];

document.getElementById("progressBar").style.width =
((currentQuestion)/10)*100 + "%";

document.getElementById("quiz").innerHTML = `
<h3>Soal ${currentQuestion+1} dari 10</h3>

<p>${q.question}</p>

${q.options.map((opt,index)=>
`<div class="option"
onclick="checkAnswer(${index})">
${opt}
</div>`
).join("")}
`;

}

function checkAnswer(selected){

if(selected === questions[currentQuestion].answer){
score++;
}

currentQuestion++;

if(currentQuestion < 10){
showQuestion();
}
else{
showResult();
}

}

function showResult(){

document.getElementById("progressBar").style.width="100%";

let level = "";

if(score <=3){
level="🔴 Newbie";
}
else if(score <=6){
level="🟡 Digital Explorer";
}
else if(score <=8){
level="🟢 Security Defender";
}
else{
level="🏆 Cyber Guardian";
}

document.getElementById("quiz").innerHTML="";

document.getElementById("result").innerHTML=`
<h2>Quiz Selesai</h2>

<h1>${score}/10</h1>

<h3>${level}</h3>

<button onclick="startQuiz()">
Ulangi Quiz
</button>
`;

}

startQuiz();