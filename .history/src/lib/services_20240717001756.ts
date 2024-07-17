import axios from 'axios';
import jwtDecode from 'jwt-decode';

export async function loginUser(email: string, password: string) {
  try {
    const response = await axios.post('https://training-cibew.ondigitalocean.app/auth/login', {
      email,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });


    if (response.status === 200) {
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return { token, user };
    }
  } catch (error) {
    console.error('Login failed', error);
    throw new Error('Login failed');
  }
}