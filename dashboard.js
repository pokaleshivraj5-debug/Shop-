import { db, auth } from "./firebase.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const ordersDiv=document.getElementById("ordersList");

auth.onAuthStateChanged(async user=>{
if(!user){ window.location="login.html"; return;}

let q=query(collection(db,"orders"),where("userId","==",user.uid));
let snap=await getDocs(q);

snap.forEach(d=>{
let o=d.data();
ordersDiv.innerHTML+=`
<div class="card">
<h3>${o.orderId}</h3>
<p>Status: ${o.status}</p>
<p>${o.city} - ${o.pincode}</p>
</div>
`;
});
});
