import { ScrollView, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PoppinText } from '@/components/StyledText';
import { Radio } from '@/components';
import { useState , useEffect } from 'react';
import CustomButton from '@/components/CustomButton';
import { Ionicons } from '@expo/vector-icons';
import { View } from '@/components/Themed';
import * as MailComposer from 'expo-mail-composer'

const report = () => {
  const [isAvailable,setIsAvailabe] = useState(false);
  const [body,setBody] = useState<any>(undefined)

  useEffect(()=>{
   async function checkAvailability (){
     const isMailAvailable = await MailComposer.isAvailableAsync();
     setIsAvailabe(isMailAvailable);
   }

   checkAvailability()

  },[])

  const sendMail=async ()=>{
    if(body.length == 0 ){
      return <PoppinText style={tw`text-red-800 text-xl`}>No issue or subject added</PoppinText>
    }
    MailComposer.composeAsync({
      subject:"Reporting issue",
      body:body,
      recipients:["mugabejeanaime96@gmail.com"]
    })
  }

  return (
    <SafeAreaView style={[styles.container, tw`py-4`]}>
        <View style={tw`flex flex-row items-center gap-4 py-4 px-6 bg-transparent`}>
          <Ionicons name="document-text-outline" color={'#6B6B6B'} size={23} />
          <PoppinText style={tw`text-[#fff] text-[15px]`}>
            Report
          </PoppinText>
        </View>
        <ScrollView style={tw`px-6`}>
        <PoppinText style={tw`text-white text-[15px] py-4`}>
          How would you describe the privacy issue you met or that occurred
        </PoppinText>
        <View style={tw`flex flex-col gap-6 bg-transparent py-4`}>
          <Radio
            options={[
              { label: 'Card Withdrawal', value: 'Card Withdrawal' },
              {
                label: 'I don’t know what happened',
                value: 'I don’t know what happened',
              },
              { label: 'Other', value: 'Other' },
            ]}
            checkedValue={body}
            onChange={setBody}
            style={{ marginBottom: 15 }}
          />
        </View>
        <PoppinText style={tw`text-white text-[15px] pb-3`}>
          If your answer was Others. Please explain in details{' '}
        </PoppinText>
        <TextInput
          style={[
            {
              borderWidth: 2,
              borderColor: '#374151',
              height: 100,
              color: '#fff',
              borderRadius: 10,
              textAlignVertical: 'top',
            },
            tw`p-4 text-[14px]`,
          ]}
          placeholder="Please explain in brief"
          placeholderTextColor="#FFFFFF"
          multiline={true}
          numberOfLines={8}
          value={body}
          onChangeText={setBody}
        />
        <View style={[{ alignSelf: 'flex-end' }, tw`bg-transparent`]}>
          <CustomButton
            title={'Submit'}
            icon={
              <Ionicons
                name="chevron-forward-outline"
                size={25}
                color={'#fff'}
              />
            }
            customStyles="border-2 border-gray-700 bg-transparent my-6 w-[130px] text-[15px]"
            customText="text-white"
            handlePress={sendMail}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default report;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A1027',
    flex: 1,
  },
  textArea: {
    textAlignVertical: 'top',
  },
});
