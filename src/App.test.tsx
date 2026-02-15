import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
    it('should render without crashing', () => {
        render(<App />)
        expect(screen.getByText('Bienvenue sur GloTrush')).toBeInTheDocument()
    })

    it('should display home page content', () => {
        render(<App />)
        expect(screen.getByText(/La plateforme moderne/i)).toBeInTheDocument()
    })
})
