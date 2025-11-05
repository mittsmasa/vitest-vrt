import React from 'react'

interface CardProps {
  title: string
  description: string
}

export function Card({ title, description }: CardProps) {
  return (
    <div
      data-testid="card"
      style={{
        background: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
      }}
    >
      <h3
        style={{
          color: '#667eea',
          marginBottom: '12px',
          fontSize: '24px',
        }}
      >
        {title}
      </h3>
      <p style={{ color: '#666' }}>{description}</p>
    </div>
  )
}
