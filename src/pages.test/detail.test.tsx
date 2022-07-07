/* eslint-disable jest/no-mocks-import */
import { fireEvent, render, screen } from '@testing-library/react';

import { Details } from '@/pages/details/[name]';
import { capitaliseString, getPlanetName } from '@/utils/helpers';

// Th
// MockData
// @ts-ignore
import FavoriteData from '../../__mocks__/data/favoriteData';
// @ts-ignore
import GlobaData from '../../__mocks__/data/globalData';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

// The easiest solution to mock `next/router`: https://github.com/vercel/next.js/issues/7479
// The mock has been moved to `__mocks__` folder to avoid duplication

describe('Details page should render', () => {
  const useRouter = jest.spyOn(require('next/router'), 'useRouter');

  useRouter.mockImplementation(() => ({
    route: '/',
    pathname: '',
    query: { name: 'Luke%20Skywalker' },
    asPath: '',
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
    beforePopState: jest.fn(() => null),
    prefetch: jest.fn(() => null),
  }));

  const actions = {
    unsetFavoriteData: jest.fn(),
    setFavoriteData: jest.fn(),
    getPersonDetails: jest.fn(),
  };

  it('should have renders with favorite', () => {
    render(
      <Details
        actions={actions}
        globalData={GlobaData}
        favoriteData={FavoriteData}
      />
    );
    const favoriteBtn = screen.getByTestId('favorite-btn');
    fireEvent.click(favoriteBtn);
    expect(actions.getPersonDetails).toHaveBeenCalled();
    expect(actions.unsetFavoriteData).toHaveBeenCalled();
    expect(favoriteBtn).toBeInTheDocument();
  });

  it('should have renders deatils of character', () => {
    render(
      <Details
        actions={actions}
        globalData={GlobaData}
        favoriteData={FavoriteData}
      />
    );
    const {
      list: { data },
      planets,
    } = GlobaData;
    const userName = screen.getByText(data[0].name);
    const gender = screen.getByText(capitaliseString(data[0].gender));
    const eyeColor = screen.getByText(capitaliseString(data[0].eye_color));
    const homePlanet = screen.getByText(
      getPlanetName(data[0].homeworld, planets)
    );
    // const userName = screen.getByText(data[0].name);
    expect(userName).toBeInTheDocument();
    expect(gender).toBeInTheDocument();
    expect(eyeColor).toBeInTheDocument();
    expect(homePlanet).toBeInTheDocument();
  });
});
