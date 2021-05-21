import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput  } from 'react-native';


export default function App() {
  const [originalPrice, setOriginalPrice] = useState('')
  const [discount, setDiscount] = useState('')
  const [saved, setSaved] = useState('0.00')
  const [finalPrice, setFinalPrice] = useState('0.00')

  const calculate = () => {
    if(originalPrice != '' && discount != ''){
      var savedAmount = (originalPrice*discount)/100;
      var finalPrice = originalPrice - savedAmount;
      setSaved(savedAmount.toFixed(2))
      setFinalPrice(finalPrice.toFixed(2))
    }
  }

  


  return (
    <View style={styles.container}>
      <Text style={styles.title}><h1>Discount App</h1></Text>

      <TextInput style={styles.textField} 
        onChangeText={setOriginalPrice} 
        value={originalPrice} 
        placeholder="Original Price"
        placeholderTextColor="grey"/> 
      
      <TextInput style={styles.textField} 
        onChangeText={setDiscount} 
        value={discount} 
        placeholder="Discount Percentage"
        placeholderTextColor="grey"/>

      <Text>You Save: {saved}</Text>
      <Text>Final Price: {finalPrice}</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080808',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
    textShadowColor: '#6441a4',
    textShadowOffset: { width: 3, height: 2 },
    textShadowRadius: 3,
    
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    
  },
  textField: {
    height: 50,
    width: 250,
    borderColor: '#6441a4',
    borderWidth: 1,
    paddingLeft: 10,
    fontSize: 15,
    borderRadius: 2,
    borderWidth: 3,
    color: 'white',
    marginBottom: 15
  },
  calculations: {

  }
});
