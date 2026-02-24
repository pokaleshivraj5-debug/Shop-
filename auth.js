import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

const adminEmail="pokaleshivraj5@gmail.com";
const adminPassword="SHIV135";

const loginBtn=document.getElementById("loginBtn");
const registerBtn=document.getElementById("registerBtn");

if(loginBtn){
loginBtn.onclick=async()=>{
let email=document.getElementById("email").value;
let pass=document.getElementById("password").value;

if(email===adminEmail && pass===adminPassword){
window.location="admin.html";
return;
}

await signInWithEmailAndPassword(auth,email,pass);
window.location="dashboard.html";
}
}

if(registerBtn){
registerBtn.onclick=async()=>{
let email=document.getElementById("email").value;
let pass=document.getElementById("password").value;
await createUserWithEmailAndPassword(auth,email,pass);
alert("Registered");
window.location="login.html";
}
}
