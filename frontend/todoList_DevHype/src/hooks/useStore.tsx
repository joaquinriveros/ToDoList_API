import { sprintStore } from "../store/sprintStore";
import { useShallow } from "zustand/shallow";
import { backlogStore } from "../store/backlogStore";

const useStore = () => {

    // Estado del Sprint
    const {
        sprints, 
        sprintActivo, 
        setSprint, 
        setSprintActivo
    } 
    = sprintStore(useShallow((state) => ({
        sprints: state.sprints,
        sprintActivo: state.sprintActivo,
        setSprint: state.setSprint,
        setSprintActivo: state.setSprintActivo
    })))

    // Estado del Backlog
    const {
        backlog, 
        tareaActiva, 
        setTarea, 
        setTareaActiva
    } 
    = backlogStore(useShallow((state) => ({
        backlog: state.tareas,
        tareaActiva: state.tareaActiva,
        setTarea: state.setTarea,
        setTareaActiva: state.setTareaActiva
    })))

    return (
        {
            sprints, sprintActivo, setSprint, setSprintActivo,
            backlog, tareaActiva, setTarea, setTareaActiva
        }
    )
}

export default useStore
