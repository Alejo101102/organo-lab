import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/home/Home'
import NotFound from './pages/not-found/NotFound'
import AgujeroMacular from './pages/agujero-macular/AgujeroMacular'
import Cataratas from './pages/cataratas/Cataratas'
import QueEsCatarata from './pages/cataratas/que-es-catarata/QueEsCatarata'
import Conjuntivitis from './pages/conjuntivitis/Conjuntivitis'
import Glaucoma from './pages/glaucoma/Glaucoma'
import Quiz from './pages/quiz/Quiz'
import InicioSesion from './pages/inicio-sesion/InicioSesion'
import Layout from './layout/Layout'



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route index path="/" element={<Home />} />  
        <Route path="agujero-macular" element={<AgujeroMacular />} /> 
        <Route path="cataratas" element={<Cataratas />}>
          <Route path="que-es" element={<QueEsCatarata />} />
        </Route>
        <Route path="conjuntivitis" element={<Conjuntivitis />} /> 
        <Route path="glaucoma" element={<Glaucoma />} /> 
        <Route path="quiz" element={<Quiz />} /> 
        <Route path="inicio-sesion" element={<InicioSesion />} />
        <Route path="*" element={<NotFound />} />  
      </Routes>
    </Layout>
  </BrowserRouter>
)
