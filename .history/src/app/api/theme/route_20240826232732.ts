import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const response = await axios.post('https://sea-lion-app-bo3ep.ondigitalocean.app/auth/signup', { email, password });

    console.log(response)

    if (response.status !== 200) {
      throw new Error('Invalid email or password');
    }

    return NextResponse.json({ message: 'Signup successful', data: response.data });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json({ message: error.response.data.message }, { status: error.response.status });
    } else {
      return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
  }
}
