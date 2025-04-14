import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";

const MenuScreen = () => {
  
  const dishes = [
    {
      id: "1",
      name: "Pizza Margherita",
      price: "$12.99",
      image: require("../../../assets/pizza.png"), 
    },
    {
      id: "2",
      name: "Sushi Roll",
      price: "$15.99",
      image: require("../../../assets/sushi.png"), 
    },
    {
      id: "3",
      name: "Hamburguesa",
      price: "$10.99",
      image: require("../../../assets/hamburguesa.png"), 
    },
    {
      id: "4",
      name: "Salchipapa",
      price: "$15.99",
      image: require("../../../assets/salchipapa.png"), 
    },
    {
      id: "5",
      name: "Helado",
      price: "$4.99",
      image: require("../../../assets/helado.png"), 
    },
    {
      id: "6",
      name: "Coca-cola",
      price: "$6.99",
      image: require("../../../assets/coca-cola.png"), 
    },
    {
      id: "7",
      name: "Pepsi",
      price: "$10.99",
      image: require("../../../assets/pepsi.png"), 
    },
   
    // Agrega más platillos aquí
  ];

  const renderDish = ({ item }: any) => (
    <View style={styles.dishContainer}>
      <Image source={item.image} style={styles.dishImage} />
      <View style={styles.dishDetails}>
        <Text style={styles.dishName}>{item.name}</Text>
        <Text style={styles.dishPrice}>{item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú</Text>
      <FlatList
        data={dishes}
        renderItem={renderDish}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 50,
  },
  dishContainer: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: "hidden",
  },
  dishImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  dishDetails: {
    padding: 10,
    justifyContent: "center",
  },
  dishName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dishPrice: {
    fontSize: 16,
    color: "#555",
  },
});

export default MenuScreen;
