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

//Show the data into the website;
//Get ids

var id = sessionStorage.getItem("email");

firebase
  .database()
  .ref("students/" + id)
  .once("value")
  .then(function (snapshot) {
    var name = snapshot.val().Name;
    var email = snapshot.val().Email;
    var lab = document.getElementById("lab");
    var contestq = snapshot.val().Contest_questions.split(" ");
    if (sessionStorage.getItem("lab-type") === "lab1") {
      var labq = snapshot.val().Lab1_questions.split(" ");
      lab.innerText = "LAB-1";
    } else {
      var labq = snapshot.val().Lab2_questions.split(" ");
      lab.innerText = "LAB-2";
    }

    var practiseq = snapshot.val().Practise_questions.split(" ");

    var a = document.getElementById("username");
    var b = document.getElementById("user-mail");
    var c = document.getElementById("practice-progress");
    var d = document.getElementById("contest-progress");
    var e = document.getElementById("lab-progress");

    a.innerText = name;
    b.innerText = email;

    firebase
      .database()
      .ref("QuestionId/")
      .once("value")
      .then(function (snapshot) {
        var totalcontest = snapshot.val().Contest_id;
        if (sessionStorage.getItem("lab-type") === "lab1") {
          var totallab = snapshot.val().Lab1_id;
        } else {
          var totallab = snapshot.val().Lab2_id;
        }
        var totalpractise = snapshot.val().Practise_id;

        c.style.width =
          ((practiseq.length - 1) * 100) / parseInt(totalpractise) + "%";
        d.style.width =
          ((contestq.length - 1) * 100) / parseInt(totalcontest) + "%";
        e.style.width = ((labq.length - 1) * 100) / parseInt(totallab) + "%";

        if (totalpractise === 0) {
          c.style.width = 100 + "%";
        }
        if (totalcontest === 0) {
          d.style.width = 100 + "%";
        }
        if (totallab === 0) {
          e.style.width = 100 + "%";
        }

        document.getElementById("practice-progress-text").innerText =
          practiseq.length - 1 + "/" + totalpractise;
        document.getElementById("contest-progress-text").innerText =
          contestq.length - 1 + "/" + totalcontest;
        document.getElementById("lab-progress-text").innerText =
          labq.length - 1 + "/" + totallab;
      });
  });

function logout() {
  sessionStorage.setItem("auth", false);
  location.href = "login.html";
}
