import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "./component/HomeScreen";
import ProductScreen from "./component/ProductScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Trang chủ") {
              iconName = "home";
            } else if (route.name === "Sản phẩm") {
              iconName = "shoe-sneaker";
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#f2741f",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: [
            {
              display: "flex",
            },
            null,
          ],
        })}>
        <Tab.Screen
          name="Trang chủ"
          component={HomeScreen}
          options={{
            headerTitle: (props) => (
              <View style={styles.headerContainer}>
                <Image
                  source={require("./assets/image/logowebnobg.png")}
                  style={styles.headerImage}
                />
              </View>
            ),
            headerStyle: { backgroundColor: "white" },
            headerTitleStyle: { color: "white" },
            headerTitleAlign: "center",
          }}
        />
        <Tab.Screen
          name="Sản phẩm"
          component={ProductScreen}
          options={{
            headerTitle: (props) => (
              <View style={styles.headerContainer}>
                <Image
                  source={require("./assets/image/logowebnobg.png")}
                  style={styles.headerImage}
                />
              </View>
            ),
            headerStyle: { backgroundColor: "white" },
            headerTitleStyle: { color: "white" },
            headerTitleAlign: "center",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerImage: {
    width: 100,
    resizeMode: "contain",
  },
});
