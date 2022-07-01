// Libraries
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
// Utils
import { capitaliseString, getPlanetName, isFavorite } from '@/utils/helpers';

// Redux
import {
  setFavoriteData,
  unsetFavoriteData,
} from '../../redux/favorite/favorite.slice';
import { getPersonDetails } from '../../redux/global/global.slice';

type IndexProps = {
  actions: any;
  globalData: any;
  favoriteData: any;
};

const Details = ({ actions, globalData, favoriteData }: IndexProps) => {
  const router = useRouter();
  const { listFavorite } = favoriteData;
  const {
    isLoading,
    userDetails: { userData, filmsValues, starShipValues },
    planets,
  } = globalData;
  useEffect(() => {
    if (router.query.name) {
      actions.getPersonDetails(router.query.name);
    }
  }, [router.query.name]);

  const handleFavorite = (items: any) => {
    if (isFavorite(items.name, listFavorite)) {
      actions.unsetFavoriteData(items.name);
    } else {
      actions.setFavoriteData(items);
    }
  };

  return (
    <Main
      isLoading={isLoading}
      meta={<Meta title="Detail Page" description="detail page section" />}
    >
      {userData && (
        <div className="card mx-auto w-5/6 bg-base-100 shadow-xl">
          <div className="absolute top-1 right-1 z-10">
            <button
              onClick={() => handleFavorite(userData)}
              className="btn btn-ghost"
            >
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                className={
                  isFavorite(userData.name, listFavorite) && `fill-red-500`
                }
              >
                <title>heart_like</title>
                <path d="M22.837 3.727c3.785 0 6.85 3.064 6.85 6.842 0 6.842-6.85 10.738-13.691 17.579-6.842-6.842-13.684-10.738-13.684-17.579 0-3.777 3.065-6.842 6.842-6.842 3.421 0 5.131 1.711 6.842 5.131 1.71-3.421 3.421-5.131 6.841-5.131z"></path>
              </svg>
            </button>
          </div>
          <div className="card-body">
            <h2 className="card-title justify-center pl-2 text-3xl">
              {userData.name}
            </h2>
            <ul className="flex w-full flex-col divide-y">
              <li className="flex flex-row">
                <div className="flex flex-1 cursor-pointer select-none items-center py-4">
                  <div className="flex-1 ">
                    <div className="text-xl font-bold dark:text-white">
                      Hair Color
                    </div>
                  </div>
                  <div className="flex flex-row justify-center">
                    <div className="text-xl text-gray-600 dark:text-gray-200">
                      {capitaliseString(userData.hair_color)}
                    </div>
                  </div>
                </div>
              </li>
              <li className="flex flex-row">
                <div className="flex flex-1 cursor-pointer select-none items-center py-4">
                  <div className="flex-1 ">
                    <div className="text-xl font-bold dark:text-white">
                      Eye Color
                    </div>
                  </div>
                  <div className="flex flex-row justify-center">
                    <div className="text-xl text-gray-600 dark:text-gray-200">
                      {capitaliseString(userData.eye_color)}
                    </div>
                  </div>
                </div>
              </li>
              <li className="flex flex-row">
                <div className="flex flex-1 cursor-pointer select-none items-center py-4">
                  <div className="flex-1 ">
                    <div className="text-xl font-bold dark:text-white">
                      Gender
                    </div>
                  </div>
                  <div className="flex flex-row justify-center">
                    <div className="text-xl text-gray-600 dark:text-gray-200">
                      {capitaliseString(userData.gender)}
                    </div>
                  </div>
                </div>
              </li>
              <li className="flex flex-row">
                <div className="flex flex-1 cursor-pointer select-none items-center py-4">
                  <div className="flex-1 ">
                    <div className="text-xl font-bold dark:text-white">
                      Home Planet
                    </div>
                  </div>
                  <div className="flex flex-row justify-center">
                    <div className="text-xl text-gray-600 dark:text-gray-200">
                      {getPlanetName(userData.homeworld, planets)}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div className="grid grid-cols-2 gap-4">
              <div className="pl-0">
                <h2 className="card-title mb-3 text-xl">Movies</h2>
                <ul>
                  {filmsValues && filmsValues.length <= 0 ? (
                    <li className="relative mb-3 flex text-gray-900">
                      Not Films Found
                    </li>
                  ) : (
                    filmsValues.map((items: any) => (
                      <li
                        className="relative mb-3 flex text-gray-900"
                        key={items.title}
                      >
                        {items.title}
                      </li>
                    ))
                  )}
                </ul>
              </div>
              <div className="pl-4">
                <h2 className="card-title mb-3 text-xl">Starships</h2>
                <ul>
                  {starShipValues && starShipValues.length <= 0 ? (
                    <li className="relative mb-3 flex text-gray-900">
                      Not Starships Found
                    </li>
                  ) : (
                    starShipValues.map((items: any) => (
                      <li
                        className="relative mb-3 flex text-gray-900"
                        key={items.name}
                      >
                        {items.name}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
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
      getPersonDetails,
    },
    dispatch
  ),
});
export default connect(mapStateToProps, mapDispatchToProps)(Details);
