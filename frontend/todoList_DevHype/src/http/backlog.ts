import axios from 'axios'
import { API_BACKLOG_URL } from '../utils/consts'
import { ITarea, IBacklog } from '../types/types'

// Funcion para obtener las tareas globales del json server
export const getBacklog = async (): Promise<IBacklog> => {
    try {
        const {data} = await axios.get<IBacklog>(API_BACKLOG_URL);
        return data;
    } catch (error) {
        console.log('Ocurrio un error al solicitar las tareas en getBacklog', error);
        return {tareas: []};
    }
}

// Funcion para actualizar las tareas globales del json server
export const putBacklog = async (updatedTasks: ITarea[]): Promise<IBacklog | undefined> => {
    try {
        const {data} = await axios.put<IBacklog>(API_BACKLOG_URL, {tareas: updatedTasks});
        return data;
    } catch (error) {
        console.log('Ocurrio un error al actualizar las tareas en putBacklog', error);
    }
}