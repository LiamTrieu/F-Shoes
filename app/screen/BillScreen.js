import { Button, HStack, Input, Text } from "native-base";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function BillScreen() {
  const [orderCode, setOrderCode] = useState("");

  const handleInputChange = (text) => {
    setOrderCode(text);
  };

  const handlePress = () => {
    // Xử lý khi người dùng nhấn nút (ví dụ: kiểm tra mã đơn hàng)
    console.log("Order Code:", orderCode);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nhập mã đơn hàng</Text>
      <HStack space={1} justifyContent="center">
        <Input
          isFullWidth
          placeholder="Nhập mã đơn hàng"
          value={orderCode}
          onChangeText={handleInputChange}
        />
        <Button
          leftIcon={<Icon name="search" color={"white"} />}
          onPress={handlePress}
          style={{ backgroundColor: "#f2741f" }}>
          Tìm kiếm
        </Button>
      </HStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
});
