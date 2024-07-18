import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import FormInput from '@/components/Login/FormInput';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { PoppinText } from '@/components/StyledText';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username) {
      alert('Please enter your phone number, email, username, and password.');
      return;
    }
    router.push('/home');
  };

  return (
    <SafeAreaView style={[styles.containerLogin, tw`h-full`]}>
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
          <View style={[tw`w-full flex flex-col gap-8 px-6`]}>
            <FormInput
              placeholder="Phone number, email, username"
              value={username}
              onChangeText={setUsername}
            />
            <FormInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <PoppinText
              style={[
                tw`text-[#6B6B6B] text-[13px] pr-2`,
                { textAlign: 'right' },
              ]}
            >
              Forgot Password? <Text style={tw`text-white`}>Click Here</Text>
            </PoppinText>
            <CustomButton
              title="Login"
              customStyles="bg-[#fff] w-full"
              customText="text-[#0A1027]"
              handlePress={handleLogin}
            />
            {/* <CustomButton
              title="Continue With Google"
              customStyles="bg-transparent border-2 border-gray-700 w-full"
              icon={require('@/assets/images/googleLogo.png')}
              customText="text-[#fff]"
            /> */}
            <PoppinText
              style={[tw`text-[#6B6B6B] text-[13px]`, { textAlign: 'center' }]}
            >
              Don’t have an account?{' '}
              <Link href="/register" style={tw`text-white`}>
                <Text>Register here</Text>
              </Link>
            </PoppinText>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLogin: {
    width: '100%',
    backgroundColor: '#0A1027',
  },
});
