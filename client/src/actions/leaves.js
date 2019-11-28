import { GET_TODAY_LEAVES, LEAVE_ERROR } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const getTodayLeaves = () => async dispatch => {
    try {
        const token = localStorage.getItem("token");
        console.log(`Token: ${token}`);
        if (token === null) {
            return;
        }
        if (!axios.defaults.headers.common.hasOwnProperty("x-auth-token")) {
            setAuthToken(token);
        }
        const today = new Date();
        const res = await axios.get(
            `/api/leaves/?year=${today.getFullYear()}
            &month=${today.getMonth() + 1}
            &day=${today.getDate()}`
        );
        console.log(res.data);
        dispatch({
            type: GET_TODAY_LEAVES,
            payload: res.data
        });
    } catch (error) {
        if (error.response.data.msg === "Token expired!") {
            dispatch({
                type: LOGOUT
            });
        } else {
            dispatch({
                type: LEAVE_ERROR
            });
        }
    }
};
