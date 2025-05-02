import Swal from 'sweetalert2';
import { ISprint, TaskSprintProps } from '../../../types/types';
import styles from './EditSprint.module.css'
import useTaskAndSprintFunctions from '../../../hooks/useTaskAndSprintFunctions';
import useStore from '../../../hooks/useStore';
import { sprintSchema } from '../../../types/schemas';
import { useState } from 'react';

const EditSprint: React.FC<TaskSprintProps> = ({setModal}) => {

    const {editSprint, validate} = useTaskAndSprintFunctions();
    const {sprintActivo, setSprintActivo} = useStore(); 
    const [errors, setErrors] = useState<Record<string, string>>({});
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
    
        const sprint = Object.fromEntries(new FormData(e.currentTarget).entries());

        const result = validate(sprintSchema, sprint);

        if (!result.success) {
            setErrors(result.fieldErrors);
            setTimeout(()=>{
              setErrors({});
            }, 3000)
            return;
        };
    
        const newSprint: ISprint = {
            id: sprintActivo!.id as string,
            nombre: result.data.name as string,
            fechaInicio: result.data.initialDate as string,
            fechaCierre: result.data.finalDate as string,
            tareas: []
        };

        try {
            await editSprint(newSprint).then(() =>{
                Swal.fire({
                icon: 'success',
                title: 'Sprint editado con exito',
                showConfirmButton: false,
                timer: 1500
                })
            });
            } catch (error) {
                console.log('Error al editar el sprint en EditSprint', error);
            }finally{
                setModal({editSprintModal: false})
            }
        }
  
    return (
        <div className={styles.editSprint_modal_container}>
            <button className={styles.btn_close} onClick={() => setModal({editSprintModal: false})}>X</button>
            <div className={styles.editSprint_form_container}>
                <form onSubmit={(e) => {handleSubmit(e)}} className={styles.editSprint_form}>
                    <div>
                        <label htmlFor="name">Título</label>
                        <input onChange={(e) => {setSprintActivo({...sprintActivo!, nombre: e.target.value})}} type="text" name="name" placeholder="Título de la tarea" value={sprintActivo?.nombre}/>
                        {errors.name && <p className={styles.error}>{errors.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="initialDate">Fecha inicio</label>
                        <input onChange={(e) => {setSprintActivo({...sprintActivo!, fechaInicio: e.target.value})}} type="date" name="initialDate" placeholder="Descripción de la tarea" value={sprintActivo?.fechaInicio}/>
                        {errors.initialDate && <p className={styles.error}>{errors.initialDate}</p>}
                    </div>
                    <div>
                        <label htmlFor="finalDate">Fecha cierre</label>
                        <input onChange={(e) => {setSprintActivo({...sprintActivo!, fechaCierre: e.target.value})}} type="date" name="finalDate" value={sprintActivo?.fechaCierre}></input>
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

export default EditSprint
