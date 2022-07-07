import { render, screen } from '@testing-library/react';

import NotFound from '@/components/NotFound';

// The easiest solution to mock `next/router`: https://github.com/vercel/next.js/issues/7479
// The mock has been moved to `__mocks__` folder to avoid duplication

describe('Index page', () => {
  describe('Render method', () => {
    it('should have h1 tag', () => {
      const text = 'Data not found';
      render(<NotFound text={text} />);

      const heading = screen.getByText(text);
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(text);
    });
  });
});
