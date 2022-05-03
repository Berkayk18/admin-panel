// Import the functions you need from the SDKs you need
/* import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';*/
import { initializeApp } from "firebase/app"
import { getFirestore, getDocs, collection, getDoc , doc, setDoc, addDoc, deleteDoc} from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const app = initializeApp({
  apiKey: "AIzaSyCkHUd_aJ4ylCJ0miqrC0lVMto2kz8f7to",
  authDomain: "fivesteps-adsd.firebaseapp.com",
  projectId: "fivesteps-adsd",
  storageBucket: "fivesteps-adsd.appspot.com",
  messagingSenderId: "550705903322",
  appId: "1:550705903322:web:fd7d071c49eae1d44457e3"
});

export const db = getFirestore(app);

export async function codes(){
  const querySnapshot = await getDocs(collection(db, "codes"));

  var codes = Array();

  querySnapshot.forEach((doc) => {
    const organisation = doc.data();
    organisation.id = doc.id;
    codes.push(organisation);
    // codes.push([doc.id, doc.data().code,doc.data().organisation]);
    //console.log(doc.id , " > " , doc.data().code, " > ", doc.data().organisation);
  });

  //console.log(codes[0]);
  return codes;
}

export async function getOrgByID(id){
  const docRef = doc(db, "codes", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function updateOrgById(id, newName, newCode){
  const docRef = doc(db, "codes", id);
  await setDoc(docRef,{
    code: newCode,
    organisation: newName
  }).then( () => {
    alert("Succesvol gewijzigd");
  }).catch((error) => {
    console.log(error);
  });
}

export async function addOrg(newOrganisation, newCode){
  if(newCode && newOrganisation) {
    const refCollection = collection(db, "codes");
    await addDoc(refCollection, {code: newCode, organisation: newOrganisation});
  }
}

export async function checkDupeOrg(org){
  var dupeorg = false;
  const querySnapshot = await getDocs(collection(db, "codes"));
  querySnapshot.forEach((doc) => {
    if(doc.data().organisation == org) dupeorg = true
  });
  
  return dupeorg;
}

export async function checkDupeCode(code){
  var dupecode = false;
  const querySnapshot = await getDocs(collection(db, "codes"));
  querySnapshot.forEach((doc) => {
    if(doc.data().code == code) dupecode = true
  });
  
  return dupecode;
}

function delay(n){
  return new Promise(function(resolve){
      setTimeout(resolve,n*1000);
  });
}

export async function delOrg(id){
  const docRef = doc(db, "codes", id);
  await deleteDoc(docRef).then(await delay(.15), window.location.reload(true))
}