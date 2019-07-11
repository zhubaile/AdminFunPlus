// ======================================================
// reducer 中心此下面的 state会挂到总state下面 state.User={}
// ======================================================

const initState = 'zh';

function reducer(state = initState, action) {
  if (action.type === 'EDIT') {
    return action.data;
  }
  return state;
}

// ======================================================
// actions 触发reducer 改变 state
// ======================================================
// 行为--改变用户id
function editor(locale) {
  return {
    type: 'EDIT',
    data: (locale !== "zh") ? "en" : "zh",
  };
}

export default {
  reducer,
  actions: {
    editor,
  },
};
