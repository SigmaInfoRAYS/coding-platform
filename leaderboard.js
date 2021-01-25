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


//Set the type as student or teacher

var id = sessionStorage.getItem("email");


function first(){

    ref = firebase.database().ref("students/").once('value', gotdata, errdata);

    function compareSecondColumn(a, b) {
        if (a[0] === b[0]) {
            return 0;
        }
        else {
            return (a[0] > b[0]) ? -1 : 1;
        }
    }


    function gotdata(data){
        const db = data.val();
        const keys = Object.keys(db);

        var w = [];

        firebase.database().ref("students/" + id).once('value').then(function (snapshot) {

            if(sessionStorage.getItem("type") === "student"){
                var email = snapshot.val().Email;
            }
            else{
                var email = "";
            }





            for (let i = 0; i < keys.length; i++) {
                var k = keys[i];
                const arr = []
                var score = (db[k].Contest_questions.split(" ").length - 1) * 100;
                arr.push(score);
                arr.push(db[k].Name);
                arr.push(db[k].Email);
                w.push(arr);
            }

            w = w.sort(compareSecondColumn)
            var table = document.getElementById("showdata");

            for(let i=0; i<w.length; i++){

                var a = document.createElement("tr");
                var b = document.createElement("th");
                var c = document.createElement("td");
                var d = document.createElement("td");
                var e = document.createElement("td");

                b.innerText = i+1;
                c.innerText = w[i][1];
                d.innerText = w[i][2];
                e.innerText = w[i][0];


                //Current user classname  -- "current-user"
                if(email === w[i][2]){
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

    function errdata(){

    }


}


function profile(){
    if(sessionStorage.getItem("type") === "student"){
        location.href = "profile.html";
    }
    else{
        location.href = "faculty-profile.html";

    }

}




function dashboard(){
    if(sessionStorage.getItem("type") === "student"){
        location.href = "dashboard.html";
    }
    else{
        location.href = "faculty-dashboard.html";

    }

}
