import styles from "./ViewTask.module.css"
import { TaskSprintProps } from "../../../types/types"
import useStore from "../../../hooks/useStore";

const ViewTask: React.FC<TaskSprintProps> = ({setModal}) => {

  const {tareaActiva} = useStore(); 

  return (
    <div className={styles.viewTask_modal_container}>
        <button className={styles.btn_close} onClick={() => setModal({viewTaskModal: false})}>X</button>
        <div className={styles.viewTask_form_container}>
            <form className={styles.viewTask_form}>
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

export default ViewTask
