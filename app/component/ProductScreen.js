import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import clientProductApi from "../api/clientProductApi";
import CartProduct from "./CartProduct";
import { TextInput } from "react-native-paper";
import { CheckBox, ListItem } from "react-native-elements";

export default function ProductScreen() {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({
    brand: [],
    material: [],
    color: [],
    sole: [],
    category: [],
    minPrice: null,
    maxPrice: null,
    nameProductDetail: null,
  });

  useEffect(() => {
    if (navigation) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Icon name="filter-variant" size={30} color="#f2741f" />
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation]);

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    clientProductApi.getAllProduct(filter).then((result) => {
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
  }, [filter]);

  const [listBrand, setListBrand] = useState([]);
  const [listMaterial, setListMaterial] = useState([]);
  const [listColor, setListColor] = useState([]);
  const [listSole, setListSole] = useState([]);
  const [listCategory, setListCategory] = useState([]);

  const [selectCategory, setSelectCategory] = useState([]);
  const [selectBrand, setSelectBrand] = useState([]);
  const [selectMaterial, setSelectMaterial] = useState([]);
  const [selectSole, setSelectSole] = useState([]);
  const [selectColor, setSelectColor] = useState([]);

  const handleCheckBoxCategory = (id) => {
    const selectedIndex = selectCategory.indexOf(id);
    let newSelectedIds = [];

    if (selectedIndex === -1) {
      newSelectedIds = [...selectCategory, id];
    } else {
      newSelectedIds = [
        ...selectCategory.slice(0, selectedIndex),
        ...selectCategory.slice(selectedIndex + 1),
      ];
    }
    setSelectCategory(newSelectedIds);
    setFilter({ ...filter, category: newSelectedIds });
  };

  const handleCheckBoxBrand = (id) => {
    const selectedIndex = selectBrand.indexOf(id);
    let newSelectedIds = [];

    if (selectedIndex === -1) {
      newSelectedIds = [...selectBrand, id];
    } else {
      newSelectedIds = [
        ...selectBrand.slice(0, selectedIndex),
        ...selectBrand.slice(selectedIndex + 1),
      ];
    }
    setSelectBrand(newSelectedIds);
    setFilter({ ...filter, brand: newSelectedIds });
  };

  const handleCheckBoxMaterial = (id) => {
    const selectedIndex = selectMaterial.indexOf(id);
    let newSelectedIds = [];

    if (selectedIndex === -1) {
      newSelectedIds = [...selectMaterial, id];
    } else {
      newSelectedIds = [
        ...selectMaterial.slice(0, selectedIndex),
        ...selectMaterial.slice(selectedIndex + 1),
      ];
    }
    setSelectMaterial(newSelectedIds);
    setFilter({ ...filter, material: newSelectedIds });
  };

  const handleCheckBoxSole = (id) => {
    const selectedIndex = selectSole.indexOf(id);
    let newSelectedIds = [];

    if (selectedIndex === -1) {
      newSelectedIds = [...selectSole, id];
    } else {
      newSelectedIds = [
        ...selectSole.slice(0, selectedIndex),
        ...selectSole.slice(selectedIndex + 1),
      ];
    }
    setSelectSole(newSelectedIds);
    setFilter({ ...filter, sole: newSelectedIds });
  };

  const handleCheckBoxColor = (id) => {
    const selectedIndex = selectColor.indexOf(id);
    let newSelectedIds = [];

    if (selectedIndex === -1) {
      newSelectedIds = [...selectColor, id];
    } else {
      newSelectedIds = [
        ...selectColor.slice(0, selectedIndex),
        ...selectColor.slice(selectedIndex + 1),
      ];
    }
    setSelectColor(newSelectedIds);
    setFilter({ ...filter, color: newSelectedIds });
  };

  useEffect(() => {
    clientProductApi.getBrand().then((response) => {
      setListBrand(response.data.data);
    });
    clientProductApi.getMaterial().then((response) => {
      setListMaterial(response.data.data);
    });
    clientProductApi.getColor().then((response) => {
      setListColor(response.data.data);
    });
    clientProductApi.getSole().then((response) => {
      setListSole(response.data.data);
    });
    clientProductApi.getCategory().then((response) => {
      setListCategory(response.data.data);
    });
  }, []);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.textFilter}>Bộ lọc</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View>
              <Text style={styles.headingText}>Loại giày</Text>
              {listCategory.map((lf) => (
                <ListItem key={lf.id} containerStyle={styles.listItemContainer}>
                  <CheckBox
                    containerStyle={styles.checkboxContainer}
                    checked={selectCategory.includes(lf.id)}
                    onPress={() => handleCheckBoxCategory(lf.id)}
                  />
                  <ListItem.Content>
                    <ListItem.Title>{lf.name}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}
            </View>
            <View>
              <Text style={styles.headingText}>Thương hiệu</Text>
              {listBrand.map((lf) => (
                <ListItem key={lf.id} containerStyle={styles.listItemContainer}>
                  <CheckBox
                    containerStyle={styles.checkboxContainer}
                    checked={selectBrand.includes(lf.id)}
                    onPress={() => handleCheckBoxBrand(lf.id)}
                  />
                  <ListItem.Content>
                    <ListItem.Title>{lf.name}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}
            </View>
            <View>
              <Text style={styles.headingText}>Chất liệu</Text>
              {listMaterial.map((lf) => (
                <ListItem key={lf.id} containerStyle={styles.listItemContainer}>
                  <CheckBox
                    containerStyle={styles.checkboxContainer}
                    checked={selectMaterial.includes(lf.id)}
                    onPress={() => handleCheckBoxMaterial(lf.id)}
                  />
                  <ListItem.Content>
                    <ListItem.Title>{lf.name}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}
            </View>
            <View>
              <Text style={styles.headingText}>Đế giày</Text>
              {listSole.map((lf) => (
                <ListItem key={lf.id} containerStyle={styles.listItemContainer}>
                  <CheckBox
                    containerStyle={styles.checkboxContainer}
                    checked={selectSole.includes(lf.id)}
                    onPress={() => handleCheckBoxSole(lf.id)}
                  />
                  <ListItem.Content>
                    <ListItem.Title>{lf.name}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}
            </View>
            <View style={styles.container}>
              <Text style={styles.headingText}>Màu sắc</Text>
              <View style={styles.colorContainer}>
                {listColor.map((lf) => (
                  <TouchableOpacity
                    key={lf.id}
                    style={[styles.colorButton, { backgroundColor: lf.code }]}
                    onPress={() => handleCheckBoxColor(lf.id)}>
                    {selectColor.includes(lf.id) && (
                      <Icon
                        name="check"
                        type="material"
                        color="white"
                        size={18}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>

      <View style={{ marginTop: 20 }}>
        <View style={{ margin: 10 }}>
          <TextInput
            style={styles.inputField}
            placeholder="Tìm kiếm sản phẩm..."
            onChangeText={(text) =>
              setFilter({ ...filter, nameProductDetail: text })
            }
          />
        </View>
        <ScrollView style={{ marginBottom: 150 }}>
          <CartProduct products={products} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listItemContainer: {
    paddingVertical: 5,
  },
  checkboxContainer: {
    padding: 0,
  },
  headingText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  colorContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  colorButton: {
    marginHorizontal: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  colorButton: {
    marginHorizontal: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  textFilter: {
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
  },
  inputField: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  textFilter: {
    fontSize: 20,
    color: "#f2741f",
    fontWeight: "900",
  },
  closeButton: {
    width: 80,
    height: 30,
    borderRadius: 5,
    borderColor: "gray",
    borderWidth: 2,
  },
  closeButtonText: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
    lineHeight: 26,
  },
});
