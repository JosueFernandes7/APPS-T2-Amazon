import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function StarRating({ rating, reviews }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <View style={styles.container}>
      <Text style={styles.score}>{rating.toFixed(1)}</Text>
      {[...Array(fullStars)].map((_, i) => (
        <FontAwesome key={`full-${i}`} name="star" size={16} color="#e47911" />
      ))}
      {hasHalfStar && <FontAwesome name="star-half" size={16} color="#e47911" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FontAwesome key={`empty-${i}`} name="star-o" size={16} color="#e47911" />
      ))}
      <Text style={styles.reviews}>({reviews})</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2
  },
  score: {
    color: '#1a73e8',
    marginRight: 4,
    fontSize: 14
  },
  reviews: {
    marginLeft: 4,
    color: '#555',
    fontSize: 12
  }
});
