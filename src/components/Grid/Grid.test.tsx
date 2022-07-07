/* eslint-disable jest/no-mocks-import */
import { fireEvent, render, screen, within } from '@testing-library/react';

import Grid from '@/components/Grid';

// MockData
// @ts-ignore
import FavoriteData from '../../../__mocks__/data/favoriteData';
// @ts-ignore
import GlobaData from '../../../__mocks__/data/globalData';

// The easiest solution to mock `next/router`: https://github.com/vercel/next.js/issues/7479
// The mock has been moved to `__mocks__` folder to avoid duplication

describe('Grid Component', () => {
  const actions = {
    unsetFavoriteData: jest.fn(),
    setFavoriteData: jest.fn(),
  };

  it('should have title text in ui with favorite icon', () => {
    render(
      <Grid
        actions={actions}
        globalData={GlobaData}
        favoriteData={FavoriteData}
        title={`Grid Title`}
      />
    );
    const heading = screen.getByRole('heading', {
      name: /Grid Title/,
    });
    const favoriteIcon = screen.getAllByTestId('heart-icon');
    expect(heading).toBeInTheDocument();
    fireEvent.click(favoriteIcon[0]);
    expect(actions.unsetFavoriteData).toBeCalled();
    expect(favoriteIcon).toHaveLength(GlobaData?.list?.data.length);
  });

  it('should have render the data from api', () => {
    render(
      <Grid
        actions={actions}
        globalData={GlobaData}
        favoriteData={FavoriteData}
        title={`Grid Title`}
      />
    );
    const {
      list: { data },
    } = GlobaData;
    const firstCharacter = screen.getByText(`Name: ${data[0].name}`);
    const firstCharGender = screen.getAllByText(`Gender: ${data[0].gender}`);
    expect(firstCharacter).toBeInTheDocument();
    expect(firstCharGender[0]).toBeInTheDocument();
  });

  it('should have viewDetails button', () => {
    render(
      <Grid
        actions={actions}
        globalData={GlobaData}
        favoriteData={FavoriteData}
        title={`Grid Title`}
      />
    );
    const {
      list: { data },
    } = GlobaData;
    const viewButton = screen.getAllByText(`View Details`);
    expect(viewButton).toHaveLength(data.length);
    expect(viewButton[0]).toBeInTheDocument();
    const viewALink = screen.getAllByTestId(`view-details-card`);
    const gender = within(viewALink[0]).getByText(`Gender: ${data[0].gender}`);
    expect(gender).toBeInTheDocument();
  });

  it('should have render no data found card', () => {
    render(
      <Grid
        actions={actions}
        globalData={{ list: { data: [] } }}
        favoriteData={FavoriteData}
        title={`Grid Title`}
      />
    );
    const notFound = screen.getByTestId('not-found-text');
    expect(notFound).toBeInTheDocument();
    expect(notFound).toHaveTextContent('No Data Found');
  });
});
