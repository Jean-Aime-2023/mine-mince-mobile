import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import services from '@/data/services';
import transactions from '@/data/transactions';
import {
  PoppinText,
  PoppinsBold,
  PoppinsSemibold,
} from '@/components/StyledText';
import cards from '@/data/cards';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { initPusher } from '@/utils/pusherSetup';

// b24a2d94-7a46-498b-8071-3d15d8fded49
// http://10.5.223.203:3000/api/card/b24a2d94-7a46-498b-8071-3d15d8fded49

interface Card {
  id: string;
  balance: number;
  number: string;
  name: string;
  type: string;
  uid: string;
  user_id: string;  
  createdAt: string;
  updatedAt: string;
}


const home = () => {

  const [data, setData] = useState<Card[]>([]);
  const [listData,setListData] = useState(transactions)
  let row: Array<any>=[]
  let prevOpenedRow;

  useEffect(() => {
    initPusher();
    const fetchData = async () => {
      try {
        const response = await axios.get<Card[]>('http://192.168.0.4:3000/api/card/b24a2d94-7a46-498b-8071-3d15d8fded49');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={[styles.container, tw`pt-8 pb-2`]}>
      <ScrollView>
          <View>
                          
          </View>
        <View style={[styles.profileNav, tw`px-6`]}>
          <View style={styles.profileText}>
            <PoppinText style={tw`text-[#6B6B6B] text-[15px]`}>
              Welcome
            </PoppinText>
            <PoppinText style={tw`text-[#fff] text-[15px]`}>
              Ange Nadette
            </PoppinText>
          </View>
          <Pressable
            style={tw`relative`}
            onPress={() => router.push('/(notify)')}
          >
            <Image
              source={require('@/assets/images/notifDot.png')}
              resizeMode="contain"
              style={tw`absolute right-0 top-0 z-10`}
            />
            <Ionicons
              name="notifications-outline"
              color={'#6B6B6B'}
              style={tw`relative`}
              size={23}
              
            />
          </Pressable>
        </View>
        <View style={tw`px-4 py-10`}>
          <ImageBackground
            source={require('@/assets/images/cardpattern.png')}
            resizeMode="contain"
            style={tw`w-[100%] h-[180px]`}
          >
            {data.map((card,index) => (
              <View key={index} style={tw`flex flex-col gap-5 p-5`}>
              <View style={tw`flex flex-col`}>
                <PoppinText style={tw`text-gray-400 text-xs`}>
                  Current Balance
                </PoppinText>
                <PoppinsSemibold style={tw`text-[#0A1027] text-xl`}>
                {card.balance}
                </PoppinsSemibold>
              </View>
              <PoppinText style={tw`text-[#0A1027] text-lg`}>
              {card.number}
              </PoppinText>
              <View style={tw`flex flex-row justify-between`}>
                <PoppinsSemibold style={tw`text-[#0A1027] text-sm`}>
                {card.name}
                </PoppinsSemibold>
                <PoppinsSemibold style={tw`text-[#0A1027] text-sm`}>
                  01/23
                </PoppinsSemibold>
                <PoppinsSemibold style={tw`text-[#0A1027] text-sm`}>
                {card.uid}
                </PoppinsSemibold>
              </View>
            </View>
              ))}
            
          </ImageBackground>
        </View>
        <View style={[styles.services, tw`px-6 flex-col gap-5`]}>
          <PoppinsSemibold style={[tw`text-[#fff] text-[17px]`, styles.desc]}>
            Our Services
          </PoppinsSemibold>
          <ScrollView
            horizontal
            style={tw`w-full`}
            contentContainerStyle={tw`flex-row gap-6`}
            showsHorizontalScrollIndicator={false}
          >
            {services.map((service) => (
              <Pressable
              onPress={()=>alert('No org for partnership')}
                key={service.id}
                style={tw`border border-gray-200 p-5 justify-center items-center gap-2 rounded-[10px] w-[94px] h-[78px]`}
              >
                <Image source={service.image} resizeMode="contain" />
                <PoppinText style={tw`text-[#fff] text-[12px]`}>
                  {service.text}
                </PoppinText>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        <View style={[styles.services, tw`px-6 flex-col gap-5 mt-10`]}>
          <PoppinsSemibold style={[tw`text-[#fff] text-[17px]`, styles.desc]}>
            Recent Transactions
          </PoppinsSemibold>
          <View style={tw`gap-5`}>
            {transactions.map((transaction) => (
              <Pressable
                key={transaction.id}
                style={tw`flex-row border border-white px-5 py-4 justify-between rounded-[10px] w-full items-center`}
              >
                <View style={tw`gap-5 flex-row items-center`}>
                  <Image
                    source={transaction.image}
                    resizeMode="contain"
                    style={tw`w-[50px] h-[50px] rounded-xl`}
                  />
                  <View style={tw`flex-col`}>
                    <PoppinText style={tw`text-[#fff]`}>
                      {transaction.title}
                    </PoppinText>
                    <PoppinText style={tw`text-[#6B6B6B]`}>
                      {transaction.date}
                    </PoppinText>
                  </View>
                </View>
                <PoppinText style={tw`text-[#fff] text-[16px]`}>
                  {transaction.price}
                </PoppinText>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A1027',
    flex: 1,
  },
  profileNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  profileText: {
    flexDirection: 'column',
  },
  services: {
    flexDirection: 'column',
    gap: 6,
  },
  desc: {
    fontWeight: '400',
    fontSize: 15,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
