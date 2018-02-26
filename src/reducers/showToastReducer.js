export const showToastReducer = (state, action) => {
  return {
    ...state,
    toastMessage: action.payload,
  };
};