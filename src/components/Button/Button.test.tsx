import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Button from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>클릭</Button>);
    expect(screen.getByRole('button', { name: '클릭' })).toBeInTheDocument();
  });

  it('applies variant and size classes', () => {
    render(<Button variant="danger" size="lg">삭제</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn btn-danger btn-lg');
  });

  it('applies default classes when no props given', () => {
    render(<Button>기본</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn btn-primary btn-md');
  });

  it('passes extra props to the button element', () => {
    render(<Button disabled>비활성</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
