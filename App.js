import React from "react";
import StackNavigator from "./navigation/RootNavigator";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <StackNavigator />
    </CartProvider>
  );
}
