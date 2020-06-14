import { 
    GET_BUSINESS_TYPE_SERVICE_LOADING_TOGGLE,
    GET_BUSINESS_TYPE_SERVICE_NETWORK_ACCESS_SUCCESS,
    GET_BUSINESS_TYPE_SERVICE_NETWORK_ACCESS_FAILURE
} from '../types/utils';

export function getBusinessTypes() {
    return(dispatch) => {
        dispatch(loading(true));
        return fetch('/api/common/business', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res=> {
            if(res.status === 200) {
                return res.json().then(res=> {
                    dispatch(loading(false));
                    dispatch(isSuccess(res));
                })
            } else {
                dispatch(loading(false));
                return res.json().then(res=> {
                    dispatch(isError(res));
                })
            }
        }).catch(err=> {
            dispatch(loading(false));
            dispatch(isError(err));
        })
    }
}

export function loading(loading) {
    return {
        type: GET_BUSINESS_TYPE_SERVICE_LOADING_TOGGLE,
        payload: loading
    }
}

export function isSuccess(success) {
    return {
        type: GET_BUSINESS_TYPE_SERVICE_NETWORK_ACCESS_SUCCESS,
        payload: success
    }
}

export function isError(err) {
    return {
        type: GET_BUSINESS_TYPE_SERVICE_NETWORK_ACCESS_FAILURE,
        payload: err
    }
}