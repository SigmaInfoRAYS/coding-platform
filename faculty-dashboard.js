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





//Show the data into the website  --- done
//Set the onlick function into the LI  ---- done
//Set the correct session item. ---- Main Problem
//Link the next page correctly








var database = firebase.database();

ref = database.ref("Contest_Questions/");

ref.once('value', getdatacontest, errdata);


function getdatacontest(data) {
    const db = data.val();
    const keys = Object.keys(db);
    var a = document.getElementById("contest-problem-list");

    for (let i = 0; i < keys.length; i++) {
        var k = keys[i];
        var QuestionName = db[k].Question_name;


        var d = document.createElement("li");
        var e = document.createElement("a");
        d.id = k
        e.href = "question.html";



        d.onclick = function (){
            sessionStorage.setItem("Question-type",  "Contest_Questions");
            sessionStorage.setItem("id", this.id);


        }


        d.innerText = QuestionName;

        e.appendChild(d);
        a.appendChild(e);
    }

}





if(sessionStorage.getItem("lab-type") === "lab1"){
    var type = "Lab1_Questions";
}
else{
    var type = "Lab2_Questions";

}


ref = database.ref(type +"/");

ref.once('value', getdatalab, errdata);


function getdatalab(data) {
    const db = data.val();
    const keys = Object.keys(db);
    var a = document.getElementById("lab-problem-list");

    for (let i = 0; i < keys.length; i++) {
        var k = keys[i];
        var QuestionName = db[k].Question_name;


        var d = document.createElement("li");
        var e = document.createElement("a");
        d.id = k
        e.href = "question.html";

        d.onclick = function (){
            sessionStorage.setItem("Question-type",  type);


            sessionStorage.setItem("id", this.id);
        }


        d.innerText = QuestionName;

        e.appendChild(d);
        a.appendChild(e);

    }

}




ref = database.ref("Practise_Questions/");

ref.once('value', getdataprac, errdata);


function getdataprac(data) {
    const db = data.val();
    const keys = Object.keys(db);
    var a = document.getElementById("practice-problem-list");

    for (let i = 0; i < keys.length; i++) {
        var k = keys[i];
        var QuestionName = db[k].Question_name;


        var d = document.createElement("li");
        var e = document.createElement("a");
        d.id = k
        e.href = "question.html";

        d.onclick = function (){
            sessionStorage.setItem("Question-type",  "Practise_Questions");
            sessionStorage.setItem("id", this.id);

        }


        d.innerText = QuestionName;

        e.appendChild(d);
        a.appendChild(e);
    }

}










function errdata(){

}


