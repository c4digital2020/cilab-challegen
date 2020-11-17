import { ADD_PRODUCT, REMOVE_PRODUCT } from "../actions";

const initialState = { addedToCart: [] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT: // Add a new product to the current list
      return { ...state, addedToCart: [...state.addedToCart, action.payload] };
    case REMOVE_PRODUCT:
      // Removes every product that has a matching id
      return {
        ...state,
        addedToCart: state.addedToCart.filter(
          (prod) => prod.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};
export default reducer;
