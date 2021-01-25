var firebaseConfig = {
    apiKey: "AIzaSyCgRDhjFb26u8iiMkoJP3TpfSlZnU96P-w",
    authDomain: "medicodes-77362.firebaseapp.com",
    projectId: "medicodes-77362",
    storageBucket: "medicodes-77362.appspot.com",
    messagingSenderId: "387859315681",
    appId: "1:387859315681:web:23df9db36792f34e2930a0",
    measurementId: "G-0RZHG2KT93"
  };

//firebase.database().ref("Forum_Questions/" + questionId +"/" + "Answers/" + 0).set({
//                     Answer: "YUp",
//                     Author : "NoPE"
//
//                 })

firebase.initializeApp(firebaseConfig);
firebase.analytics;

function dashboard() {
  if (sessionStorage.getItem("type") === "student") {
    location.href = "dashboard.html";
  } else {
    location.href = "faculty-dashboard.html";
  }
}

var id = sessionStorage.getItem("email");
var type = sessionStorage.getItem("type") + "s";

ref = firebase
  .database()
  .ref("Forum_Questions/")
  .once("value", showdata, errdata);

function showdata(data) {
  const db = data.val();
  const keys = Object.keys(db);
  var table = document.getElementById("forum_table");

  firebase
    .database()
    .ref(type + "/" + id)
    .once("value")
    .then(function (snapshot) {
      var currentemail = snapshot.val().Email;
      var currentauthor = snapshot.val().Name;

      for (let i = 0; i < keys.length; i++) {
        var k = keys[i];
        var name = db[k].Author_name;
        var totalAnswers = db[k].Answer_id;
        var title = db[k].Query_title;
        var email = db[k].Author_Email;

        var a = document.createElement("tr");
        var b = document.createElement("th");
        var c = document.createElement("td");
        var d = document.createElement("td");
        var e = document.createElement("td");

        b.innerText = i + 1;
        c.innerText = title;
        d.innerText = totalAnswers;
        e.innerText = name;

        a.id = k;

        a.onclick = function () {
          sessionStorage.setItem("Fourm_Question_id", this.id);
          sessionStorage.setItem("currnet_author", currentauthor);

          location.href = "forum-question.html";
        };

        if (currentemail === email) {
          a.className = "current-user";
        }

        a.appendChild(b);
        a.appendChild(c);
        a.appendChild(d);
        a.appendChild(e);
        table.appendChild(a);
      }
    });
}

function errdata() {}

function addquestion() {
  var a = document.getElementById("query-name").value;
  var b = document.getElementById("query").value;

  if (a === "") {
    alert("Add query name");
  } else if (b === "") {
    alert("Enter the query");
  } else {
    firebase
      .database()
      .ref("ForumId/")
      .once("value")
      .then(function (snapshot) {
        var questionId = snapshot.val().ForumId;

        questionId++;

        firebase
          .database()
          .ref(type + "/" + id)
          .once("value")
          .then(function (snapshot) {
            var name = snapshot.val().Name;
            var email = snapshot.val().Email;

            firebase
              .database()
              .ref("Forum_Questions/" + questionId)
              .set({
                Author_name: name,
                Author_Email: email,
                Query: b,
                Query_title: a,
                Answer_id: 0,
              });
          });

        firebase.database().ref("ForumId/").set({
          ForumId: questionId,
        });

        document.getElementById("query-name").value = "Doubt adding......";

        setTimeout(function () {
          window.location.reload();
          document.getElementById("query-name").value = "";
        }, 2000);
        document.getElementById("query").value = "";
      });
  }
}

function profile() {
  if (sessionStorage.getItem("type") === "student") {
    location.href = "profile.html";
  } else {
    location.href = "faculty-profile.html";
  }
}

function dashboard() {
  if (sessionStorage.getItem("type") === "student") {
    location.href = "dashboard.html";
  } else {
    location.href = "faculty-dashboard.html";
  }
}
