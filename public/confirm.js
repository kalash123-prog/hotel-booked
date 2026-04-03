let btn=document.querySelector(".btn");

btn.addEventListener("click",(event)=>{
let userconfirm=confirm("you really wanted to delete the list");

if(!userconfirm){
   event.preventDefault();
}
});