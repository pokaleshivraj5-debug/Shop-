import { db, auth } from "./firebase.js";
import { collection, getDocs, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const productList=document.getElementById("productList");
const logoImg=document.getElementById("siteLogo");

async function loadLogo(){
let snap=await getDoc(doc(db,"settings","logo"));
if(snap.exists()){
logoImg.src=snap.data().url;
}
}

async function loadProducts(){
let snap=await getDocs(collection(db,"products"));
snap.forEach(d=>{
let p=d.data();
productList.innerHTML+=`
<div class="card">
<img src="${p.image}">
<h3>${p.name}</h3>
<p>${p.description}</p>
<h4>₹${p.price}</h4>
<button class="primary-btn" onclick="addToCart('${d.id}',${p.price})">Add To Cart</button>
</div>
`;
});
}

window.addToCart=async function(id,price){
if(!auth.currentUser){ alert("Login Required"); return;}

let ref=doc(db,"users",auth.currentUser.uid,"cart",id);
let snap=await getDoc(ref);

if(snap.exists()){
await setDoc(ref,{quantity:snap.data().quantity+1,price},{merge:true});
}else{
await setDoc(ref,{quantity:1,price});
}
alert("Added To Cart");
}

loadLogo();
loadProducts();
