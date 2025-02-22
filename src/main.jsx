import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/home/Home'
import NotFound from './pages/not-found/NotFound'
import Quiz from './pages/quiz/Quiz'
import Heart from './pages/heart/Heart'
import HighBloodPressure from './pages/heart/high-blood-pressure/HighBloodPressure'
import LowBloodPressure from './pages/heart/low-blood-pressure/LowBloodPressure'
import Layout from './layout/Layout'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route index path="/" element={<Home />} /> 
        <Route path="quiz" element={<Quiz />} /> 
        <Route path="*" element={<NotFound />} />  
        <Route path="corazon" element={<Heart/>} >  
          <Route path="presion-alta" element={<HighBloodPressure />} /> 
          <Route path="presion-baja" element={<LowBloodPressure />} /> 
        </Route>
      </Routes>
    </Layout>
  </BrowserRouter>
)
