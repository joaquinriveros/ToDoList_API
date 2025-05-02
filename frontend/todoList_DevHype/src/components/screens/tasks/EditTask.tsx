import styles from "./EditTask.module.css"
import { TaskSprintProps, ITarea, TaskState } from "../../../types/types"
import useTaskFunctions from "../../../hooks/useTaskAndSprintFunctions";
import Swal from "sweetalert2";
import useStore from "../../../hooks/useStore";
import { useState } from "react";
import { taskSchema } from "../../../types/schemas";

const EditTask: React.FC<TaskSprintProps> = ({setModal}) => {

    const {editTask, validate} = useTaskFunctions();
    const {tareaActiva, setTareaActiva} = useStore(); 
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
    
        const task_ = Object.fromEntries(new FormData(e.currentTarget).entries());
    
        const result = validate(taskSchema, task_);
        
        if (!result.success) {
          setErrors(result.fieldErrors);
          setTimeout(()=>{
            setErrors({});
          }, 3000)
          return;
        };
        
        const newTask: ITarea = {
            id: tareaActiva!.id as string,
            titulo: result.data.title as string,
            descripcion: result.data.description as string,
            estado: tareaActiva!.estado as TaskState,
            fechaLimite: result.data.finalDate as string
          };
    
          try {
            await editTask(newTask).then(() =>{
              Swal.fire({
                icon: 'success',
                title: 'Tarea editada con exito',
                showConfirmButton: false,
                timer: 1500
              })
            });
          } catch (error) {
              console.log('Error al editar la tarea en EditTask', error);
          }finally{
            setModal({editTaskModal: false})
          }
      }

  return (
    <div className={styles.editTask_modal_container}>
        <button className={styles.btn_close} onClick={() => setModal({editTaskModal: false})}>X</button>
        <div className={styles.editTask_form_container}>
            <form onSubmit={(e) => {handleSubmit(e)}} className={styles.editTask_form}>
                <div>
                    <label htmlFor="title">Título</label>
                    <input onChange={(e) => {setTareaActiva({...tareaActiva!, titulo: e.target.value})}} type="text" name="title" placeholder="Título de la tarea" value={tareaActiva?.titulo}/>
                    {errors.title && <p className={styles.error}>{errors.title}</p>}
                </div>
                <div>
                    <label htmlFor="description">Descripción</label>
                    <input onChange={(e) => {setTareaActiva({...tareaActiva!, descripcion: e.target.value})}} type="text" name="description" placeholder="Descripción de la tarea" value={tareaActiva?.descripcion}/>
                    {errors.description && <p className={styles.error}>{errors.description}</p>}
                </div>
                <div>
                    <label htmlFor="finalDate">Fecha límite</label>
                    <input onChange={(e) => {setTareaActiva({...tareaActiva!, fechaLimite: e.target.value})}} type="date" name="finalDate" value={tareaActiva?.fechaLimite}></input>
                    {errors.finalDate && <p className={styles.error}>{errors.finalDate}</p>}
                </div>
                <div>
                    <button type="submit">Editar</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditTask
