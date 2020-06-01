import axios from 'axios';
import { AsyncStorage } from 'react-native';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    // Ustawienia wylogowywania
    //dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const signup = (email, password) => {
  return async dispatch => {
    const authData = {
      user: {
        email: email,
        password: password
      }
    };
    const response = await axios.post('https://qrapp.ulam.tech/signup.json', authData);

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const login = (email, password) => {
  return dispatch => {
    const authData = {
      user: {
        email: email,
        password: password
      }
    };
    axios.post('https://qrapp.ulam.tech/login', authData)
        .then(res => {
          const token = res.headers.authorization.split(' ')[1]
          const user = res.data;
          const expirationDate = new Date(new Date().getTime() + user.exp * 1000)
          dispatch(
              authenticate(
                  user.id,
                  token,
                  parseInt(expirationDate)
              )
          );
          saveDataToStorage(token, user.id, expirationDate);
        })
        .catch(err => {
          console.log('Error: ', err)
        })
  }
};

export const register = (username, email, password, firstname, lastname) => {
  return dispatch => {
    const authData = {
      user: {
        username: username,
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname
      }
    };
    axios.post('https://qrapp.ulam.tech/signup', authData)
        .then(res => {
          const token = res.headers.authorization.split(' ')[1]
          const user = res.data;
          const expirationDate = new Date(new Date().getTime() + user.exp * 1000)
          dispatch(
              authenticate(
                  user.id,
                  token,
                  parseInt(expirationDate)
              )
          );
          saveDataToStorage(token, user.id, expirationDate);
        })
        .catch(err => {
          console.log('Error: ', err)
        })
  }
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString()
    })
  );
};
