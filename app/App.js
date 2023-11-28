import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet, View, ActivityIndicator, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "./component/HomeScreen";
import ProductScreen from "./component/ProductScreen";
import clientProductApi from "./api/clientProductApi";

const Tab = createBottomTabNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await clientProductApi.check();
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.splashContainer}>
        <Image
          source={require("./assets/splash.png")}
          style={styles.splashImage}
        />
        <ActivityIndicator size="large" color="#f2741f" />
        <Text style={styles.loadingText}>Server free, vui lòng đợi!</Text>
      </View>
    );
  }
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
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Background color
  },
  splashImage: {
    width: 600,
    height: 600,
    resizeMode: "contain",
    marginBottom: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#f2741f",
    fontWeight: "bold",
  },
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
