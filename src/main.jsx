import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/home/Home'
import NotFound from './pages/not-found/NotFound'
import AgujeroMacular from './pages/agujero-macular/AgujeroMacular'
import Cataratas from './pages/cataratas/Cataratas'
import Conjuntivitis from './pages/conjuntivitis/Conjuntivitis'
import Glaucoma from './pages/glaucoma/Glaucoma'
import QueEsGlaucoma from './pages/glaucoma/que-es-glaucoma/QueEsGlaucoma'
import Quiz from './pages/quiz/Quiz'
import InicioSesion from './pages/inicio-sesion/InicioSesion'
import Heart from './pages/heart/Heart'
import HighBloodPressure from './pages/heart/high-blood-pressure/HighBloodPressure'
import LowBloodPressure from './pages/heart/low-blood-pressure/LowBloodPressure'
import Layout from './layout/Layout'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route index path="/" element={<Home />} />  
        <Route path="agujero-macular" element={<AgujeroMacular />} /> 
<<<<<<< Updated upstream
        <Route path="cataratas" element={<Cataratas />} /> 
=======

        <Route path="cataratas" element={<Cataratas />}>
          <Route path="que-es" element={<QueEsCatarata />} />
        </Route>

>>>>>>> Stashed changes
        <Route path="conjuntivitis" element={<Conjuntivitis />} /> 

        <Route path="glaucoma" element={<Glaucoma />} > 
        <Route path="que-es" element={<QueEsGlaucoma />} />
        </Route>
        
        <Route path="quiz" element={<Quiz />} /> 
        <Route path="inicio-sesion" element={<InicioSesion />} />
        <Route path="*" element={<NotFound />} />  
        <Route path="corazon" element={<Heart/>} >  
          <Route path="presion-alta" element={<HighBloodPressure />} /> 
          <Route path="presion-baja" element={<LowBloodPressure />} /> 
        </Route>
      </Routes>
    </Layout>
  </BrowserRouter>
)
