import * as gP from "./gestionPresupuesto.js"

function mostrarDatoEnId(idElemento, valor)
{
    let elemento = document.getElementById(idElemento);
    if (!elemento)
        return;
    elemento.textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto)
{
    let elemento = document.getElementById(idElemento)
    if (!elemento)
        return;
    let divGasto = document.createElement("div");
    divGasto.className = "gasto";

    let divGastoDescripcion = document.createElement("div");
    divGastoDescripcion.className = "gasto-descripcion";
    divGastoDescripcion.textContent = gasto.descripcion;
    divGasto.append(divGastoDescripcion);

    let divGastoFecha = document.createElement("div");
    divGastoFecha.className = "gasto-fecha";
    divGastoFecha.textContent = gasto.fecha;
    divGasto.append(divGastoFecha);

    let divGastoValor = document.createElement("div");
    divGastoValor.className = "gasto-valor";
    divGastoValor.textContent = gasto.valor;
    divGasto.append(divGastoValor);

    let divGastoEtiquetas = document.createElement("div");
    divGastoEtiquetas.className = "gasto-etiquetas";

    if (gasto.etiquetas.length > 0)
    {
        for(let i = 0; i < gasto.etiquetas.length; i++)
        {
            let spanEtiqueta = document.createElement("span");
            spanEtiqueta.className = "gasto-etiquetas-etiqueta";
            spanEtiqueta.textContent = gasto.etiquetas[i];
            divGastoEtiquetas.append(spanEtiqueta);
        }
    }
    divGasto.append(divGastoEtiquetas);
    elemento.append(divGasto);

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let elemento = document.getElementById(idElemento)
    if (!elemento)
    {
        return;
    }
    periodo = periodo.toLowerCase()
    if (periodo === "dia")
        periodo = "día";
    if (periodo === "anyo")
        periodo = "año";
    if (periodo === "día" || periodo === "mes" || periodo === "año")
    {
        let htmlArgup = `
            <div class="agrupacion">
                <h1>Gastos agrupados por ${periodo}</h1>`
        for (let [clave, valor] of Object.entries(agrup))
        {
            htmlArgup += `
                <div class="agrupacion-dato">
                    <span class="agrupacion-dato-clave">${clave}</span>
                    <span class="agrupacion-dato-valor">${valor}</span>
                </div>`;
        }
        htmlArgup += `
            </div>`;
        
        elemento.insertAdjacentHTML('beforeend', htmlArgup);
    }
}

function repintar()
{
    mostrarDatoEnId("presupuesto", gP.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gP.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gP.calcularBalance());
    let divListadoGastosCompleto = document.getElementById("listado-gastos-completo");
    divListadoGastosCompleto.innerHTML = "";
    let listaGastos = gP.listarGastos();
    for (let i = 0; i < listaGastos.length; i++)
    {
        mostrarGastoWeb("listado-gastos-completo", listaGastos[i]);
    }
}

function actualizarPresupuestoWeb()
{
    let presupuestoNuevo = prompt("Introduzca un presupuesto", 0);
    presupuestoNuevo = parseFloat(presupuestoNuevo);
    if (!isNaN(presupuestoNuevo) && presupuestoNuevo !== undefined)
    {
        gP.actualizarPresupuesto(presupuestoNuevo);
    }
    else
    {
        alert("Formato incorrecto");
        return;
    }
    repintar();
}

export
{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}