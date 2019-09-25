//funciones nuevas push sirve para subir algo a una cadena , pop elimina el ultimo elemento de un array
class articulo {
    constructor(tabla, llave) 
    {
        this._articulo = [];
        this._tabla = tabla;
        this._llave = llave;
        this._contador = 0;
    }
    agregar(ubicacion, nombre, precio, cantidad, descripcion, llave) 
    {   
        if(this._articulo.length < 20)
            { 
                if (ubicacion === '' || ubicacion === (this._contador + 1).toString()) 
                {
                    this._llave = llave;
                    for(var i = this._contador; i < (this._contador+1); i++)
                    {
                        this._articulo[i] = new producto(this._llave, nombre, precio, cantidad, descripcion);
                    }
                    this._contador++;
                    this._llave++;
                    alert('articulo agregado');
                } 
                else if (Number(ubicacion) > 0 && Number(ubicacion) < this._contador) 
                {
                    for (let i = this._contador; i >= Number(ubicacion); i--) 
                    {
                        this._articulo[i] = this._articulo[i - 1];
                    }
                    this._articulo[Number(ubicacion) - 1] = new producto(this._llave, nombre, precio, cantidad, descripcion);
                    this._llave++;
                    alert('articulo agregado correctamente');
                } 
                else
                {
                    alert('Posicion no válida');
                }
                this.impresion();
            }
        else
        {
            alert('inventario lleno');
        }
    }
    buscar(codigo) 
    {
        codigo = Number(codigo);
        let buscador = '';
        let superior = (this._contador-1);
        let inferior = 0;
        let mitad = Math.trunc(superior/2);
        if(this._contador > 2)
            {
                if (this.revision(codigo) === 1) 
                {
                    while((superior - inferior) > 1)
                    {
                            if(this._articulo[mitad]._codigo < codigo)
                            {
                                inferior = mitad;
                                mitad += Math.trunc((superior - inferior)/2); 
                            }
                            else if(this._articulo[mitad]._codigo > codigo)
                            {
                                superior = mitad;
                                mitad = Math.trunc((superior - inferior)/2); 
                            }
                            else
                            {
                                buscador = this._articulo[mitad];
                                break;
                            }
                    }
                } 
                if(this._articulo[mitad]._codigo === codigo)
                {
                    alert('Articulo encontrado en la posicion. '+ mitad);
                }
                else 
                {
                    alert('No se ha podido encontrar el articulo');
                }
            }
        else
        {
            alert('Cantidad de articulos insuficiente para hacer una busqueda');
        }
            return buscador;
    }
    eliminar(codigo) 
    {
        codigo = Number(codigo);
        if (this.revision(codigo) === 1) 
        {
            if (codigo != this.articulo.length) 
            {
                for (let i = codigo - 1; i < this._articulo.length - 1; i++) 
                {
                    this._articulo[i] = this._articulo[i + 1];
                }
                this._articulo[this._contador] = "";
                this._contador--;

            } 
            else
            {
                this._articulo[this._contador] = "";
                this._contador--;

            }
            alert('Se ha eliminado el articulo correctamente');
        } 
        else 
        {
            alert('El código ingresado no existe, por favor verifique de nuevo');
        }
        this.impresion();
    }
    revision(codigo) {
        let existe = 0;
        for (let i = 0; i < this._contador; i++) 
        {
            if (this._articulo[i].codigo === codigo) 
            {
                existe = 1;
                break;
            }
        }
        return existe;
    }
    impresion() {
        this._tabla.innerHTML = '';
        let etiquetaP = [];
        this.ordenado();
        for (let i = 0; i < this._contador; i++) 
        {
            etiquetaP[i] = document.createElement('p');
        }
        for (let i = 0; i < this._contador; i++) 
        {
            etiquetaP[i].innerHTML = this._articulo[i].toString();
            this._tabla.appendChild(etiquetaP[i]);
        }
    }
    ordenado()
    {
        let auxiliar = [];
        for (let i = 0; i < this._contador; i++) 
        {
            for (let j = 0; j < this._contador; j++) 
                {
                    if(this._articulo[i]._codigo > this._articulo[j]._codigo)
                    {
                        auxiliar = this._articulo[i]; 
                        this._articulo[i] = this._articulo[j];
                        this._articulo[j] = auxiliar;
                    }
                }
        }
    }
    get articulo() 
    {
        return this._articulo;
    }
    get llave() 
    {
        return this._llave;
    }
}
//impreciones
class producto{
    constructor(codigo, nombre, precio, cantidad, descripcion)
    {
        this._codigo = codigo;
        this._nombre = nombre;
        this._precio = precio;
        this._cantidad = cantidad;
        this._descripcion = descripcion;
    }
    get codigo()
    {
        return this._codigo;
    }
    toString()
    {
        return 'Código: ' + this._codigo + ' Nombre: ' + this._nombre + ' Precio: $' + this._precio + ' Cantidad: ' + this._cantidad + ' Descripción: ' + this._descripcion ;
    }
}
//botones
var almacen = new articulo(document.querySelector('#tablaArticulos'), Number(document.querySelector('#codigo').value));
document.querySelector('#agregar').addEventListener('click', () => {
    let llave = Number(document.querySelector('#codigo').value);
    let ubicacion = document.querySelector('#ubicacion').value;
    let nombre = document.querySelector('#nombre').value;
    let precio = document.querySelector('#precio').value;
    let cantidad = document.querySelector('#cantidad').value;
    let descripcion = document.querySelector('#descripcion').value;

    almacen.agregar(ubicacion, nombre, precio, cantidad, descripcion, llave);
    document.querySelector('#codigo').value = almacen.llave;
});
document.querySelector('#buscar').addEventListener('click', () => {
    let buscarArticulo = almacen.buscar(document.querySelector('#buscarCodigo').value);
    document.querySelector('#tablaBuscar').innerHTML = buscarArticulo;
});
document.querySelector('#eliminar').addEventListener('click', () => {
    almacen.eliminar(document.querySelector('#eliminarCodigo').value);
    document.querySelector('#codigo').value = almacen.llave;
});