import axios from 'axios';

export async function loginUser(email: string, password: string) {
  try {

    console.log("hello")
    const response = await axios.post('https://sea-lion-app-bo3ep.ondigitalocean.app/auth/login', {
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