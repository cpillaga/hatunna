export class Producto {
    constructor(
        public nombre: string,
        public unidadMedida: string,
        public precioUni: number,
        public img: string,
        public subcategoria: string,
        public proveedor: string,
        public _id?: string,
    ){}
}

export class Proveedor {
    constructor(
        public ruc: string,
        public razonSoc: string,
        public telefono: string,
        public direccion: string,
        public correo: string,
        public ciudad: string,
        public representante: string,
        public _id?: string,
    ){}
}

export class Categoria {
    constructor(
        public descripcion: string,
        public img: string,
        public _id?: string,
    ){}
}

export class SubCategoria {
    constructor(
        public descripcion: string,
        public categoria: string,
        public _id?: string,
    ){}
}