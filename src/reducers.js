import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
} from "./actions";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: true,
};

function writeFavsToLocalStorage(favs) {
  localStorage.setItem("s10g4", JSON.stringify(favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      writeFavsToLocalStorage([...state.favs, action.payload]);
      if (!state.favs.includes(action.payload)) {
        return {
          ...state,
          favs: [...state.favs, action.payload],
        };
      } else return state;

    case FAV_REMOVE:
      writeFavsToLocalStorage(
        state.favs.filter((item) => item.id !== action.payload)
      );
      return {
        ...state,
        favs: state.favs.filter((item) => item.id !== action.payload),
      };

    case FETCH_SUCCESS:
      return {
        ...state,
        current: action.payload,
        loading: false,
      };

    case FETCH_LOADING:
      return {
        ...state,
        current: null,
        loading: true,
      };

    case FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GET_FAVS_FROM_LS:
      return {
        ...state,
        favs: readFavsFromLocalStorage(),
      };

    default:
      return state;
  }
}
