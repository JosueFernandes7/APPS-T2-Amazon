import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function CartItem({ product, quantity }) {
  return (
    <View style={styles.container}>
      <Image source={product.image} style={styles.image} />
      <View>
        <Text style={styles.name}>{product.name}</Text>
        <Text>Qtd: {quantity}</Text>
        <Text>Subtotal: R$ {(product.price * quantity).toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', padding: 10, alignItems: 'center' },
  image: { width: 60, height: 60, marginRight: 10 },
  name: { fontWeight: 'bold' },
});
