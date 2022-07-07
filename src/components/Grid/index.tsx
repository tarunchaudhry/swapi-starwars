// Libraries
import Link from 'next/link';

// Components
import NotFound from '@/components/NotFound';

// Utils
import { getPlanetName, isFavorite } from '../../utils/helpers';

type GridProps = {
  actions: any;
  globalData: any;
  favoriteData: any;
  title: string;
};

const Grid = ({ actions, globalData, favoriteData, title }: GridProps) => {
  const { list, planets } = globalData;
  const { listFavorite } = favoriteData;

  const handleFavorite = (items: any) => {
    // For handling the select and unselect of favorites.
    if (isFavorite(items.name, listFavorite)) {
      actions.unsetFavoriteData(items.name);
    } else {
      actions.setFavoriteData(items);
    }
  };
  return (
    <>
      <h2 className="mx-0 mt-3 mb-8 text-3xl text-base-300">{title}</h2>
      <ul className="grid grid-cols-3 gap-4 ">
        {list && list?.data?.length <= 0 && <NotFound text="No Data Found" />}
        {list &&
          list?.data?.map((items: any) => (
            <li
              className="relative flex text-base-200"
              key={items.name}
              data-testid="view-details-card"
            >
              <div className="card w-96 bg-gray-700 shadow-xl">
                <div className="absolute top-1 right-1 z-10">
                  <button
                    onClick={() => handleFavorite(items)}
                    className="btn btn-ghost"
                    data-testid="heart-icon"
                  >
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      className={
                        isFavorite(items.name, listFavorite) && `fill-red-500`
                      }
                    >
                      <title>heart_like</title>
                      <path d="M22.837 3.727c3.785 0 6.85 3.064 6.85 6.842 0 6.842-6.85 10.738-13.691 17.579-6.842-6.842-13.684-10.738-13.684-17.579 0-3.777 3.065-6.842 6.842-6.842 3.421 0 5.131 1.711 6.842 5.131 1.71-3.421 3.421-5.131 6.841-5.131z"></path>
                    </svg>
                  </button>
                </div>
                <div className="card-body">
                  <h2 className="card-title mb-2">Name: {items.name}</h2>
                  <p className="m-0">Gender: {items.gender}</p>
                  <p className="m-0">Birth Year: {items.birth_year}</p>
                  <p className="m-0">
                    Home Planet: {getPlanetName(items.homeworld, planets)}
                  </p>
                  <div className="card-actions mt-3 justify-end">
                    <Link href={`/details/${encodeURIComponent(items.name)}`}>
                      <button className="btn btn-primary">View Details</button>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Grid;
