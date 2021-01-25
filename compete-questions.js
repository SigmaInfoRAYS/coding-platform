var firebaseConfig = {
    apiKey: "AIzaSyCgRDhjFb26u8iiMkoJP3TpfSlZnU96P-w",
    authDomain: "medicodes-77362.firebaseapp.com",
    projectId: "medicodes-77362",
    storageBucket: "medicodes-77362.appspot.com",
    messagingSenderId: "387859315681",
    appId: "1:387859315681:web:23df9db36792f34e2930a0",
    measurementId: "G-0RZHG2KT93"
  };


firebase.initializeApp(firebaseConfig);
firebase.analytics;

//Get the Student ID
//Get the list of questions
//Get the list of questions solved by student.


var id = sessionStorage.getItem("email")
var table = document.getElementById("contest-table");



var database = firebase.database();

ref = database.ref("Contest_Questions/");

ref.once('value', getdatacontest, errdata);


function getdatacontest(data) {
    console.log(id);

    firebase.database().ref("students/" + id).once('value').then(function (snapshot) {
        var arr = snapshot.val().Contest_questions.split(" ");

        const db = data.val();
        const keys = Object.keys(db);

        for (let i = 0; i < keys.length; i++) {
            var k = keys[i];

            var QuestionName = db[k].Question_name;
            var table = document.getElementById("contest-table");


            var a = document.createElement("tr");
            var b = document.createElement("th");
            var c = document.createElement("td");
            var d = document.createElement("td");
            var e = document.createElement("td");

            var g = document.createElement("a");
            var h = document.createElement("i");

            if(arr.includes(k)){
                a.className = "done";
                g.className = "btn btn-success";
                h.className = "fa fa-thumbs-up";
            }
            else{

                a.className = "not-done";
                g.className = "btn btn-danger";
                h.className = "fa fa-question-circle";
            }
            a.id = k




            a.onclick = function (){
                sessionStorage.setItem("Question-type", "Contest_Questions");
                sessionStorage.setItem("id", this.id);
                location.href = "question.html";

            }



            b.innerText = i +1;
            b.scope = "row";
            c.innerText = QuestionName;

            d.innerText = 100;

            //btn btn-success


            // fa fa-thumbs-up
            e.appendChild(g);
            g.appendChild(h);
            a.appendChild(b);
            a.appendChild(c);
            a.appendChild(d);
            a.appendChild(e);

            table.appendChild(a);

        }

    });

}

function errdata(){

}
