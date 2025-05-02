import { create } from "zustand";
import { ITarea } from "../types/types";

interface IBacklogStore{
    tareas: ITarea[],
    tareaActiva: ITarea | null,
    setTarea: (tareas: ITarea[]) => void;
    setTareaActiva: (tarea: ITarea | null) => void;
}

export const backlogStore = create<IBacklogStore>((set) => ({
    tareas: [],
    tareaActiva: null,
    setTarea: (tareas_: ITarea[]) => set(()=> ({ tareas: tareas_ })),
    setTareaActiva: (tarea: ITarea | null) => set(()=> ({ tareaActiva: tarea }))
}));