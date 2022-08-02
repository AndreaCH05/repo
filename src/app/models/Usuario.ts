
export interface Usuario {
    _id : string,
    nombre: string,
    apellido: string,
    email: string,

    departamento_id ?:   string,

    departamento ?:   {
        _id?: string,
        nombre?: string,
        descripcion?: string,
    },

    password?: string,
    updatedAt?: string,
    admin?: boolean,
    createdAt?: string,

    tickets_asignados?: number,
    tickets_creados?: number,
}

