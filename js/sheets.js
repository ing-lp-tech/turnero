const hoja = "Turnos";
let turnos;

async function getTurnos() {
  let response;
  try {
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: "1ZCUQWYMLJ_Yad620mI_zUCXSHbT-1naBDFPp1WMwP9Q",
      range: "Turnos!A:G",
    });
  } catch (err) {
    /* document.getElementById("content").innerText = err.message; */
    console.error(err);
    return;
  }
  const range = response.result;
  if (!range || !range.values || range.values.length == 0) {
    /* document.getElementById("content").innerText = "No values found."; */
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
    range: `${"Turnos"}!A${filaAEditar}:G${filaAEditar}`,
    values: [update],
    valueInputOption: "USER_ENTERED",
  });
  return response;
}
