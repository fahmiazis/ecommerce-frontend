import http from '../../helpers/http'
import qs from 'querystring'

export default {
    getProfile: (token)=>{
        return {
            type: 'GET_PROFILE',
            payload: http(token).get(`profile`)
        }
    },
    updateProfile: (token, data)=>{
        return {
            type: 'UPDATE_PROFILE',
            payload: http(token).patch(`profile/customer`, qs.stringify(data))
        }
    },
    updateImage: (token, data)=>{
        return {
            type: 'UPDATE_IMAGE',
            payload: http(token).patch(`profile/customer/img`, data)
        }
    },
    clearMessage: () => {
        return {
            type: 'CLEAR_PROFILE_MESSAGE'
        }
    }
} 