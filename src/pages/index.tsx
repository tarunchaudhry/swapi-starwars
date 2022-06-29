import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

// Redux
import { fetchCharacterData } from '../redux/global/global.slice';

const Index = ({ actions, globalData }) => {
  // const router = useRouter();
  const { list } = globalData;
  useEffect(() => {
    actions.fetchCharacterData();
  }, []);

  return (
    <Main
      meta={
        <Meta
          title="Swapi StartWars"
          description="Project for swapi api star wars"
        />
      }
    >
      <ul className="grid grid-cols-3 gap-4 ">
        {list?.data.map((items: any) => (
          <li className="flex text-base-200" key={items.name}>
            <div className="card w-96 bg-gray-700 shadow-xl">
              <figure>
                <img
                  src="https://api.lorem.space/image/shoes?w=400&h=225"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{items.name}</h2>
                <p className="m-0">Gender: {items.gender}</p>
                <p className="m-0">Birth Year: {items.birth_year}</p>
                <p className="m-0">Home Planet: {items.homeworld}</p>
                <div className="card-actions mt-3 justify-end">
                  <button className="btn btn-primary">View Details</button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Main>
  );
};

const mapStateToProps = ({ globalData }: any) => ({
  globalData,
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(
    {
      fetchCharacterData,
    },
    dispatch
  ),
});
export default connect(mapStateToProps, mapDispatchToProps)(Index);
