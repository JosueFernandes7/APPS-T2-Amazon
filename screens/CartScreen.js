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
import { Feather } from "@expo/vector-icons";

// Internal Modules
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

// Cart Screen
export default function CartScreen({ navigation }) {
  const { cart, addToCart, removeFromCart, clearFromCart } = useCart();
  const [search, setSearch] = useState("");

  const cartItems = useMemo(
    () =>
      Object.entries(cart).map(([productId, quantity]) => {
        const product = PRODUCTS.find((p) => p.id === parseInt(productId));
        return { ...product, quantity };
      }),
    [cart]
  );

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const renderItem = ({ item }) => (
    <View key={item.id} style={styles.card}>
      <View style={styles.leftColumn}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.stepper}>
          <TouchableOpacity onPress={() => removeFromCart(item.id)}>
            {item.quantity === 1 ? (
              <Feather name="trash-2" size={20} color="black" style={styles.trashIcon} />
            ) : (
              <Text style={styles.stepperIcon}>–</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.stepperQty}>{item.quantity}</Text>

          <TouchableOpacity onPress={() => addToCart(item.id)}>
            <Text style={styles.stepperIcon}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.rightColumn}>
        <Text style={styles.name}>{item.name}</Text>
        {item.highlight && <Text style={styles.highlight}>{item.highlight}</Text>}
        <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
        <Text style={styles.installment}>
          ou em até 2x de R$ {(item.price / 2).toFixed(2)} sem juros
        </Text>
        <Text style={styles.stock}>Em estoque</Text>
        <Text style={styles.seller}>Vendido por: Amazon</Text>

        <View style={styles.actionsRow}>
          <TouchableOpacity onPress={() => clearFromCart(item.id)}>
            <Text style={styles.actionLink}>Excluir</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.actionLink}>Salvar para mais tarde</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header Section */}
      <View style={{ padding: 10, paddingTop: 40, backgroundColor: "#fff", zIndex: 1 }}>
        <SearchBar
          value={search}
          onChange={setSearch}
          onClear={() => setSearch("")}
        />

        <Text style={styles.title}>Carrinho</Text>
        <Text style={styles.subtotal}>
          Subtotal <Text style={styles.total}>R$ {total.toFixed(2)}</Text>
        </Text>
        <Text style={styles.freight}>✅ Parte do seu pedido tem frete GRÁTIS.</Text>

        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>
            Fechar pedido ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} itens)
          </Text>
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 80 }}
        renderItem={renderItem}
      />

      {/* Footer */}
      <Footer
        cartCount={Object.values(cart).reduce((sum, qty) => sum + qty, 0)}
        onCartPress={() => navigation.navigate("Cart")}
        onHomePress={() => navigation.navigate("ProductList")}
        activeScreen="Cart"
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 16,
  },
  subtotal: {
    fontSize: 16,
    paddingHorizontal: 16,
  },
  total: {
    fontWeight: "bold",
    fontSize: 18,
  },
  freight: {
    paddingHorizontal: 16,
    color: "green",
    marginTop: 4,
    marginBottom: 16,
  },
  checkoutButton: {
    backgroundColor: "#ffd814",
    marginHorizontal: 16,
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  checkoutText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  card: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  leftColumn: {
    alignItems: "center",
  },
  rightColumn: {
    flex: 1,
    marginLeft: 16,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
  },
  highlight: {
    fontSize: 12,
    color: "#444",
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  installment: {
    fontSize: 13,
    color: "#333",
    marginBottom: 4,
  },
  stock: {
    color: "green",
    fontSize: 13,
    marginBottom: 2,
  },
  seller: {
    fontSize: 12,
    color: "#333",
    marginBottom: 6,
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    marginHorizontal: 10,
  },
  trashIcon: {
    marginRight: 10,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 8,
  },
  actionLink: {
    color: "#007185",
    fontSize: 13,
  },
});