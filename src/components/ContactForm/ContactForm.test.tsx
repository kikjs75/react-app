import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import ContactForm from './ContactForm';

describe('ContactForm', () => {
  it('renders name and phone inputs', () => {
    render(<ContactForm onSubmit={() => {}} />);
    expect(screen.getByLabelText('이름')).toBeInTheDocument();
    expect(screen.getByLabelText('전화번호')).toBeInTheDocument();
  });

  it('calls onSubmit with contact data', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(<ContactForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText('이름'), '홍길동');
    await user.type(screen.getByLabelText('전화번호'), '010-1234-5678');
    await user.click(screen.getByRole('button', { name: '등록' }));

    expect(handleSubmit).toHaveBeenCalledOnce();
    expect(handleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: '홍길동',
        phone: '010-1234-5678',
      }),
    );
  });

  it('does not submit when fields are empty', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(<ContactForm onSubmit={handleSubmit} />);
    await user.click(screen.getByRole('button', { name: '등록' }));

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('clears inputs after submit', async () => {
    const user = userEvent.setup();

    render(<ContactForm onSubmit={() => {}} />);

    const nameInput = screen.getByLabelText('이름');
    const phoneInput = screen.getByLabelText('전화번호');

    await user.type(nameInput, '홍길동');
    await user.type(phoneInput, '010-1234-5678');
    await user.click(screen.getByRole('button', { name: '등록' }));

    expect(nameInput).toHaveValue('');
    expect(phoneInput).toHaveValue('');
  });
});
