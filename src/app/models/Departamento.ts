
export interface Departamento {
    _id : string,
    nombre: string,
    descripcion?: string,
    updatedAt?: string,
    createdAt?: string,

    usuarios?: number,
    tickets?: number,
}

