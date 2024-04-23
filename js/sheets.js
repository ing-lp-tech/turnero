const hojaTurnos = "Turnos";
const hojaProductos = "Productos";
const hojaEntradas = "Entradas";
const hojaSalidas = "Salidas";
const hojaInventario = "Inventario";
const hojaPrecio = "Precio-de-venta";
const hojaGastos = "Gastos";
const hojaPedidos = "Pedidos";

let turnos;
let productos;
let entradas;
let salidas;
let inventario;
let precioVenta;
let gastos;
let pedidos;

async function getDataFromSheet(hoja) {
  let response;
  try {
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: "1ZCUQWYMLJ_Yad620mI_zUCXSHbT-1naBDFPp1WMwP9Q",
      range: `${hoja}!A:G`,
    });
  } catch (err) {
    console.error(err);
    return;
  }
  const range = response.result;
  if (!range || !range.values || range.values.length == 0) {
    console.warn(`No se encontraron valores en la hoja ${hoja}`);
    return;
  }

  const data = [];
  const headers = range.values[0];
  /* console.log(`range.values[0].length:`, range.values[0].length);
  console.log(`range.values[0]:`, range.values[0]);
  console.log(`range.values[0][0]:`, range.values[0][0]);
  console.log(`range.values.length:`, range.values.length);
  console.log(`range.values:`, range.values); */

  range.values.forEach((fila) => {
    const newData = {};
    fila.forEach((valor, index) => {
      newData[headers[index].toLowerCase().replace(/\s+/g, "_")] = valor || ""; // Convertir a minúsculas y reemplazar espacios con guiones bajos en las claves
    });
    data.push(newData);
  });

  /*  range.values.forEach((fila) => {
    
    const newData = range.values[0].forEach((col) => {
      col: fila;
    });
    turnos.push(newData);
  }); */

  /* range.values.forEach((fila) => {
    if (isNaN(parseInt(fila[0]))) return;
    const newData = {
      id: fila[0],
      cliente: fila[1],
      email: fila[2],
      modelo: fila[3],
      problema: fila[4],
      fecha_terminado: fila[5],
      comentario: fila[6],
    };
    turnos.push(newData);
  }); */
  /*  console.log(`${hoja} turnos:`, turnos); */
  /* return turnos; */
  return data;
}

async function getTurnos() {
  turnos = await getDataFromSheet(hojaTurnos);
  console.log("getTurnos:", turnos);
}

async function getProductos() {
  productos = await getDataFromSheet(hojaProductos);
}

// Funciones para las otras hojas pueden seguir el mismo patrón
// Por ejemplo, para obtener los datos de Entradas:
async function getEntradas() {
  entradas = await getDataFromSheet(hojaEntradas);
}

async function getSalidas() {
  salidas = await getDataFromSheet(hojaSalidas);
}

async function getInventario() {
  inventario = await getDataFromSheet(hojaInventario);
}

async function getPrecio() {
  precio = await getDataFromSheet(hojaPrecio);
}

async function getGastos() {
  gastos = await getDataFromSheet(hojaGastos);
}

async function getPedidos() {
  pedidos = await getDataFromSheet(hojaPedidos);
}

// Función para editar cualquier tipo de fila en cualquier hoja
/* async function editFila(contenido, hoja) {
  console.log(`editando fila en ${hoja} - id y contenido:`, contenido);
  const update = [
    contenido.id,
    contenido.cliente,
    contenido.email,
    contenido.modelo,
    contenido.problema,
    new Date().toISOString(),
    contenido.comentario,
  ];

  const filaAEditar = parseInt(contenido.id) + 1;
  const response = await gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId: "1ZCUQWYMLJ_Yad620mI_zUCXSHbT-1naBDFPp1WMwP9Q",
    range: `${hoja}!A${filaAEditar}:G${filaAEditar}`,
    values: [update],
    valueInputOption: "USER_ENTERED",
  });
  return response;
} */

async function editTurno(contenido) {
  console.log("editTurno-id y contenido:", contenido);
  const update = [
    contenido.id,
    contenido.cliente,
    contenido.email,
    contenido.modelo,
    contenido.problema,
    new Date().toISOString(),
    contenido.comentario,
  ];

  const filaAEditar = parseInt(contenido.id) + 1;
  response = await gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId: "1ZCUQWYMLJ_Yad620mI_zUCXSHbT-1naBDFPp1WMwP9Q",
    range: `${hojaTurnos}!A${filaAEditar}:G${filaAEditar}`,
    values: [update],
    valueInputOption: "USER_ENTERED",
  });
  return response;
}

/* const hojaTurnos = "Turnos";
const hojaProductos = "Productos";
const hojaEntradas = "Entradas";
const hojaSalidas = "Salidas";
const hojaInventario = "Inventario";
const hojaPrecio = "Precio-de-venta";
const hojaGastos = "Gastos";
const hojaPedidos = "Pedidos";


let turnos;

async function getTurnos() {
  let response;
  try {
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: "1ZCUQWYMLJ_Yad620mI_zUCXSHbT-1naBDFPp1WMwP9Q",
      range: `${hojaTurnos}!A:G`,
    });
  } catch (err) {
    
    console.error(err);
    return;
  }
  const range = response.result;
  if (!range || !range.values || range.values.length == 0) {
   
    console.warn("no se encontraron valores");
    return;
  }

  turnos = [];
  range.values.forEach((fila) => {
    if (isNaN(parseInt(fila[0])) || fila[5] !== undefined) return;
    const nuevoTurno = {
      id: fila[0],
      cliente: fila[1],
      email: fila[2],
      modelo: fila[3],
      problema: fila[4],
      fecha_terminado: fila[5],
      comentario: fila[6],
    };
    turnos.push(nuevoTurno);
  });
  console.log("turnos:", turnos);
}

async function getProductos() {
  let response;
  try {
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: "1ZCUQWYMLJ_Yad620mI_zUCXSHbT-1naBDFPp1WMwP9Q",
      range: `${hojaTurnos}!A:G`,
    });
  } catch (err) {
   
    console.error(err);
    return;
  }
  const range = response.result;
  if (!range || !range.values || range.values.length == 0) {

    console.warn("no se encontraron valores");
    return;
  }

  turnos = [];
  range.values.forEach((fila) => {
    if (isNaN(parseInt(fila[0])) || fila[5] !== undefined) return;
    const nuevoTurno = {
      id: fila[0],
      cliente: fila[1],
      email: fila[2],
      modelo: fila[3],
      problema: fila[4],
      fecha_terminado: fila[5],
      comentario: fila[6],
    };
    turnos.push(nuevoTurno);
  });
  console.log("turnos:", turnos);
}

async function editTurno(contenido) {
  console.log("editTurno-id y contenido:", contenido);
  const update = [
    contenido.id,
    contenido.cliente,
    contenido.email,
    contenido.modelo,
    contenido.problema,
    new Date().toISOString(),
    contenido.comentario,
  ];

  const filaAEditar = parseInt(contenido.id) + 1;
  response = await gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId: "1ZCUQWYMLJ_Yad620mI_zUCXSHbT-1naBDFPp1WMwP9Q",
    range: `${hojaTurnos}!A${filaAEditar}:G${filaAEditar}`,
    values: [update],
    valueInputOption: "USER_ENTERED",
  });
  return response;
}
 */
