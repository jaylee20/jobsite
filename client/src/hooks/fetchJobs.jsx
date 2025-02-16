import axios from 'axios';
import { useReducer, useEffect } from 'react';

const ACTIONS = {
  MAKE_REQUEST: 'make_request',
  GET_DATA: 'get-data',
  ERROR: 'error',
};

let hasData = true;

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, jobs: [], hasData: true };
    case ACTIONS.GET_DATA:
      return {
        ...state,
        loading: false,
        jobs: action.payload.jobs.slice(0, 5),
        hasData,
      };
    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        jobs: [],
      };
    default:
      return state;
  }
};

const fetchJobs = (params, page) => {
  const [state, dispatch] = useReducer(reducer, {
    jobs: [],
    loading: true,
    error: false,
    hasData: true,
  });

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    axios
      .get('http://localhost:4002/api/joblisting', {
        cancelToken: cancelToken.token,
        params: {
          // category: 'Software Engineer',
          page,
          ...params,
        },
      })
      .then((res) => {
        const dataLength = res.data.length;
        if (dataLength !== 0) {
          hasData = true;
          dispatch({
            type: ACTIONS.GET_DATA,
            payload: { jobs: Object.values(res.data), hasData },
          });
        } else {
          hasData = false;
          dispatch({
            type: ACTIONS.GET_DATA,
            payload: { jobs: state.jobs, hasData },
          });
        }
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: err } });
      });
    return () => {
      cancelToken.cancel();
    };
  }, [params, page]);

  return state;
};

export default fetchJobs;
