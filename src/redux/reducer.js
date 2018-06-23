import actionTypes from './actions';

const initState = {
  jokes: [],
  firstName: 'Prayut',
  lastName: '',
  resultJokes: 50,
  ip: '',
};

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_DATA_JOKES:
      console.log('action >>>> ', actionTypes.GET_DATA_JOKES);
      return { ...state, jokes: action.data };
    case actionTypes.CLEAR_DATA_JOKES:
      console.log('action >>>> ', actionTypes.CLEAR_DATA_JOKES);
      return { ...state, jokes: [] };
    case actionTypes.GET_FIRST_NAME:
      return { ...state, ...{ firstName: state.firstName } };
    case actionTypes.GET_LAST_NAME:
      return { ...state, ...{ lastName: state.lastName } };
    case actionTypes.SET_CONFIG:
      return { ...state, ...action.data };
    case actionTypes.SET_RESULT_JOKES:
      return { ...state, jokes: action.data };
    case actionTypes.GET_IP:
      return { ...state, ...{ ip: state.ip } };
    case actionTypes.SET_IP:
      return { ...state, ...action.data };

    default: return state;
  }
};
