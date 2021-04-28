
export const initialState = {
  buynow: [],
  header: "false",
};
export const getTotalPrice = (buynow) => 
  buynow?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  switch (action.type) {
      case "ADD_TO_BUY":
        sessionStorage.setItem("membership", JSON.stringify(action.item));
        return {
        ...state,
        buynow: [...state.buynow, action.item],
      };
      
      case "REMOVE_TO_BUY":
        sessionStorage.removeItem("membership");
        return{
          buynow : [null]
        }
      
      case "SET_HEADER":
        return{     
          ...state,header:action.header
        }

      default:
      return state;
  }
};

export default reducer;