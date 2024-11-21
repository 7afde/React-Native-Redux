import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../(services)/api/api";
import { useState } from "react";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
});

const Login = () => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const mutation = useMutation({
    mutationFn: loginUser,
    mutationKey: ["login"],
  });

  console.log(mutation);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {mutation?.isError ? (
        <Text style={styles.errorText}>
          {mutation?.error?.response?.data?.message}
        </Text>
      ) : null}
      {mutation?.isSuccess ? (
        <Text style={styles.successText}>
          {mutation?.error?.response?.data?.message}
        </Text>
      ) : null}
      <Formik
        initialValues={{
          email: "zouyedhafed00@gmail.com",
          password: "00000000",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          const data = {
            email: values.email,
            password: values.password,
          };
          mutation
            .mutateAsync(data)
            .then(() => {
              setMessage("Registration successful!");
              setMessageType("success");
              setTimeout(() => {
                setMessage("");
                router.push("/(tabs)");
              }, 2000); // Redirect after 2 seconds
            })
            .catch((error) => {
              setMessage(error?.response?.data?.message);
              setMessageType("error");
            });
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email && touched.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
            />
            {errors.password && touched.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={mutation.isLoading}
            >
              {mutation.isPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  form: {
    width: "100%",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
  button: {
    height: 50,
    backgroundColor: "#6200ea",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  successText: {
    color: "green",
    marginBottom: 16,
  },
});
