import styles from '../screens/BacklogScreen.module.css'
import useModalState from '../../hooks/useModalState';
import useStore from '../../hooks/useStore';
import { FaEye, FaEdit, FaTrash, FaPlus, FaArrowRight } from "react-icons/fa";
import useTaskAndSprintFunctions from '../../hooks/useTaskAndSprintFunctions';
import { TaskSprintModal } from './TaskSprintModal';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { ISprint } from '../../types/types';

export const BacklogMain = () => {

    const {backlog, sprints, sprintActivo, setSprintActivo, tareaActiva, setTareaActiva} = useStore();
    const {taskModal, setTaskModal } = useModalState();
    const {deleteTask, moveTaskToSprint} = useTaskAndSprintFunctions();

    const [sprintSelected, setSprintSelected] = useState<ISprint | null>(null);

    const handleMoveToSprint = async () => {
        try {
            if (!sprintSelected) {
                throw new Error('No se ha seleccionado un sprint');
            }
            await moveTaskToSprint(tareaActiva!.id, sprintActivo!.id);
            setSprintSelected(null); // reset
        } catch (error) {
            console.log('Error al enviar la tarea al sprint en handleMoveToSprint', error);
        }
        Swal.fire({
            icon: 'success',
            title: 'Tarea enviada con éxito',
            text: 'La tarea se ha enviado al sprint correctamente',
            showConfirmButton: false,
            timer: 2000,
        });
    };

    return (
        <>
            <main className={styles.backlog_main}>
                <div className={styles.backlog_main_container}>
                    <div className={styles.backlog_main_header}>
                        <h1>Backlog</h1>
                        <div>
                            <h2>Tareas en el backlog</h2>
                            <button className={styles.btn_add_task} onClick={()=>{setTaskModal({...taskModal, createTaskModal: true})}}><FaPlus /> Crear tarea</button>
                            <TaskSprintModal activeModal= {taskModal} setActiveModal={setTaskModal}></TaskSprintModal>
                        </div>
                    </div>
                    <div className={styles.task_list}>
                        {backlog.map((tarea) => (
                            <div className={styles.task_card} key={tarea.id}>
                                <div className={styles.task_content}>
                                    <p><b>{tarea.titulo}</b>: {tarea.descripcion}</p>
                                </div>
                                <div className={styles.task_actions}>
                                    <button className={styles.btn_move} onClick={sprintSelected ? handleMoveToSprint : undefined}><FaArrowRight /> Enviar a</button>
                                    {/* <select className={styles.sprint_select}>
                                        <option>Seleccione una sprint</option>
                                        {sprints.map(sprint => (
                                            <option key={sprint.id} value={sprint.id} onClick={()=>{setSprintActivo(sprint); setTareaActiva(tarea); setSprintSelected(sprint);}}>{sprint.nombre}</option>
                                        ))}
                                    </select> */}
                                    <select
                                        className={styles.sprint_select}
                                        onChange={(e) => {
                                            const selectedId = e.target.value;
                                            const sprint = sprints.find(s => s.id === selectedId);
                                            if (sprint) {
                                                setSprintActivo(sprint);
                                                setTareaActiva(tarea);
                                                setSprintSelected(sprint);
                                            }
                                        }}
                                        >
                                        <option value="">Seleccione una sprint</option>
                                        {sprints.map(sprint => (
                                            <option key={sprint.id} value={sprint.id}>
                                            {sprint.nombre}
                                            </option>
                                        ))}
                                    </select>
                                    <div className={styles.task_actions_btn}>
                                        <button className={styles.btn_view} onClick={()=>{setTaskModal({...taskModal, viewTaskModal: true}); setTareaActiva(tarea)}}><FaEye /></button>
                                        <button className={styles.btn_edit} onClick={()=>{setTaskModal({...taskModal, editTaskModal: true}); setTareaActiva(tarea)}}><FaEdit /></button>
                                        <button className={styles.btn_delete} onClick={()=>{deleteTask(tarea.id)}}><FaTrash /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}

export default BacklogMain
