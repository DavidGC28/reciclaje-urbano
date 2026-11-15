import React, { useState, useEffect } from 'react';
import PuntoCard from './PuntoCard';
import './App.css';

export default function App() {
  const [puntos, setPuntos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    sector: '',
    material: '',
    capacidad: ''
  });

  const fetchPuntos = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/puntos');
      const data = await response.json();
      setPuntos(data);
    } catch (error) {
      console.error('Error al obtener los puntos:', error);
    }
  };

  useEffect(() => {
    fetchPuntos();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/puntos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          capacidad: Number(formData.capacidad)
        })
      });

      if (response.ok) {
        setFormData({ nombre: '', sector: '', material: '', capacidad: '' });
        fetchPuntos();
      } else {
        console.error('Error al guardar el punto');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div>
      {/* Barra superior temática */}
      <div className="eco-header-bar">
        <span>♻️ Red Verde Urbana — Sistema de Gestión Sostenible</span>
        <span>Panel de Control</span>
      </div>

      <div className="container">
        {/* Formulario Redondeado */}
        <div className="eco-card">
          <h2 className="eco-title">🌿 Registrar Nuevo Punto de Reciclaje</h2>
          
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group full-width">
              <label>Nombre del Punto</label>
              <input
                type="text"
                name="nombre"
                placeholder="Ej. EcoEstación La Floresta"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Sector</label>
              <input
                type="text"
                name="sector"
                placeholder="Ej. Centro Norte"
                value={formData.sector}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Material</label>
              <input
                type="text"
                name="material"
                placeholder="Ej. Plástico, Vidrio, Papel"
                value={formData.material}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Capacidad (Litros)</label>
              <input
                type="number"
                name="capacidad"
                placeholder="Ej. 200"
                value={formData.capacidad}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-eco">
              Registrar Punto
            </button>
          </form>
        </div>

        {/* Directorio con tarjetas modernas */}
        <div className="eco-card">
          <h2 className="eco-title">📍 Puntos de Reciclaje Disponibles</h2>
          
          {puntos.length === 0 ? (
            <p style={{ color: '#8c7a6b', textAlign: 'center', padding: '20px 0' }}>
              Aún no hay puntos registrados en el sistema.
            </p>
          ) : (
            <div className="grid-tarjetas">
              {puntos.map((punto) => (
                <PuntoCard key={punto.id} punto={punto} />
              ))}
            </div>
          )}
        </div>

        {/* Pie de página */}
        <footer className="eco-footer">
          <p>Comprometidos con el desarrollo sostenible y el cuidado ambiental.</p>
        </footer>
      </div>
    </div>
  );
}