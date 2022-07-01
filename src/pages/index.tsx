import _debounce from 'lodash/debounce';
import { useCallback, useLayoutEffect, useState } from 'react';
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
  const [search, setSearch] = useState('');
  const {
    isLoading,
    planets,
    list: { next },
  } = globalData;

  const getData = (pageNum: number, searchText: string) => {
    const req = {
      searchText,
      pageNum,
    };
    actions.fetchCharacterData(req);
  };

  useLayoutEffect(() => {
    if (planets && planets.length) {
      getData(page, search);
    } else {
      actions.fetchPlanetData({
        callBack: () => {
          getData(page, search);
        },
      });
    }
  }, [actions]);

  const onPreviousPage = () => {
    setPage(page - 1);
    getData(page - 1, search);
  };
  const onNextPage = () => {
    setPage(page + 1);
    getData(page + 1, search);
  };
  const debounceFn = useCallback(_debounce(getData, 800), []);
  const handleSearch = (event: any) => {
    setSearch(event.target.value);
    debounceFn(page, event.target.value);
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
          value={search}
          onChange={handleSearch}
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
        <button className="btn" disabled={!next} onClick={onNextPage}>
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
