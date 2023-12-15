import {
  Button,
  Divider,
  HStack,
  Heading,
  Image,
  Skeleton,
  Text,
  View,
} from "native-base";
import React, { useEffect, useState } from "react";
import IconFontisto from "react-native-vector-icons/Fontisto";
import clientApi from "../api/clientApi";
import { RefreshControl, ScrollView, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import { formatCurrency } from "../service/formatCurrency";
import { isColorDark } from "./../service/isColorDark";
import CartProduct from "./../component/CartProduct";
import colorPromotion from "../service/colorPromotion";

const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
  const discountAmount = (discountPercentage / 100) * originalPrice;
  const discountedPrice = originalPrice - discountAmount;
  return discountedPrice;
};

export default function ProductDetailScreen({ route, navigation }) {
  const id = route.params?.id || null;
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [product, setProduct] = useState({ image: [], price: "" });
  const [colors, setColors] = useState([]);
  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    fetchData(id);
  }, [id]);

  useEffect(() => {
    if (product) {
      clientApi
        .getSizes({
          idProduct: product.idProduct,
          idColor: product.idColor,
          idCategory: product.idCategory,
          idBrand: product.idBrand,
          idSole: product.idSole,
          idMaterial: product.idMaterial,
        })
        .then(
          (result) => {
            setSizes(result.data.data);
          },
          (e) => {
            console.error(e);
          }
        );
    }
    clientApi
      .getCungLoai({
        category: product.idCategory,
        brand: product.idBrand,
        product: product.idProduct,
        color: product.idColor,
        sole: product.idSole,
        material: product.idMaterial,
      })
      .then((result) => {
        const data = result.data.data;
        setProducts(
          data.map((e) => {
            return {
              ...e,
              image: e.image.split(","),
            };
          })
        );
      });
  }, [product]);

  async function fetchData(id) {
    setLoading(true);
    const resultProduct = await clientApi.getById(id);
    if (resultProduct.data.success) {
      const data = resultProduct.data.data;
      const resultColor = await clientApi.getColors({
        idProduct: data.idProduct,
        idCategory: data.idCategory,
        idBrand: data.idBrand,
        idSole: data.idSole,
        idMaterial: data.idMaterial,
        idSize: data.idSize,
      });
      if (resultColor.data.success) {
        setColors(resultColor.data.data);
      }
      setProduct({
        ...data,
        image: data.image.split(","),
      });
    }
    setLoading(false);
    setRefreshing(false);
  }

  if (id === null) {
    navigation.goBack();
  }
  return loading ? (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            fetchData(id);
          }}
        />
      }
      style={{ backgroundColor: "white" }}>
      <View px={3}>
        <Skeleton h={"80"} />
        <Skeleton h={"10"} pt="3" px="1" />
        <Skeleton.Text px="1" py="5" />
        <Skeleton.Text px="1" py="5" />
        <HStack>
          <Skeleton h={"40"} w={"32"} />
          <Skeleton h={"40"} w={"32"} mx="2" />
          <Skeleton h={"40"} w={"32"} />
        </HStack>
      </View>
    </ScrollView>
  ) : (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchData(id);
            }}
          />
        }
        style={{ backgroundColor: "white", height: "94%" }}>
        {/* <Text>{JSON.stringify(product)}</Text> */}
        <Swiper
          style={{ height: 400 }}
          removeClippedSubviews={false}
          loop
          autoplay
          dot={
            <View
              style={{
                backgroundColor: "rgba(0,0,0,.2)",
                width: 4,
                height: 4,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: "black",
                width: 6,
                height: 6,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,
              }}
            />
          }>
          {product.image.map((image, index) => {
            return (
              <Image
                key={"imageDetail" + index}
                source={{ uri: image }}
                alt="anh"
                style={{
                  height: "95%",
                  borderRadius: 20,
                  margin: 15,
                }}
              />
            );
          })}
        </Swiper>
        <View px={4}>
          <Text
            mt={2}
            style={{
              fontSize: 18,
              color: "#F48A42",
              fontWeight: "bold",
            }}>
            {product.nameCate}
          </Text>
          <Heading fontSize={25} mt={1}>
            {product.name}
          </Heading>
          <View>
            {product.value ? (
              <Text style={{ fontSize: 30, lineHeight: 40 }}>
                <Text
                  style={{
                    color: "red",
                    fontWeight: "bold",
                  }}>
                  {formatCurrency(
                    calculateDiscountedPrice(product.price, product.value)
                  )}
                </Text>
                &nbsp;
                <Text
                  style={{
                    fontSize: 25,
                    color: "gray",
                    textDecorationLine: "line-through",
                  }}>
                  {formatCurrency(product.price)}
                </Text>
                &nbsp;
                <View
                  px={1}
                  style={{
                    backgroundColor: colorPromotion(product.value),
                    borderRadius: 2,
                  }}>
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 11,
                    }}>{`${product.value ? product.value : ""}%`}</Text>
                </View>
              </Text>
            ) : (
              <Text
                style={{
                  color: "red",
                  fontWeight: "bold",
                }}>
                {formatCurrency(product.price)}
              </Text>
            )}
          </View>
          <Divider mt={3} />
          <View mt={3}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}>
              Màu sắc
            </Text>
            <HStack space={2}>
              {colors.map((e, index) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ProductDetails", {
                      id: e.id,
                    })
                  }
                  key={"size" + index}
                  style={{
                    marginTop: 10,
                    height: 30,
                    minWidth: 30,
                    maxWidth: 30,
                    padding: 2,
                    backgroundColor:
                      e.idColor === product?.idColor
                        ? "transparent"
                        : e.codeColor,
                    borderColor:
                      e.idColor === product?.idColor ? "black" : "transparent",
                    borderWidth: 2,
                    borderRadius: 15,
                  }}>
                  <View
                    style={{
                      backgroundColor: e.codeColor,
                      width: "100%",
                      height: "100%",
                      borderRadius: 15,
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                    {e.idColor === product?.idColor && (
                      <Text
                        style={{
                          color: isColorDark(e.codeColor) ? "white" : "black",
                          fontSize: 15,
                        }}>
                        ✓
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </HStack>
          </View>
          <View mt={3}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}>
              Kích cỡ
            </Text>
            <HStack space={2}>
              {sizes.map((e, index) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ProductDetails", {
                      id: e.id,
                    })
                  }
                  key={"size" + index}
                  style={{
                    marginTop: 10,
                    height: 30,
                    width: 35,
                    backgroundColor: id === e.id ? "black" : "white",
                    borderColor: "gray",
                    borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  <Text style={{ color: id === e.id ? "white" : "black" }}>
                    {e.size}
                  </Text>
                </TouchableOpacity>
              ))}
            </HStack>
          </View>
          <Divider mt={3} />
          <HStack mt={3}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}>
              Thương hiệu:{" "}
            </Text>
            <Text
              style={{
                fontSize: 20,
              }}>
              {product.nameBrand}
            </Text>
          </HStack>
          <HStack mt={3}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}>
              Mô tả:{" "}
            </Text>
            <Text
              style={{
                fontSize: 20,
              }}>
              {product.description}
            </Text>
          </HStack>
          {products.length > 0 && (
            <View>
              <Divider mt={3} />
              <View
                style={{
                  marginTop: 25,
                  marginBottom: 5,
                  alignItems: "center",
                }}>
                <View
                  style={{
                    backgroundColor: "black",
                    padding: 5,
                    width: "65%",
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 25,
                      lineHeight: 30,
                      textAlign: "center",
                      fontWeight: "900",
                      color: "white",
                    }}>
                    Sản phẩm cùng loại
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: -3,
                    backgroundColor: "black",
                    width: "100%",
                    height: 3,
                  }}
                />
              </View>
              <CartProduct
                navigation={navigation}
                products={products}
                setLoading={setLoading}
              />
            </View>
          )}
        </View>
      </ScrollView>
      <View>
        <Text
          style={{
            textAlign: "center",
            lineHeight: 50,
            fontWeight: "bold",
            fontSize: 20,
            color: "#F48A42",
          }}>
          <IconFontisto
            name="shopping-basket-add"
            size={20}
            color={"#F48A42"}
          />
          &nbsp; Thêm vào đơn
        </Text>
      </View>
    </View>
  );
}
