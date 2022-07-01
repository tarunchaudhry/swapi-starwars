import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

// Redux
import { getPersonDetails } from '../../redux/global/global.slice';

type IndexProps = {
  actions?: any;
  globalData?: any;
};

const Details = ({ actions, globalData }: IndexProps) => {
  const router = useRouter();
  const { isLoading } = globalData;
  useEffect(() => {
    if (router.query.name) {
      actions.getPersonDetails(router.query.name);
    }
  }, [router.query.name]);

  return (
    <Main
      isLoading={isLoading}
      meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}
    >
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione fuga
        recusandae quidem. Quaerat molestiae blanditiis doloremque possimus
        labore voluptatibus distinctio recusandae autem esse explicabo molestias
        officia placeat, accusamus aut saepe.
      </p>
    </Main>
  );
};

const mapStateToProps = ({ globalData }: any) => ({
  globalData,
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(
    {
      getPersonDetails,
    },
    dispatch
  ),
});
export default connect(mapStateToProps, mapDispatchToProps)(Details);
