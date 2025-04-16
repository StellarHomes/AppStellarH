import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, ImageBackground, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../../../App";
import styles from './styles1';

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
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    fetch('http://192.168.0.3/ApiApp/Inmobiliaria.php')
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
    fetch('http://192.168.0.3/ApiApp/EditInmobiliaria.php', {
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

  const handleLogout = () => {
    navigation.navigate('HomeScreen');
  };

  const goToPublicaciones = () => {
    navigation.navigate('MisPublicaciones');
  };

  const goToPublicar = () => {
    navigation.navigate('PublicarInmueble');
  };

  if (loading) return <ActivityIndicator size="large" color="#1a237e" style={{ flex: 1 }} />;

  return (
    <ImageBackground
      source={require('../../../assets/diseno-de-casas-modernas-1_0.jpg')}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header with Logo and Logout Button */}
        <View style={styles.header}>
          <Image source={require('../../../assets/sh_blanco-removebg-preview.png')} style={styles.logo} />
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Form Section */}
        <View style={styles.profileContainer}>
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
        </View>

        <TouchableOpacity style={styles.updateButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Actualizar Perfil</Text>
        </TouchableOpacity>

        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.secondaryButton} onPress={goToPublicaciones}>
            <Text style={styles.buttonText}>Mis Publicaciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={goToPublicar}>
            <Text style={styles.buttonText}>Publicar Inmueble</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default InmobiliariaPerfil;
