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
    divGasto.appendChild(divGastoDescripcion);

    let divGastoFecha = document.createElement("div");
    divGastoFecha.className = "gasto-fecha";
    divGastoFecha.textContent = gasto.fecha;
    divGasto.appendChild(divGastoFecha);

    let divGastoValor = document.createElement("div");
    divGastoValor.className = "gasto-valor";
    divGastoValor.textContent = gasto.valor;
    divGasto.appendChild(divGastoValor);

    let divGastoEtiquetas = document.createElement("div");
    divGastoEtiquetas.className = "gasto-etiquetas";

    if (gasto.etiquetas.length > 0)
    {
        for(let i = 0; i < gasto.etiquetas.length; i++)
        {
            let spanEtiqueta = document.createElement("span");
            spanEtiqueta.className = "gasto-etiquetas-etiqueta";
            spanEtiqueta.textContent = gasto.etiquetas[i];
            divGastoEtiquetas.appendChild(spanEtiqueta);
        }
    }
    divGasto.appendChild(divGastoEtiquetas);
    elemento.appendChild(divGasto);

}

function mostrarGastosAgrupadosWeb()
{

}


export
{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}