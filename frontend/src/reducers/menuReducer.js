const initalState = {
  user: {},
  todos: [],
  totalprice: [0],
  order:[],
  arrival: [],
  cartamount: [0],
  total:[0]
};

export const menuReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return {
        user: {
          ...state.user,
          name: action.payload,
        }
      }
    case 'ADD_EMAIL':
      return {
        ...state,
        email: action.payload
        
      }
    case 'ADD_TODO':
      return {
        ...state,
        todos: action.payload,
        
      }
       case 'OBJECT_AMOUNT':
            return {
        ...state,
        todos: state.todos.map(item => ({
          ...item,
          quantity: action.payload
         }))
      }
    case 'SET_CARTAMOUNT':
      return {
        ...state,
            cartamount: action.payload
      }
    case 'SET_ARRIVAL':
      return {
        ...state,
            arrival: action.payload
      }
    case 'SET_ORDER':
      return {
        ...state,
            order: action.payload
      }
    case 'SET_TOTALCARTVALUE':
      return {
          ...state,
          total: action.payload,
        
      }
    default:
      return state;
  }

}
    
