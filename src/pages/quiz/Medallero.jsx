// src/pages/quiz/cuestionario/Medallero.jsx
import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D } from '@react-three/drei';
import './Medallero.css';
import { Podiums } from './models-3d/Podiums';
import useQuizStore from '../../stores/use-quiz-store';
import useAuthStore from '../../stores/use-auth.store';

const Medallero = () => {
  const { podium, loadPodium, loading } = useQuizStore();
  const { userLogged } = useAuthStore();
  const [userRank, setUserRank] = useState(null);

  useEffect(() => {
    loadPodium();
  }, [loadPodium]);

  // Obtener el ranking del usuario actual
  useEffect(() => {
    const fetchUserRank = async () => {
      if (userLogged) {
        try {
          const response = await fetch(`/api/quiz/leaderboard?limit=100`);
          const result = await response.json();
          
          if (result.success) {
            const userEntry = result.data.find(
              entry => entry.firebaseUID === userLogged.uid
            );
            setUserRank(userEntry ? userEntry.rank : null);
          }
        } catch (error) {
          console.error('Error fetching user rank:', error);
        }
      }
    };

    fetchUserRank();
  }, [userLogged]);

  if (loading) {
    return (
      <div className="medallero-container">
        <div className="loading-spinner">
          <h2>Cargando podio...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="medallero-container">
      {/* Información del usuario actual */}
      {userLogged && (
        <div className="user-rank-info">
          <div className="user-info">
            <img 
              src={userLogged.photoURL} 
              alt={userLogged.displayName}
              className="user-avatar"
            />
            <span className="user-name">{userLogged.displayName}</span>
            {userRank && (
              <span className="user-rank">
                Posición: #{userRank}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Podio 3D */}
      <Canvas camera={{ position: [-5, 2, 10], fov: 20 }}>
        <ambientLight intensity={2} />
        
        <directionalLight 
          position={[0, 10, 0]} 
          intensity={1} 
          color="white" 
          target-position={[0, 0, 0]} 
        />

        {/* Luz roja sobre el segundo lugar */}
        <directionalLight 
          position={[-4, 10, 0]} 
          intensity={1} 
          color="red" 
          target-position={[-4, 0, 0]} 
        />

        {/* Luz azul sobre el tercer lugar */}
        <directionalLight 
          position={[4, 10, 0]} 
          intensity={1} 
          color="blue" 
          target-position={[4, 0, 0]} 
        />

        <Podiums physics={false}/>

        {/* Textos de posiciones */}
        <Text3D
          position={[-7.8, 0.1, -33.5]}
          font="/fonts/roboto.json"
          size={0.8}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          SEGUNDO
          <meshStandardMaterial color="red" />
        </Text3D>

        <Text3D
          position={[0.1, 0.1, -30.6]}
          font="/fonts/roboto.json"
          size={0.8}
          height={0.2}
          bevelEnabled
        >
          PRIMERO
          <meshStandardMaterial color="gold" />
        </Text3D>

        <Text3D
          position={[8, 0.1, -33.5]}
          font="/fonts/roboto.json"
          size={0.8}
          height={0.2}
          bevelEnabled
        >
          TERCERO
          <meshStandardMaterial color="blue" />
        </Text3D>

        {/* Nombres de los ganadores */}
        {podium.first && (
          <Text3D
            position={[-1.5, 2, -30.6]}
            font="/fonts/roboto.json"
            size={0.4}
            height={0.1}
            bevelEnabled
          >
            {podium.first.displayName}
            <meshStandardMaterial color="gold" />
          </Text3D>
        )}

        {podium.second && (
          <Text3D
            position={[-9, 1.5, -33.5]}
            font="/fonts/roboto.json"
            size={0.3}
            height={0.1}
            bevelEnabled
          >
            {podium.second.displayName}
            <meshStandardMaterial color="silver" />
          </Text3D>
        )}

        {podium.third && (
          <Text3D
            position={[6.5, 1, -33.5]}
            font="/fonts/roboto.json"
            size={0.3}
            height={0.1}
            bevelEnabled
          >
            {podium.third.displayName}
            <meshStandardMaterial color="#CD7F32" />
          </Text3D>
        )}

        <OrbitControls target={[0, 0, -30]} />
      </Canvas>

      {/* Panel de información detallada */}
      <div className="podium-details">
        <h2 className="podium-title">🏆 Top 3 Jugadores</h2>
        
        <div className="podium-list">
          {/* Primer lugar */}
          {podium.first ? (
            <div className="podium-entry first-place">
              <div className="rank-badge gold">🥇</div>
              <div className="player-info">
                <h3>{podium.first.displayName}</h3>
                <p className="score">Puntaje: {podium.first.bestScore}</p>
                <p className="stats">
                  ✅ {podium.first.correctAnswers} correctas | 
                  ❌ {podium.first.incorrectAnswers} incorrectas
                </p>
                {podium.first.completionTime > 0 && (
                  <p className="time">⏱️ {podium.first.completionTime}s</p>
                )}
              </div>
            </div>
          ) : (
            <div className="podium-entry empty">
              <div className="rank-badge gold">🥇</div>
              <div className="player-info">
                <h3>¡Sé el primero!</h3>
                <p>Completa el quiz para aparecer aquí</p>
              </div>
            </div>
          )}

          {/* Segundo lugar */}
          {podium.second ? (
            <div className="podium-entry second-place">
              <div className="rank-badge silver">🥈</div>
              <div className="player-info">
                <h3>{podium.second.displayName}</h3>
                <p className="score">Puntaje: {podium.second.bestScore}</p>
                <p className="stats">
                  ✅ {podium.second.correctAnswers} correctas | 
                  ❌ {podium.second.incorrectAnswers} incorrectas
                </p>
                {podium.second.completionTime > 0 && (
                  <p className="time">⏱️ {podium.second.completionTime}s</p>
                )}
              </div>
            </div>
          ) : (
            <div className="podium-entry empty">
              <div className="rank-badge silver">🥈</div>
              <div className="player-info">
                <h3>Segundo lugar disponible</h3>
                <p>¡Compite por esta posición!</p>
              </div>
            </div>
          )}

          {/* Tercer lugar */}
          {podium.third ? (
            <div className="podium-entry third-place">
              <div className="rank-badge bronze">🥉</div>
              <div className="player-info">
                <h3>{podium.third.displayName}</h3>
                <p className="score">Puntaje: {podium.third.bestScore}</p>
                <p className="stats">
                  ✅ {podium.third.correctAnswers} correctas | 
                  ❌ {podium.third.incorrectAnswers} incorrectas
                </p>
                {podium.third.completionTime > 0 && (
                  <p className="time">⏱️ {podium.third.completionTime}s</p>
                )}
              </div>
            </div>
          ) : (
            <div className="podium-entry empty">
              <div className="rank-badge bronze">🥉</div>
              <div className="player-info">
                <h3>Tercer lugar disponible</h3>
                <p>¡Únete al podio!</p>
              </div>
            </div>
          )}
        </div>

        {/* Botón para ver tabla completa */}
        <div className="actions">
          <button 
            className="view-full-leaderboard"
            onClick={() => window.location.href = '/quiz/leaderboard'}
          >
            Ver tabla completa
          </button>
          <button 
            className="play-again"
            onClick={() => window.location.href = '/quiz/cuestionario'}
          >
            Jugar de nuevo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Medallero;