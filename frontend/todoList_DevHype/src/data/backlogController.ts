import { getBacklog, putBacklog } from "../http/backlog";
import { ITarea } from "../types/types";

// Funcion para obtener todas las tareas
export const getBacklogController = async (): Promise<ITarea[] | undefined> => {
    try {
        const res = await getBacklog();
        return res.tareas
    } catch (error) {
        console.log('Ocurrio un error al obtener las tareas en getBacklogController', error);
    }
}

// Funcion para crear las tareas
export const createTaskBacklogController = async (newTask: ITarea): Promise<void> => {
    try {
        const tasks = await getBacklogController();
        if (tasks !== undefined){
            await putBacklog([...tasks, newTask]);
        }
    } catch (error) {
        console.log('Ocurrio un error al crear la tarea en createBacklogController', error);        
    }
}

// Funcion para actualizar las tareas
export const updateBacklogController = async (updatedTask: ITarea): Promise<void> => {
    try {
        const tasks = await getBacklogController();
        if (tasks !== undefined){
            const result = tasks?.map(
                (task)=>(task.id === updatedTask.id 
                ? {...task, ...updatedTask}
                : task 
                )
            );
            await putBacklog(result);
        }
    } catch (error) {
        console.log('Ocurrio un error al actualizar las tareas en updateBacklogController', error);        
    }
}

// Funcion para eliminar tareas
export const deleteTaskBacklogController = async (id: string): Promise<void> => {
    try {
        const tasks = await getBacklogController();
        if (tasks !== undefined) {
          const result = tasks.filter(
            (task) => task.id !== id
          );   
          await putBacklog(result);
        }
      } catch (error) {
        console.log("Error al eliminar una tarea en deleteTaskBacklogController", error);
      }
}