/* eslint-disable jest/no-mocks-import */
import { render, screen } from '@testing-library/react';

// Th
import { Favorite } from '@/pages/favorite';

// MockData
// @ts-ignore
import FavoriteData from '../../__mocks__/data/favoriteData';
// @ts-ignore
import GlobaData from '../../__mocks__/data/globalData';

// The easiest solution to mock `next/router`: https://github.com/vercel/next.js/issues/7479
// The mock has been moved to `__mocks__` folder to avoid duplication

describe('Favorite page should render', () => {
  describe('Render method', () => {
    const actions = {};

    it('should have render with favorite data`', () => {
      render(
        <Favorite
          actions={actions}
          globalData={GlobaData}
          favoriteData={FavoriteData}
        />
      );
      const { listFavorite } = FavoriteData;
      const heading = screen.getByText(`Favorite Character List`);
      expect(heading).toBeInTheDocument();
      const dateOfBirth = screen.getByText(
        `Birth Year: ${listFavorite[0].birth_year}`
      );
      const viewButton = screen.getAllByText(`View Details`);
      expect(viewButton).toHaveLength(listFavorite.length);
      expect(viewButton[0]).toBeInTheDocument();
      expect(dateOfBirth).toBeInTheDocument();
      const viewALink = screen.getAllByTestId(`view-details-card`);
      expect(viewALink).toHaveLength(listFavorite.length);
    });
  });
});
