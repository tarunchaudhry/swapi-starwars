/* eslint-disable jest/no-mocks-import */
import { fireEvent, render, screen } from '@testing-library/react';

// Th
import { Index } from '@/pages/index';

// MockData
// @ts-ignore
import FavoriteData from '../../__mocks__/data/favoriteData';
// @ts-ignore
import GlobaData from '../../__mocks__/data/globalData';

// The easiest solution to mock `next/router`: https://github.com/vercel/next.js/issues/7479
// The mock has been moved to `__mocks__` folder to avoid duplication

describe('Home page should render', () => {
  const actions = {
    fetchCharacterData: jest.fn(),
    fetchPlanetData: jest.fn(),
    setFavoriteData: jest.fn(),
    unsetFavoriteData: jest.fn(),
  };

  it('should have list of characters with favorite btn', () => {
    render(
      <Index
        actions={actions}
        globalData={GlobaData}
        favoriteData={FavoriteData}
      />
    );
    const {
      list: { data },
    } = GlobaData;
    const favoriteIcon = screen.getAllByTestId('heart-icon');
    expect(favoriteIcon[3]).toBeInTheDocument();
    fireEvent.click(favoriteIcon[3]);
    expect(actions.setFavoriteData).toBeCalled();
    const cards = screen.getAllByTestId('view-details-card');
    expect(cards).toHaveLength(data.length);
  });

  it('should have search input', () => {
    render(
      <Index
        actions={actions}
        globalData={GlobaData}
        favoriteData={FavoriteData}
      />
    );
    const searchInput = screen.getByPlaceholderText('Type here');
    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: 'Luke Skywalker' } });
    expect(actions.fetchCharacterData).toHaveBeenCalled();
  });

  it('should have pagination', () => {
    render(
      <Index
        actions={actions}
        globalData={GlobaData}
        favoriteData={FavoriteData}
      />
    );
    const previousBtn = screen.getByText('Previous page');
    const nextButton = screen.getByText('Next');
    expect(previousBtn).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(actions.fetchCharacterData).toBeCalled();
    fireEvent.click(previousBtn);
    expect(actions.fetchCharacterData).toBeCalled();
  });
});
