import React from 'react';

export default function PuntoCard({ punto }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      margin: '10px 0',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
      <h3>{punto.nombre}</h3>
      <p><strong>Sector:</strong> {punto.sector}</p>
      <p><strong>Material:</strong> {punto.material}</p>
      <p><strong>Capacidad:</strong> {punto.capacidad} L</p>
    </div>
  );
}