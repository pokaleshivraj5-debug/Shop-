 import { db, auth } from "./firebase.js";
import { collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const btn=document.getElementById("placeOrder");

btn.onclick=async()=>{
let user=auth.currentUser;
if(!user){ window.location="login.html"; return;}

let name=document.getElementById("name").value;
let phone=document.getElementById("phone").value;
let address=document.getElementById("address").value;
let city=document.getElementById("city").value;
let pincode=document.getElementById("pincode").value;

let cartSnap=await getDocs(collection(db,"users",user.uid,"cart"));
if(cartSnap.empty){ alert("Cart Empty"); return;}

let orderCount=(await getDocs(collection(db,"orders"))).size+1;
let orderId="SHOP-2026-"+String(orderCount).padStart(4,"0");

await addDoc(collection(db,"orders"),{
orderId,
userId:user.uid,
name,phone,address,city,pincode,
status:"Pending",
date:new Date()
});

cartSnap.forEach(async d=>{
await deleteDoc(d.ref);
});

alert("Order Placed");
window.location="dashboard.html";
}
