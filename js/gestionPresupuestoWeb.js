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
            spanEtiqueta.textContent = `${gasto.etiquetas[i]} `;
            if(idElemento === "listado-gastos-completo")
            {
                let borrarEtiquetas = new BorrarEtiquetasHandle();
                borrarEtiquetas.gasto = gasto;
                spanEtiqueta.addEventListener("click", borrarEtiquetas);            
            }
            divGastoEtiquetas.append(spanEtiqueta);
        }
    }
    divGasto.append(divGastoEtiquetas);

    if (idElemento === "listado-gastos-completo")
    {
        let botonEditar = document.createElement("button");
        botonEditar.setAttribute("type", "button");
        botonEditar.className = "gasto-editar"
        botonEditar.textContent = "Editar Gasto";
        let editarGasto = new EditarHandle();
        editarGasto.gasto = gasto;
        botonEditar.addEventListener("click", editarGasto);
        divGasto.append(botonEditar);  
        
        let botonBorrar = document.createElement("button");
        botonBorrar.setAttribute("type", "button");
        botonBorrar.className = "gasto-borrar";
        botonBorrar.textContent = "Borrar Gasto"
        let borrarGasto = new BorrarHandle();
        borrarGasto.gasto = gasto;
        botonBorrar.addEventListener("click", borrarGasto);
        divGasto.append(botonBorrar);
    }
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

let btnactualizarpresupuesto = document.getElementById("actualizarpresupuesto");
btnactualizarpresupuesto.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb()
{
    
    let descripcion = prompt("Introduzca un descripcion de gasto");
    if (descripcion === null || descripcion === "")
    {    
        alert("Introduzca un descripción de gasto");
        return; 
    }
    let valor = prompt("Introduzca un valor de gasto");
    valor = parseFloat(valor);        
    if (isNaN(valor) || valor < 0)
    {
        alert("Formato Incorrecto");
        return;
    } 
    let fecha = prompt("Introduzca una fecha de gasto con formato yyyy-mm-dd");
    let fechaNueva = Date.parse(fecha);
        
    if (isNaN(fechaNueva)) 
    {
        alert("Formato de fecha Incorrecto");
        return;
    }

    let etiquetas = prompt("Introduzca etiquetas de gasto con formato etiqueta1,etiqueta2,etiqueta3");
    let listaEtiquetas = etiquetas.split(",");
    if(listaEtiquetas.length === 1 && listaEtiquetas[0] === "")
    {
        alert("Introduzca por lo menos una etiqueta de gasto");
        return; 
    }
    let gastoNuevo = new gP.CrearGasto(descripcion, valor, fecha, ...listaEtiquetas);
    gP.anyadirGasto(gastoNuevo);
    repintar();
}

let btnAnyadirGasto = document.getElementById("anyadirgasto");
btnAnyadirGasto.addEventListener("click", nuevoGastoWeb);

function EditarHandle()
{
    this.handleEvent = function(event)
    {
        let descripcion = prompt("Introduzca un descripcion de gasto", this.gasto.descripcion);
        if (descripcion === null || descripcion === "")
        {    
            alert("Introduzca un descripción de gasto");
            return; 
        }
        let valor = prompt("Introduzca un valor de gasto", this.gasto.valor);
        valor = parseFloat(valor);        
        if (isNaN(valor) || valor < 0)
        {
            alert("Formato Incorrecto");
            return;
        } 
        let fechaGasto = new Date(this.gasto.fecha).toISOString().slice(0, 10);
        let fecha = prompt("Introduzca una fecha de gasto con formato yyyy-mm-dd", fechaGasto);
        let fechaNueva = Date.parse(fecha);
        
        if (isNaN(fechaNueva)) 
        {
             alert("Formato de fecha Incorrecto");
             return;
        }

        let etiquetasGasto = this.gasto.etiquetas.join(',');
        let etiquetas = prompt("Introduzca etiquetas de gasto con formato etiqueta1,etiqueta2,etiqueta3", etiquetasGasto);

        let listaEtiquetas = etiquetas.split(",");
        if(listaEtiquetas.length === 1 && listaEtiquetas[0] === "")
        {
            alert("Introduzca por lo menos una etiqueta de gasto");
            return; 
        }

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.borrarEtiquetas(...this.gasto.etiquetas); 
        this.gasto.anyadirEtiquetas(...listaEtiquetas);
    
        repintar();
    }   
}

function BorrarHandle()
{
    this.handleEvent = function()
    {
        gP.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle()
{
    this.handleEvent = function(event)
    {
        let etiqueta = event.target.textContent.trim();
        this.gasto.borrarEtiquetas(etiqueta);
        repintar();
    }
}

export
{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}