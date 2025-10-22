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