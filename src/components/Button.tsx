import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}

export function Button({ children, variant = 'primary' }: ButtonProps) {
  const styles: React.CSSProperties = {
    display: 'inline-block',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 600,
    backgroundColor: variant === 'primary' ? '#667eea' : '#718096',
    color: 'white',
    transition: 'transform 0.2s, box-shadow 0.2s',
  }

  return (
    <button data-testid="button" style={styles}>
      {children}
    </button>
  )
}
