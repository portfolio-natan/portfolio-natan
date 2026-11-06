const questions=[
{question:"Qual linguagem é usada para estruturar páginas da web?",answers:["CSS","HTML","JavaScript","Python"],correct:1},
{question:"Qual linguagem é usada principalmente para estilizar páginas web?",answers:["HTML","CSS","Java","C++"],correct:1},
{question:"Qual linguagem adiciona interatividade às páginas web?",answers:["JavaScript","HTML","CSS","SQL"],correct:0},
{question:"O que significa CPU?",answers:["Central Processing Unit","Computer Personal User","Central Program Utility","Control Processing User"],correct:0},
{question:"Qual destes é um sistema operacional?",answers:["Windows","HTML","Chrome","JavaScript"],correct:0},
{question:"Qual comando mostra uma mensagem no console do JavaScript?",answers:["print()","console.log()","echo()","message()"],correct:1},
{question:"Qual destas opções é uma linguagem de programação?",answers:["Python","Photoshop","Windows","Chrome"],correct:0},
{question:"Para que serve o CSS?",answers:["Criar bancos de dados","Estilizar páginas","Editar vídeos","Criar sistemas operacionais"],correct:1},
{question:"Qual símbolo é usado para comentário de uma linha em JavaScript?",answers:["//","<!-- -->","#","/* */"],correct:0},
{question:"O que é um algoritmo?",answers:["Um tipo de computador","Uma sequência de passos para resolver um problema","Um sistema operacional","Uma linguagem de marcação"],correct:1}
];
const q=document.getElementById("question"),a=document.getElementById("answers"),p=document.getElementById("progress"),r=document.getElementById("result"),restart=document.getElementById("restartBtn");let current=0,score=0;
function show(){const item=questions[current];p.textContent=`Pergunta ${current+1} de ${questions.length}`;q.textContent=item.question;a.innerHTML="";item.answers.forEach((text,i)=>{const b=document.createElement("button");b.className="answer";b.textContent=text;b.onclick=()=>select(i,b);a.appendChild(b)})}
function select(i,selected){const correct=questions[current].correct;const buttons=document.querySelectorAll(".answer");buttons.forEach(b=>b.disabled=true);if(i===correct){selected.classList.add("correct");score++}else{selected.classList.add("wrong");buttons[correct].classList.add("correct")}setTimeout(()=>{current++;current<questions.length?show():finish()},800)}
function finish(){q.textContent="Quiz finalizado! 🎉";a.innerHTML="";p.textContent="Resultado final";r.textContent=`Você acertou ${score} de ${questions.length} (${Math.round(score/questions.length*100)}%).`;restart.style.display="block"}
restart.onclick=()=>{current=0;score=0;r.textContent="";restart.style.display="none";show()};show();