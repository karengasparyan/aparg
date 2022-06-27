import {
  LIST_REQUEST,
  LIST_SUCCESS,
} from '../actions/histories';

const initialState = {
  stories: [],
}
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_REQUEST: {
      return {
        ...state,
        error: "",
      };
    }
    case LIST_SUCCESS: {
      const {data} = action.payload;
      return {
        ...state,
        stories: data.stories,
      };
    }

    default: {
      return state;
    }
  }
}
