

import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useFonts, ArefRuqaaInk_400Regular} from '@expo-google-fonts/aref-ruqaa-ink';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProductDetails = (props) => {
    let [fontsLoaded] = useFonts({ArefRuqaaInk_400Regular});
    if(fontsLoaded){
    return (
   
      <View style={styles.container}>
        <Text style={styles.heading}>MATERIALS</Text>
        <Text style={[styles.description,{color:"gray",fontFamily: 'ArefRuqaaInk_400Regular'}]}>
          We work with monitoring programmes to ensure compliance with safety, health and quality standards for our products.
        </Text>
        
        <View style={styles.instructionContainer}>
          <Image source={require('./assets/Do Not Bleach.png')} style={styles.icon} />
          <Text style={styles.instructionText}>Do not use bleach</Text>
        </View>
  
        <View style={styles.instructionContainer}>
          <Image source={require('./assets/Do Not Tumble Dry.png')} style={styles.icon} />
          <Text style={styles.instructionText}>Do not tumble dry</Text>
        </View>
  
        <View style={styles.instructionContainer}>
          <Image source={require('./assets/Do Not Wash.png')} style={styles.icon} />
          <Text style={styles.instructionText}>Dry clean with tetrachloroethylene</Text>
        </View>
  
        <View style={styles.instructionContainer}>
          <Image source={require('./assets/Iron Low Temperature.png')} style={styles.icon} />
          <Text style={styles.instructionText}>Iron at a maximum of 110°C/230°F</Text>
        </View>
  
        <View style={styles.separator} />
        <View style={styles.shippingContainer}>
          <Image source={require('./assets/Shipping.png')} style={styles.icon} />
          <View style={styles.shippingTextContainer}>
            <MaterialIcons name="keyboard-arrow-up" size={28} color="gray" style={{left:225, bottom:-20}} />
            <Text style={styles.shippingText}>Free Flat Rate Shipping</Text>
            <Text style={styles.estimatedDelivery}>Estimated to be delivered on</Text>
            <Text style={styles.deliveryDate}>09/11/2021 - 12/11/2021</Text> 
          </View>
        </View>
        <TouchableOpacity onPress={async () => {await addToBasket(props.id)}}>
        <View style={styles.bottomTab}>
        <AntDesign name="plus" size={32} style={{left:10}} color="white" />
        <Text style={[styles.heading,{fontFamily: 'ArefRuqaaInk_400Regular', color:'white',fontSize: 28,fontWeight: '300',left: -40,marginTop:-8}]}>Add To Basket</Text>
        <SimpleLineIcons name="heart" size={24} style={{right:25}} color="white" /> 
      </View>
      </TouchableOpacity>
      </View>
    );
  }};
  
  const styles = StyleSheet.create({
    container: {
      marginLeft:15,
      backgroundColor: '#fff',
      
    },
    heading: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 8,
      fontFamily: 'ArefRuqaaInk_400Regular',
    },
    description: {
      fontSize: 16,
      color: '#555',
      marginBottom: 16,
      fontFamily: 'ArefRuqaaInk_400Regular',
    },
    instructionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    icon: {
      width: 24,
      height: 24,
      marginRight: 8,
      backgroundColor: 'white',
    },
    instructionText: {
      fontSize: 16,
      color: 'gray',
      fontFamily: 'ArefRuqaaInk_400Regular',
    },
    separator: {
      height: 1,
      backgroundColor: '#ccc',
      marginVertical: 16,
      width:"80%"
    },
    shippingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: -28,
    },
    shippingTextContainer: {
      marginLeft: 8,
    },
    shippingText: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    estimatedDelivery: {
      fontSize: 12,
      color: '#777',
    },
    deliveryDate: {
      fontSize: 12,
      color: 'gray',
    },
    bottomTab : {
      backgroundColor: 'black',
      height: 60,
      width: '200',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop:5,
      marginLeft: -15,
    },
  });
  
  async function addToBasket(id){
    try {
      const cartItemsString = await AsyncStorage.getItem('cartItems');
      if (cartItemsString) {
        const parsedCartItems = JSON.parse(cartItemsString);
        const newCartItems = [...parsedCartItems, id]; 
        await AsyncStorage.setItem('cartItems', JSON.stringify(newCartItems)); 
        alert('Item added to basket');
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  
  }

  export default ProductDetails;