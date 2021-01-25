// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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






//Student Database
//Email - primary key
//Password
//Name
//Score
//Questions array [id] - solved question


//Teachers Database
//Email - primary key
//Password
//Name
//Question array [id] - created question


//Question database
//Question Name
//Question id
//Question String
//Sample Input
//Sample Output
//Hidden Input
//Hidden Output

//question id



//Check in login student or teacher from DB











if(sessionStorage.getItem("auth") === true){
    location.href = "dashboard.html";
}



function next(type){
    if(type === "student"){
        location.href = "dashboard.html";

    }
    else{
        location.href = "faculty-dashboard.html";

    }


}







function login(){
    const a = document.getElementById("loginemail").value;
    const b = document.getElementById("loginpassword").value;





    if(a===""){
        alert("Write the email");
    }
    else if(b===""){
        alert("Write the password");
    }
    else{


        if(document.getElementById("logstudent").checked){

            ref = firebase.database().ref("students/").once('value', gotdatastudent, errdatastudent);



            function errdatastudent(){

            }

            function gotdatastudent(data){
                const db = data.val();
                const keys = Object.keys(db);
                const a = document.getElementById("loginemail").value;
                const b = document.getElementById("loginpassword").value;
                const c = document.getElementById("lab").value;


                var flag = 0;

                for (let i = 0; i < keys.length; i++){
                    var k = keys[i];
                    if(db[k].Email === a){
                        flag = 1;
                        break
                    }
                }

                console.log(flag)

                if(flag===1){
                    firebase.auth().signInWithEmailAndPassword(a,  b)
                        .then((user) => {
                            // Signed in
                            // ...
                            sessionStorage.setItem("type", "student");
                            sessionStorage.setItem("auth", true);
                            sessionStorage.setItem("email", a.slice(0, -4));
                            sessionStorage.setItem("lab-type", c )



                            next("student");


                        })
                        .catch((error) => {
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            alert(errorMessage);
                        });

                }
                else{
                    alert("Not correct type");
                }


            }



        }
        else if(document.getElementById("logteacher").checked){


            ref = firebase.database().ref("teachers/").once('value', gotdatateachers, errdatateachers);



            function errdatateachers(){

            }


            function gotdatateachers(data){
                const db = data.val();
                const keys = Object.keys(db);
                const a = document.getElementById("loginemail").value;
                const b = document.getElementById("loginpassword").value;
                const c = document.getElementById("lab").value;


                var flag = 0;

                for (let i = 0; i < keys.length; i++){
                    var k = keys[i];
                    if(db[k].Email === a){
                        flag = 1;
                        break
                    }
                }

                if(flag===1){
                    firebase.auth().signInWithEmailAndPassword(a, b)
                        .then((user) => {
                            // Signed in
                            // ...
                            sessionStorage.setItem("type", "teacher");
                            sessionStorage.setItem("auth", true);
                            sessionStorage.setItem("email", a.slice(0, -4));
                            sessionStorage.setItem("lab-type", c )

                            next("teachers");

                        })
                        .catch((error) => {
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            alert(errorMessage);
                        });

                }
                else{
                    alert("Not correct type");
                }


            }


        }
        else{
            alert("Choose the type");
        }

    }
}



function signup() {
    const a = document.getElementById("signname").value;
    const b = document.getElementById("signemail").value;
    const c = document.getElementById("signpassword").value;
    const d = document.getElementById("signuplab").value;


    if(a===""){
        alert("Enter your name");
    }
    else if(b===""){
        alert("Enter your Email");
    }
    else if(c===""){
        alert("Enter your Password");
    }
    else{
        if(document.getElementById("signstudent").checked){
            firebase.auth().createUserWithEmailAndPassword(b, c)
                .then((user) => {
                    // Signed in
                    // ...


                    var user = firebase.auth().currentUser;

                    user.sendEmailVerification().then(function() {
                        // Email sent.

                    }).catch(function(error) {
                        // An error happened.
                        alert("Unable to send verification mail");

                    });



                    if(d==="lab1"){
                        firebase.database().ref('students/' + b.slice(0, -4)).set({
                            Email : b,
                            Name : a,
                            Practise_questions: "",
                            Lab1_questions  : "",
                            Contest_questions : ""
                        });
                    }
                    else{
                        firebase.database().ref('students/' + b.slice(0, -4)).set({
                            Email : b,
                            Name : a,
                            Practise_questions: "",
                            Lab2_questions  : "",
                            Contest_questions : ""
                        });
                    }

                    sessionStorage.setItem("type", "student");
                    sessionStorage.setItem("auth", true);
                    sessionStorage.setItem("email", b.slice(0, -4));
                    sessionStorage.setItem("lab-type", d);

                    setTimeout(function (){
                        next("student");
                    }, 2000);


                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(errorMessage);

                    // ..
                });



        }



        else if(document.getElementById("signteacher").checked){

            firebase.auth().createUserWithEmailAndPassword(b, c)
                .then((user) => {
                    // Signed in
                    // ...
                    sessionStorage.setItem("auth", true);

                    var user = firebase.auth().currentUser;

                    user.sendEmailVerification().then(function() {
                        // Email sent.
                    }).catch(function(error) {
                        // An error happened.
                        alert("Unable to send verification mail");

                    });
                    if(c==="lab1"){
                        firebase.database().ref('teachers/' + b.slice(0, -4)).set({
                            Email : b,
                            Name : a,
                            Practise_questions: "",
                            Lab1_questions  : "",
                            Contest_questions : ""
                        });
                    }
                    else{
                        firebase.database().ref('teachers/' + b.slice(0, -4)).set({
                            Email : b,
                            Name : a,
                            Practise_questions: "",
                            Lab2_questions  : "",
                            Contest_questions : ""
                        });
                    }


                    sessionStorage.setItem("type", "teacher");
                    sessionStorage.setItem("auth", true);
                    sessionStorage.setItem("email", b.slice(0, -4));
                    sessionStorage.setItem("lab-type",  c);



                    setTimeout(function (){
                        next("teachers");
                    }, 2000);

                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(errorMessage);

                    // ..
                });

        }
        else{
            alert("Select the type");

        }
    }




}



