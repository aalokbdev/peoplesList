import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../pagination';

test('should render pagination buttons and handle page change', () => {
  const onPageChange = jest.fn();

  render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);

  const nextButton = screen.getByText('Next');
  fireEvent.click(nextButton);

  // Check if the onPageChange function is called
  expect(onPageChange).toHaveBeenCalledWith(2);

  const prevButton = screen.getByText('Previous');
  fireEvent.click(prevButton);

  // Check if the onPageChange function is called again
  expect(onPageChange).toHaveBeenCalledWith(1);
});
