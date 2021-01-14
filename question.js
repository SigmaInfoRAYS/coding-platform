const firebaseConfig = {
  apiKey: "AIzaSyCNFY40jM0o9KvdBCMbNe3XqLKY0EGQgrE",
  authDomain: "codingweb-46655.firebaseapp.com",
  databaseURL: "https://codingweb-46655.firebaseio.com",
  projectId: "codingweb-46655",
  storageBucket: "codingweb-46655.appspot.com",
  messagingSenderId: "869602340221",
  appId: "1:869602340221:web:452898e8c1c11bd7e03014",
  measurementId: "G-W9QGQ1ZSZK",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics;

//Get the Type of Question Lab, Contest, Practise ----- DONE
//Show Qusetion from DB                          ------DONE
//Understand who is logged in , teacher or student -----DONE
//Working Run command ---------DONE
//Working Submit Command  ---------DONE
//Updating the Value of student on accept

var question_type = sessionStorage.getItem("Question-type");
var question_id = sessionStorage.getItem("id");

firebase
  .database()
  .ref(question_type + "/" + question_id)
  .once("value")
  .then(function (snapshot) {
    var question_name = snapshot.val().Question_name;
    var question_text = snapshot.val().Question;
    var sample_input = snapshot.val().Sample_input;
    var sample_output = snapshot.val().Sample_output;

    var a = document.getElementById("question-heading");
    var b = document.getElementById("question");
    var c = document.getElementById("sample-input");
    var d = document.getElementById("sample-output");

    a.innerText = question_name;
    b.innerText = question_text;
    c.innerText = sample_input;
    d.innerText = sample_output;
  });

function run(flag = true) {
  var wrong = document.getElementById("Wrong");
  var correct = document.getElementById("correct");
  var code = document.getElementById("code").value;

  if (code === "") {
    alert("Enter code");
    return;
  }
  var load = document.getElementById("Loading");
  wrong.innerText = "";
  wrong.style.display = "none";
  correct.innerText = "";
  correct.style.display = "none";
  load.style.display = "block";
  var sample_input = document.getElementById("sample-input").innerText;
  var sample_output = document.getElementById("sample-output").innerText;
  var lang = document.getElementById("language").value;

  sendcode(
    flag,
    code,
    sample_input,
    sample_output,
    lang,
    sessionStorage.getItem("type"),
    "run"
  );
}

function submit() {
  var load = document.getElementById("Loading");

  var code = document.getElementById("code").value;

  var lang = document.getElementById("language").value;

  run(false);

  var a = document.getElementById("Wrong").innerText;

  if (a === "") {
    //Hidden case

    firebase
      .database()
      .ref(question_type + "/" + question_id)
      .once("value")
      .then(function (snapshot) {
        var a = snapshot.val().Hidden_input;
        var b = snapshot.val().Hiddden_output;

        setTimeout(function () {
          sendcode(
            true,
            code,
            a,
            b,
            lang,
            sessionStorage.getItem("type"),
            "submit"
          );
        }, 2000);
      });
  }
}

function sendcode(flag, code, input, output, lang, type, submmision) {
  var load = document.getElementById("Loading");

  const data = JSON.stringify({
    language_id: lang,
    source_code: code,
    stdin: input,
  });

  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      var a = JSON.parse(this.responseText);

      setTimeout(function () {
        getoutput(flag, a.token, output, type, submmision, lang);
      }, 6000);
    }
  });

  xhr.open("POST", "https://judge0-ce.p.rapidapi.com/submissions");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader(
    "x-rapidapi-key",
    "88bd6c7e27msh81fe98de8ce9415p19a2f0jsneef5d2a8aa5a"
  );
  xhr.setRequestHeader("x-rapidapi-host", "judge0-ce.p.rapidapi.com");

  xhr.send(data);
}

function getoutput(flag, token, output, type, submission, lang) {
  var load = document.getElementById("Loading");
  var wrong = document.getElementById("Wrong");
  var correct = document.getElementById("correct");

  const data = null;
  const url = "https://judge0-ce.p.rapidapi.com/submissions/" + token;

  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      const a = JSON.parse(this.responseText);

      if (a.time > 1) {
        wrong.innerText = "Time Limit Exceed";
        correct.innerText = "";
        load.style.display = "none";
        wrong.style.display = "block";
      } else {
        output = output + "\n";

        if (a.stdout === output) {
          if (flag) {
            correct.innerText = "Accepted";
            wrong.innerText = "";
            load.style.display = "none";
            correct.style.display = "block";
          }

          if (submission === "submit") {
            //Add it to the database
            //Check for the type -teacher or student''

            if (type === "student") {
              firebase
                .database()
                .ref("students/" + sessionStorage.getItem("email"))
                .once("value")
                .then(function (snapshot) {
                  var pq = snapshot.val().Practise_questions;
                  var cq = snapshot.val().Contest_questions;
                  if (sessionStorage.getItem("lab-type") === "lab1") {
                    var lq = snapshot.val().Lab1_questions;
                  } else {
                    var lq = snapshot.val().Lab2_questions;
                  }

                  if (question_type === "Practise_Questions") {
                    if (!pq.includes(question_id)) {
                      if (sessionStorage.getItem("lab-type") === "lab1") {
                        firebase
                          .database()
                          .ref("students/" + sessionStorage.getItem("email"))
                          .set({
                            Email: snapshot.val().Email,
                            Name: snapshot.val().Name,
                            Practise_questions: pq + question_id + " ",
                            Lab1_questions: lq,
                            Contest_questions: cq,
                          });
                      } else {
                        firebase
                          .database()
                          .ref("students/" + sessionStorage.getItem("email"))
                          .set({
                            Email: snapshot.val().Email,
                            Name: snapshot.val().Name,
                            Practise_questions: pq + question_id + " ",
                            Lab2_questions: lq,
                            Contest_questions: cq,
                          });
                      }
                    }
                  } else if (question_type === "Lab2_Questions") {
                    if (!lq.includes(question_id)) {
                      if (sessionStorage.getItem("lab-type") === "lab1") {
                        firebase
                          .database()
                          .ref("students/" + sessionStorage.getItem("email"))
                          .set({
                            Email: snapshot.val().Email,
                            Name: snapshot.val().Name,
                            Practise_questions: pq,
                            Lab1_questions: lq + question_id + " ",
                            Contest_questions: cq,
                          });
                      } else {
                        firebase
                          .database()
                          .ref("students/" + sessionStorage.getItem("email"))
                          .set({
                            Email: snapshot.val().Email,
                            Name: snapshot.val().Name,
                            Practise_questions: pq,
                            Lab2_questions: lq + question_id + " ",
                            Contest_questions: cq,
                          });
                      }
                    }
                  } else if (question_type === "Lab1_Questions") {
                    if (!lq.includes(question_id)) {
                      if (sessionStorage.getItem("lab-type") === "lab1") {
                        firebase
                          .database()
                          .ref("students/" + sessionStorage.getItem("email"))
                          .set({
                            Email: snapshot.val().Email,
                            Name: snapshot.val().Name,
                            Practise_questions: pq,
                            Lab1_questions: lq + question_id + " ",
                            Contest_questions: cq,
                          });
                      } else {
                        firebase
                          .database()
                          .ref("students/" + sessionStorage.getItem("email"))
                          .set({
                            Email: snapshot.val().Email,
                            Name: snapshot.val().Name,
                            Practise_questions: pq,
                            Lab2_questions: lq + question_id + " ",
                            Contest_questions: cq,
                          });
                      }
                    }
                  } else {
                    if (!cq.includes(question_id)) {
                      if (sessionStorage.getItem("lab-type") === "lab1") {
                        firebase
                          .database()
                          .ref("students/" + sessionStorage.getItem("email"))
                          .set({
                            Email: snapshot.val().Email,
                            Name: snapshot.val().Name,
                            Practise_questions: pq,
                            Lab1_questions: lq,
                            Contest_questions: cq + question_id + " ",
                          });
                      } else {
                        firebase
                          .database()
                          .ref("students/" + sessionStorage.getItem("email"))
                          .set({
                            Email: snapshot.val().Email,
                            Name: snapshot.val().Name,
                            Practise_questions: pq,
                            Lab2_questions: lq,
                            Contest_questions: cq + question_id + " ",
                          });
                      }
                    }
                  }
                });
            }
          }
        } else {
          if (a.status.description !== "Accepted") {
            wrong.innerText = a.status.description;
            correct.innerText = "";
            load.style.display = "none";
            wrong.style.display = "block";
          } else {
            wrong.innerText = "Wrong Answer";
            correct.innerText = "";
            load.style.display = "none";
            wrong.style.display = "block";
          }
        }
      }
    }
  });

  xhr.open("GET", url);
  xhr.setRequestHeader(
    "x-rapidapi-key",
    "88bd6c7e27msh81fe98de8ce9415p19a2f0jsneef5d2a8aa5a"
  );
  xhr.setRequestHeader("x-rapidapi-host", "judge0-ce.p.rapidapi.com");

  xhr.send(data);
}

function dashboard() {
  if (sessionStorage.getItem("type") === "student") {
    location.href = "dashboard.html";
  } else {
    location.href = "faculty-dashboard.html";
  }
}

function profile() {
  if (sessionStorage.getItem("type") === "student") {
    location.href = "profile.html";
  } else {
    location.href = "faculty-profile.html";
  }
}
