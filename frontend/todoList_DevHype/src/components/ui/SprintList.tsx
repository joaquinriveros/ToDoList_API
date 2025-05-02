import styles from '../screens/BacklogScreen.module.css'
import { Link } from "react-router-dom"
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import useStore from '../../hooks/useStore'
import useModalState from '../../hooks/useModalState'
import { TaskSprintModal } from './TaskSprintModal'
import useTaskAndSprintFunctions from '../../hooks/useTaskAndSprintFunctions'

export const SprintList = () => {

    const {sprints, setSprintActivo} = useStore();
    const {sprintModal, setSprintModal} = useModalState();
    const {deleteSprint} = useTaskAndSprintFunctions();

    return (
        <>
            <div className={styles.aside_container}>
                <Link to={'/'} ><button className={styles.backlog_btn}>Backlog</button></Link>
                {/* Lista de Sprints */}
                <aside className={styles.sprint_list}>
                    <div className={styles.sprint_list_header}>
                        <h2>Lista de Sprints</h2>
                        <button className={styles.btn_add_task} onClick={()=>{setSprintModal({...sprintModal, createSprintModal: true})}}>+</button> {/* Completar funcionalidad de agregar sprint */}
                        <TaskSprintModal activeModal= {sprintModal} setActiveModal={setSprintModal}></TaskSprintModal>
                    </div>
                    {sprints.map((sprint) => (
                        <div onClick={()=> {setSprintActivo(sprint)}} className={styles.sprint_card} key={sprint.id}>
                            <div className={styles.sprint_cardText}>
                                <h3>{sprint.nombre}</h3>
                                <p>Cierre: {sprint.fechaCierre}</p>
                                <p>Inicio: {sprint.fechaInicio}</p>
                            </div>
                            <div className={styles.sprint_actions}>
                                <Link to={`/sprint/${sprint.id}`} onClick={()=>{setSprintActivo(sprint)}}><button className={styles.btn_view}><FaEye /></button></Link>
                                <button className={styles.btn_edit} onClick={()=>{setSprintActivo(sprint); setSprintModal({...sprintModal, editSprintModal: true})}}><FaEdit /></button>
                                <button className={styles.btn_delete} onClick={()=>{deleteSprint(sprint.id)}}><FaTrash /></button>
                            </div>
                        </div>
                    ))}
                </aside>
            </div>
        </>
    )
}

export default SprintList
