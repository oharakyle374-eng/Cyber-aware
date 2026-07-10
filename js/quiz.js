// Bank soal biarkan tetap di sini untuk sementara, atau pindahkan ke data.json nantinya
const questionBank = [
    { question:"Apa tujuan utama phishing?", options:["Mencuri data","Mempercepat internet","Menghapus virus","Membuat akun"], answer:0 },
    { question:"Apa fungsi 2FA?", options:["Menambah keamanan","Menghapus password","Menginstal antivirus","Mempercepat login"], answer:0 },
    { question:"Apa itu malware?", options:["Program berbahaya","Browser","Antivirus","Firewall"], answer:0 },
    { question:"Password paling kuat adalah?", options:["123456","password","Budi123","M@h4sisw@2025!"], answer:3 },
    { question:"HTTPS menandakan?", options:["Website lebih aman","Website offline","Website lambat","Website rusak"], answer:0 },
    { question:"WiFi publik berisiko karena?", options:["Bisa disadap","Lebih cepat","Gratis","Tidak aman untuk game"], answer:0 },
    { question:"Apa itu ransomware?", options:["Virus penyandera data","Browser","Firewall","VPN"], answer:0 },
    { question:"Data pribadi yang sensitif?", options:["Nomor KTP","Nama Kota","Nama Jalan","Kode Pos"], answer:0 },
    { question:"Kapan password harus diganti?", options:["Jika bocor","10 tahun sekali","Tidak perlu","Saat beli HP"], answer:0 },
    { question:"Apa fungsi antivirus?", options:["Mendeteksi ancaman","Mempercepat internet","Menghapus akun","Mengunci file"], answer:0 }
];

let questions = [];
let currentQuestion = 0;
let score = 0;

function shuffle(array){
    return array.sort(() => Math.random()-0.5);
}

// Simulasi Fetch API (Dinamisasi Data)
async function fetchQuestions() {
    // Di masa depan, kamu bisa ganti baris ini dengan: return await fetch('data.json').then(r => r.json());
    return new Promise((resolve) => setTimeout(() => resolve(questionBank), 300)); 
}

// Fungsi Load awal dengan LocalStorage
async function initQuiz(){
    const savedProgress = localStorage.getItem("cyberQuizState");
    if(savedProgress) {
        const state = JSON.parse(savedProgress);
        questions = state.questions;
        currentQuestion = state.currentQuestion;
        score = state.score;
        showQuestion();
    } else {
        await startQuiz();
    }
}

async function startQuiz(){
    document.getElementById("quiz").innerHTML = "<p>🔄 Mendekripsi bank soal...</p>";
    
    const rawData = await fetchQuestions();
    questions = shuffle([...rawData]).slice(0,10).map(q => shuffleOptions(q));
    currentQuestion = 0;
    score = 0;
    
    saveState();
    showQuestion();
}

function saveState() {
    localStorage.setItem("cyberQuizState", JSON.stringify({questions, currentQuestion, score}));
}

function shuffleOptions(question){
    const options = [...question.options];
    const correctAnswer = question.options[question.answer];
    options.sort(() => Math.random() - 0.5);
    const newAnswer = options.indexOf(correctAnswer);
    return { ...question, options, answer: newAnswer };
}

function showQuestion(){
    let q = questions[currentQuestion];
    document.getElementById("progressBar").style.width = ((currentQuestion)/10)*100 + "%";

    document.getElementById("quiz").innerHTML = `
        <h3>Soal ${currentQuestion+1} dari 10</h3>
        <p>${q.question}</p>
        ${q.options.map((opt,index)=>
            `<div class="option" onclick="checkAnswer(${index})">${opt}</div>`
        ).join("")}
    `;
}

function checkAnswer(selected){
    if(selected === questions[currentQuestion].answer) score++;
    currentQuestion++;
    
    saveState(); // Simpan progres ke peramban pengguna

    if(currentQuestion < 10) showQuestion();
    else showResult();
}

function showResult(){
    localStorage.removeItem("cyberQuizState"); // Bersihkan storage setelah kuis selesai
    document.getElementById("progressBar").style.width="100%";

    let level = score <= 3 ? "🔴 Newbie" : score <= 6 ? "🟡 Digital Explorer" : score <= 8 ? "🟢 Security Defender" : "🏆 Cyber Guardian";

    document.getElementById("quiz").innerHTML=`
        <h2>Analisis Selesai</h2>
        <h1>${score}/10</h1>
        <h3>${level}</h3>
        <button onclick="startQuiz()">Ulangi Misi</button>
    `;
}

// Inisiasi
initQuiz();
