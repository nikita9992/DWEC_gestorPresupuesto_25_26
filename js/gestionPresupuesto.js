"use strict"
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(nuevoPresupuesto) {
    if(!isNaN(nuevoPresupuesto) && nuevoPresupuesto >= 0)
    {
        presupuesto = nuevoPresupuesto  
        return presupuesto;
    }
    else
    {
        console.log("Error: Numero negativo")
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...listaEtiquetas) {
    if (!isNaN(valor) && valor >= 0)
    {
        this.valor = valor;
    }
    else
    {
        this.valor = 0;
    }

    this.descripcion = descripcion;

    let fechaNueva = Date.parse(fecha);
    if (isNaN(fechaNueva))
    {
        this.fecha = Date.now();
    }
    else
    {
        this.fecha = fechaNueva;
    }

    this.etiquetas = [];

    


    this.anyadirEtiquetas = function(...nuevasEtiquetas)
    {
        for (let i=0; i < nuevasEtiquetas.length; i++)
        {
            let etiquetaActual = nuevasEtiquetas[i];
            let etiquetaExiste = false;
            for (let j=0; j < this.etiquetas.length && !etiquetaExiste; j++)
            {
                if (this.etiquetas[j] == etiquetaActual)
                {
                    etiquetaExiste = true;
                }
            }
            if(!etiquetaExiste)
            {
                this.etiquetas.push(etiquetaActual);
            }
        }
    }

    if(listaEtiquetas.length > 0)
    {
        this.anyadirEtiquetas(...listaEtiquetas)
    }

    this.mostrarGasto = function()
    {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }
    this.actualizarDescripcion = function(nuevoDescripcion)
    {
        this.descripcion = nuevoDescripcion;
    }
    this.actualizarValor = function(nuevoValor)
    {
        if(!isNaN(nuevoValor) && nuevoValor >= 0)
        {
            this.valor = nuevoValor;
        }
    }
}

function listarGastos()
{
    return gastos;
}

function anyadirGasto()
{

}

function borrarGasto()
{

}

function calcularTotalGastos()
{

}

function calcularBalance()
{

}
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
