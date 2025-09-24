import { describe, it, expect } from 'vitest';
import { formatTime, validatePhone, validateName } from './helpers';

describe('Helper Functions', () => {
  describe('formatTime', () => {
    it('should format minutes to hours and minutes', () => {
      expect(formatTime(125)).toBe('2h 5m');
      expect(formatTime(60)).toBe('1h 0m');
      expect(formatTime(45)).toBe('0h 45m');
    });
  });

  describe('validatePhone', () => {
    it('should validate phone numbers correctly', () => {
      expect(validatePhone('+923001112223')).toBe(true);
      expect(validatePhone('03001112223')).toBe(true);
      expect(validatePhone('abc123')).toBe(false);
      expect(validatePhone('123')).toBe(false);
    });
  });

  describe('validateName', () => {
    it('should validate names correctly', () => {
      expect(validateName('John Doe')).toBe(true);
      expect(validateName('A')).toBe(false);
      expect(validateName('')).toBe(false);
      expect(validateName('  ')).toBe(false);
    });
  });
});