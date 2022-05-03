var firebaseConfig = {
  apiKey: "AIzaSyC26w7sAxgEH-xnSfCoNboG4l39H7WH0wQ",
  authDomain: "cloud-form-fc501.firebaseapp.com",
  projectId: "cloud-form-fc501",
  storageBucket: "cloud-form-fc501.appspot.com",
  messagingSenderId: "812211184278",
  appId: "1:812211184278:web:cfd8d533582c3302b3d8b7"
  };
  
  //Initialize Firebase 
  firebase.initializeApp(firebaseConfig);
  var firestore = firebase.firestore()
  
  //Variable to access database collection
  const db = firestore.collection("ProjectX")
  
  //Get Submit Form
  let submitButton = document.getElementById('submit')
  
  //Create Event Listener To Allow Form Submission
  submitButton.addEventListener("click", (e) => {
    //Prevent Default Form Submission Behavior
    e.preventDefault()
  
    //Get Form Values
    let Voornaam = document.getElementById('Voornaam').value
    let Achternaam = document.getElementById('Achternaam').value
    let Geslacht = document.getElementById('Geslacht').value
  
    //Save Form Data To Firebase
    db.doc().set({
      Voornaam: Voornaam,
      Achternaam: Achternaam,
      Geslacht: Geslacht
    }).then( () => {
      console.log("Data saved")
    }).catch((error) => {
      console.log(error)
    })
  
    //alert
    alert("Uw gegevens is succesvol gestuurd!")
  })

