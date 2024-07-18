import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import FormInput from '@/components/Login/FormInput';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCreateAccount = () => {
    // Validate inputs
    if (!username || !email || !password || !confirmPassword) {
      alert('Please fill out all fields.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Handle form submission logic here
    console.log('Form Data:', { username, email, password, confirmPassword });

    // Navigate to the login screen
    router.push('/login');
  };

  return (
    <SafeAreaView style={[styles.containerRegister, tw`h-full`]}>
      <ScrollView>
        <View
          style={[
            {
              minHeight: Dimensions.get('window').height - 100,
            },
            tw`w-full flex items-center my-16 gap-7`,
          ]}
        >
          <Image
            source={require('@/assets/images/mince1.png')}
            resizeMode="cover"
            style={tw`mb-6`}
          />
          <View style={[tw`w-full flex flex-col gap-10 px-6`]}>
            <View style={[tw`w-full flex flex-col gap-4`]}>
              <FormInput placeholder="Username" value={username} onChangeText={setUsername} />
              <FormInput placeholder="Email" value={email} onChangeText={setEmail} />
              <FormInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
              <FormInput placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
            </View>
            <CustomButton
              title="Create account"
              customStyles="bg-[#fff] w-full"
              customText="text-[#0A1027]"
              handlePress={handleCreateAccount}
            />
            {/* <CustomButton
              title="Continue With Google"
              customStyles="bg-transparent border-2 border-gray-700 w-full"
              icon={require('@/assets/images/googleLogo.png')}
              customText="text-[#fff]"
            /> */}
            <Text
              style={[tw`text-[#6B6B6B] text-[13px]`, { textAlign: 'center' }]}
            >
              Already have an account?{' '}
              <Link href="/login" style={tw`text-white`}>
                Login here
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  containerRegister: {
    width: '100%',
    backgroundColor: '#0A1027',
  },
});
