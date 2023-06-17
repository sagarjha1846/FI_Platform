import axios from 'axios';
import constants from '../../../constant/routesConstant';
const { backendURL } = constants;

const login = async (userData) => {
  let { username, password } = userData;

  const response = await axios.post(`${backendURL}login.php`, {
    username,
    password,
  });

  return response.data;
};

const logout = async () => {
  try {
    localStorage.clear();
    return { success: true, message: '' };
  } catch (error) {
    return {
      success: false,
      message: 'LOGOUT FAIL',
    };
  }
};

// const resetPassword = async (userData) => {
//   // const { oldPassword, newPassword } = userData;
//   const user = 'ok';
//   if (user) {
//     const response = 'done';

//     return response;
//   }
// };

// const resendOtp = async (userData) => {
//   const response = await 'done';
//   return response;
// };

// const forgotPassword = async (userData) => {
//   // Send confirmation code to user's email
//   const response = await 'done';
//   return response;
// };

// const changePassword = async (userData) => {
//   // const { email, code, newPassword } = userData;
//   const response = await 'done';
//   return response;
// };

const authService = {
  login,
  logout,
  // resetPassword,
  // forgotPassword,
  // changePassword,
  // resendOtp,
};

export default authService;
