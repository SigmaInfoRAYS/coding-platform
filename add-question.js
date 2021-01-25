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



//Get Questions ID from DB  -----Done
//Add Question into the Database ------Done
//Update the Question Id --------Done
//Update Faculty record  -------Done
//Move back to dashboard -----Done



function change(){
    location.href = "faculty-dashboard.html";

}



function adding(){
    var a = document.getElementById("question-name").value;
    var b = document.getElementById("sample-input").value;
    var c = document.getElementById("sample-output").value;
    var d = document.getElementById("hidden-input").value;
    var e = document.getElementById("hidden-output").value;
    var f = document.getElementById("inputState").value;
    var g = document.getElementById("question").value;

    if(a === ""){
        alert("Enter the question name");
    }
    else if(b === ""){
        alert("Enter the sample input");
    }
    else if(c === ""){
        alert("Enter the sample output");
    }
    else if(d === ""){
        alert("Enter the hidden input");

    }
    else if(g===""){
        alert("Enter the Question");

    }
    else if(e === ""){
        alert("Enter the hidden output");
    }
    else{

        firebase.database().ref('QuestionId').once('value').then(function (snapshot){
            var ContestId = snapshot.val().Contest_id;
            var lab1_id = snapshot.val().Lab1_id;
            var lab2_id = snapshot.val().Lab2_id;
            var practise_id = snapshot.val().Practise_id;
            var key  = sessionStorage.getItem("email");


            if(f==="Contest"){



                if(sessionStorage.getItem("lab-type") === "lab1"){



                    ContestId++;

                    firebase.database().ref('Contest_Questions/' + ContestId).set({
                        Question_name : a,
                        Sample_input : b,
                        Sample_output :c,
                        Hidden_input : d,
                        Hiddden_output : e,
                        Question: g
                    });


                    firebase.database().ref('teachers/' + key ).once('value').then(function (snapshot){
                        var name = snapshot.val().Name;
                        var email = snapshot.val().Email;
                        var LabQ = snapshot.val().Lab1_questions;
                        var PractiseQ = snapshot.val().Practise_questions;
                        var ContestQ = snapshot.val().Contest_questions;

                        ContestQ = ContestQ + ContestId.toString() + " ";



                        firebase.database().ref('teachers/' + key).set({
                            Contest_questions : ContestQ,
                            Name : name,
                            Email : email,
                            Lab1_questions : LabQ,
                            Practise_questions : PractiseQ

                        })

                    });


                }
                else{


                    ContestId++;

                    firebase.database().ref('Contest_Questions/' + ContestId).set({
                        Question_name : a,
                        Sample_input : b,
                        Sample_output :c,
                        Hidden_input : d,
                        Hiddden_output : e,
                        Question: g
                    });


                    firebase.database().ref('teachers/' + key ).once('value').then(function (snapshot){
                        var name = snapshot.val().Name;
                        var email = snapshot.val().Email;
                        var LabQ = snapshot.val().Lab2_questions;
                        var PractiseQ = snapshot.val().Practise_questions;
                        var ContestQ = snapshot.val().Contest_questions;

                        ContestQ = ContestQ + ContestId.toString() + " ";



                        firebase.database().ref('teachers/' + key).set({
                            Contest_questions : ContestQ,
                            Name : name,
                            Email : email,
                            Lab2_questions : LabQ,
                            Practise_questions : PractiseQ

                        })

                    });

                }


            }





            else if(f==="Lab"){


                if(sessionStorage.getItem("lab-type") === "lab1"){

                    lab1_id++;




                    firebase.database().ref('Lab1_Questions/' + lab1_id).set({
                        Question_name : a,
                        Sample_input : b,
                        Sample_output :c,
                        Hidden_input : d,
                        Hiddden_output : e,
                        Question: g
                    });


                    firebase.database().ref('teachers/' + key ).once('value').then(function (snapshot){
                        var name = snapshot.val().Name;
                        var email = snapshot.val().Email;
                        var LabQ = snapshot.val().Lab1_questions;
                        var PractiseQ = snapshot.val().Practise_questions;
                        var ContestQ = snapshot.val().Contest_questions;

                        LabQ = LabQ + lab1_id.toString() + " ";

                        firebase.database().ref('teachers/' + key).set({
                            Contest_questions : ContestQ,
                            Name : name,
                            Email : email,
                            Lab1_questions : LabQ,
                            Practise_questions : PractiseQ

                        })

                    });


                }
                else{
                    lab2_id++;


                    firebase.database().ref('Lab2_Questions/' + lab2_id).set({
                        Question_name : a,
                        Sample_input : b,
                        Sample_output :c,
                        Hidden_input : d,
                        Hiddden_output : e,
                        Question: g
                    });


                    firebase.database().ref('teachers/' + key ).once('value').then(function (snapshot){
                        var name = snapshot.val().Name;
                        var email = snapshot.val().Email;
                        var LabQ = snapshot.val().Lab2_questions;
                        var PractiseQ = snapshot.val().Practise_questions;
                        var ContestQ = snapshot.val().Contest_questions;

                        LabQ = LabQ + lab2_id.toString() + " ";

                        firebase.database().ref('teachers/' + key).set({
                            Contest_questions : ContestQ,
                            Name : name,
                            Email : email,
                            Lab2_questions : LabQ,
                            Practise_questions : PractiseQ

                        })

                    });

                }


            }






            else {
                practise_id++;

                firebase.database().ref('Practise_Questions/' + practise_id).set({
                    Question_name: a,
                    Sample_input: b,
                    Sample_output: c,
                    Hidden_input: d,
                    Hiddden_output: e,
                    Question: g
                });


                if(sessionStorage.getItem("lab-type") === "lab1"){
                    firebase.database().ref('teachers/' + key ).once('value').then(function (snapshot){
                        var name = snapshot.val().Name;
                        var email = snapshot.val().Email;
                        var LabQ = snapshot.val().Lab1_questions;
                        var PractiseQ = snapshot.val().Practise_questions;
                        var ContestQ = snapshot.val().Contest_questions;

                        PractiseQ = PractiseQ + practise_id.toString() + " ";

                        firebase.database().ref('teachers/' + key).set({
                            Contest_questions : ContestQ,
                            Name : name,
                            Email : email,
                            Lab1_questions : LabQ,
                            Practise_questions : PractiseQ

                        })

                    });


                }
                else{
                    firebase.database().ref('teachers/' + key ).once('value').then(function (snapshot){
                        var name = snapshot.val().Name;
                        var email = snapshot.val().Email;
                        var LabQ = snapshot.val().Lab2_questions;
                        var PractiseQ = snapshot.val().Practise_questions;
                        var ContestQ = snapshot.val().Contest_questions;

                        PractiseQ = PractiseQ + practise_id.toString() + " ";

                        firebase.database().ref('teachers/' + key).set({
                            Contest_questions : ContestQ,
                            Name : name,
                            Email : email,
                            Lab2_questions : LabQ,
                            Practise_questions : PractiseQ

                        })

                    });

                }



            }

            firebase.database().ref('QuestionId/').set({
                Contest_id : ContestId,
                Lab1_id: lab1_id,
                Lab2_id: lab2_id,
                Practise_id : practise_id
            });

            setTimeout(function (){
                change();
            }, 1000);

        })

    }

}
