import { useState } from 'react'

const useModalState = () => {

    const [sprintModal, setSprintModal] = useState<Record<string, boolean>>(
        {
            createSprintModal: false,
            editSprintModal: false,
        }
    )

    const [taskModal, setTaskModal] = useState<Record<string, boolean>>(
        {
            createTaskModal: false,
            viewTaskModal: false,
            editTaskModal: false,
        }
    )

    const [sprintTaskModal, setSprintTaskModal] = useState<Record<string, boolean>>(
        {
            createSprintTaskModal: false,
            viewSprintTaskModal: false,
            editSprintTaskModal: false,
        }
    )

    return (
        {
            sprintModal, setSprintModal,
            taskModal, setTaskModal,
            sprintTaskModal, setSprintTaskModal,
        }
    )
}

export default useModalState
