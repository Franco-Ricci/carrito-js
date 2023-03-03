//Arreglo de usuarios
let usuariosdb = JSON.parse(localStorage.getItem("usuarios")) || [
  {
    id: 1,
    nombre: "Patricia ",
    apellido: "Lebsack",
    telefono: "17707368031 56442",
    emailusuario: "patricia@hotmail.com",
    contraseña: "1234",
  },
  {
    id: 2,
    nombre: "Chelsey",
    apellido: "Dietrich",
    telefono: "0106926593 09125",
    emailusuario: "chelsey@hotmail.com.com",
    contraseña: "1234",
  },
  {
    id: 3,
    nombre: "Dennis",
    apellido: "Schulist",
    telefono: "146-1234447",
    emailusuario: "dennis@hotmail.com",
    contraseña: "1234",
  },
  {
    id: 4,
    nombre: "Kurtis",
    apellido: "Weissnat",
    telefono: "4931709623 156",
    emailusuario: "kurtis@hotmail.com",
    contraseña: "1234",
  },
  {
    id: 5,
    nombre: "Nicholas",
    apellido: "Runolfsdottir ",
    telefono: "2549541289",
    emailusuario: "Nicholas@hotmail.com",
    contraseña: "1234",
  },
  {
    id: 6,
    nombre: "Leanne ",
    apellido: "Graham",
    telefono: "17707368031 x56442",
    emailusuario: "Sincere@april.biz",
    contraseña: "hildegard",
  },
  {
    id: 7,
    nombre: "Ervin ",
    apellido: "Howell",
    telefono: "0106926593 x09125",
    emailusuario: "Shanna@melissa.tv",
    contraseña: "anastasia",
  },
  {
    id: 8,
    nombre: "Clementine ",
    apellido: "Bauch",
    telefono: "14631234447",
    emailusuario: "Nathan@yesenia.net",
    contraseña: "ramiro.info",
  },
];

let pagina = location.pathname;

localStorage.setItem("usuarios", JSON.stringify(usuariosdb));

let comprar = document.getElementById("procesar-compra");
let logueo = false;
//Tomamos valor de los campos
function login() {
  let emailusuario = document.getElementById("emailusuario").value;
  let pass = document.getElementById("pass").value;

  const listUser = usuariosdb.find(
    (e) => e.emailusuario === emailusuario && e.contraseña === pass
  );

  //Validamos ingreso
  if (emailusuario === "admin@admin.com" && pass === "admin") {
    alert("Acceso a admin");

    localStorage.setItem("logueo", "true");

    window.location = "./html/admin.html";
    console.log(logueo);
    cerrar();
  } else if (listUser) {
    console.log(listUser);
    alert(`bienvenido ${listUser.nombre}${listUser.apellido}`);
    document.querySelector(".registrate").style.display ="none"
    logueo = true;
    cerrar();
  } else {
    logueo = false;
    alert("Usuario o contraseña incorrectos");
    limpiarCampos();
  }
}

function validarCompra() {
  if (logueo == true) {
    alert("Gracias por su compra");
    $("#modalcarrito").modal("hide");
    vaciarCarrito();
  } else {
    alert("Debe iniciar sesion para comprar");
    $("#modalcarrito").modal("hide");
  }
}

let val = localStorage.getItem("logueo");
function noAcceso() {
  console.log(pagina);

  if (pagina === "/carrito-js/html/admin.html" && val !== "true") {
    location = "./index.html";
    console.log(val);
  }
}
noAcceso();

//cambio boton de iniciar sesion por cerrar sesion
let cerrarSesion = document.querySelector(".button__login");
function cerrar() {
  cerrarSesion.textContent = "";
  cerrarSesion.innerHTML = `  <form onsubmit="cargar(event)" id="login">
  <form onsubmit="cargar(event)" id="login">
      <li class="nav-item  ">
        <a class="nav-link  text-white" onclick="logOut()" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Cerrar Sesion
        </a>
     
      </form>
</form>`;
}

//preventdefault
function cargar(event) {
  event.preventDefault();
}
//limpiar campos
function limpiarCampos() {
  emailusuario.value = "";
  pass.value = "";
}

const logOut = () => {
  localStorage.setItem("logueo", "false");
  alert("Sesión finalizada");
  window.location = "/carrito-js/index.html";
};

// cargarData();
