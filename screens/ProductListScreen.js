// External Libraries
import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

// Internal Modules
import { PRODUCTS } from "../data/products";
import SearchBar from "../components/SearchBar";
import StarRating from "../components/StarRating";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { Feather } from "@expo/vector-icons";

// Product List Screen
export default function ProductListScreen({ navigation }) {
  const { cart, addToCart, removeFromCart } = useCart();
  const [search, setSearch] = useState("");


  const filteredProducts = useMemo(
    () =>
      PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const renderItem = ({ item }) => {
    const quantity = cart[item.id] || 0;

    return (
      <View style={styles.card}>
        {/* Image with navigation */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ProductDetail", { productId: item.id })
          }
        >
          <Image source={item.image} style={styles.image} />
        </TouchableOpacity>

        {/* Product info */}
        <View style={styles.info}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProductDetail", { productId: item.id })
            }
          >
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>

          {item.highlight && (
            <Text style={styles.highlight}>{item.highlight}</Text>
          )}

          <Text style={styles.rating}>
            <StarRating rating={item.rating} reviews={item.reviews} />
          </Text>

          <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
          <Text style={styles.delivery}>Entrega GRÁTIS: qui., 15 de mai.</Text>

          {/* Add or quantity stepper */}
          {quantity === 0 ? (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addToCart(item.id)}
            >
              <Text style={styles.addButtonText}>Adicionar ao carrinho</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.stepper}>
              <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                {quantity === 1 ? (
                  <Feather name="trash-2" size={20} color="black" />
                ) : (
                  <Text style={styles.stepperIcon}>–</Text>
                )}
              </TouchableOpacity>

              <Text style={styles.stepperQty}>{quantity}</Text>

              <TouchableOpacity onPress={() => addToCart(item.id)}>
                <Text style={styles.stepperIcon}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Top Search Bar */}
      <View style={styles.searchBar}>
        <SearchBar
          value={search}
          onChange={setSearch}
          onClear={() => setSearch("")}
        />
      </View>

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      {/* Bottom Navigation Footer */}
      <Footer
        cartCount={Object.values(cart).reduce((sum, qty) => sum + qty, 0)}
        onCartPress={() => navigation.navigate("Cart")}
        onHomePress={() => navigation.navigate("ProductList")}
        activeScreen="ProductList"
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  searchBar: {
    padding: 10,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
  card: {
    flexDirection: "row",
    padding: 10,
    marginVertical: 4,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  highlight: {
    fontSize: 12,
    color: "#444",
    marginBottom: 2,
  },
  rating: {
    fontSize: 12,
    marginBottom: 2,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
  delivery: {
    fontSize: 12,
    color: "gray",
  },
  addButton: {
    backgroundColor: "#ffd814",
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 8,
  },
  addButtonText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#ffd814",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 6,
    marginTop: 8,
  },
  stepperIcon: {
    fontSize: 20,
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
  stepperQty: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
