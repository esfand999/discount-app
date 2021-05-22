
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput  } from 'react-native';


function App() {
  const [originalPrice, setOriginalPrice] = useState('')
  const [discount, setDiscount] = useState('')
  // const [saved, setSaved] = useState('0.00')
  // const [finalPrice, setFinalPrice] = useState('0.00')

  // const calculate = () => {
  //   if(originalPrice != '' && discount != ''){
  //     var saved = (originalPrice*discount)/100;
  //     var finalPrice = originalPrice - saved;
  //     setSaved(saved.toFixed(2))
  //     setFinalPrice(finalPrice.toFixed(2))
  //   }
  // }

  const priceLimits = (num) => {
    if (num > 0 || num == "") {
      setOriginalPrice(num);
    }
  }
  
  const discountLimits = (num) => {
    if (num >= 0 && num <= 100) {
      setDiscount(num);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}><h1>Discount App</h1></Text>

      <TextInput style={styles.textField} 
        onChangeText = {priceLimits}
        value={originalPrice} 
        placeholder="Original Price"
        keyboardType="numeric"
        placeholderTextColor="grey"/>
      
      <TextInput style={styles.textField} 
        onChangeText={discountLimits} 
        value={discount} 
        placeholder="Discount Percentage"
        keyboardType="numeric"
        placeholderTextColor="grey"/>

      <Text style={styles.result}>You Save: {((discount / 100 * originalPrice)).toFixed(2)}</Text>
      <Text style={styles.result}>Final Price: {(originalPrice - (discount / 100) * originalPrice).toFixed(2)}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252525',
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
  // input: {
  //   height: 40,
  //   margin: 12,
  //   borderWidth: 1,
  // },
  textField: {
    height: 50,
    width: 250,
    borderColor: '#6441a4',
    borderWidth: 1,
    paddingLeft: 10,
    fontSize: 15,
    borderRadius: 2,
    color: 'white',
    marginBottom: 15,
    backgroundColor: '#111111'
  },
  result: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  }
});

export default App;

