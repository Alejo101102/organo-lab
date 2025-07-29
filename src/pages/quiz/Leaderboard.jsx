// src/pages/quiz/leaderboard/Leaderboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useQuizStore from '../../stores/use-quiz-store';
import useAuthStore from '../../stores/use-auth.store';
import './Leaderboard.css';

const Leaderboard = () => {
  const navigate = useNavigate();
  const { leaderboard, loadLeaderboard, loading } = useQuizStore();
  const { userLogged } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    loadLeaderboard(100); // Cargar top 100
  }, [loadLeaderboard]);

  // Calcular elementos de la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = leaderboard.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(leaderboard.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getRankClass = (rank) => {
    switch (rank) {
      case 1: return 'first-place';
      case 2: return 'second-place';
      case 3: return 'third-place';
      default: return '';
    }
  };

  const isCurrentUser = (entry) => {
    return userLogged && entry.firebaseUID === userLogged.uid;
  };

  if (loading) {
    return (
      <div className="leaderboard-container">
        <div className="loading-spinner">
          <h2>Cargando tabla de posiciones...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h1 className="leaderboard-title">🏆 Tabla de Posiciones</h1>
        <p className="leaderboard-subtitle">
          Mejores puntajes del quiz de Glaucoma
        </p>
        
        <div className="header-actions">
          <button 
            className="btn-back"
            onClick={() => navigate('/quiz')}
          >
            ← Volver al Quiz
          </button>
          <button 
            className="btn-podium"
            onClick={() => navigate('/quiz/cuestionario/medallero')}
          >
            🏆 Ver Podio 3D
          </button>
        </div>
      </div>

      {leaderboard.length === 0 ? (
        <div className="empty-leaderboard">
          <h3>¡Aún no hay participantes!</h3>
          <p>Sé el primero en completar el quiz y aparecer en la tabla.</p>
          <button 
            className="btn-play"
            onClick={() => navigate('/quiz/cuestionario')}
          >
            Jugar Ahora
          </button>
        </div>
      ) : (
        <>
          <div className="leaderboard-stats">
            <div className="stat-card">
              <h3>{leaderboard.length}</h3>
              <p>Jugadores Totales</p>
            </div>
            <div className="stat-card">
              <h3>{leaderboard[0]?.bestScore || 0}</h3>
              <p>Mejor Puntaje</p>
            </div>
            <div className="stat-card">
              <h3>{Math.round(leaderboard.reduce((acc, curr) => acc + curr.bestScore, 0) / leaderboard.length) || 0}</h3>
              <p>Promedio</p>
            </div>
          </div>

          <div className="leaderboard-table-container">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Posición</th>
                  <th>Jugador</th>
                  <th>Puntaje</th>
                  <th>Correctas</th>
                  <th>Incorrectas</th>
                  <th>Tiempo</th>
                  <th>Última actualización</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((entry, index) => {
                  const actualRank = indexOfFirstItem + index + 1;
                  return (
                    <tr 
                      key={entry._id}
                      className={`
                        ${getRankClass(actualRank)} 
                        ${isCurrentUser(entry) ? 'current-user' : ''}
                      `}
                    >
                      <td className="rank-cell">
                        <span className="rank-icon">
                          {getRankIcon(actualRank)}
                        </span>
                      </td>
                      <td className="player-cell">
                        <div className="player-info">
                          <span className="player-name">
                            {entry.displayName}
                            {isCurrentUser(entry) && (
                              <span className="you-badge">¡Tú!</span>
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="score-cell">
                        <span className="score-value">{entry.bestScore}</span>
                      </td>
                      <td className="correct-cell">
                        <span className="correct-count">
                          ✅ {entry.correctAnswers}
                        </span>
                      </td>
                      <td className="incorrect-cell">
                        <span className="incorrect-count">
                          ❌ {entry.incorrectAnswers}
                        </span>
                      </td>
                      <td className="time-cell">
                        {entry.completionTime > 0 ? (
                          <span className="completion-time">
                            ⏱️ {entry.completionTime}s
                          </span>
                        ) : (
                          <span className="no-time">-</span>
                        )}
                      </td>
                      <td className="date-cell">
                        <span className="update-date">
                          {new Date(entry.updatedAt).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ← Anterior
              </button>
              
              <div className="page-numbers">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <button
                      key={pageNumber}
                      className={`page-btn ${currentPage === pageNumber ? 'active' : ''}`}
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>
              
              <button 
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Siguiente →
              </button>
            </div>
          )}

          {/* Información del usuario actual */}
          {userLogged && (
            <div className="current-user-info">
              <h3>Tu Posición Actual</h3>
              {(() => {
                const userEntry = leaderboard.find(entry => entry.firebaseUID === userLogged.uid);
                if (userEntry) {
                  const userRank = leaderboard.findIndex(entry => entry.firebaseUID === userLogged.uid) + 1;
                  return (
                    <div className="user-stats">
                      <div className="user-stat">
                        <strong>Posición:</strong> #{userRank}
                      </div>
                      <div className="user-stat">
                        <strong>Mejor Puntaje:</strong> {userEntry.bestScore}
                      </div>
                      <div className="user-stat">
                        <strong>Respuestas Correctas:</strong> {userEntry.correctAnswers}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="no-user-data">
                      <p>Aún no has completado el quiz.</p>
                      <button 
                        className="btn-play"
                        onClick={() => navigate('/quiz/cuestionario')}
                      >
                        ¡Empieza a Jugar!
                      </button>
                    </div>
                  );
                }
              })()}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Leaderboard;