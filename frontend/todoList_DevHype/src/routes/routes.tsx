import {BrowserRouter, Routes, Route} from 'react-router-dom'
import BacklogScreen from '../components/screens/BacklogScreen'
import SprintScreen from '../components/screens/SprintScreen'

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element= {<BacklogScreen/>} />
            <Route path='/sprint/:id' element= {<SprintScreen/>} /> {/* :id = Lee automaticamente el parametro del id */}
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
