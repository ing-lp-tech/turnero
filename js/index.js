// import turnos from "./turnos.js";

const turnosContainer = document.getElementById("turnosContainer");
const detalleContainer = document.getElementById("detalleContainer");
const tableContainer = document.getElementById("tablaContainer");

let indiceSeleccionado;

const clienteElement = document.getElementById("cliente");
const modeloElement = document.getElementById("modelo");
const problemaElement = document.getElementById("problema");
const comentarioElement = document.getElementById("comentario");
const marcarTerminadoElement = document.getElementById("finalizar");
tablaContainer;
/* function createTarjeta(turno, index) {
  console.log("turno, index", turno, index);
  const nuevaTarjeta = document.createElement("div");
  nuevaTarjeta.classList = "tarjeta";
  nuevaTarjeta.innerHTML = `
    <h3>${turno.cliente}</h3>
    <p>${turno.email}</p>
    <p>${turno.modelo}</p>
    <p>${turno.problema}</p>
  `;
  nuevaTarjeta.addEventListener("click", () => actualizarDetalle(index));
  turnosContainer.appendChild(nuevaTarjeta);
} */

function createTarjeta(turno, index) {
  console.log("turno, index", turno, index);
  const nuevaTarjeta = document.createElement("div");
  nuevaTarjeta.classList = "tarjeta";

  // Construir el contenido HTML dinámicamente
  let tarjetaHTML = "";
  Object.keys(turno).forEach((key) => {
    tarjetaHTML += `<p><strong>${key}:</strong> ${turno[key]}</p>`;
  });

  // Asignar el contenido HTML a la tarjeta
  nuevaTarjeta.innerHTML = tarjetaHTML;

  // Agregar el evento click
  nuevaTarjeta.addEventListener("click", () => actualizarDetalle(index));

  // Agregar la tarjeta al contenedor
  turnosContainer.appendChild(nuevaTarjeta);
}

function createTabla(turno, index) {
  console.log("turno, index", turno, index);
  const nuevaTabla = document.createElement("table");
  nuevaTabla.classList = "table table-bordered table-striped table-responsive";

  // Construir el encabezado de la tabla
  let tablaHTML = "<thead><tr>";
  Object.keys(turno).forEach((key) => {
    tablaHTML += `<th>${key}</th>`;
  });
  tablaHTML += "</tr></thead>";

  // Construir filas de datos
  tablaHTML += "<tbody><tr>";
  Object.values(turno).forEach((value) => {
    tablaHTML += `<td>${value}</td>`;
  });
  tablaHTML += "</tr></tbody>";

  // Asignar el contenido HTML a la tabla
  nuevaTabla.innerHTML = tablaHTML;

  // Agregar la tabla al contenedor
  const tablaContainer = document.getElementById("tablaContainer");
  tableContainer.appendChild(nuevaTabla);
}

function actualizarTarjetas() {
  turnosContainer.innerHTML = "";
  turnos.forEach((turno, i) => {
    createTarjeta(turno, i);
    createTabla(turno, i);
  });
}

function actualizarDetalle(index) {
  if (indiceSeleccionado !== undefined)
    turnosContainer.children[indiceSeleccionado].classList.toggle(
      "seleccionado",
      false
    );
  clienteElement.innerText = turnos[index].cliente;
  modeloElement.innerText = turnos[index].modelo;
  problemaElement.innerText = turnos[index].problema;
  detalleContainer.classList.toggle("escondido", false);
  indiceSeleccionado = index;
  turnosContainer.children[indiceSeleccionado].classList.toggle(
    "seleccionado",
    true
  );
}

finalizar.addEventListener("click", () => marcarTerminado(indiceSeleccionado));

async function marcarTerminado(i) {
  console.log("marcarTerminado-i", i);
  const updateTurno = turnos[i];
  updateTurno.comentario = comentarioElement.value;
  /* const res = await editTurno(updateTurno.id, updateTurno); */
  const res = await editTurno(updateTurno);

  if (res.status === 200) {
    turnos = turnos.filter((turno) => turno.id !== updateTurno.id);
    indiceSeleccionado = 0;
    actualizarTarjetas();
    detalleContainer.classList.toggle("escondido", true);
    comentarioElement.value = "";
  }
}

actualizarTarjetas();
