import React from 'react';

export default function PuntoCard({ punto }) {
  return (
    <div className="punto-card">
      <h4>{punto.nombre}</h4>
      <p><strong>Sector:</strong> {punto.sector}</p>
      <p><strong>Material:</strong> <span className="badge-material">{punto.material}</span></p>
      <p><strong>Capacidad:</strong> {punto.capacidad} Litros</p>
    </div>
  );
}