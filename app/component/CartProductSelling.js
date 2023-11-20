import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";

export default function CartProductSelling({ products }) {
  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    const discountAmount = (discountPercentage / 100) * originalPrice;
    const discountedPrice = originalPrice - discountAmount;
    return discountedPrice;
  };

  return (
    <View style={styles.container}>
      {products.map((product, i) => {
        const hasPromotion =
          product.promotion !== null && product.statusPromotion === 1;
        const discountValue = product.value || 0;

        const red = [255, 0, 0];
        const green = [255, 255, 0];
        const interpolatedColor = [
          Math.round(
            (1 - discountValue / 100) * green[0] +
              (discountValue / 100) * red[0]
          ),
          Math.round(
            (1 - discountValue / 100) * green[1] +
              (discountValue / 100) * red[1]
          ),
          Math.round(
            (1 - discountValue / 100) * green[2] +
              (discountValue / 100) * red[2]
          ),
        ];

        return (
          <View key={i} style={styles.productContainer}>
            <View style={{ width: "100%", aspectRatio: 1 }}>
              {hasPromotion && (
                <View
                  style={{
                    backgroundColor: `rgb(${interpolatedColor[0]}, ${interpolatedColor[1]}, ${interpolatedColor[2]})`,
                    padding: 5,
                    borderRadius: 5,
                    position: "absolute",
                    top: 5,
                    left: 5,
                    zIndex: 1000,
                  }}>
                  <Text style={{ color: "white" }}>{`${
                    discountValue ? discountValue : ""
                  }%`}</Text>
                </View>
              )}
              <Swiper
                style={styles.swiper}
                showsPagination={false}
                autoplay={true}
                autoplayTimeout={3}>
                {product.image.map((item, j) => (
                  <Image key={j} source={{ uri: item }} style={styles.image} />
                ))}
              </Swiper>
            </View>
            <View>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 10,
                  fontWeight: "bold",
                }}>
                {product.title}
              </Text>
              <Text style={{ textAlign: "center", marginTop: 5 }}>
                {product.promotion && product.statusPromotion === 1 ? (
                  <Text>
                    <Text style={{ textDecorationLine: "line-through" }}>
                      {`${product.priceBefort.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })} `}
                    </Text>
                    <Text style={{ color: "red", fontWeight: "bold" }}>
                      {`${calculateDiscountedPrice(
                        product.priceBefort,
                        product.value
                      ).toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })} `}
                    </Text>
                  </Text>
                ) : (
                  <Text>{`${product.priceBefort.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })} `}</Text>
                )}
              </Text>
              <Text style={{ textAlign: "center", marginTop: 5 }}>
                <Text>
                  <Text>Đã bán: </Text>
                  <Text style={{ fontWeight: "bold" }}>{product.amount}</Text>
                </Text>
              </Text>
            </View>
          </View>
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
    width: "48%",
    marginBottom: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    overflow: "hidden",
    elevation: 0.5,
    shadowColor: "grayText",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    paddingBottom: 5,
  },
  swiperContainer: {
    height: 200,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  swiper: {
    width: "100%",
    aspectRatio: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  discountBadge: {
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  originalPrice: {
    textDecorationLine: "line-through",
    marginRight: 5,
  },
  discountedPrice: {
    color: "red",
    fontWeight: "bold",
  },
});
