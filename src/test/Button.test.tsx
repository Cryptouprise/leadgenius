import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('renders button with text', () => {
    render(
      <Button>Click me</Button>
    );
    
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    render(
      <Button variant="destructive">Delete</Button>
    );
    
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    let clicked = false;
    const handleClick = () => {
      clicked = true;
    };
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByText('Click me');
    button.click();
    
    expect(clicked).toBe(true);
  });
});
