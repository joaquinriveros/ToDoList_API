import styles from './BacklogScreen.module.css'
import { useEffect } from 'react';
import useStore from '../../hooks/useStore';
import { getSprintListController } from '../../data/sprintListController';
import { getBacklogController } from '../../data/backlogController';
import SprintList from '../ui/SprintList';
import BacklogMain from '../ui/BacklogMain';

const BacklogScreen = () => {

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
        <div className={styles.backlog_container}>
            {/* Sprint List */}
            <SprintList />

            {/* Backlog Main */}
            <BacklogMain />
        </div>
    );
};

export default BacklogScreen;

