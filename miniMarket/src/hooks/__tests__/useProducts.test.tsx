import { renderHook, waitFor } from '@testing-library/react';
import { useProducts } from '../useProducts';
import * as fetchProducts from '../../proxy/fetchProducts';

jest.mock('../../proxy/fetchProducts', () => ({
  fetchProducts: jest.fn(),
}));

describe('useProducts', () => {
  it('should load products', async () => {
    const mockProducts = [{ id: 1, name: 'Product 1' }];
    (fetchProducts.fetchProducts as jest.Mock).mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => result.current.products.length > 0);
    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.loading).toBe(false);
  });

  it('should handle error loading products', async () => {
    (fetchProducts.fetchProducts as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

    const { result } = renderHook(() => useProducts());

    await waitFor(() => result.current.error);

    expect(result.current.error).toBe('Error loading products');
    expect(result.current.loading).toBe(false);
  });
});