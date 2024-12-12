import { connect } from 'react-redux';
import { RootState } from '../store';
import { fetchUserAction, setUserAction } from './actions';

const mapState = (state: RootState) => ({
  user: state.user.user,
  loading: state.user.loading,
});

const mapDispatch = {
  fetchUserAction,
  setUserAction,
}

export const userConnector = connect(mapState, mapDispatch);