import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar({ value, onChange, onClear, placeholder = 'Pesquisar na Amazon.com.br' }) {
  const renderClearIcon = () =>
    value.length > 0 && (
      <TouchableOpacity onPress={onClear} accessibilityLabel="Limpar texto">
        <Ionicons name="close" size={18} color="#666" style={styles.iconRight} />
      </TouchableOpacity>
    );

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Ionicons name="search" size={18} color="#555" style={styles.iconLeft} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#888"
          value={value}
          onChangeText={onChange}
          accessibilityLabel="Campo de busca"
          accessible
        />
        {renderClearIcon()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f6f6f6',
    borderRadius: 25,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'black',
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 6,
    fontSize: 14,
    color: '#000',
  },
  iconLeft: {
    marginRight: 6,
  },
  iconRight: {
    marginLeft: 6,
  },
});
