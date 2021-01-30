import API from "../configs";
const tokenKey = "TeckLinkToken";
const userKey = "TeckLinkUser";


export const getToken = () => {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwt;
    } catch (e) {
        return null;
    }
}

export const tokenHeader = () => {
    const AuthString = 'Bearer '.concat(getToken());
    return { 'Content-Type': 'application/json', 'Authorization': AuthString }
}

export const Logout = async () => {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(userKey);
}

export const createAccount = async (response, callback) => {
    API.post("/auth/register", response)
    .then((res) => {
        if (res) {
            var { data } = res;
            var result = data.result.data;
            if (result.token) {
                const userObject = JSON.stringify(data.result.data);
                localStorage.setItem(tokenKey, result.token);
                localStorage.setItem(userKey, userObject);
            }
            return callback(data);
        }
    })
    .catch(function (error) {
        return callback(error);
    });
}

export const signIn = async (response, callback) => {
    API.post("/auth/login", response)
    .then((res) => {
        if (res) {
            var { data } = res;
            var result = data.result.data;
            if (result.token) {
                const userObject = JSON.stringify(data.result.data);
                localStorage.setItem(tokenKey, result.token);
                localStorage.setItem(userKey, userObject);
            }
            return callback(data);
        }
    })
    .catch(function (error) {
        return callback(error);
    });
}

export const createTicket = async (data, callback) => {
    await API.post("/ticket/create-ticket", data, { headers: tokenHeader() })
        .then((res) => {
            if (res) {
                var { data } = res;
                return callback(data);
            }
        })
        .catch(function (error) {
            return callback(error);
        });
}

export const getTicket = async (callback) => {
    API.get(`/ticket/get-ticket`, { headers: tokenHeader() })
    .then((res) => {
        if (res) {
            var { data } = res;
            return callback(data);
        }
    })
    .catch(function (error) {
        return callback(error);
    });
}

export const getSingleTicket = async ({ ticketId}, callback) => {
    API.get(`/ticket/get-single-ticket/${ticketId}`, { headers: tokenHeader() })
        .then((res) => {
            if (res) {
                var { data } = res;
                return callback(data);
            }
        })
        .catch(function (error) {
            return callback(error);
        });
}

export const changeTicketStatus = async (data, callback) => {
    await API.put("/ticket/change-status", data, { headers: tokenHeader() })
    .then((res) => {
        if (res) {
            var { data } = res;
            return callback(data);
        }
    })
    .catch(function (error) {
        return callback(error);
    });
}

export const deleteTicket = async (_id, callback) => {
    API.delete(`/ticket/delete-ticket/${_id}`, { headers: tokenHeader() })
    .then((res) => {
        if (res) {
            var { data } = res;
            if (data && data.status === 401) {
                Logout()
            } else {
                var result = data && data.result.data;
                var response = { result }
                return callback(response);
            }
        }
    })
    .catch(function (error) {
        return callback(error);
    });
}

export const getCurrentUserObject = () => {
    try {
        const userObj = localStorage.getItem(userKey);
        return JSON.parse(userObj);
    } catch (e) {
        return null;
    }
}

export default {
    createAccount, signIn, getTicket, getSingleTicket, changeTicketStatus, deleteTicket,
    getToken, getCurrentUserObject, tokenHeader, Logout
}