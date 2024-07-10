
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import { useFonts, ArefRuqaaInk_400Regular} from '@expo-google-fonts/aref-ruqaa-ink';
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, } from 'react';
import ProductDetails from '../shipping';
import { ScrollView } from 'react-native-gesture-handler';




export default function Item({route}) {
  const { id } = route.params;
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({ArefRuqaaInk_400Regular});
  const [item, setItem] = useState([]);

  useEffect(() => {
  fetch(`https://fakestoreapi.com/products/${id? id: 0}`)
          .then(res=>res.json())
          .then(json=>
            {
          setItem(json);
          
          })
  }, [id])
  onCartPress = () => {
    navigation.navigate('Cart');
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.container} >
         <ScrollView>
         <View style={styles.topBar}>
         <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
           <Image style={styles.icon} source={require('.././assets/Menu.png')} />
            </TouchableOpacity>
           <Image style={styles.logo} source={require('.././assets/Logo.png')} />
           <Image style={[styles.icon, {marginRight:-35}]} source={require('.././assets/Search.png')} />
           <TouchableOpacity onPress={onCartPress}>
           <Image style={styles.icon} source={require('.././assets/shoppingBag.png')} />
            </TouchableOpacity>
         </View>
         <View style={[styles.catalog]}>
               <Image style={styles.itemImage} source={{uri:item.image}} />
                <View style={styles.topBar}>
                <Text style={[styles.itemName,{fontFamily: 'ArefRuqaaInk_400Regular'}]}>{item.title}</Text>
                <AntDesign name="upload" size={24} style={{marginTop:-10, marginLeft:30}} color="black" />
                </View>
               <Text style={[styles.itemDescription,{fontFamily: 'ArefRuqaaInk_400Regular'}]}>{item.category}</Text>
               <Text style={[styles.itemPrice,{fontFamily: 'ArefRuqaaInk_400Regular'}]}> ${item.price}</Text>
             </View>
         
         <ProductDetails 
         id = {item.id}
         />   
          </ScrollView>    
        
       </SafeAreaView>
     );
    }
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'ArefRuqaa_400Regular',
    height: '100%',
    marginTop:5
  },
  topBar : {
    backgroundColor: 'white',
    height: 90,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginLeft:5
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 5,
    marginLeft: 5,
  },
  logo:{
    width: 100,
    height: 40,
    marginLeft: 10,
  },
  infoBar:{
    backgroundColor: 'white',
    height: 80,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginLeft:15
  },
  heading :{
    fontSize: 30,
    fontWeight: '300',
  },
  catalog :{  
    marginLeft: 1,
    marginRight: 4,
    padding: 6,
    backgroundColor: 'white',
  },
  itemImage :{
    width: 300,
    height: 300,
    resizeMode: 'center',  
  },
  itemName :{
    fontSize: 25,
    fontWeight: '400',
    width: 270,
    marginBottom:-5,
    marginLeft:-8,
  },
  itemPrice :{
    fontSize: 22,
    fontWeight: '300',
    color:"#DD8560",
  },
  itemDescription :{
    fontSize: 22,
    fontWeight: '300',
    color:"#B9B9B9",
    marginTop: -5,
     marginLeft:4,
  },
});





