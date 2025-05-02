import styles from '../screens/SprintScreen.module.css'
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/useStore';
import TaskCard from './TaskCard';
import useModalState from '../../hooks/useModalState';
import { TaskSprintModal } from './TaskSprintModal';


const Backlog = () => {

    const {sprintTaskModal, setSprintTaskModal} = useModalState();
    const {sprints, setSprintActivo, setTareaActiva} = useStore();

    // Parametro del id extraido de react-router-dom
    const { id } = useParams();
    // Filtramos del estado el sprint obtenido por el id de la url
    const sprint = sprints.find((s) => s.id === id);

    if (!sprint) return <p className={styles.error}>Sprint no encontrado</p>;

    const obtenerClasePorFecha = (fechaLimite: string) => {
        const fechaActual = new Date();
        const fechaTarea = new Date(fechaLimite);
        fechaTarea.setHours(0, 0, 0, 0);
      
        const diferencia_milisegundos = fechaTarea.getTime() - fechaActual.getTime();
        const diasRestantes = Math.ceil(diferencia_milisegundos / (1000 * 60 * 60 * 24));
      
        if (diasRestantes <= 3) return styles.task_card_red; // cerca de vencer
        return;
    };

    return (
    <>
        <div className={styles.sprint_container}>
            <div className={styles.task_header}>
                <h2><b>Nombre de la Sprint:</b> {sprint.nombre}</h2>
                <div className={styles.task_header_actions}>
                    <h3>Tareas de la sprint</h3>
                    <button className={styles.btn_add_task} onClick={()=>{setSprintActivo(sprint); setSprintTaskModal({...sprintTaskModal, createSprintTaskModal: true})}}>Crear Tarea</button>
                    <TaskSprintModal activeModal= {sprintTaskModal} setActiveModal={setSprintTaskModal} />
                </div>
            </div>
            <div className={styles.task_sections}>
                <div className={styles.task_column_pending}>
                    <h3><b>Pendiente</b></h3>
                    {sprint.tareas.filter(t => t.estado === "pendiente").map((tarea) => (
                        <div key={tarea.id} className={`${styles.task_card_pending} ${obtenerClasePorFecha(tarea.fechaLimite)}`}>
                            <TaskCard 
                                sprintId={sprint.id}
                                tarea={tarea}
                                onView={() => {setSprintActivo(sprint); setTareaActiva(tarea); setSprintTaskModal({...sprintTaskModal, viewSprintTaskModal: true})}}
                                onEdit={() => {setSprintActivo(sprint); setTareaActiva(tarea); setSprintTaskModal({...sprintTaskModal, editSprintTaskModal: true})}}      
                            />
                        </div>
                    ))}
                </div>

                <div className={styles.task_column_in_progress}>
                    <h3><b>En Progreso</b></h3>
                    {sprint.tareas.filter(t => t.estado === "en progreso").map((tarea) => (
                        <div key={tarea.id} className={`${styles.task_card_in_progress} ${obtenerClasePorFecha(tarea.fechaLimite)}`}>
                            <TaskCard 
                                sprintId={sprint.id}
                                tarea={tarea}
                                onView={() => {setSprintActivo(sprint); setTareaActiva(tarea); setSprintTaskModal({...sprintTaskModal, viewSprintTaskModal: true})}}
                                onEdit={() => {setSprintActivo(sprint); setTareaActiva(tarea); setSprintTaskModal({...sprintTaskModal, editSprintTaskModal: true})}}      
                            />
                        </div>
                    ))}
                </div>

                <div className={styles.task_column_completed}>
                    <h3><b>Completado</b></h3>
                    {sprint.tareas.filter(t => t.estado === "completado").map((tarea) => (
                        <div key={tarea.id} className={styles.task_card_completed}>
                            <TaskCard 
                                sprintId={sprint.id}
                                tarea={tarea}
                                onView={() => {setSprintActivo(sprint); setTareaActiva(tarea); setSprintTaskModal({...sprintTaskModal, viewSprintTaskModal: true})}}
                                onEdit={() => {setSprintActivo(sprint); setTareaActiva(tarea); setSprintTaskModal({...sprintTaskModal, editSprintTaskModal: true})}}      
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
    )
}

export default Backlog
