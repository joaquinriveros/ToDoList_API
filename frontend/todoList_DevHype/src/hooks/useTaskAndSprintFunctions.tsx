import Swal from "sweetalert2";
import { createTaskBacklogController, deleteTaskBacklogController, updateBacklogController } from "../data/backlogController";
import { ISprint, ITarea } from "../types/types";
import useStore from "./useStore";
import { createSprintController, deleteSprintController, updateSprintListController } from "../data/sprintListController";

const useTaskAndSprintFunctions = () => {

    const {backlog, setTarea, sprints, setSprint} = useStore();

    // Validacion zod:  (La ',' despues del tipo generico es porque sino lo toma como elemento TSX)
    const validate = <T,>(schema: Zod.Schema<T>, data: unknown): { success: true; data: T } | { success: false; fieldErrors: Record<string, string> } => {
       
        const result = schema.safeParse(data);

        if (result.success) {
            return { success: true, data: result.data };
        }

        const fieldErrors: Record<string, string> = {};
        result.error.errors.forEach((err) => {
            const path = err.path.join('.');
            fieldErrors[path] = err.message;
        });

        return { success: false, fieldErrors };
    };

    // Funciones del Backlog

    // Funcion crear tarea
    const createTask = async(newTask: ITarea)=>{
        try {
            await createTaskBacklogController(newTask);
            setTarea([...backlog, newTask])
        } catch (error) {
            console.log('Error al crear la tarea en createTask', error);
        }
    }

    // Funcion para editar tarea
    const editTask = async(updatedTask: ITarea)=>{
        try {
            await updateBacklogController(updatedTask);
            setTarea(backlog.map(
                (task) => (task.id === updatedTask.id 
                    ? { ...task, ...updatedTask } 
                    : task)
                ));
        } catch (error) {
            console.log('Error al editar la tarea en editTask', error);
        }
    }

    // Funcion para eliminar tarea
    const deleteTask = async (id: string) => {
        const confirm = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás recuperar la tarea eliminada",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar'
        });
    
        if (!confirm.isConfirmed) return;
    
        try {
            await deleteTaskBacklogController(id);
            setTarea(backlog.filter((task) => task.id !== id));
            await Swal.fire('Eliminado!', 'La tarea ha sido eliminada.', 'success');
        } catch (error) {
            console.log('Error al eliminar la tarea en deleteTask', error);
        }
    };

    const moveTaskToSprint = async(taskId: string, sprintId: string)=>{
        try {
            await deleteTaskBacklogController(taskId);
            setTarea(backlog.filter((task) => task.id !== taskId));
            await addTaskToSprint(sprintId, backlog.filter((task) => task.id === taskId)[0]);
        } catch (error) {
            console.log('Error al eliminar la tarea en deleteTask', error);
        }
    }
    
    // Funciones del Sprint

    // Funcion crear sprint
    const createSprint = async(newSprint: ISprint)=>{
        try {
            await createSprintController(newSprint);
            setSprint([...sprints, newSprint])
        } catch (error) {
            console.log('Error al crear el sprint en createSprint', error);
        }
    }

    // Funcion para editar sprint
    const editSprint = async(updatedSprint: ISprint)=>{
        try {
            await updateSprintListController(updatedSprint);
            setSprint(sprints.map(
                (sprint) => (sprint.id === updatedSprint.id 
                    ? { ...sprint, ...updatedSprint } 
                    : sprint)
                ));
        } catch (error) {
            console.log('Error al editar el spint en editSprint', error);
        }
    }

    // Funcion para eliminar sprint
    const deleteSprint = async (id: string) => {
        const confirm = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás recuperar el sprint eliminado",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar'
        });
    
        if (!confirm.isConfirmed) return;
    
        try {
            await deleteSprintController(id);
            setSprint(sprints.filter((sprint) => sprint.id !== id));
            await Swal.fire('Eliminado!', 'El sprint ha sido eliminado.', 'success');
        } catch (error) {
            console.log('Error al eliminar el sprint en deleteSprint', error);
        }
    };

    // Tareas de la Sprint

    // Funcion para agregar tarea a la sprint
    const addTaskToSprint = async (sprintId: string, newTask: ITarea) =>{
        const updatedSprint = sprints.filter((sprint) => sprint.id === sprintId)[0];
        updatedSprint.tareas.push(newTask);
        try {
            await updateSprintListController(updatedSprint)
            setSprint(sprints.map((sprint) => (sprint.id === sprintId ? updatedSprint : sprint)));
        } catch (error) {
            console.log("Error al agregar la tarea a la sprint en addTaskToSprint", error);
        }
    }

    // Funcion para editar tarea de la sprint
    const editTaskInSprint = async (sprintId: string, updatedTask: ITarea) => {
        const sprint = sprints.filter((sprint) => sprint.id === sprintId)[0];
        const updatedTasks = sprint.tareas.map((tarea)=>(
            tarea.id === updatedTask.id
                ? {...tarea, ...updatedTask}
                : tarea
            )
        );
        const updatedSprint = {...sprint, tareas: updatedTasks};
        try {
            await updateSprintListController(updatedSprint);
            setSprint(sprints.map((sprint) => (sprint.id === sprintId ? updatedSprint : sprint)));
        } catch (error) {
            console.log("Error al editar la tarea de la sprint en editTaskInSprint", error);
        }
    }

    // Funcion para eliminar tarea de la sprint
    const deleteTaskInSprint = async (sprintId: string, taskId: string) => {

        const confirm = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás recuperar la tarea del sprint eliminada",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar'
        });
    
        if (!confirm.isConfirmed) return;

        const updatedSprint = sprints.filter((sprint) => sprint.id === sprintId)[0];
        const updatedTasks = updatedSprint.tareas.filter((tarea) => tarea.id !== taskId);

        updatedSprint.tareas = updatedTasks;

        try {
            await updateSprintListController(updatedSprint);
            setSprint(sprints.map((sprint) => (sprint.id === sprintId ? updatedSprint : sprint)));
        } catch (error) {
            console.log("Error al eliminar la tarea de la sprint en deleteTaskInSprint", error);
        }
    }

    return (
        {
            // Validacion Formulario
            validate,
            // Funciones del Backlog
            createTask, editTask, deleteTask, moveTaskToSprint,
            // Funciones del Sprint
            createSprint, editSprint, deleteSprint,
            // Funciones de la tarea de la Sprint
            addTaskToSprint, editTaskInSprint, deleteTaskInSprint
        }
    )
}

export default useTaskAndSprintFunctions
