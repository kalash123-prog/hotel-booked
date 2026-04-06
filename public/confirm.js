let btn=document.querySelector(".tbtn");

btn.addEventListener("click",(event)=>{
let userconfirm=confirm("you really wanted to delete the list");

if(!userconfirm){
   event.preventDefault();
}
});