import { Stack } from "expo-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./authSlice";

const AppWrapper = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Home", headerShown: false }}
      />
    </Stack>
  );
};

export default AppWrapper;
