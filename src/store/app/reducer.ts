export interface AppState {
    width: number,
    height: number
}

const initState = {
  width: 0,
  height: 0,
};

export const appReducer = (state: AppState = initState, action: any) => {
  switch (action) {
    default:
      return state;
  }
};
