// Libraries
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import Grid from '@/components/Grid';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

// Redux
import {
  setFavoriteData,
  unsetFavoriteData,
} from '../redux/favorite/favorite.slice';

type FavoriteProps = {
  actions: any;
  globalData: any;
  favoriteData: any;
};

const Favorite = ({ actions, globalData, favoriteData }: FavoriteProps) => {
  const { planets, isLoading } = globalData;
  const { listFavorite } = favoriteData;

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
      <Grid
        title={`Favorite Character List`}
        actions={actions}
        globalData={{ list: { data: listFavorite || [] }, planets }}
        favoriteData={favoriteData}
      />
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
      setFavoriteData,
      unsetFavoriteData,
    },
    dispatch
  ),
});
export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
