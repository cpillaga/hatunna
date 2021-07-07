export class Empresa {
    constructor(
        public ruc: string,
        public razonSocial: string,
        public telefono: string,
        public direccion: string,
        public correo: string,
        public impresion: string,
        public numSerie: string,
        public img: string,
        public fechaIngreso: Date,
        public _id?: string,
        public estado?: string
    ){}
}