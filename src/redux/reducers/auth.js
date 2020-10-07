const initialState = {
    isLogin: false,
    isError: false,
    alertMsg: '',
    isLoading: false
}

export default (state=initialState, action) => {
    switch (action.type) {
        case 'AUTH_USER_FULFILLED':{ 
            return {
                ...state,
                isLogin: true,
                alertMsg: 'Login Successfully'
            }
        }
        case 'AUTH_USER_REJECTED':{ 
            return {
                ...state,
                isError: true,
                alertMsg: 'Wrong email or password'
            }
        }
        case 'AUTH_USER_PENDING' : {
            return {
              ...state,
              isLoading: true
            }
          }
        case 'LOGOUT_USER' :{
            return {
                ...state,
                isLogin: false,
                isError: false,
                alertMsg: 'Logout Succesfully'
            }
        }
        case 'CLEAR_MESSAGE': {
            return {
                ...state,
                alertMsg: ''
            }
        }
        default:{
            return state
        }
    }
}