import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MisPublicaciones = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Publicaciones</Text>
      {/* Aquí puedes agregar la lógica y diseño de tus publicaciones */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a237e',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MisPublicaciones;
