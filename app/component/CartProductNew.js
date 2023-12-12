import React, { useEffect, useState } from "react";
import IconFontisto from "react-native-vector-icons/Fontisto";
import { useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Pressable,
} from "react-native";

import ColorSelection from "../layout/ColorSelection ";
import colorPromotion from "./../service/colorPromotion";
import SizeSelection from "../layout/SizeSelection";
import PriceProduct from "../layout/PriceProduct";
import { HStack } from "native-base";
import Swiper from "react-native-swiper";

export default function CartProductNew({ products, navigation, setLoading }) {
  const swiperRef = useRef(null);

  useEffect(() => {
    const autoScroll = setInterval(() => {
      if (swiperRef.current) {
        swiperRef.current.scrollBy(1, true);
      }
    }, 5000);

    return () => clearInterval(autoScroll);
  }, []);

  const processArray = (inputArray) => {
    const fields = [
      "idProduct",
      "idSole",
      "idCategory",
      "idBrand",
      "idMaterial",
    ];
    const groupedItems = {};

    inputArray.forEach((item) => {
      const key = fields.map((field) => item[field]).join("-");
      const colorKey = item.idColor;

      if (!groupedItems[key]) {
        groupedItems[key] = { ...item, duplicates: { [colorKey]: [item] } };
      } else {
        if (!groupedItems[key].duplicates[colorKey]) {
          groupedItems[key].duplicates[colorKey] = [item];
        } else {
          groupedItems[key].duplicates[colorKey].push(item);
        }
      }
    });
    const newArrMap = Object.values(groupedItems).map((group) => {
      group.duplicates = Object.values(group.duplicates).map((colorGroup) => {
        return {
          idColor: colorGroup[0].idColor,
          codeColor: colorGroup[0].codeColor,
          nameColor: colorGroup[0].nameColor,
          sizes: colorGroup,
        };
      });
      return group;
    });
    return newArrMap.slice(0, 8);
  };

  const [arrMap, setArrMap] = useState([]);
  useEffect(() => {
    setLoading(true);
    const uniqueFields = [
      "idProduct",
      "idSole",
      "idCategory",
      "idBrand",
      "idMaterial",
    ];
    const processedArray = processArray(products, uniqueFields).map(
      (product) => {
        return {
          ...product,
          duplicate: product.duplicates[0],
          ...product.duplicates[0].sizes[0],
        };
      }
    );
    setArrMap(processedArray);
    setLoading(false);
  }, [products]);

  return (
    <View style={styles.container}>
      {arrMap.map((product, i) => {
        const discountValue = product.value || 0;
        return (
          <TouchableOpacity
            key={"cartNewProduct" + i}
            style={styles.productContainer}
            onPress={() =>
              navigation.navigate("ProductDetails", {
                id: product.id,
              })
            }>
            <View>
              <View style={{ width: "100%", aspectRatio: 1 }}>
                {product.value && (
                  <View
                    style={{
                      backgroundColor: colorPromotion(discountValue),
                      ...styles.discountBadge,
                    }}>
                    <Text style={{ color: "white" }}>{`${
                      discountValue ? discountValue : ""
                    }%`}</Text>
                  </View>
                )}
                <View style={styles.imageNew}>
                  <Image
                    source={require("../assets/image/new.png")}
                    style={{ width: 50, height: 50 }}
                  />
                </View>
                <Swiper
                  containerStyle={{ borderRadius: 10, overflow: "hidden" }}
                  removeClippedSubviews={false}
                  loop
                  autoplay
                  showsPagination={false}>
                  {product.image.map((image, index) => {
                    return (
                      <Image
                        key={i + "image" + index}
                        source={{ uri: image }}
                        alt="anh"
                        style={{
                          height: "100%",
                          borderRadius: 10,
                        }}
                      />
                    );
                  })}
                </Swiper>
              </View>
              <View style={styles.layoutColor}>
                <Text
                  style={styles.nameBrand}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {product.nameBrand}
                </Text>
                <ColorSelection
                  arrMap={arrMap}
                  i={i}
                  product={product}
                  setArrMap={setArrMap}
                  navigation={navigation}
                />
              </View>
              <View>
                <Text
                  style={{
                    ...styles.nameProduct,
                    paddingLeft: 5,
                    paddingRight: 5,
                    paddingTop: 3,
                    maxWidth: 200,
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {product.name}
                </Text>
              </View>
              <PriceProduct product={product} />
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  paddingRight: 5,
                  justifyContent: "space-between",
                }}>
                <SizeSelection product={product} navigation={navigation} />
                <HStack space={1} marginLeft={1}>
                  <Pressable
                    style={{
                      height: 20,
                      width: 55,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "green",
                      borderRadius: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "white",
                      }}>
                      <IconFontisto
                        name="shopping-basket-add"
                        size={10}
                        color={"white"}
                      />
                      &nbsp; Thêm
                    </Text>
                  </Pressable>
                </HStack>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginTop: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productContainer: {
    width: "48.5%",
    padding: 5,
    paddingBottom: 10,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  swiper: {
    width: "100%",
    aspectRatio: 1,
  },
  layoutColor: {
    flexDirection: "row",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: "space-between",
  },
  nameBrand: {
    lineHeight: 20,
    fontSize: 13,
    color: "#F48A42",
    fontWeight: "bold",
    maxWidth: 100,
  },
  nameProduct: {
    paddingBottom: 5,
    lineHeight: 20,
    fontSize: 17,
    color: "black",
    fontWeight: "bold",
    maxWidth: 100,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  imageNew: {
    padding: 5,
    position: "absolute",
    top: -10,
    right: -10,
    zIndex: 1000,
  },
  discountBadge: {
    padding: 5,
    borderRadius: 5,
    position: "absolute",
    top: 5,
    left: 5,
    zIndex: 1000,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
