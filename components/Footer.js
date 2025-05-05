import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons, Feather, Entypo } from "@expo/vector-icons";

export default function Footer({
  cartCount,
  onCartPress,
  onHomePress,
  activeScreen,
}) {
  const getBadgeText = () => {
    if (cartCount > 99) return "99+";
    if (cartCount > 0) return cartCount.toString();
    return null;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onHomePress}>
        <Feather
          name="home"
          size={24}
          color={activeScreen === "ProductList" ? "#f08804" : "black"}
        />
      </TouchableOpacity>

      <Ionicons name="person-outline" size={24} color="black" />
      <TouchableOpacity onPress={onCartPress} style={styles.cartContainer}>
        <Feather
          name="shopping-cart"
          size={24}
          color={activeScreen === "Cart" ? "#f08804" : "black"}
        />
        {cartCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{getBadgeText()}</Text>
          </View>
        )}
      </TouchableOpacity>
      <Entypo name="menu" size={24} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderTopWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
  },
  cartContainer: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -10,
    backgroundColor: "#ff6600",
    borderRadius: 10,
    paddingHorizontal: 5,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});
