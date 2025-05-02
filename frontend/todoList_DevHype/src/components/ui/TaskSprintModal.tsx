import { TaskSprintModalProps } from "../../types/types"
import CreateTask from "../screens/tasks/CreateTask";
import ViewTask from "../screens/tasks/ViewTask";
import EditTask from "../screens/tasks/EditTask";
import CreateSprintTask from "../screens/sprintsTasks/CreateSprintTask";
import ViewSprintTask from "../screens/sprintsTasks/ViewSprintTask";
import EditSprintTask from "../screens/sprintsTasks/EditSprintTask";
import CreateSprint from "../screens/sprint/CreateSprint";
import EditSprint from "../screens/sprint/EditSprint";

export const TaskSprintModal: React.FC<TaskSprintModalProps> = ({activeModal, setActiveModal}) => {
   
  return (
    <>
      {/* Sprint modals */}
      {activeModal.createSprintModal && <CreateSprint setModal={setActiveModal}/>}
      {activeModal.editSprintModal && <EditSprint setModal={setActiveModal}/>}

      {/* Backlog modals */}
      {activeModal.createTaskModal && <CreateTask setModal={setActiveModal}/>}
      {activeModal.viewTaskModal && <ViewTask setModal={setActiveModal}/>}
      {activeModal.editTaskModal && <EditTask setModal={setActiveModal}/>}

      {/* SprintTask modals */}
      {activeModal.createSprintTaskModal && <CreateSprintTask setModal={setActiveModal}/>}
      {activeModal.viewSprintTaskModal && <ViewSprintTask setModal={setActiveModal}/>}
      {activeModal.editSprintTaskModal && <EditSprintTask setModal={setActiveModal}/>}
    </>
  )
}