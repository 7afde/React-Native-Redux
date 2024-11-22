import axios from "axios";

// Login
const loginUser = async ({ email, password }) => {
  const response = await axios.post(
    "https://salty-pigs-rule.loca.lt/api/users/login",
    { email, password }
  );
  return response.data;
};

// Register
const registerUser = async ({ email, password }) => {
  const response = await axios.post(
    "https://salty-pigs-rule.loca.lt/api/users/register",
    { email, password }
  );
  return response.data;
};

export { loginUser, registerUser };
