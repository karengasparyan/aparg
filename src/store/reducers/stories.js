import {
  LIST_REQUEST,
  LIST_SUCCESS,
} from '../actions/histories';

const initialState = {
  stories: [],
  next_page_token: "",
  next: false,
}
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_REQUEST: {
      const {data} = action.payload;
      return {
        ...state,
        error: "",
        next: data.next,
      };
    }
    case LIST_SUCCESS: {
      const {data} = action.payload;
      return {
        ...state,
        next_page_token: data.next_page_token,
        stories: state.next ? [...state.stories, ...data.stories] : data.stories,
      };
    }

    default: {
      return state;
    }
  }
}
