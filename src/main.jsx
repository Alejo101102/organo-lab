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
import QueEsExplorarModelo from './pages/conjuntivitis/que-es-conjuntivitis/que-es-explorar-Modelo/QueEsExplorarModelo'
import Glaucoma from './pages/glaucoma/Glaucoma'
import QueEsGlaucoma from './pages/glaucoma/que-es-glaucoma/QueEsGlaucoma'
import Quiz from './pages/quiz/Quiz'
import InicioSesion from './pages/inicio-sesion/InicioSesion'
import Layout from './layout/Layout'
import ModeloGlaucoma3D from './pages/glaucoma/que-es-glaucoma/explorar-modelo/ModeloGlaucoma3D'
import ModeloCatarata3D from './pages/cataratas/que-es-catarata/ModeloCatarata3D'
import QueEsAgujeroMacular from './pages/agujero-macular/que-es-agujero-macular/QueEsAgujeroMacular'
import OjoInterno3D from './pages/agujero-macular/que-es-agujero-macular/OjoInterno3D'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route index path="/" element={<Home />} />  
        
        <Route path="agujero-macular" element={<AgujeroMacular />} > 
          <Route path="que-es" element={<QueEsAgujeroMacular/>}/>
          <Route path="que-es/modelo-3d" element={<OjoInterno3D />} />
        </Route>

        <Route path="cataratas" element={<Cataratas />}>
          <Route path="que-es" element={<QueEsCatarata />} />
          <Route path="que-es/modelo-3d" element={<ModeloCatarata3D />} /> {/* Mantenido aquí */}
        </Route>
        

        <Route path="glaucoma" element={<Glaucoma />} > 
          <Route path="que-es" element={<QueEsGlaucoma />} />
          <Route path="que-es/modelo-3d" element={<ModeloGlaucoma3D />} />
        </Route>

        <Route path="conjuntivitis" element={<Conjuntivitis/>}>
          <Route path="que-es" element={<QueEsConjuntivitis />} />
          <Route path="que-es/modelo-3d" element={<QueEsExplorarModelo />} /> 
        </Route>
        
        <Route path="quiz" element={<Quiz />} /> 
        <Route path="inicio-sesion" element={<InicioSesion />} />
        <Route path="*" element={<NotFound />} />  
      </Routes>
    </Layout>
  </BrowserRouter>
)
