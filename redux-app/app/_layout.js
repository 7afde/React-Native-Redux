import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import queryClient from "./(services)/queryClient";

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: "Home", headerShown: false }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
