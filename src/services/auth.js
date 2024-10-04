import axios from "axios";
import { jwtDecode } from "jwt-decode";

export async function login(payload) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/auth/login`,
      payload
    );
    console.log(response);

    return { status: true, token: response.data.token };
  } catch (error) {
    console.log(error);
    return { status: false, error };
  }
}

export const getUsername = (token) => {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  return decodedToken.user;
};
