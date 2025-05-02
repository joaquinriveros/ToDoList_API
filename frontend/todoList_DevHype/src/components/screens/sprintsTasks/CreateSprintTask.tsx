import styles from "./CreateSprintTask.module.css"
import { hash } from "sha-256";
import useTaskAndSprintFunctions from "../../../hooks/useTaskAndSprintFunctions";
import { ITarea, TaskSprintProps, TaskState } from "../../../types/types"
import useStore from "../../../hooks/useStore";
import Swal from "sweetalert2";
import { taskSchema } from "../../../types/schemas";
import { useState } from "react";

const CreateSprintTask: React.FC<TaskSprintProps> = ({setModal}) => {
  
  const {addTaskToSprint, validate} = useTaskAndSprintFunctions();
  const {sprintActivo} = useStore();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    const task = Object.fromEntries(new FormData(e.currentTarget).entries());

    const result = validate(taskSchema, task);

    if (!result.success) {
      setErrors(result.fieldErrors);
      setTimeout(()=>{
        setErrors({});
      }, 3000)
      return;
    };

    const newTask: ITarea = {
        id: hash(new Date().toISOString().toString()) as string,
        titulo: result.data.title as string,
        descripcion: result.data.description as string,
        estado: TaskState.PENDIENTE,
        fechaLimite: result.data.finalDate as string
      };

      try {
        await addTaskToSprint(sprintActivo!.id, newTask).then(() =>{
          Swal.fire({
            icon: 'success',
            title: 'Tarea creada con exito',
            showConfirmButton: false,
            timer: 1500
          })
        });
      } catch (error) {
          console.log('Error al crear la tarea en CreateSprintTask', error);
      }finally{
        setModal({createSprintTaskModal: false})
      }
  }

  return (
    <div className={styles.createSprintTask_modal_container}>
        <button className={styles.btn_close} onClick={() => setModal({createSprintTaskModal: false})}>X</button>
        <div className={styles.createSprintTask_form_container}>
            <form onSubmit={(e) => {handleSubmit(e)}} className={styles.createSprintTask_form}>
                <div>
                  <label htmlFor="title">Título</label>
                  <input type="text" name="title" placeholder="Título de la tarea"/>
                  {errors.title && <p className={styles.error}>{errors.title}</p>}
                </div>
                <div>
                  <label htmlFor="description">Descripción</label>
                  <input type="text" name="description" placeholder="Descripción de la tarea"/>
                  {errors.description && <p className={styles.error}>{errors.description}</p>}
                </div>
                <div>
                  <label htmlFor="finalDate">Fecha límite</label>
                  <input type="date" name="finalDate"></input>
                  {errors.finalDate && <p className={styles.error}>{errors.finalDate}</p>}
                </div>
                <div>
                  <button type="submit">Crear</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreateSprintTask
