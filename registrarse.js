let usuarios = []
class Usuarionuevo{
  constructor(nombre,apellido,email,contraseña,contraseñaconfirm,opciones,sexo,terminos){
    this.nombre = nombre;
    this.apellido = apellido
    this.email = email;
    this.contraseña=contraseña;
    this.contraseñaconfirm=contraseñaconfirm
    this.opciones = opciones;
    this.sexo = sexo;
    this.terminos = terminos;
  }
}
let nombre = document.getElementById('nombre');
let apellido = document.getElementById('apellido');
let email = document.getElementById('email');
let contraseña = document.getElementById('contraseña')
let contraseñaconfirm = document.getElementById('contraseñaconfirm')
let opciones = document.getElementById('opciones');
let sexo = document.getElementById('sexo');
let terminos = document.getElementById('terminos');

//validacion de contraseña
function valcontraseña(){
if(contraseña.value !== contraseñaconfirm.value){
    alert("La contraseña no coincide");
}if(nombre.value === "" || email.value ===""){
  alert("Debe completar los campos");
}

else{
  alert("Te enviamos un correo para que actives tu cuenta!")
   //limpiar campos 
  nombre.value = "";
  apellido.value ="";
  email.value = "";
  contraseña.value ="";
  contraseñaconfirm.value ="";
  opciones.value = "";
  sexo.value = "";
}
}

//preventdefault 
function mostrar(event){  
 event.preventDefault() 
 let persona = new Usuarionuevo(nombre.value.toUpperCase(),apellido.value.toUpperCase(), email.value.toLowerCase(),contraseña.value, contraseñaconfirm.value, opciones.value,sexo.value,terminos.checked)

   console.log(persona)

 //agrego persona dentro de usuarios
 usuarios.push(persona);
 localStorage.setItem('usuarionuevo', JSON.stringify(usuarios))
}