import { AuthApi } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
	clientId: null,
	login: null,
	isAuth: false,
};

const authReducer = (state = initialState, action) => {

	switch (action.type) {
		case SET_USER_DATA:
			{
				return {
					...state,
					...action.payload,
				}
			}
		default:
			return state;
	}
};

export const setUsersData = (clientId, login, isAuth) => ({
	type: SET_USER_DATA,
	payload: { clientId, login, isAuth }
});



export const getUsersData = (token) => async (dispatch) => {
	const response = await AuthApi.getHeader(token);
	if (response.status === 200) {
		let { id, login } = response.data;
		dispatch(setUsersData(id, login, true));
	}
};

export const login = (login, password) => async (dispatch) => {
	const response = await AuthApi.login(login, password);
	if (response.status === 200) {
		localStorage.setItem('token', response.data.token);
		const token = response.data.token;
		dispatch(getUsersData(token));

	} else {
		if (response.status === 401) {
			localStorage.removeItem('token');
		}
	}

};

export default authReducer;