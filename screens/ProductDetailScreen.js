// External Libraries
import React, { useMemo } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";

// Internal Modules
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import StarRating from "../components/StarRating";
import Footer from "../components/Footer";

// ProductDetailScreen Component
export default function ProductDetailScreen({ route, navigation }) {
  const { productId } = route.params;
  const { cart, addToCart } = useCart();

  const product = useMemo(
    () => PRODUCTS.find((p) => p.id === productId),
    [productId]
  );

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Produto não encontrado.</Text>
      </SafeAreaView>
    );
  }
  const subtotal = useMemo(
    () => product.price.toFixed(2).replace(".", ","),
    [product.price]
  );

  const installment = useMemo(
    () => (product.price / 2).toFixed(2).replace(".", ","),
    [product.price]
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentWrapper}>
          {/* Header with name, brand and rating */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity>
                <Text style={styles.brand}>Marca: {product.brand}</Text>
              </TouchableOpacity>
              <Text style={styles.name}>{product.name}</Text>
              {product.highlight && (
                <Text style={styles.highlight}>
                  <Text style={styles.bold}>
                    {product.highlight.split(" ").slice(0, 2).join(" ")}
                  </Text>
                  {product.highlight.slice(
                    product.highlight.indexOf(
                      " ",
                      product.highlight.indexOf(" ") + 1
                    )
                  )}
                </Text>
              )}
            </View>
            <View style={styles.headerRight}>
              <StarRating rating={product.rating} reviews={product.reviews} />
            </View>
          </View>

          {/* Product Image */}
          <Image
            source={product.image}
            style={styles.image}
            resizeMode="contain"
          />

          {/* Product Info */}
          <View style={styles.infoBlock}>
            {/* Pricing */}
            <View style={styles.priceRow}>
              <Text style={styles.price}>R$ {subtotal}</Text>
              {product.pricePerGram && (
                <Text style={styles.perUnit}> (R$0,09 / Gramas)</Text>
              )}
            </View>

            {/* Installment */}
            <Text style={styles.installment}>
              Em até 2x R$ {installment} sem juros
            </Text>

            {/* Promotion */}
            <Text style={styles.cardPromo}>
              Peça seu cartão Amazon.com.br e ganhe R$ 10 em pontos pra usar na
              hora. <Text style={styles.bold}>Sujeito à aprovação.</Text>
            </Text>

            {/* Delivery Info */}
            <Text style={styles.delivery}>
              Entrega R$ 8,90: <Text style={styles.bold}>Quinta-feira, 15 de Maio</Text>
            </Text>

            <Text style={styles.delivery}>
              Ou <Text style={styles.link}>Entrega GRÁTIS</Text> para <Text style={styles.link}>Rio Grande 96200</Text> em pedidos
              enviados pela Amazon acima de R$79.
            </Text>

            <Text style={styles.inStock}>Em estoque</Text>

            {/* Quantity Box */}
            <View style={styles.qtyBox}>
              <Text style={styles.qtyText}>
                Quantidade: {product.quantity || 1}
              </Text>
            </View>

            {/* Actions */}
            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => addToCart(product.id)}
              accessibilityLabel="Adicionar ao carrinho"
            >
              <Text style={styles.cartButtonText}>Adicionar ao carrinho</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buyButton}
              accessibilityLabel="Comprar agora"
            >
              <Text style={styles.buyButtonText}>Comprar agora</Text>
            </TouchableOpacity>

            {/* Additional Info */}
            {["Enviado por", "Vendido por", "Devolução", "Opções de presente"].map(
              (label, index) => (
                <View key={index} style={styles.infoRow}>
                  <Text style={styles.infoLabel}>{label}</Text>
                  <Text style={styles.link}>
                    {label === "Enviado por"
                      ? product.brand
                      : label === "Vendido por"
                      ? "Hot Body Suplementos"
                      : label === "Devolução"
                      ? "Elegível para Reembolso ou substituição"
                      : "Disponível na finalização da compra"}
                  </Text>
                </View>
              )
            )}

            {/* Wishlist */}
            <TouchableOpacity accessibilityLabel="Adicionar à lista">
              <Text style={styles.link}>Adicionar à Lista</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <Footer
        cartCount={Object.values(cart).reduce((sum, qty) => sum + qty, 0)}
        onCartPress={() => navigation.navigate("Cart")}
        onHomePress={() => navigation.navigate("ProductList")}
        activeScreen="ProductDetail"
      />
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  contentWrapper: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  headerLeft: {
    flex: 1,
    paddingRight: 8,
  },
  headerRight: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  brand: {
    color: "#007185",
    fontSize: 14,
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    marginBottom: 4,
  },
  highlight: {
    fontSize: 14,
    color: "#555",
  },
  bold: {
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 300,
    alignSelf: "center",
    marginTop: 16,
  },
  infoBlock: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 4,
  },
  price: {
    fontSize: 26,
    fontWeight: "bold",
  },
  perUnit: {
    fontSize: 12,
    color: "#444",
    marginLeft: 4,
  },
  installment: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 8,
  },
  cardPromo: {
    fontSize: 14,
    color: "#1a73e8",
    marginBottom: 8,
  },
  delivery: {
    fontSize: 13,
    color: "#111",
    marginBottom: 4,
  },
  link: {
    color: "#1a73e8",
    fontSize: 13,
  },
  inStock: {
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
    marginTop: 10,
  },
  qtyBox: {
    backgroundColor: "#f4f4f4",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  qtyText: {
    fontSize: 14,
    color: "#333",
  },
  cartButton: {
    backgroundColor: "#ffd814",
    borderWidth: 1.5,
    borderColor: "#0066c0",
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  cartButtonText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  buyButton: {
    backgroundColor: "#f08804",
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 16,
  },
  buyButtonText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#111",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 13,
    color: "#555",
  },
  infoValue: {
    fontSize: 13,
    color: "#111",
  },
  errorText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "red",
  },
});