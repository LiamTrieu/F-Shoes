import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, View } from "native-base";
import ProductDetailScreen from "./screen/ProductDetailScreen";
import TabNavigator from "./navigator/TabNavigator";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Image, TouchableOpacity } from "react-native";
import BillScreen from "./screen/BillScreen";
import { Provider, useDispatch } from "react-redux";
import store from "./service/store";
import Init from "./layout/Init";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <Init>
        <NativeBaseProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={TabNavigator}
                options={options}
              />
              <Stack.Screen
                name="ProductDetails"
                component={ProductDetailScreen}
                options={options}
              />
              <Stack.Screen
                name="Cart"
                component={BillScreen}
                options={options}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </Init>
    </Provider>
  );
}

const HeaderLogo = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate("Home")}>
    <Image
      source={require("./assets/image/logowebnobg.png")}
      style={{ width: 100, height: 40, resizeMode: "contain" }}
    />
  </TouchableOpacity>
);

const HeaderRight = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
    <Icon name={"cart"} size={25} />
  </TouchableOpacity>
);

const options = ({ navigation }) => ({
  headerTitle: () => <HeaderLogo navigation={navigation} />,
  headerStyle: { backgroundColor: "white" },
  headerTitleStyle: { color: "white" },
  headerTitleAlign: "center",
  headerRight: () => <HeaderRight navigation={navigation} />,
});
