import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  ArefRuqaaInk_400Regular,
} from "@expo-google-fonts/aref-ruqaa-ink";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({ ArefRuqaaInk_400Regular });
  const [refresh, setRefresh] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
      });
  }, [refresh]);
  onCartPress = () => {
    navigation.navigate("Cart");
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Image
              style={styles.icon}
              source={require(".././assets/Menu.png")}
            />
          </TouchableOpacity>
          <Image style={styles.logo} source={require(".././assets/Logo.png")} />
          <Image
            style={[styles.icon, { marginRight: -35 }]}
            source={require(".././assets/Search.png")}
          />
          <TouchableOpacity onPress={onCartPress}>
            <Image
              style={styles.icon}
              source={require(".././assets/shoppingBag.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.infoBar}>
          <Text
            style={[styles.heading, { fontFamily: "ArefRuqaaInk_400Regular" }]}
          >
            Our Story
          </Text>
          <MaterialCommunityIcons
            style={[
              styles.icon,
              {
                marginRight: -100,
                backgroundColor: "#F9F9F9",
                borderRadius: 100,
                height: 35,
                width: 35,
              },
            ]}
            name="format-list-checkbox"
            size={35}
            color="#868691"
          />
          <MaterialIcons
            style={{
              backgroundColor: "#F9F9F9",
              borderRadius: 100,
              height: 40,
              width: 40,
              marginRight: 5,
              padding: 5,
            }}
            name="filter-list"
            size={30}
            color="#E5A990"
          />
        </View>

        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={items}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          key={items.id}
          renderItem={({ item }) => (
            <>
              <View style={[styles.catalog]}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Item", { id: item.id })}
                >
                  <Image
                    style={styles.itemImage}
                    source={{ uri: item.image }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPressIn={async () => {
                    await save(item.id); 
                    setRefresh(!refresh);
                  }}
                >
                  <Image
                    style={styles.addCart}
                    source={require(".././assets/add_circle.png")}
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    styles.itemName,
                    { fontFamily: "ArefRuqaaInk_400Regular" },
                  ]}
                >
                  {item.title}
                </Text>
                <Text
                  style={[
                    styles.itemDescription,
                    { fontFamily: "ArefRuqaaInk_400Regular" },
                  ]}
                >
                  {item.category}
                </Text>
                <Text
                  style={[
                    styles.itemPrice,
                    { fontFamily: "ArefRuqaaInk_400Regular" },
                  ]}
                >
                  {" "}
                  ${item.price}
                </Text>
              </View>
            </>
          )}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "ArefRuqaa_400Regular",
    marginTop: 5,
    height: "100%",
  },
  topBar: {
    backgroundColor: "white",
    height: 90,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginLeft: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 5,
    marginLeft: 5,
  },
  logo: {
    width: 100,
    height: 40,
    marginLeft: 10,
  },
  infoBar: {
    backgroundColor: "white",
    height: 80,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginTop: -15,
    marginLeft: 15,
  },
  heading: {
    fontSize: 30,
    fontWeight: "300",
  },
  catalog: {
    marginLeft: 1,
    marginBottom: 8,
    marginRight: 4,
    padding: 6,
    width: "48%",
    backgroundColor: "white",
  },
  itemImage: {
    width: 140,
    height: 200,
    resizeMode: "contain",
  },
  itemName: {
    fontSize: 15,
    fontWeight: "400",
    width: 170,
    marginTop: -5,
    marginLeft: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "300",
    color: "#DD8560",
    marginLeft: 5,
  },
  itemDescription: {
    fontSize: 16,
    fontWeight: "300",
    color: "#B9B9B9",
    width: 160,
    marginLeft: 5,
    marginTop: -10,
  },
  addCart: {
    position: "absolute",
    bottom: 5,
    right: 10,
    width: 30,
  },
});

let cartItems = [];

async function save(value) {
  try {
    if (cartItems.includes(value)) {
      alert("Item already in cart!");
      return;
    }
    cartItems.push(value);
    const cartItemsString = JSON.stringify(cartItems);
    await AsyncStorage.setItem("cartItems", cartItemsString);
    alert("Cart items saved successfully!");
  } catch (error) {
    alert("Error saving cart items:", error);
  }
}
