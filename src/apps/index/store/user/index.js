// ======================================================
// reducer 中心此下面的 state会挂到总state下面 state.User={}
// ======================================================

const initState = {
  "CORPORATIONSTORES": [],
  "CURRENT_USER_PROVINCE_DATA": null,
};

function reducer(state = initState, action) {
  if (action.type === 'EDITORUSER') {
    return Object.assign({}, state, action.data);
  }
  // return newState
  return state;
}

// ======================================================
// actions 触发reducer 改变 state
// ======================================================
// 行为--改变用户id
function editorUser(data) {
  return {
    type: 'EDITORUSER',
    data,
  };
}

export default {
  reducer,
  actions: { editorUser },
};
