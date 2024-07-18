import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PoppinText } from '@/components/StyledText';
import CustomButton from '@/components/CustomButton';
import EditProfile from '@/data/EditProfile';
import { Ionicons } from '@expo/vector-icons';
import { EventRegister } from 'react-native-event-listeners';
import { router } from 'expo-router';
import axios from 'axios';

interface User {
  name: string;
  email: string;
}

const Account = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [data, setData] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ user: User }>(
          'http://192.168.0.4:3000/api/user/email/bateteangenadette@gmail.com'
        );
        setData(response.data.user);
        console.log(response.data.user);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={[styles.container, tw`py-4`]}>
      <ScrollView style={tw`relative`}>
        <Pressable onPress={() => router.push('/login')} style={tw`absolute right-6 top-3`}>
          <Ionicons name="log-in-outline" size={30} color={'#fff'} />
        </Pressable>
        <View style={tw`flex flex-col justify-center items-center gap-10 px-6`}>
          <View style={tw`w-full flex flex-col gap-3 items-center justify-center`}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=600',
              }}
              style={[{ width: 100, height: 100 }, tw`rounded-full`]}
            />
            {data && (
              <>
                <PoppinText key={data.name} style={tw`text-[#fff]`}>{data.name}</PoppinText>
                <PoppinText key={data.email} style={tw`text-[#fff]`}>{data.email}</PoppinText>
              </>
            )}
            {/* <CustomButton
              title={'Edit profile'}
              customStyles="bg-[#353D65] w-[127px]"
              customText="text-[#fff] text-[13px]"
            /> */}
          </View>
          <View style={tw`flex flex-col`}>
            {EditProfile.map((action, index) => (
              <Pressable
                key={action.id}
                style={tw`flex-row items-center justify-between p-4 w-full`}
              >
                <View style={tw`flex-row items-center gap-4`}>
                  <View style={tw`border-2 border-gray-700 rounded-lg p-3`}>
                    <Image source={action.image} resizeMode="contain" />
                  </View>
                  <PoppinText style={tw`text-[14px] text-white`}>
                    {action.text}
                  </PoppinText>
                </View>
                {index === EditProfile.length - 1 ? (
                  <Switch
                    value={darkMode}
                    onValueChange={(value) => {
                      setDarkMode(value);
                      EventRegister.emit('Change Theme', value);
                    }}
                  />
                ) : (
                  <Ionicons name="chevron-forward-outline" size={25} color={'#fff'} />
                )}
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A1027',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
