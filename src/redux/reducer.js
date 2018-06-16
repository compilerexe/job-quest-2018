import actionTypes from './actions'

let initState = {
  jokes: [],
  firstName: 'Prayut',
  lastName: '',
  resultJokes: 50,
  ip: ''
}

export default (state = initState, action) => {

  switch (action.type) {

    case actionTypes.GET_DATA_JOKES :
      console.log('action >>>> ', actionTypes.GET_DATA_JOKES)
      return state = {...state, jokes: action.data}
    case actionTypes.CLEAR_DATA_JOKES:
      console.log('action >>>> ', actionTypes.CLEAR_DATA_JOKES)
      return state = {...state, jokes: []}
    case actionTypes.GET_FIRST_NAME :
      return state.firstName
    case actionTypes.GET_LAST_NAME :
      return state.firstName
    case actionTypes.SET_NAME :
      return state = {...state, ...action.data }
    case actionTypes.SET_RESULT_JOKES :
      return state = {...state, jokes: action.data }
    case actionTypes.GET_IP :
      return state.ip
    case actionTypes.SET_IP :
      return state = {...state, ...action.data }

    default : return state

  }

}