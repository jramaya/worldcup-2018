import {
  CHANGE_STADIUM,
  REQUEST_DATA_PENDING,
  REQUEST_DATA_SUCCESS,
  REQUEST_DATA_FAIL
} from "./constants";

export const setCurrentStadium = stadiumId => ({
  type: CHANGE_STADIUM,
  payload: stadiumId
});

export const setData = () => dispatch => {
  dispatch({ type: REQUEST_DATA_PENDING });
  fetch("https://fifa2018.webapps.mobi/data.json")
    .then(res => res.json())
    .then(data => {
      dispatch({ type: REQUEST_DATA_SUCCESS, payload: data });
    })
    .catch(error => {
      dispatch({ type: REQUEST_DATA_FAIL, payload: error });
    });
};
