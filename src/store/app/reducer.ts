export interface AppState {
    people: any[],
    isLoadPeople: boolean,
    errorPeople: string,
    planets: any[],
}

const initState: AppState = {
  people: [],
  isLoadPeople: false,
  errorPeople: '',
  planets: [],
};

export const appReducer = (state: AppState = initState, action: any) => {
  switch (action.type) {
    case 'LOAD_PEOPLE': {
      return {
        ...state,
        isLoadPeople: true,
      };
    }

    case 'SET_PEOPLE': {
      const {payload} = action;

      return {
        ...state,
        people: payload,
        isLoadPeople: false,
      };
    }

    case 'ERROR_PEOPLE': {
      const {payload} = action;

      return {
        ...state,
        isLoadPeople: false,
        errorPeople: payload,
      };
    }

    case 'SET_PLANETS': {
      const {payload} = action;

      return {
        ...state,
        planets: payload,
      };
    }

    default:
      return state;
  }
};
