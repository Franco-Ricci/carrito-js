//Arreglo de usuarios
let usuario = [
  {
    id: 1,
    nombre: "Leean",
    apellido: "Imohff",
    telefono: "1-770-736-8031 56442",
    emailusuario: "leean@imohff.com",
    contraseña: "1234",
  },
  {
    id: 2,
    nombre: "Franco",
    apellido: "Ricci",
    telefono: "010-692-6593 09125",
    emailusuario: "franco@ricci.com",
    contraseña: "1234",
  },
  {
    id: 3,
    nombre: "Ale",
    apellido: "Paz",
    telefono: "1-463-123-4447",
    emailusuario: "ale@paz.com",
    contraseña: "1234",
  },
  {
    id: 4,
    nombre: "Federico",
    apellido: "Valverde",
    telefono: "493-170-9623 156",
    emailusuario: "federico@valverde.com",
    contraseña: "1234",
  },
  {
    id: 5,
    nombre: "Matias",
    apellido: "Arguijo",
    telefono: "254-954-1289",
    emailusuario: "matias@arguijo.com",
    contraseña: "1234",
  },
  {
    id: 6,
    nombre: "Leanne ",
    apellido: "Graham",
    telefono: "1-770-736-8031 x56442",
    emailusuario: "Sincere@april.biz",
    contraseña: "hildegard",
  },
  {
    id: 7,
    nombre: "Ervin ",
    apellido: "Howell",
    telefono: "010-692-6593 x09125",
    emailusuario: "Shanna@melissa.tv",
    contraseña: "anastasia",
  },
  {
    id: 8,
    nombre: "Clementine ",
    apellido: "Bauch",
    telefono: "1-463-123-4447",
    emailusuario: "Nathan@yesenia.net",
    contraseña: "ramiro.info",
  },
];

localStorage.setItem("logueo", JSON.stringify(usuario));

// let DataUsuarios = [];
// let emailusuario;
// let contraseña;


//Tomamos valor de los campos
function login() {
  let logueo = false;
  let emailusuario = document.getElementById("emailusuario").value;
  let pass = document.getElementById("pass").value;

  //Validamos ingreso
  if (emailusuario === "admin@admin.com" && pass === "admin") {
    alert("Acceso a admin");
    window.location = "admin.html";
  } else if (emailusuario === "leean@imohff.com" && pass === "1234") {
    alert(`Bienvenido Leean`);
    window.location = "LogUsuario.html";
  } else if (emailusuario === "franco@ricci.com" && pass === "1234") {
    alert(`Bienvenido Franco`);
    window.location = "LogUsuario.html";

  } else if (emailusuario === "ale@paz.com" && pass === "1234") {
    alert("Bienvenido Ale");
    window.location = "LogUsuario.html";
  } else if (emailusuario === "federico@valverde.com" && pass === "1234") {
    alert("Bienvenido Fede");
    window.location = "LogUsuario.html";
  } else if (emailusuario === "matias@arguijo.com" && pass === "1234") {
    alert("Bienvenido Matias");
    window.location = "LogUsuario.html";
  } else {
    logueo = false;
    alert("Usuario o contraseña incorrectos");
    limpiarCampos();
  }
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
  alert("Sesión finalizada");
  window.location = "index.html";
};

localStorage.setItem("usuarios", JSON.stringify(usuario));

let datos = [];
let modalito = document.getElementById("modalBody");

const tbody = document.getElementById("tablaUser");

//Borrar usuario
const borrarData = (index) => {
  let persona = datos.find(function (user) {
    return user.id === index;
  });

  let newArray = datos.filter(function (user) {
    return user.id != index;
  });

  let valor = confirm(
    `Esta seguro que quiere eliminar a ${persona.nombre} ${persona.apellido}?`
  );

  if (valor) {
    localStorage.setItem("usuarios", JSON.stringify(newArray));
    cargarData();
  }
};

//Creamos la tabla
function cargarData() {
  tbody.innerHTML = "";
  datos = JSON.parse(localStorage.getItem("usuarios"));
  datos.map((usuario) => {
    let tablaUser = `
        <tr>
       <th scope="row">${usuario.id}</th>
         <td>${usuario.nombre}</td>
          <td>${usuario.apellido}</td>
           <td>${usuario.emailusuario}</td>
            <td><button class="btn btn-danger mr-2" onclick="borrarData(${usuario.id})"><i class="fa fa-trash-o" aria-hidden="true"></i></button><button class="btn btn-secondary" onclick="mostrarModal(${usuario.id})" data-toggle="modal" data-target="#exampleModal"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button></td>
                   
        </tr>
        `;

    tbody.innerHTML += tablaUser;
  });
}

const mostrarModal = (index) => {
  let persona = datos.find(function (user) {
    return user.id === index;
  });

  let contenido = `
          
          <div class="form-group">
                <label>Id</label>
                <input type="text" class="form-control" readonly id="id" value=${index}/>
              </div>
              <div class="form-group">
                <label>Nombre</label>
                <input type="text" class="form-control" id="nombre" value=${persona.nombre}/>
              </div>
              <div class="form-group">
              <label>Nombre</label>
              <input type="text" class="form-control" id="nombre" value=${persona.apellido}/>
            </div>
              <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control" id="email" value=${persona.emailusuario} />
              </div>
              <div class="form-group">
                <label>Phone</label>
                <input type="text" class="form-control" id="phone" value=${persona.telefono} />
              </div>
              <div class="modal-footer">
                <button  onclick="updateDato()" data-dismiss="modal" class="btn btn-primary">
                  Guardar cambios
                </button>
              </div>
            
  `;

  modalito.innerHTML = contenido;
};

//Actualizar
const updateDato = () => {
  // e.preventDefault();
  let id = document.getElementById("id").value;
  let nombre = document.getElementById("nombre").value;
  let email = document.getElementById("emailusuario").value;
  let telefono = document.getElementById("telefono").value;

  // debugger;
  datos.map(function (user) {
    if (user.id + "/" === id) {
      user.nombre = nombre;
      user.email = email;
      user.telefono = telefono;
    }
  });
  localStorage.setItem("usuarios", JSON.stringify(usuario));
  cargarData();
};

cargarData();
