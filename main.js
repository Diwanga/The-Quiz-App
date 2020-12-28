var btns = document.getElementsByClassName("ans");
const elA = document.getElementById("a");
const elB = document.getElementById("b");
const elC = document.getElementById("c");
const elD = document.getElementById("d");
const ques = document.getElementById("ques");
const questarea = document.getElementById("questarea");
const submit = document.getElementById("submit");
questarea.style.display = "none";
submit.style.display = "none";

const q = document.getElementsByClassName("q");
let answers = [];
let current = 0;
let questions = [];
let mark = 0;

// const questions = [
//   {
//     question: "Diwangage wayasa keeyada?",
//     a: "12",
//     b: "22",
//     c: "23",
//     d: "42",
//     ans: "b",
//   },
//   {
//     question: "Diwangage pasalak nowanne kummkda?",
//     a: "SAC",
//     b: "RCG",
//     c: "MUV",
//     d: "SCG",
//     ans: "d",
//   },
//   {
//     question: "lankawe llassanam nagaraya mokkda?",
//     a: "colombo",
//     b: "Galle",
//     c: "mathara",
//     d: "jafna",
//     ans: "b",
//   },
// ];

function readTextFile(file) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText;
        const Readedquestions = allText.toString().split("/");
        const itter = Readedquestions.length;
        var itter2 = 0;
        for (let i = 0; i < itter / 6; i++) {
          let quesy = {};

          quesy.question = Readedquestions[itter2++];
          quesy.a = Readedquestions[itter2++];
          quesy.b = Readedquestions[itter2++];
          quesy.c = Readedquestions[itter2++];
          quesy.d = Readedquestions[itter2++];
          quesy.ans = Readedquestions[itter2++];
          questions.push(quesy);
        }
        console.log(questions);
      }
    }
  };
  rawFile.send(null);
}

for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    if (current.length > 0) current[0].classList.toggle("active");
    this.classList.toggle("active");
  });
}

const showanswes = () => {
  ques.innerHTML = questions[current].question;
  elA.innerHTML = questions[current].a;
  elB.innerHTML = questions[current].b;
  elC.innerHTML = questions[current].c;
  elD.innerHTML = questions[current].d;
};

const disselect = () => {
  var x = document.getElementsByClassName("active");
  x[0].classList.remove("active");
};
const makequiz = () => {
  //   if (document.getElementsByClassName("active")!= undefined) {
  var x = document.getElementsByClassName("active");
  //   } else {
  if (x.length === 0) {
    console.log("fsdfsdf");

    return;
  }
  console.log(current);
  current++;

  console.log(x[0].id);
  answers.push(x[0].id);

  console.log(answers);

  if (current >= questions.length) {
    submit.innerHTML = "Lets See Marks";
    elA.disabled = true;
    elB.disabled = true;
    elC.disabled = true;
    elD.disabled = true;
    ques.innerText = "Quize is Over!!";

    submit.removeEventListener("click", makequiz);
    submit.addEventListener("click", showmarks);

    console.log(answers);
    return;
  }
  showanswes();
  // if(current === questions.length){
  disselect();
  // }
};

function reload() {
  reload = location.reload();
}

const showmarks = () => {
  // Server logic

  const Serveranses = questions.map((qs) => {
    return qs.ans;
  });
  for (var i = 0; i < Serveranses.length; i++) {
    if (Serveranses[i] === answers[i]) {
      mark++;
    }
  }

  // console.log("sdxadeeeeeeasdas");
  // console.log(Serveranses);

  // console.log("sdxfsdf");
  q[0].innerHTML = `<h1>Your marks ${mark}/${questions.length} </h1>`;
  submit.innerHTML = "Reattempt";
  submit.removeEventListener("click", showmarks);
  submit.addEventListener("click", reload, false);
};

var start = document.getElementById("start");

start.addEventListener("click", () => {
  readTextFile("Input.txt");
  submit.style.display = "block";
  submit.addEventListener("click", makequiz);
  questarea.style.display = "block";
  showanswes();
  timer(true);
  start.disabled = true;
  start.innerText = "Quiz ongoing";
  start.style.backgroundColor = "chartreuse";
});
const timer = (stop) => {
  if (stop) {
    var countdown = 1 * 60 * 1000;
    var timerId = setInterval(function () {
      countdown -= 1000;
      var min = Math.floor(countdown / (60 * 1000));
      //var sec = Math.floor(countdown - (min * 60 * 1000));  // wrong
      var sec = Math.floor((countdown - min * 60 * 1000) / 1000); //correct

      if (countdown <= 0) {
        //alert("30 min! Quize is over");
        clearInterval(timerId);
        document.getElementById("time").innerText = `0 : 0`;
        submit.innerHTML = "Lets See Marks";
        elA.disabled = true;
        elB.disabled = true;
        elC.disabled = true;
        elD.disabled = true;

        ques.innerText = "Quize is Over!!";

        // Attach an event handler to the document
        submit.removeEventListener("click", makequiz);
        submit.addEventListener("click", showmarks);
      } else {
        document.getElementById("time").innerText = `${min} : ${sec}`;
      }
    }, 1000); //1000ms. = 1sec.
  } else {
    clearInterval(timerId);
  }
};
