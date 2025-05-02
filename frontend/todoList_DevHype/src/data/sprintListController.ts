import { getSprintList, putSprintList } from "../http/sprintList";
import { ISprint } from "../types/types";

// Funcion para obtener toda la lista de sprints
export const getSprintListController = async (): Promise<ISprint[] | undefined> => {
    try {
        const res = await getSprintList();
        return res.sprints
    } catch (error) {
        console.log('Ocurrio un error al obtener la lista de sprints en getSprintListController', error);
    }
}

// Funcion para crear un sprint
export const createSprintController = async (newSprint: ISprint): Promise<void> => {
    try {
        const sprints = await getSprintListController();
        if (sprints !== undefined){
            await putSprintList([...sprints, newSprint]);
        }
    } catch (error) {
        console.log('Ocurrio un error al crear un sprint en createSprintController', error);        
    }
}

// Funcion para actualizar los sprints
export const updateSprintListController = async (updatedSprint: ISprint): Promise<void> => {
    try {
        const sprints = await getSprintListController();
        if (sprints !== undefined){
            const result = sprints?.map(
                (sprint)=>(sprint.id === updatedSprint.id 
                ? {...sprint, ...updatedSprint}
                : sprint
                )
            );
            await putSprintList(result);
        }
    } catch (error) {
        console.log('Ocurrio un error al actualizar la lista de sprints en updateSprintListController', error);        
    }
}

// Funcion para eliminar un sprint
export const deleteSprintController = async (id: string): Promise<void> => {
    try {
        const sprints = await getSprintListController();
        if (sprints !== undefined) {
          const result = sprints.filter(
            (sprint) => sprint.id !== id
          );   
          await putSprintList(result);
        }
      } catch (error) {
        console.log("Error al eliminar un sprint en deleteSprintController", error);
      }
}