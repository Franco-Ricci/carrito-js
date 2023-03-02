let agregarLibro;
let librosList = document.querySelector(".libros-list");

//traigo data de LS
function cargarLibros() {
  tbody.innerHTML = "";
  datos = JSON.parse(localStorage.getItem("productos"));
  datos.map((libro) => {
    let tablaUser = `
        <tr>
       <th scope="row">${libro.id}</th>
         <td>${libro.nombre}</td>
          <td>${libro.autor}</td>
           <td>${libro.precio}</td>
            <td><button class="btn btn-danger mr-2" onclick="borrarLibro(${libro.id})"><i class="fa fa-trash-o" aria-hidden="true"></i></button><button class="btn btn-secondary" onclick="mostrarLibros(${libro.id})" data-toggle="modal" data-target="#exampleModal"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button></td>
                   
        </tr>
        `;

    tbody.innerHTML += tablaUser;
  });
}

//tabla con los libros

librosList.addEventListener("click", () => {
  adminTitle.classList.add("title__admin--off");
  containerAbm.textContent = "";
  containerAbm.innerHTML = `  <div class="container">
  <div class="row">
    <div class="col mt-5">
      <h1 class="text-admin">Libros</h1>
      <hr />
    </div>
  </div>
  <div class="row">
    <div class="col">
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Autor</th>
            <th scope="col">Precio</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="tablaUser"></tbody>
      </table>
    </div>
  </div>
  <button class="btn btn-primary agregarLibro" data-toggle="modal" data-target="#newLibro"><i class="fa fa-plus" aria-hidden="true"></i></button>
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
        <h5 class="modal-title" id="exampleModalLabel">Editar Libro</h5>
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
  id="newLibro"
  tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Agregar un Libro</h5>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div id="modalBodyNewLibro" class="modal-body"></div>
    </div>
  </div>
</div>
`;
  tbody = document.getElementById("tablaUser");
  modalito = document.getElementById("modalBody");
  modalNewLibro = document.getElementById("modalBodyNewLibro");
  agregarLibro = document.querySelector(".agregarLibro");
  cargarLibros();
  agregarNuevoLibro();
  resize();
});

//Actualizar Libro
const updateLibro = () => {
  // e.preventDefault();
  let id = document.getElementById("id").value;
  let nombre = document.getElementById("nombre").value;
  let autor = document.getElementById("autor").value;

  let portada = document.getElementById("portada").value;
  let precio = parseInt(document.getElementById("precio").value);
  let recomendados = document.getElementById("recomendado").checked;
  let novedades = document.getElementById("novedades").checked;
  console.log(recomendados);
  // debugger;
  datos.map(function (libro) {
    if (libro.id === parseInt(id)) {
      libro.nombre = nombre;
      libro.autor = autor;
      libro.recomendados = recomendados;
      libro.novedades = novedades;
      libro.precio = precio;
      if (portada !== "") {
        libro.imagen = portada;
      }
      console.log(nombre);
    }
  });
  localStorage.setItem("productos", JSON.stringify(datos));
  cargarLibros();
};

//modal para mostrar los detalles del libro

const mostrarLibros = (index) => {
  let LibrosDesc = datos.find(function (libro) {
    return libro.id === index;
  });
  let imgSrc = LibrosDesc.imagen.startsWith("http")
    ? LibrosDesc.imagen
    : `/${LibrosDesc.imagen}`;

  let contenido = `
            
            <div class="form-group">
                  <label>Id</label>
                  <input type="text" class="form-control" readonly id="id" value=${index}>
                </div>
                <div class="form-group">
                  <label>Nombre</label>
                  <input type="text" class="form-control" id="nombre" value="${
                    LibrosDesc.nombre
                  }">
                </div>
                <div class="form-group">
                <label>Autor</label>
                <input type="text" class="form-control" id="autor" value="${
                  LibrosDesc.autor
                }">
              </div>
                <div class="form-group">
                  <label>Precio</label>
                  <input type="number" class="form-control" id="precio" value=${
                    LibrosDesc.precio
                  } >
                </div>
                <div class="form-group">Categoría</div>
  
                <input type="radio" id="recomendado" name="libro__categoria" value="true" ${
                  LibrosDesc.recomendados ? "checked" : ""
                } >
                <label for="Recomendado">Recomendado</label><br>
                <input type="radio" id="novedades" name="libro__categoria" value="false" ${
                  LibrosDesc.novedades ? "checked" : ""
                } >
                <label for="novedades">Novedades</label><br>
      
                    </div>
  
                <div class="form-group">
                  <label>Portada</label>
                  <img class="libro__img--modal" src=${imgSrc}>
                </div> 
                <div class="form-group">
                <label>Cambiar portada</label>
                <input type="url" class="form-control" id="portada" required>
              </div>
                <div class="modal-footer">
                  <button  onclick="updateLibro()" data-dismiss="modal" class="btn btn-primary">
                    Guardar cambios
                  </button>
                </div>
              
    `;

  console.log(LibrosDesc.recomendados);
  console.log(LibrosDesc.imagen);

  modalito.innerHTML = contenido;
};

//agregar nuevo libro

function agregarNuevoLibro() {
  agregarLibro.addEventListener("click", (e) => {
    console.log(e);
    let nuevoId = 0;
    let LibrosList = JSON.parse(localStorage.getItem("productos"));
    console.log(LibrosList);
    LibrosList.forEach((libro) => {
      if (libro.id > nuevoId) {
        nuevoId = libro.id;
      }
      nuevoId++;
    });

    console.log(modalNewUser);
    modalNewLibro.innerHTML = `
      <div class="form-group">
      <label>Id</label>
      <input type="text" class="form-control" readonly id="id"} value=${nuevoId}>
    </div>
    <div class="form-group">
      <label>Nombre</label>
      <input type="text" class="form-control" id="nombre" required >
    </div>
    <div class="form-group">
    <label>Autor</label>
    <input type="text" class="form-control" id="autor" required>
  </div>
    <div class="form-group">
      <label>Descripción</label>
      <input type="text" class="form-control" id="descripcion"  required>
    </div>
    <div class="form-group">
    <label>Precio</label>
    <input type="number" class="form-control" id="precio" required >
  </div>
  <div>
  <div>Categoria</div>
  
  <input type="radio" id="recomendado" name="libro__categoria" value="Recomendado" >
    <label for="Recomendado">Recomendado</label>
    <input type="radio" id="novedades" name="libro__categoria" value="Novedades" >
    <label for="novedades">Novedades</label>
      </div>
  
    <div class="form-group">
      <label>Portada</label>
      <input type="url" class="form-control" id="portada">
    </div>
    <div class="modal-footer">
      <button type="submit" onclick="newLibroData()" data-dismiss="modal" class="btn btn-primary">
        Guardar cambios
      </button>
    </div>
  
      `;
  });
}

//los libros nuevos los guardo en el LS  y luego Cargo los libros

function newLibroData() {
  let id = parseInt(document.getElementById("id").value);
  let nombre = document.getElementById("nombre").value;
  let autor = document.getElementById("autor").value;
  let descripcion = document.getElementById("descripcion").value;
  let precio = parseInt(document.getElementById("precio").value);
  let imagen = document.getElementById("portada").value;
  let recomendados = document.getElementById("recomendado").checked;
  let novedades = document.getElementById("novedades").checked;
  let traerLibro = JSON.parse(localStorage.getItem("productos")) || [];

  console.log(imagen.value);
  console.log(imagen);
  if (
    nombre.length >= 3 &&
    nombre != "" &&
    autor.length >= 3 &&
    descripcion != "" &&
    precio > 0 &&
    imagen != ""
  ) {
    const newLog = {
      id,
      nombre,
      autor,
      descripcion,
      precio,
      imagen,
      recomendados,
      novedades,
    };
    console.log(newLog);
    traerLibro.push(newLog);
  } else {
    alert("Complete todos los campos correctamente");
  }

  localStorage.setItem("productos", JSON.stringify(traerLibro));
  cargarLibros();
}

//Borrar Libro
const borrarLibro = (index) => {
  let LibrosBorrar = datos.find(function (libro) {
    return libro.id === index;
  });

  let newArrayLibros = datos.filter(function (libro) {
    return libro.id != index;
  });

  let valor = confirm(
    `Esta seguro que quiere eliminar a ${LibrosBorrar.nombre} de ${LibrosBorrar.autor}?`
  );

  if (valor) {
    localStorage.setItem("productos", JSON.stringify(newArrayLibros));
    cargarLibros();
  }
};
