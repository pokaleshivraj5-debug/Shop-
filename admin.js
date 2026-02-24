import { db } from "./firebase.js";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const logoBtn=document.getElementById("updateLogo");
const addBtn=document.getElementById("addProduct");
const productAdmin=document.getElementById("productListAdmin");
const ordersAdmin=document.getElementById("ordersAdmin");

logoBtn.onclick=async()=>{
let url=document.getElementById("logoUrl").value;
await setDoc(doc(db,"settings","logo"),{url});
alert("Logo Updated");
}

addBtn.onclick=async()=>{
let name=document.getElementById("pname").value;
let price=document.getElementById("pprice").value;
let image=document.getElementById("pimage").value;
let description=document.getElementById("pdesc").value;

await addDoc(collection(db,"products"),{
name,
price:Number(price),
image,
description
});
alert("Saved");
location.reload();
}

async function loadProducts(){
let snap=await getDocs(collection(db,"products"));
snap.forEach(d=>{
let p=d.data();
productAdmin.innerHTML+=`
<div class="card">
<h3>${p.name}</h3>
<button onclick="deleteProduct('${d.id}')">Delete</button>
</div>
`;
});
}

window.deleteProduct=async(id)=>{
await deleteDoc(doc(db,"products",id));
location.reload();
}

async function loadOrders(){
let snap=await getDocs(collection(db,"orders"));
snap.forEach(d=>{
let o=d.data();
ordersAdmin.innerHTML+=`
<div class="card">
<h3>${o.orderId}</h3>
<p>Status: ${o.status}</p>
<button onclick="updateStatus('${d.id}','Shipped')">Ship</button>
<button onclick="updateStatus('${d.id}','Delivered')">Deliver</button>
<button onclick="deleteOrder('${d.id}')">Delete</button>
</div>
`;
});
}

window.updateStatus=async(id,status)=>{
await updateDoc(doc(db,"orders",id),{status});
location.reload();
}

window.deleteOrder=async(id)=>{
await deleteDoc(doc(db,"orders",id));
location.reload();
}

loadProducts();
loadOrders();
