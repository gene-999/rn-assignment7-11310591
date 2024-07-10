import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { SimpleLineIcons } from '@expo/vector-icons';
import {
  useFonts,
  ArefRuqaaInk_400Regular,
} from '@expo-google-fonts/aref-ruqaa-ink';
import { useNavigation } from "@react-navigation/native";


export default function Cart() {

  const navigation = useNavigation();

   handleHomePress = () => {
    navigation.navigate('Home');
  }
  
  const [total, setTotal] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  let totalAmount = 0;
  

useEffect(() => {
   async function loadCartItems(){
    try {
      setCartItems([]);
      const cartItemsString = await AsyncStorage.getItem('cartItems');
      console.log('cartItemsString:', cartItemsString);
      if (cartItemsString) {
        const parsedCartItems = JSON.parse(cartItemsString);
        
        parsedCartItems.forEach(cartItem => {
          fetch(`https://fakestoreapi.com/products/${cartItem}`)
            .then(res=>res.json())
            .then(json=>{
              console.log("json:",json);
              addItems(json);
        })});
      }
    } catch (error) {
      console.error('Error loading cart items:', error);
    }
  };

  loadCartItems();
}, [refresh]);


async function removeItem(id) {
  try {
    console.log('cartItems:', cartItems)
    const cartItemsString = await AsyncStorage.getItem('cartItems');
    if (cartItemsString) {
      const parsedCartItems = JSON.parse(cartItemsString);
      const newCartItems = parsedCartItems.filter((itemId) => itemId !== id);
      await AsyncStorage.setItem('cartItems', JSON.stringify(newCartItems));
      alert('Item removed successfully!');   
    }
  } catch (error) {
    console.error('Error removing item:', error);
  }
}

function addItems(item){

  console.log('Cart Items Size: ', cartItems.length);
  console.log('Item: ', item);
  console.log(cartItems.some(cartItem => (cartItem.id !== item.id)))
  if(!cartItems.some(cartItem => (cartItem.id === item.id))){
    setCartItems(prevCartItems => {
      return [
        ...prevCartItems,
        item
      ]
    })
    totalAmount += item.price;
    }
    setTotal(totalAmount);
    
  };




let [fontsLoaded] = useFonts({
  ArefRuqaaInk_400Regular,
});


if (!fontsLoaded) {
  return <AppLoading />;
} else {

  return (
  <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Image style={styles.logo} source={require('.././assets/Logo.png')} />
        <TouchableOpacity onPress={handleHomePress}>
        <Image style={[styles.icon, {marginRight:15}]} source={require('.././assets/Search.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.infoBar}>
        <Text style={[styles.heading,{fontFamily: 'ArefRuqaaInk_400Regular'}]}>Checkout</Text>  
      </View>
      <View style={styles.separator} />
     <FlatList 
      keyExtractor={(item) => item.id}
        data={cartItems}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <>
          <View style={[styles.catalog]}>
            <Image style={styles.itemImage} source={{uri:item.image}} />
            <TouchableOpacity onPressIn={ async () =>{ await removeItem(item.id); setRefresh(!refresh)}}>
              <Image style={styles.removeFromCart} source={require('.././assets/remove.png')} />
            </TouchableOpacity>
            { console.log('itemx:', cartItems)}
           <View style={styles.itemInfo}>
           <Text style={[styles.itemName,{fontFamily: 'ArefRuqaaInk_400Regular'}]}>{item.title}</Text>
            <Text style={[styles.itemDescription,{fontFamily: 'ArefRuqaaInk_400Regular'}]}>{item.category}</Text>
            <Text style={[styles.itemPrice,{fontFamily: 'ArefRuqaaInk_400Regular'}]}>${item.price}</Text>
           </View>
          </View> 
          </>
        )}
      />
      <View style={styles.totalInfo}>
      <Text style={[{fontFamily: 'ArefRuqaaInk_400Regular', left:-65, fontSize:24}]}>
        EST. TOTAL 
        </Text> 
        <Text style={[styles.itemPrice,{fontFamily: 'ArefRuqaaInk_400Regular', left:50,fontSize:25}]}>${total.toPrecision(4)}</Text>
      </View>
      <View style={styles.bottomTab}>
        <SimpleLineIcons name="handbag" size={24} color="white" style={{left:70}} />
        <Text style={[styles.heading,{fontFamily: 'ArefRuqaaInk_400Regular', color:'white',fontSize: 28,fontWeight: '300',left: -100,marginTop:-8}]}>Checkout</Text>
        
      </View>
    </SafeAreaView>
  );
}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  topBar : {
    marginTop: 15,
    height: 90,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  logo:{
    width: 100,
    height: 40,
    left: 120,
  },
  infoBar:{
    height: 90,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: -25,   
  },
  heading :{
    fontSize: 34,
    fontWeight: '300',
    left: 100,
  },
  catalog :{  
    flexDirection: 'row',
    padding: 5,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  itemImage :{
    width: 150,
    height: 180,
    resizeMode: 'contain', 
    marginRight: 8,
    
  },
  itemName :{
    fontSize: 15,
    fontWeight: '400',
    width: 180,
    marginTop: -10,
  },
  itemPrice :{
    fontSize: 18,
    fontWeight: '300',
    color:"#DD8560"
  },
  itemDescription :{
    fontSize: 18,
    fontWeight: '300',
    color:"#B9B9B9",
    width: 180,
    
  },
  removeFromCart: {
    top: 145,
    right: -125,
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  itemInfo: {
    padding: 10,
    top: 25,
    right: 30
  },

  bottomTab : {
    backgroundColor: 'black',
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },

  totalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginTop: -16,
    width:"45%"
  },

});





