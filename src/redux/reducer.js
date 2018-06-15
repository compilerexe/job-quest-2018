import actionTypes from './actions'

let initState = {
  jokes: []
}

export default (state = initState, action) => {

  switch (action.type) {

    case actionTypes.GET_DATA_JOKES :
      console.log('action >>>> ', actionTypes.GET_DATA_JOKES)
      return state = {...state, jokes: action.data}
    case actionTypes.CLEAR_DATA_JOKES:
      console.log('action >>>> ', actionTypes.CLEAR_DATA_JOKES)
      return state = {...state, jokes: []}

    default : return state

  }

}