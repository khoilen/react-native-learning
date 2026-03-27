import { formatPrice } from './format-price';

const setup = (amount: number) => formatPrice(amount).replace(/\u00a0/g, ' ');

describe('formatPrice', () => {
  it('formats a whole number correctly as USD', () => {
    const result = setup(150);
    expect(result).toBe('$150.00');
  });

  it('formats a decimal number correctly', () => {
    const result = setup(99.99);
    expect(result).toBe('$99.99');
  });

  it('formats zero correctly', () => {
    const result = setup(0);
    expect(result).toBe('$0.00');
  });

  it('formats negative numbers correctly', () => {
    const result = setup(-50);
    expect(result).toBe('-$50.00');
  });

  it('formats large numbers with commas', () => {
    const result = setup(1000000);
    expect(result).toBe('$1,000,000.00');
  });
});
