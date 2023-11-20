import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { Button, Title, Subheading } from "react-native-paper";
import Swiper from "react-native-swiper";
import clientProductApi from "../api/clientProductApi";
import CartProduct from "./CartProduct";
import CartProductSelling from "./CartProductSelling";

export default function HomeScreen() {
  const swiperRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [sellingProducts, setSellingProducts] = useState([]);
  const images = [
    "https://storage.pixteller.com/designs/designs-images/2020-12-21/05/sneakers-sport-gym-sale-banner-1-5fe0c474a5fdf.png",
    "https://storage.pixteller.com/designs/designs-images/2020-12-21/05/sport-shoes-sale-banner-1-5fe0c471dbecb.png",
    "https://storage.pixteller.com/designs/designs-images/2020-12-21/05/gym-shoes-sale-banner-1-5fe0c46cc78bc.png",
  ];
  useEffect(() => {
    const autoScroll = setInterval(() => {
      if (swiperRef.current) {
        swiperRef.current.scrollBy(1, true);
      }
    }, 5000);

    return () => clearInterval(autoScroll);
  }, []);
  useEffect(() => {
    clientProductApi.getProductHome().then((result) => {
      const data = result.data.data;
      setProducts(
        data.map((e) => {
          return {
            id: e.id,
            title: e.name,
            priceBefort: e.price,
            priceAfter: e.price,
            value: e.value,
            promotion: e.promotion,
            statusPromotion: e.statusPromotion,
            image: e.image.split(","),
            nameCate: e.nameCate,
            nameBrand: e.nameBrand,
            idProduct: e.idProduct,
            idColor: e.idColor,
            idMaterial: e.idMaterial,
            idSole: e.idSole,
            idCategory: e.idCategory,
            idBrand: e.idBrand,
          };
        })
      );
    });
  }, []);

  useEffect(() => {
    clientProductApi.getSellingProduct().then((result) => {
      const data = result.data.data;
      setSellingProducts(
        data.map((e) => {
          return {
            id: e.id,
            title: e.name,
            priceBefort: e.price,
            priceAfter: e.price,
            value: e.value,
            amount: e.amount,
            promotion: e.promotion,
            statusPromotion: e.statusPromotion,
            image: e.image.split(","),
            idProduct: e.idProduct,
            idColor: e.idColor,
            idMaterial: e.idMaterial,
            idSole: e.idSole,
            idCategory: e.idCategory,
            idBrand: e.idBrand,
          };
        })
      );
    });
  }, []);

  return (
    <ScrollView>
      <Swiper ref={swiperRef} style={{ height: 200 }}>
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={{ flex: 1 }}
            resizeMode="cover"
          />
        ))}
      </Swiper>
      <Title
        style={{ textAlign: "center", marginVertical: 10, fontWeight: "900" }}>
        RUN YOUR RUN
      </Title>
      <Subheading style={{ textAlign: "center", marginHorizontal: 20 }}>
        Follow the feeling that keeps you running your best in the city
      </Subheading>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginVertical: 10,
        }}>
        <Button
          mode="contained"
          style={{ backgroundColor: "black", marginRight: -30 }}>
          Shop Apparel
        </Button>
        <Button
          mode="contained"
          style={{ backgroundColor: "black", marginLeft: -30 }}>
          Shop Apparel
        </Button>
      </View>
      <Title style={{ textAlign: "center", marginVertical: 10 }}>Just In</Title>
      <Image
        source={require("../assets/image/image.jpg")}
        style={{ width: "100%", height: 200 }}
      />
      <View style={{ alignItems: "center", paddingVertical: 10 }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 10,
            padding: 5,
            width: "70%",
            marginTop: 10,
          }}>
          <Text
            style={{ fontSize: 25, textAlign: "center", fontWeight: "900" }}>
            Sản phẩm mới
          </Text>
        </View>
      </View>
      <View style={{ alignItems: "center", paddingVertical: 10 }}>
        <CartProduct products={products} />
      </View>
      <View style={{ alignItems: "center", paddingVertical: 10 }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 10,
            padding: 5,
            width: "70%",
            marginTop: 10,
          }}>
          <Text
            style={{ fontSize: 25, textAlign: "center", fontWeight: "900" }}>
            Sản phẩm bán chạy
          </Text>
        </View>
      </View>
      <View style={{ alignItems: "center", paddingVertical: 10 }}>
        <CartProductSelling products={sellingProducts} />
      </View>
    </ScrollView>
  );
}
