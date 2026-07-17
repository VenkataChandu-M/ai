import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

describe('Card Component (Enterprise UI)', () => {
  it('renders correctly with given text content', () => {
    render(
      <Card data-testid="test-card">
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Testing the content rendering</p>
        </CardContent>
      </Card>
    )

    expect(screen.getByText('Total Revenue')).toBeInTheDocument()
    expect(screen.getByText('Testing the content rendering')).toBeInTheDocument()
    
    // Check if correct styles are applied via utils cn()
    const cardElement = screen.getByTestId('test-card')
    expect(cardElement).toHaveClass('rounded-xl', 'border', 'bg-card', 'text-card-foreground', 'shadow')
  })
})
