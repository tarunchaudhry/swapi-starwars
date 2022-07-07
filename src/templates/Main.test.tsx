import { render, screen, within } from '@testing-library/react';

import { Main } from './Main';

describe('Main template', () => {
  describe('Render method', () => {
    it('should have 3 menu items', () => {
      render(
        <Main isLoading={false} meta={null}>
          {null}
        </Main>
      );

      const menuItemList = screen.getByTestId('menu-list');
      const logoElm = screen.getByTestId('logo');
      expect(logoElm).toBeInTheDocument();
      expect(menuItemList).toBeInTheDocument();
      const links = screen.getAllByTestId('links');
      expect(links).toHaveLength(2);
      expect(within(links[0]).getByText('Home')).toHaveAttribute('href', '/');
      expect(within(links[1]).getByText('Favorite')).toHaveAttribute(
        'href',
        '/favorite'
      );
    });
  });
});
