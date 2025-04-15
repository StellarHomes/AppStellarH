import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, ImageBackground, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface InmobiliariaData {
  idInmobiliaria: string;
  NombreInmobiliaria: string;
  EmailInmobiliaria: string;
  Telefono: string;
  Direccion: string;
}

const InmobiliariaPerfil = () => {
  const [inmobiliariaData, setInmobiliariaData] = useState<InmobiliariaData>({
    idInmobiliaria: '',
    NombreInmobiliaria: '',
    EmailInmobiliaria: '',
    Telefono: '',
    Direccion: ''
  });

  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://192.168.0.3/API/Inmobiliaria.php')
      .then(response => {
        if (!response.ok) throw new Error('Error al obtener los datos');
        return response.json();
      })
      .then((data: InmobiliariaData) => {
        setInmobiliariaData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar los datos:', error);
        Alert.alert('Error', 'No se pudieron cargar los datos de la inmobiliaria.');
        setLoading(false);
      });
  }, []);

  const handleChange = (field: keyof InmobiliariaData, value: string) => {
    setInmobiliariaData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    fetch('http://192.168.0.3/API/EditInmobiliaria.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inmobiliariaData),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error en la solicitud');
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          Alert.alert('Éxito', 'Tu perfil se ha actualizado correctamente.');
        } else {
          throw new Error(data.message || 'Error al actualizar el perfil');
        }
      })
      .catch((error) => {
        console.error('Error al actualizar:', error);
        Alert.alert('Error', 'Hubo un problema al actualizar tu perfil.');
      });
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1 }} />;

  return (
    <ImageBackground
      source={require('../../../assets/diseno-de-casas-modernas-1_0.jpg')}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{inmobiliariaData.NombreInmobiliaria}</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre Inmobiliaria"
          value={inmobiliariaData.NombreInmobiliaria}
          onChangeText={(text) => handleChange('NombreInmobiliaria', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={inmobiliariaData.EmailInmobiliaria}
          keyboardType="email-address"
          onChangeText={(text) => handleChange('EmailInmobiliaria', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={inmobiliariaData.Telefono}
          keyboardType="phone-pad"
          onChangeText={(text) => handleChange('Telefono', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Dirección"
          value={inmobiliariaData.Direccion}
          onChangeText={(text) => handleChange('Direccion', text)}
        />

        <Button title="Actualizar Perfil" onPress={handleSubmit} color="#1a237e" />
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#00000088',
    padding: 10,
    borderRadius: 10,
  },
  input: {
    backgroundColor: '#ffffffee',
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
  },
});

export default InmobiliariaPerfil;
