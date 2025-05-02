import styles from './CreateTask.module.css'
import { TaskSprintProps, ITarea, TaskState } from '../../../types/types'
import {hash} from 'sha-256';
import Swal from 'sweetalert2';
import useTaskFunctions from '../../../hooks/useTaskAndSprintFunctions';
import { taskSchema } from '../../../types/schemas';
import { useState } from 'react';

const CreateTask: React.FC<TaskSprintProps> = ({ setModal }) => {

  const {createTask, validate} = useTaskFunctions();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    // entries() → Convierte un objeto en un array de pares [clave, valor]
    // fromEntries() → Convierte un array de pares [clave, valor] en un objeto
    const task = Object.fromEntries(new FormData(e.currentTarget).entries()); // FormData es un objeto especial por lo que usamos entries().

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
        await createTask(newTask).then(() =>{
          Swal.fire({
            icon: 'success',
            title: 'Tarea creada con exito',
            showConfirmButton: false,
            timer: 1500
          })
        });
      } catch (error) {
          console.log('Error al crear la tarea en CreateTask', error);
      }finally{
        setModal({createTaskModal: false})
      }
  }

  return (
    <div className={styles.createTask_modal_container}>
        <button className={styles.btn_close} onClick={() => setModal({createTaskModal: false})}>X</button>
        <div className={styles.createTask_form_container}>
            <form onSubmit={(e) => {handleSubmit(e)}} className={styles.createTask_form}>
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

export default CreateTask
