import { render, screen } from '@testing-library/react';

import Loader from '@/components/Loader';

// The easiest solution to mock `next/router`: https://github.com/vercel/next.js/issues/7479
// The mock has been moved to `__mocks__` folder to avoid duplication

describe('Index page', () => {
  it('should have loader in ui', () => {
    render(<Loader loading={true} noDelay={true} />);
    const element = screen.getByTestId('custom-loader');
    expect(element).toBeInTheDocument();
  });
});
