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
import QueEsConjuntivitis from './pages/conjuntivitis/que-es-conjuntivitis/QueEsConjuntivitis'
import Glaucoma from './pages/glaucoma/Glaucoma'
import QueEsGlaucoma from './pages/glaucoma/que-es-glaucoma/QueEsGlaucoma'
import Quiz from './pages/quiz/Quiz'
import InicioSesion from './pages/inicio-sesion/InicioSesion'
import Layout from './layout/Layout'
import QueEsAgujeroMacular from './pages/agujero-macular/que-es-agujero-macular/QueEsAgujeroMacular'
import ScrollToTop from './layout/scroollTop'; 
import Cuestionario from './pages/quiz/cuestionario'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ScrollToTop/>
    <Layout>
      <Routes>
        <Route index path="/" element={<Home />} />  
        
        <Route path="agujero-macular" element={<AgujeroMacular />} > 
          <Route path="que-es" element={<QueEsAgujeroMacular/>}/>
        </Route>

        <Route path="cataratas" element={<Cataratas />}>
          <Route path="que-es" element={<QueEsCatarata />} />
        </Route>
        

        <Route path="glaucoma" element={<Glaucoma />} > 
          <Route path="que-es" element={<QueEsGlaucoma />} />
        </Route>

        <Route path="conjuntivitis" element={<Conjuntivitis/>}>
          <Route path="que-es" element={<QueEsConjuntivitis />} />
        </Route>
        
        <Route path="quiz" element={<Quiz />} />
        <Route path="quiz/cuestionario" element={<Cuestionario />} />
        
        <Route path="inicio-sesion" element={<InicioSesion />} />
        <Route path="*" element={<NotFound />} />  
      </Routes>
    </Layout>
  </BrowserRouter>
)
