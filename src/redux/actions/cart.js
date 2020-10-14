import http from '../../helpers/http'
import qs from 'querystring'

export default {
    addCart: (token, data)=>{
        return {
            type: 'ADD_CART',
            payload: http(token).post(`cart`, qs.stringify(data))
        }
    },
    getCart: (token)=>{
        return {
            type: 'GET_CART',
            payload: http(token).get(`cart`)
        }
    },
    clearMessage: () => {
        return {
            type: 'CLEAR_PROFILE_MESSAGE'
        }
    }
}