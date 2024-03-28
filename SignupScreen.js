import React, { useState } from 'react';
import { signup } from './auth_signup_password';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (inputEmail) => {
    // Basic email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(inputEmail);
    setEmailError(isValid ? '' : 'Please enter a valid email address');
    return isValid;
  };

  const validatePassword = (inputPassword) => {
    // Basic password validation: at least 6 characters
    const isValid = inputPassword.length >= 6;
    setPasswordError(isValid ? '' : 'Password must be at least 6 characters long');
    return isValid;
  };

  const handleSignup = async () => {
    if (validateEmail(email) && validatePassword(password)) {
      const user = await signup(email, password);
      console.log(user);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        onBlur={() => validateEmail(email)}
      />
      {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
        onBlur={() => validatePassword(password)}
      />
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
      <Button
        style={styles.button}
        title="Sign Up"
        onPress={handleSignup}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
    padding: 10,
    margin: 10,
  },
  button: {
    width: 200,
    padding: 10,
    margin: 10,
  },
  error: {
    color: 'red',
    marginBottom: 5,
  },
});

export default SignupScreen;
