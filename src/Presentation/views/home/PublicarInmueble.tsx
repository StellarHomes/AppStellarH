import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';

const PublicarInmueble = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [contacto, setContacto] = useState('');

  const handleSubmit = () => {
    if (!nombre || !descripcion || !ubicacion || !contacto) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    // Aquí iría la lógica para enviar los datos al backend
    Alert.alert('Éxito', 'Publicación enviada correctamente.');
    // Limpia los campos
    setNombre('');
    setDescripcion('');
    setUbicacion('');
    setContacto('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Publicar Inmueble</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del Inmueble"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        numberOfLines={4}
      />
      <TextInput
        style={styles.input}
        placeholder="Ubicación"
        value={ubicacion}
        onChangeText={setUbicacion}
      />
      <TextInput
        style={styles.input}
        placeholder="Contacto"
        value={contacto}
        onChangeText={setContacto}
        keyboardType="phone-pad"
      />

      <Button title="Publicar" onPress={handleSubmit} color="#1a237e" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a237e',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
});

export default PublicarInmueble;
