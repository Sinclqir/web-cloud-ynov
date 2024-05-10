import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { getAuth, signInWithPhoneNumber, PhoneAuthProvider } from '@firebase/auth';

const PhoneAuthScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const auth = getAuth();

  const handleSendCode = async () => {
    try {
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber);
      setVerificationId(confirmation.verificationId);
      Alert.alert('Code sent successfully!');
    } catch (error) {
      console.error('Error sending code: ', error);
      Alert.alert('Error sending code: ', error.message);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      await auth.signInWithCredential(credential);
      Alert.alert('Phone authentication successful!');
    } catch (error) {
      console.error('Error verifying code: ', error);
      Alert.alert('Error verifying code: ', error.message);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button title="Send Code" onPress={handleSendCode} />
      <TextInput
        placeholder="Enter verification code"
        value={verificationCode}
        onChangeText={setVerificationCode}
      />
      <Button title="Verify Code" onPress={handleVerifyCode} />
    </View>
  );
};

export default PhoneAuthScreen;
