let abm = document.querySelector(".abm");
let containerAbm = document.querySelector(".container__table");
let adminTitle = document.querySelector(".title__admin");

let tbody;
let modalito;
let agregarUser;

let modalNewUser;
abm.addEventListener("click", () => {
  adminTitle.classList.add("title__admin--off");
  containerAbm.textContent = "";
  containerAbm.innerHTML = `  <div class="container">
  <div class="row">
    <div class="col mt-5">
      <h1 class="text-admin">Tabla de Usuarios</h1>
      <hr />
    </div>
  </div>
  <div class="row">
    <div class="col">
      <table class="table ">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Usuario</th>
            <th scope="col">Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="tablaUser"></tbody>
      </table>
    </div>
  </div>
  <button class="btn btn-primary agregarUser" data-toggle="modal" data-target="#newUser"><i class="fa fa-plus" aria-hidden="true"></i></button>
</div>

<!-- Modal -->
<div
  class="modal fade"
  id="exampleModal"
  tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Editar Usuarios</h5>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div id="modalBody" class="modal-body"></div>
    </div>
  </div>
</div>

<div
  class="modal fade"
  id="newUser"
  tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Agregar un usuario</h5>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div id="modalBodyNewUser" class="modal-body"></div>
    </div>
  </div>
</div>
`;
  tbody = document.getElementById("tablaUser");
  modalito = document.getElementById("modalBody");
  modalNewUser = document.getElementById("modalBodyNewUser");
  agregarUser = document.querySelector(".agregarUser");
  cargarData();
  agregarUsuario();

  resize();
});

function resize() {
  // Select the table element
  const table = document.querySelector(".table");
  const width = window.innerWidth;
  console.log(width);
  if (width < 700) {
    table.classList.add("table-responsive");
  }

  // Add a resize event listener to the window
  window.addEventListener("resize", () => {
    // Check the window width
    const width = window.innerWidth;
    console.log(width);
    // Add/remove the table-responsive class based on the window width
    if (width < 500) {
      table.classList.add("table-responsive");
    } else {
      table.classList.remove("table-responsive");
    }
  });
}

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
                <input type="text" class="form-control" readonly id="id" value=${index}>
              </div>
              <div class="form-group">
                <label>Nombre</label>
                <input type="text" class="form-control" id="nombre" value=${
                  persona.nombre
                }>
              </div>
              <div class="form-group">
              <label>Apellido</label>
              <input type="text" class="form-control" id="apellido" value=${
                persona.apellido
              }>
            </div>
              <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control" id="email" value=${
                  persona.emailusuario
                } >
              </div>
              <div class="form-group">
                <label>Teléfono</label>
                <input type="number" class="form-control" id="telefono" value=${persona.telefono.replace(
                  `/_|#|-|@|<>/g`
                )} >
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
  let apellido = document.getElementById("apellido").value;

  let email = document.getElementById("email").value;
  let telefono = document.getElementById("telefono").value;

  // debugger;
  datos.map(function (user) {
    if (user.id === parseInt(id)) {
      user.nombre = nombre;
      user.email = email;
      user.telefono = telefono;
      user.apellido = apellido;
      console.log(nombre);
    }
  });
  localStorage.setItem("usuarios", JSON.stringify(datos));
  cargarData();
};

let datos = [];

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

function agregarUsuario() {
  agregarUser.addEventListener("click", () => {
    let nuevoId = 0;
    let userList = JSON.parse(localStorage.getItem("usuarios"));
    console.log(userList);
    userList.forEach((user) => {
      if (user.id > nuevoId) {
        nuevoId = user.id;
      }
      nuevoId++;
    });

    console.log("si");
    console.log(modalNewUser);
    modalNewUser.innerHTML = `
    <div class="form-group">
    <label>Id</label>
    <input type="text" class="form-control" readonly id="id"} value=${nuevoId}>
  </div>
  <div class="form-group">
    <label>Nombre</label>
    <input type="text" class="form-control" id="nombre" required >
  </div>
  <div class="form-group">
  <label>Apellido</label>
  <input type="text" class="form-control" id="apellido" required>
</div>
  <div class="form-group">
    <label>Email</label>
    <input type="email" class="form-control" id="email"  required>
  </div>
  <div class="form-group">
  <label>Contraseña</label>
  <input type="password" class="form-control" id="contraseña" required >
</div>
  <div class="form-group">
    <label>Teléfono</label>
    <input type="number" class="form-control" id="telefono"  >
  </div>
  <div class="modal-footer">
    <button type="submit" onclick="newUserData()" data-dismiss="modal" class="btn btn-primary">
      Guardar cambios
    </button>
  </div>

    `;
  });
}

//nuevo usuario validaciones
function newUserData() {
  let id = parseInt(document.getElementById("id").value);
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let email = document.getElementById("email").value;
  let contraseña = document.getElementById("contraseña").value;
  let telefono = document.getElementById("telefono").value;

  let traerUser = JSON.parse(localStorage.getItem("usuarios")) || {};

  if (
    nombre.length >= 3 &&
    nombre != "" &&
    apellido.length >= 3 &&
    apellido != "" &&
    email != "" &&
    contraseña.length > 5
  ) {
    const newLog = {
      id,
      nombre,
      apellido,
      emailusuario: email,
      contraseña,
      telefono,
    };
    console.log(newLog);
    traerUser.push(newLog);
  } else {
    alert("Complete todos los campos correctamente");
  }

  localStorage.setItem("usuarios", JSON.stringify(traerUser));
  cargarData();
}
