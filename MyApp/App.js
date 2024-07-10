import {useState} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './pages/home';
import Cart from './pages/cart';
import {
  useFonts,
  ArefRuqaaInk_400Regular,
} from "@expo-google-fonts/aref-ruqaa-ink";
import Item from './pages/item';



const Drawer = createDrawerNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({ ArefRuqaaInk_400Regular });
  if(fontsLoaded){
  return (
    <NavigationContainer >
      <Drawer.Navigator initialRouteName="Home"screenOptions={{ 
          headerShown: false,
          drawerLabelStyle: { fontFamily: 'ArefRuqaaInk_400Regular', fontWeight:'400'},
          drawerActiveBackgroundColor:'white',
          drawerActiveTintColor: 'black',
        }}>
         <Drawer.Screen name='Eric Atsu' component={Home}/>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name='Item' component={Item}/>
        <Drawer.Screen name="Cart" component={Cart} />
        <Drawer.Screen name="Location" component={()=>{<></>}} />  
        <Drawer.Screen name="Blog" component={()=>{<></>}} />  
        <Drawer.Screen name="Jewelry" component={()=>{<></>}} />  
        <Drawer.Screen name="Electronic" component={()=>{<></>}} /> 
        <Drawer.Screen name="Clothing" component={()=>{<></>}} />        
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
}

