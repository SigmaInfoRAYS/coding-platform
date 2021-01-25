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

//id to answer questions


var id = "yashagrawal300@gmail";
var Fourm_Question_id = sessionStorage.getItem("Fourm_Question_id");




firebase.database().ref("Forum_Questions" + "/" + Fourm_Question_id).once('value').then(function (snapshot) {
    var author_name = snapshot.val().Author_name;
    var title = snapshot.val().Query_title;
    var query = snapshot.val().Query;
    sessionStorage.setItem("currrentcomment", snapshot.val().Answer_id);

    var a = document.getElementById("doubt");
    var b = document.getElementById("asked-by");
    var c = document.getElementById("question-description");
    a.innerText = title;
    b.innerText = author_name;
    c.innerText = query;
    ref = firebase.database().ref("Forum_Questions/" + Fourm_Question_id +"/" + "Answers/").once('value', showdata, errdata );


    function showdata(data) {
        const db = data.val();
        const keys = Object.keys(db);
        var table = document.getElementById("comment-table");

        for (let i = 0; i < keys.length; i++) {
            var k = keys[i];
            var name = db[k].Author_name;
            var comment = db[k].Comment;

            var a = document.createElement("tr");
            var b = document.createElement("th");
            var c = document.createElement("td");

            b.innerText = name;
            c.innerText = comment;
            b.scope = "row";
            b.colSpan = 1;

            a.appendChild(b);
            a.appendChild(c);
            table.appendChild(a);



        }





        }
    function errdata(){

    }

    })



function update() {
    firebase.database().ref("Forum_Questions/" + Fourm_Question_id).once('value').then(function (snapshot) {

        firebase.database().ref("Forum_Questions/" + Fourm_Question_id).set({
            Author_name: snapshot.val().Author_name,
            Author_Email: snapshot.val().Author_Email,
            Query: snapshot.val().Query,
            Query_title: snapshot.val().Query_title,
            Answer_id: snapshot.val().Answer_id + 1,
            Answers: snapshot.val().Answers
        });

    })
}



function add(){
    var a = document.getElementById("new-solution").value;
    var name = sessionStorage.getItem("currnet_author");
    console.log(name);

    if(a===""){
        alert("Enter the comment");
    }
    else{
        firebase.database().ref("Forum_Questions/" + Fourm_Question_id +"/" + "Answers/" + sessionStorage.getItem("currrentcomment")).set({
            Author_name: name,
            Comment: a
        });
        console.log(Fourm_Question_id);

        setTimeout(function (){
        update(), 1000});


    }





}

