import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import tw from 'twrnc';

const FormInput = ({ placeholder,value, onChangeText, secureTextEntry }: any) => {
  return (
    <View style={tw`border-2 h-[53px] text-[13px] border-gray-700 w-full py-2 px-4 focus:border-white rounded-[10px]`}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#fff"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={[styles.input, { color: '#fff' }]}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  input: {
    padding: 5,
    color: '#fff',
    fontFamily: 'PoppinsMain',
  },
});