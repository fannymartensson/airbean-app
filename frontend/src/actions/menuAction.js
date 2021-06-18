 export function setUsername(name) {
  return {
    type: 'SET_USERNAME',
    payload: name
  };
}

export function addEmail(email) {
  return {
    type: 'ADD_EMAIL',
    payload: email
  };
}

export function addTodo(todo) {
  return {
    type: 'ADD_TODO',
    payload: todo
  };
}

export function setQuantity(quantity) {
  return {
    type: 'OBJECT_AMOUNT',
    payload: quantity
  };
}
export function setCartAmount(cartamount) {
  return {
    type: 'SET_CARTAMOUNT',
    payload: cartamount
  };
}
export function setTotalCartValue(total) {
  return {
    type: 'SET_TOTALCARTVALUE',
    payload: total
  };
}
export function setArrival(arrival) {
  return {
    type: 'SET_ARRIVAL',
    payload: arrival
  };
}
export function setOrder(order) {
  return {
    type: 'SET_ORDER',
    payload: order
  };
}