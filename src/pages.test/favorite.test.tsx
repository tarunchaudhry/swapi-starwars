import { render, screen } from '@testing-library/react';

import Favorite from '@/pages/favorite';

// The easiest solution to mock `next/router`: https://github.com/vercel/next.js/issues/7479
// The mock has been moved to `__mocks__` folder to avoid duplication

describe('Favorite page', () => {
  describe('Render method', () => {
    it('should have two paragraphs list', () => {
      render(<Favorite />);

      const paragraph = screen.getAllByText(/Lorem ipsum/);

      expect(paragraph).toHaveLength(2);
    });
  });
});
