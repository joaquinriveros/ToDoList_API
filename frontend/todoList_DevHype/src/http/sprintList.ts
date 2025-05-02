import axios from "axios";
import { API_SPRINTLIST_URL } from "../utils/consts";
import { ISprint, ISprintList } from "../types/types";

export const getSprintList = async (): Promise<ISprintList> => {
    try {
        const { data } = await axios.get<ISprintList>(API_SPRINTLIST_URL);
        return data;
    } catch (error) {
        console.log('Ocurrio un error al obtener la lista de sprints en getSprintList', error);
        return { sprints: [] };
    }
}

export const putSprintList = async (updatedSprints: ISprint[]): Promise<ISprintList | undefined> => {
    try {
        const {data} = await axios.put<ISprintList>(API_SPRINTLIST_URL, {sprints: updatedSprints});
        return data;
    } catch (error) {
        console.log('Ocurrio un error al actualizar la lista de sprints en putSprintList', error);
    }
}