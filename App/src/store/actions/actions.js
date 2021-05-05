const encodeBoard = (board) =>
  board.reduce(
    (result, row, i) =>
      result +
      `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`,
    ''
  );

const encodeParams = (params) =>
  Object.keys(params)
    .map((key) => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');

export const fetchBoard = (level) => {
  return (dispatch) => {
    fetch(
      `https://sugoku.herokuapp.com/board?difficulty=${level.toLowerCase()}`,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(setStatus('unsolved'));
        dispatch({
          type: 'SUGOKU/FETCHBOARD',
          payload: JSON.parse(JSON.stringify(data.board)),
        });
        dispatch({
          type: 'SUGOKU/FETCHLOCALBOARD',
          payload: JSON.parse(JSON.stringify(data.board)),
        });
      });
  };
};

export const updateBoard = (board) => {
  return (dispatch) => {
    dispatch({
      type: 'SUGOKU/BOARDUPDATE',
      payload: JSON.parse(JSON.stringify(board)),
    });
  };
};

export const setStatus = (status) => {
  return (dispatch) => {
    dispatch({
      type: 'SUGOKU/STATUSUPDATE',
      payload: status,
    });
  };
};

export const setLoading = (loading) => {
  return (dispatch) => {
    dispatch({
      type: 'SUGOKU/LOADING',
      payload: loading,
    });
  };
};

export const solveBoard = (board) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams(board),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(updateBoard(response.solution));
        dispatch(setStatus('solved'));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
};

export const validateBoard = (board) => {
  return (dispatch) => {
    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams(board),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.status);
        dispatch(setStatus(data.status));

        if (data.status === 'broken') {
          alert(
            'Sorry, there are the same numbers in the box or row or column, please check again'
          );
        } else if (data.status === 'unsolved') {
          alert('The input is correct but not finished (unsolved)');
        } 
      });
  };
};
