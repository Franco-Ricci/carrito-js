
 //Arreglo de usuarios
 let usuario = [{
  emailususario: "admin@admin.com",
  contraseña: "admin",
},
{
  emailusuario: "leean@imohff.com",
  contraseña: "1234",
  nombre: "Leean",
},
{
  emailusuario: "franco@ricci.com",
  contraseña: "1234",
  nombre: "Franco",
},
{
  emailusuario: "ale@paz.com",
  contraseña: "1234",
  nombre: "Ale",
},
{
  emailusuario: "federico@valverde.com",
  contraseña: "1234",
  nombre: "Federico",
},
{
  emailusuario: "matias@arguijo.com",
  contraseña: "1234",
  nombre: "matias",
},
];

localStorage.setItem("logueo", JSON.stringify(usuario));

// let DataUsuarios = [];
// let emailusuario;
// let contraseña;

//Tomamos valor de los campos
function login(){
  let logueo = false;
  let emailusuario = document.getElementById("emailusuario").value;
  let pass= document.getElementById("pass").value;
  let Data = JSON.parse(localStorage.getItem("usuario"))

//Validamos ingreso
if( emailusuario === "admin@admin.com" && pass ==="admin"){
  alert("Acceso a admin")
  window.location = "admin.html"
  
}else if( emailusuario === "leean@imohff.com" && pass ==="1234"){
  alert(`Bienvenido Leean`)
  window.location = "LogUsuario.html"
}
else if( emailusuario === "franco@ricci.com" && pass ==="1234"){
  alert(`Bienvenido Franco`)
  window.location = "LogUsuario.html"

}else if( emailusuario === "ale@paz.com" && pass ==="1234"){
  alert("Bienvenido Ale")
  window.location = "LogUsuario.html"

}else if( emailusuario === "federico@valverde.com" && pass ==="1234"){
  alert("Bienvenido Fede")
  window.location = "LogUsuario.html"

}else if( emailusuario === "matias@arguijo.com" && pass ==="1234"){
  alert("Bienvenido Matias")
  window.location = "LogUsuario.html"
}
else{
  logueo=false
  alert("Usuario o contraseña incorrectos")
  limpiarCampos();
}
}
function comprarProd(){
  if(logueo = true){
    alert("Gracias por su compra")
  }else{   
     alert("Debe iniciar sesion para comprar")

  }
}

//preventdefault 
function cargar(event){  
  event.preventDefault() 
}
  //limpiar campos
  function limpiarCampos(){

  emailusuario.value = "";
  pass.value = "";
} 
 
 const logOut = () => {
  
  alert("Sesión finalizada");
  window.location = "index.html";
};

