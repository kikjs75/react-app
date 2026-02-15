import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ContactList from './ContactList';

describe('ContactList', () => {
  it('shows empty message when no contacts', () => {
    render(<ContactList contacts={[]} />);
    expect(screen.getByText('등록된 연락처가 없습니다.')).toBeInTheDocument();
  });

  it('renders contacts in a table', () => {
    const contacts = [
      { id: 1, name: '홍길동', phone: '010-1234-5678' },
      { id: 2, name: '김철수', phone: '010-9876-5432' },
    ];

    render(<ContactList contacts={contacts} />);

    expect(screen.getByText('홍길동')).toBeInTheDocument();
    expect(screen.getByText('010-1234-5678')).toBeInTheDocument();
    expect(screen.getByText('김철수')).toBeInTheDocument();
    expect(screen.getByText('010-9876-5432')).toBeInTheDocument();
  });

  it('does not show empty message when contacts exist', () => {
    const contacts = [{ id: 1, name: '홍길동', phone: '010-1234-5678' }];

    render(<ContactList contacts={contacts} />);
    expect(screen.queryByText('등록된 연락처가 없습니다.')).not.toBeInTheDocument();
  });
});
