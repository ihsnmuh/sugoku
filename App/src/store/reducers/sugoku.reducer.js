const initialState = {
  board: [],
  localBoard: [],
  status: 'unsolved',
  loading: false,
};

const sugokuReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SUGOKU/FETCHBOARD':
      return { ...state, board: payload };
    case 'SUGOKU/FETCHLOCALBOARD':
      return { ...state, localBoard: payload };
    case 'SUGOKU/BOARDUPDATE':
      return { ...state, localBoard: payload };
    case 'SUGOKU/STATUSUPDATE':
      return { ...state, status: payload };
    case 'SUGOKU/LOADING':
      return { ...state, loading: payload };
    default:
      return state;
  }
};

export default sugokuReducer;
