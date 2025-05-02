// Enumeraciones
export enum TaskState {
    PENDIENTE = "pendiente",
    EN_PROGRESO = "en progreso",
    COMPLETADO = "completado",
}

// Interfaces
export interface ITarea {
    id: string;
    titulo: string;
    descripcion: string;
    estado: TaskState;
    fechaLimite: string;
}

export interface IBacklog{
    tareas: ITarea[]
}

export interface ISprint {
    id: string;
    nombre: string;
    fechaInicio: string;
    fechaCierre: string;
    tareas: ITarea[];
}

export interface ISprintList {
    sprints: ISprint[]
}


// FC Props
export interface TaskSprintModalProps{
    activeModal: Record<string, boolean>;
    setActiveModal: (modalState: Record<string, boolean>) => void;
}

export interface TaskSprintProps{
    setModal: (modalState: Record<string, boolean>) => void;
}
