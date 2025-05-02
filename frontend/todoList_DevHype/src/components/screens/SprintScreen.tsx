import styles from './SprintScreen.module.css'
import SprintList from '../ui/SprintList';
import Backlog from '../ui/Backlog';
import { useEffect } from 'react';
import { getSprintListController } from '../../data/sprintListController';
import { getBacklogController } from '../../data/backlogController';
import useStore from '../../hooks/useStore';

const SprintScreen = () => {

    const {setSprint, setTarea} = useStore();

    // Sincronizamos los sprints del estado con los de la bd
    useEffect(()=>{
        (async ()=>{
            const sprintsData = await getSprintListController()
            const backlogData = await getBacklogController();
            try {
                if (sprintsData && backlogData){
                    setSprint(sprintsData)
                    setTarea(backlogData)
                } else{
                    throw new Error('Error en las peticiones a los controladores.')
                }
            } catch (error) {
                console.log('Ocurrio un error al cargar los datos en BacklogScreen: ', error);
            }
        })();        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
   
    return (
        <>
            <div className={styles.backlog_container}>
                {/* Sprint List */}
                <SprintList />

                {/* Backlog */}
                <Backlog />
            </div>
        </>
    );
};

export default SprintScreen;
