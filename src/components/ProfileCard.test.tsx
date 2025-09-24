import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProfileCard } from './ProfileCard';
import type { Employee } from '../types';

const mockEmployee: Employee = {
  id: 'emp-1024',
  name: 'Ayesha Khan',
  role: 'Frontend Engineer',
  department: 'Engineering',
  phone: '+923001112223',
  email: 'ayesha.khan@example.com',
  avatarUrl: 'https://i.pravatar.cc/150?img=47',
  location: 'Karachi',
  joinedOn: '2022-03-14'
};

describe('ProfileCard', () => {
  it('renders employee information', () => {
    const onUpdate = vi.fn();
    render(<ProfileCard employee={mockEmployee} onUpdate={onUpdate} />);
    
    expect(screen.getByText('Ayesha Khan')).toBeInTheDocument();
    expect(screen.getByText('Frontend Engineer')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
  });

  it('opens edit form when edit button is clicked', () => {
    const onUpdate = vi.fn();
    render(<ProfileCard employee={mockEmployee} onUpdate={onUpdate} />);
    
    const editButton = screen.getByText('Edit Profile');
    fireEvent.click(editButton);
    
    expect(screen.getByText('Save Changes')).toBeInTheDocument();
  });

  it('validates phone number', () => {
    const onUpdate = vi.fn();
    render(<ProfileCard employee={mockEmployee} onUpdate={onUpdate} />);
    
    fireEvent.click(screen.getByText('Edit Profile'));
    
    const phoneInput = screen.getByLabelText('Phone');
    fireEvent.change(phoneInput, { target: { value: 'invalid' } });
    
    const saveButton = screen.getByText('Save Changes');
    fireEvent.click(saveButton);
    
    expect(screen.getByText('Invalid phone number')).toBeInTheDocument();
    expect(onUpdate).not.toHaveBeenCalled();
  });
});