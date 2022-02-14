function updateStateHelper(state, arrSelector, newVal) {
  if (arrSelector.length > 1) {
    let field = arrSelector.shift();
    let subObj = {};

    try {
      subObj = { ...updateStateHelper(state[field], arrSelector, newVal) };
    } catch {
      subObj = { ...updateStateHelper(state, arrSelector, newVal) };
    }

    return { ...state, [field]: subObj };
  } else {
    let updatedState = {};
    updatedState[arrSelector.shift()] = newVal;
    return { ...state, ...updatedState };
  }
}

export function deepUpdateState(state, selector, newVal, autoAssign = true) {
  if (selector.indexOf(".") !== -1) {
    let sel = selector.split(".");
    let newState = updateStateHelper(state, sel, newVal);
    if (autoAssign) return Object.assign(state, newState);

    return newState;
  }

  return state;
}

//To make the tabs scrollable if it's long
export function tabScroll(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}
