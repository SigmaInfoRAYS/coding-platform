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


//Get the teacher data ----Done
//Show the data -----Done
//Logout button functioning --- Done


var id = sessionStorage.getItem("email");


firebase.database().ref("teachers/" + id).once('value').then(function(snapshot){
    var name = snapshot.val().Name;
    var email = snapshot.val().Email;
    var contestq = snapshot.val().Contest_questions.split(" ");
    if(sessionStorage.getItem("lab-type") === "lab1"){
        var labq = snapshot.val().Lab1_questions.split(" ");
    }
    else{
        var labq = snapshot.val().Lab2_questions.split(" ");
    }

    var practiseq = snapshot.val().Practise_questions.split(" ");


    var a = document.getElementById("username");
    var b = document.getElementById("user-mail");
    a.innerText = name;
    b.innerText = email;


    var database = firebase.database();
    ref = database.ref("Contest_Questions/").on('value', getdatacontest, errdata);
    ref = database.ref("Practise_Questions/").on('value', getdataprac, errdata);
    if(sessionStorage.getItem("lab-type") === "lab1"){
        ref = database.ref("Lab1_Questions/").on('value', getdatalab, errdata);
    }
    else{
        ref = database.ref("Lab2_Questions/").on('value', getdatalab, errdata);

    }





    function getdatalab(data){
        const db = data.val();

        const lab_list = document.getElementById("lab-problem-prepared");


        const keys = Object.keys(db);
        for(let i=0; i<keys.length; i++){
            var k = keys[i];

            if(labq.includes(k)){
                const a = document.createElement("li");
                const b = document.createElement("a");

                a.id = k;
                b.href = "question.html";

                a.onclick = function (){
                    sessionStorage.setItem("Question-type",  "Lab_Questions");
                    sessionStorage.setItem("id", this.id);
                }


                b.appendChild(a);
                a.innerText = db[k].Question_name;
                lab_list.appendChild(b);

            }



        }
    }



    function getdataprac(data){
        const db = data.val();

        const practise_list = document.getElementById("practice-problem-prepared");


        const keys = Object.keys(db);
        for(let i=0; i<keys.length; i++){
            var k = keys[i];

            if(practiseq.includes(k)){
                const a = document.createElement("li");
                const b = document.createElement("a");

                a.id = k;
                b.href = "question.html";


                a.onclick = function (){
                    sessionStorage.setItem("Question-type",  "Practise_Questions");
                    sessionStorage.setItem("id", this.id);
                }


                b.appendChild(a);
                a.innerText = db[k].Question_name;
                practise_list.appendChild(b);

            }



        }


    }




    function getdatacontest(data){
        const db = data.val();

        const contest_list = document.getElementById("contest-problem-prepared");


        const keys = Object.keys(db);
        for(let i=0; i<keys.length; i++){
            var k = keys[i];

            if(contestq.includes(k)) {
                const a = document.createElement("li");
                const b = document.createElement("a");

                a.id = k;
                b.href = "question.html";

                a.onclick = function () {
                    sessionStorage.setItem("Question-type", "Contest_Questions");
                    sessionStorage.setItem("id", this.id);
                }


                b.appendChild(a);
                a.innerText = db[k].Question_name;
                contest_list.appendChild(b);

            }


        }


    }
    function errdata(){

    }


})


function logout(){
    sessionStorage.setItem("auth", false);
    location.href = "index.html";


}






