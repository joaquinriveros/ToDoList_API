import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ITarea, TaskState } from '../../types/types'
import styles from '../screens/SprintScreen.module.css'
import { faArrowRightLong, faBox } from '@fortawesome/free-solid-svg-icons'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import useTaskAndSprintFunctions from '../../hooks/useTaskAndSprintFunctions'
import useStore from '../../hooks/useStore'


const TaskCard: React.FC<
    {
        sprintId: string;
        tarea: ITarea;
        onView: ()=> void;
        onEdit: ()=> void;

    }> = ({sprintId, tarea, onView, onEdit}) => {

    const {backlog, setTarea, sprints, setSprint} = useStore();
    const {createTask, deleteTask, addTaskToSprint, editTaskInSprint, deleteTaskInSprint} = useTaskAndSprintFunctions();

    const sprint = sprints.filter((sprint) => sprint.id === sprintId)[0]; 

    const handlePushToBacklog = async() => {
        try {
            await deleteTaskInSprint(sprintId, tarea.id);
            await createTask(tarea);
            setTarea([...backlog, tarea]);
        } catch (error) {
            await addTaskToSprint(sprintId, tarea);
            await deleteTask(tarea.id);
            setTarea([...backlog, ...sprint.tareas]);
            console.log('Error al enviar la tarea al backlog en handlePushToBacklog', error);
        }
    }

    const handleChangeState = async() => {
        
        const updatedSprint = sprint; // Copia del sprint para evitar mutaciones

        updatedSprint.tareas.map((t) => (
            t.id === tarea.id
                ? {...tarea, estado: 
                    t.estado === TaskState.PENDIENTE 
                        ? tarea.estado = TaskState.EN_PROGRESO 
                        : t.estado === TaskState.EN_PROGRESO
                            ? tarea.estado = TaskState.COMPLETADO
                            : tarea.estado = TaskState.PENDIENTE
                    }
                : t
            )
        );
        try {
            await editTaskInSprint(sprintId, tarea);
            setSprint(sprints.map((sprint) => (sprint.id === sprintId ? updatedSprint : sprint)));

        } catch (error) {
            setSprint([...sprints, sprint]);
            console.log('Error al cambiar el estado de la tarea en handleChangeState', error);
        }
    }

    return (
    <>
        <div className={styles.task_card_legend}>
            <h4><b>Titulo:</b> {tarea.titulo}</h4>
            <h4><b>Descripcion:</b> {tarea.descripcion}</h4>
            <h4><b>Fecha Limite:</b> {tarea.fechaLimite}</h4>
        </div>
        <div className={styles.task_actions}>
            <div className={styles.task_actions_backlog}>
                <button onClick={()=>{handlePushToBacklog()}}>Enviar al Backlog<FontAwesomeIcon icon={faBox} style={{ marginLeft: "6px" }} /></button>
            </div>
            <div className={styles.switch_state}>
                <button onClick={()=>{handleChangeState()}}>{tarea.estado.toLowerCase()}<FontAwesomeIcon icon={faArrowRightLong} style={{ marginLeft: "6px" }} /></button>
            </div>
            <div className={styles.task_actions_btn}>
                <button onClick={()=>{onView()}} className={styles.btn_view}><FaEye /></button>
                <button onClick={()=>{onEdit()}} className={styles.btn_edit}><FaEdit /></button>
                <button onClick={()=>{deleteTaskInSprint(sprintId, tarea.id)}} className={styles.btn_delete}><FaTrash /></button>
            </div>
        </div>
    </>
    )
}

export default TaskCard
