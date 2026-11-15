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
    <div className="container">
      <h2>🌱 Gestión de Puntos de Reciclaje</h2>

      {/* Formulario Estilizado */}
      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-group full-width">
          <label>Nombre del Punto</label>
          <input
            type="text"
            name="nombre"
            placeholder="Ej. EcoEstación Norte"
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
            placeholder="Ej. La Mariscal"
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
            placeholder="Ej. Plástico / Papel"
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
            placeholder="Ej. 150"
            value={formData.capacidad}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-submit">
          Registrar Punto de Reciclaje
        </button>
      </form>

      {/* Listado de Tarjetas */}
      <h2>Puntos Registrados</h2>
      {puntos.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#777' }}>No hay puntos de reciclaje registrados todavía.</p>
      ) : (
        <div className="grid-tarjetas">
          {puntos.map((punto) => (
            <PuntoCard key={punto.id} punto={punto} />
          ))}
        </div>
      )}
    </div>
  );
}