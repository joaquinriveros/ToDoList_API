import styles from "./ViewSprintTask.module.css"
import { TaskSprintProps } from '../../../types/types'
import useStore from '../../../hooks/useStore';

const ViewSprintTask: React.FC<TaskSprintProps> = ({setModal}) => {
  
  const {tareaActiva} = useStore(); 
  
  return (
    <div className={styles.viewSprintTask_modal_container}>
        <button className={styles.btn_close} onClick={() => setModal({viewSprintTaskModal: false})}>X</button>
        <div className={styles.viewSprintTask_form_container}>
            <form className={styles.viewSprintTask_form}>
                <div>
                  <label htmlFor="title">Título</label>
                  <input type="text" name="title" value={tareaActiva?.titulo} readOnly/>
                </div>
                <div>
                  <label htmlFor="description">Descripción</label>
                  <input type="text" name="description" value={tareaActiva?.descripcion} readOnly/>
                </div>
                <div>
                  <label htmlFor="date">Fecha límite</label>
                  <input type="text" name="date" value={tareaActiva?.fechaLimite} readOnly></input>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ViewSprintTask
