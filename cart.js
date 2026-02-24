import { db, auth } from "./firebase.js";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const cartDiv=document.getElementById("cartItems");
const totalSpan=document.getElementById("cartTotal");

auth.onAuthStateChanged(async user=>{
if(!user){ window.location="login.html"; return;}

let snap=await getDocs(collection(db,"users",user.uid,"cart"));
let total=0;

snap.forEach(d=>{
let item=d.data();
total+=item.price*item.quantity;

cartDiv.innerHTML+=`
<div class="card">
<h3>Item</h3>
<p>₹${item.price}</p>
<p>Qty: ${item.quantity}</p>
<button onclick="increase('${d.id}',${item.quantity})">+</button>
<button onclick="decrease('${d.id}',${item.quantity})">-</button>
<button onclick="removeItem('${d.id}')">Remove</button>
</div>
`;
});

totalSpan.innerText=total;
});

window.increase=async(id,qty)=>{
await updateDoc(doc(db,"users",auth.currentUser.uid,"cart",id),{
quantity:qty+1
});
location.reload();
}

window.decrease=async(id,qty)=>{
if(qty<=1) return;
await updateDoc(doc(db,"users",auth.currentUser.uid,"cart",id),{
quantity:qty-1
});
location.reload();
}

window.removeItem=async(id)=>{
await deleteDoc(doc(db,"users",auth.currentUser.uid,"cart",id));
location.reload();
  }
