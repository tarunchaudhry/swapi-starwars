import { useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import Grid from '@/components/Grid';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import {
  setFavoriteData,
  unsetFavoriteData,
} from '../redux/favorite/favorite.slice';
// Redux
import {
  fetchCharacterData,
  fetchPlanetData,
} from '../redux/global/global.slice';

type IndexProps = {
  actions: any;
  globalData: any;
  favoriteData: any;
};

const Index = ({ actions, globalData, favoriteData }: IndexProps) => {
  const [page, setPage] = useState(1);
  const { isLoading } = globalData;

  const getData = (pageNum: number) => {
    actions.fetchCharacterData(pageNum);
  };

  useLayoutEffect(() => {
    actions.fetchPlanetData({
      callBack: () => {
        getData(page);
      },
    });
  }, [actions]);

  const onPreviousPage = () => {
    setPage(page - 1);
    getData(page - 1);
  };
  const onNextPage = () => {
    setPage(page + 1);
    getData(page + 1);
  };

  return (
    <Main
      isLoading={isLoading}
      meta={
        <Meta
          title="Swapi StartWars"
          description="Project for swapi api star wars"
        />
      }
    >
      <div className="mb-8 mt-3 flex justify-center">
        <input
          type="text"
          placeholder="Type here"
          className="input-bordered input w-full max-w-xs"
        />
      </div>
      <Grid
        title={`Character List`}
        actions={actions}
        globalData={globalData}
        favoriteData={favoriteData}
      />
      <div className="pagination-wrap btn-group grid grid-cols-2 py-8">
        <button className="btn" onClick={onPreviousPage} disabled={page < 2}>
          Previous page
        </button>
        <button className="btn" onClick={onNextPage}>
          Next
        </button>
      </div>
    </Main>
  );
};

const mapStateToProps = ({ globalData, favoriteData }: any) => ({
  globalData,
  favoriteData,
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(
    {
      fetchCharacterData,
      fetchPlanetData,
      setFavoriteData,
      unsetFavoriteData,
    },
    dispatch
  ),
});
export default connect(mapStateToProps, mapDispatchToProps)(Index);
