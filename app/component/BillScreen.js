import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

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
      <TextInput
        style={styles.input}
        placeholder="Nhập mã đơn hàng"
        value={orderCode}
        onChangeText={handleInputChange}
      />
      <Button title="Xác nhận" onPress={handlePress} />
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: "100%",
  },
});
