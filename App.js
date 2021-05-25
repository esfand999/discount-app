import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import { DataTable } from 'react-native-paper';
import { useEffect } from 'react';

const HomeScreen = ({ route, navigation }) => {

  const [originalPrice, setOriginalPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [historyArray, setHistoryArray] = useState([]);


  const priceLimits = (num) => {
    if (num > 0 || num == '') {
      setOriginalPrice(num);
    }
  };

  const discountLimits = (num) => {
    if (num >= 0 && num <= 100) {
      setDiscount(num);
    }
  };


  useEffect(() => {
    if (route.params?.historyArray2) {
      setHistoryArray(route.params?.historyArray2);
    }
  }, 
  [route.params?.historyArray2]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => navigation.navigate('History', {historyArray})}>
          <Icon name="history" size={20} color="#6441a4" />
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discount App</Text>

      <TextInput
        style={styles.textField}
        onChangeText={priceLimits}
        value={originalPrice}
        placeholder="Original Price"
        keyboardType="numeric"
        placeholderTextColor="grey"
      />

      <TextInput
        style={styles.textField}
        onChangeText={discountLimits}
        value={discount}
        placeholder="Discount Percentage"
        keyboardType="numeric"
        placeholderTextColor="grey"
      />

      <Text style={styles.result}>
        You Save: {((discount / 100) * originalPrice).toFixed(2)}
      </Text>
      <Text style={styles.result}>
        Final Price:{' '}
        {(originalPrice - (discount / 100) * originalPrice).toFixed(2)}
      </Text>

      <TouchableOpacity
        onPress={() => {
          var calculate = {
            origPrice: originalPrice,
            disc: discount,
            finalPrice: parseFloat(originalPrice - (discount / 100) * originalPrice).toFixed(2),
          };
          setHistoryArray([...historyArray, calculate]);
          setOriginalPrice('');
          setDiscount('');
        }}
        style={[
          styles.saveButton,
          { backgroundColor: originalPrice == '' || discount == '' ? 'grey' : '#6441a4' },
        ]}
        disabled={originalPrice == '' || discount == ''}>
        <Text style={styles.saveButtonText}>Save Result</Text>
      </TouchableOpacity>
    </View>
  );
};

const HistoryScreen = ({ navigation, route }) => {

  const { historyArray } = route.params;
  const [historyArray2, setHistoryArray2] = useState(historyArray);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(false);

  const remove = (value) => {
    var list = historyArray2.filter((item) => item != value);
    setHistoryArray2(list);
    setDeleteStatus(true);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Clear history?</Text>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={styles.modalButtons}
                    onPress={() => {
                      navigation.navigate({
                        name: 'Home Screen',
                        params: { historyArray2: [] },
                        merge: true,
                      });
                    }}>
                    <Text style={styles.modalButtonText}>
                      Yes
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.modalButtons}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.modalButtonText}>
                      No
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: '#f1f1f1', padding: 10}}>Clear All</Text>
            <TouchableOpacity
              disabled={historyArray2.length > 0 ? false : true}
              onPress={() => setModalVisible(true)}
              style={{
                alignItems: 'center',
                padding: 10,
                borderRadius: 100,
                marginRight: 10,
                backgroundColor: historyArray2.length > 0 ? '#f1f1f1' : 'grey'}}>
              <Icon name="delete" size={20} color="#6441a4"/>
            </TouchableOpacity>
          </View>
        </View>
        
      ), 
    });
  });


  return (
    <View style={styles.dataTable}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title numeric>
            Original Price
          </DataTable.Title>

          <DataTable.Title numeric>
            Discount
          </DataTable.Title>

          <DataTable.Title numeric>
            Final Price
          </DataTable.Title>

          <DataTable.Title numeric>
            Delete
          </DataTable.Title>
        </DataTable.Header>

        {historyArray2.map((item, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell numeric>{item.origPrice}</DataTable.Cell>
            <DataTable.Cell numeric>{item.disc}%</DataTable.Cell>
            <DataTable.Cell numeric>{item.finalPrice}</DataTable.Cell>
            <DataTable.Cell numeric>
              <TouchableOpacity
                onPress={() => {
                    console.log(index);
                    remove(item);
                  }}>
                <Icon name="delete" size={20} color="#6441a4" />
              </TouchableOpacity>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};

const Stack = createStackNavigator();

export default function App({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home Screen"
          component={HomeScreen}
          options={{
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#f1f1f1',
            },
            headerStyle: {
              backgroundColor: '#6441a4',
            },
          }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#f1f1f1',
            },
            headerStyle: {
              backgroundColor: '#6441a4',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
    textShadowColor: '#6441a4',
    textShadowOffset: { width: -3, height: 2 },
    textShadowRadius: 1,
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textField: {
    height: 50,
    width: 250,
    borderColor: '#6441a4',
    borderWidth: 2,
    paddingLeft: 10,
    fontSize: 15,
    borderRadius: 2,
    color: '#f1f1f1',
    marginBottom: 15,
    backgroundColor: '#111111',
  },
  result: {
    fontSize: 15,
    color: '#f1f1f1',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: '#6441a4',
    padding: 10,
    width: 200,
    margin: 50,
    borderRadius: 7,
  },
  saveButtonText: {
    color: '#f1f1f1',
    fontWeight: 'bold',
    fontSize: 15,
  },
  historyButton: {
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 100,
    marginRight: 10,
  },
  dataTable: {
    flex: 1,
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    width: 250,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'indigo',
    textAlign: 'center',
  },
  modalButtons: {
    marginRight: 10,
    paddingVertical: 2,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderRadius: 50,
  },
  modalButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6441a4',
  }
});
