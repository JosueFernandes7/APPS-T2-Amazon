import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

export default function ProductCard({ product, onPress }) {
  return (
    <View style={styles.card}>
      <Image source={product.image} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
      <Button title="Ver detalhes" onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { margin: 10, padding: 10, borderWidth: 1, borderRadius: 8 },
  image: { width: '100%', height: 150, resizeMode: 'contain' },
  name: { fontSize: 16, fontWeight: 'bold' },
  price: { marginVertical: 5, color: '#888' },
});
