import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';

// Tipos
type InmuebleType = {
  idInmueble: string;
  Nombre: string;
  Descripcion: string;
  localidad: string;
  precio: string;
  FechaPubli: string;
  ImagenUrl: string;
  estado_id_estado: string;
  tipo_idtipo: string;
  transaccion_idtransaccion: string;
  imagen: null | {
    uri: string;
    type: string;
    name: string;
  };
};

type RootStackParamList = {
  EditarInmueble: { inmueble: InmuebleType };
  Inmuebles: undefined;
};

const EditarInmueble = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'EditarInmueble'>>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const inmueble = route.params?.inmueble;

  const [formData, setFormData] = useState<InmuebleType>({
    idInmueble: '',
    Nombre: '',
    Descripcion: '',
    localidad: '',
    precio: '',
    FechaPubli: '',
    ImagenUrl: '',
    estado_id_estado: '',
    tipo_idtipo: '',
    transaccion_idtransaccion: '',
    imagen: null,
  });

  const [estados, setEstados] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [transacciones, setTransacciones] = useState([]);

  useEffect(() => {
    if (inmueble) {
      setFormData({
        ...inmueble,
        ImagenUrl: inmueble.imagen ? `data:image/jpeg;base64,${inmueble.imagen}` : '',
      });
    }
  }, [inmueble]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [estadosData, tiposData, transaccionesData] = await Promise.all([
          fetch('http://192.168.0.3/ApiApp/estados.php').then(res => res.json()),
          fetch('http://192.168.0.3/ApiApp/tipos.php').then(res => res.json()),
          fetch('http://192.168.0.3/ApiApp/Variantes.php').then(res => res.json()),
        ]);
        setEstados(estadosData);
        setTipos(tiposData);
        setTransacciones(transaccionesData);
      } catch (error) {
        Alert.alert('Error', 'Hubo un problema al cargar los datos');
      }
    };

    fetchData();
  }, []);

  const handleChange = (name: keyof InmuebleType, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        setFormData(prev => ({
          ...prev,
          imagen: {
            uri: selectedImage.uri ?? '',
            type: selectedImage.type ?? '',
            name: selectedImage.fileName ?? 'imagen.jpg',
          },
        }));
      }
    });
  };

  const handleSubmit = async () => {
    if (!formData.Nombre || !formData.Descripcion || !formData.localidad || !formData.precio || !formData.FechaPubli) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    try {
      const updatedData = new FormData();

      (Object.keys(formData) as (keyof InmuebleType)[]).forEach((key) => {
        if (key === 'imagen' && formData.imagen) {
          updatedData.append('imagen', {
            uri: formData.imagen.uri,
            type: formData.imagen.type,
            name: formData.imagen.name,
          } as any);
        } else {
          updatedData.append(key, formData[key] as string);
        }
      });

      const response = await axios.post('http://192.168.0.3/ApiApp/updateInmueble.php', updatedData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        Alert.alert('Éxito', 'Inmueble actualizado correctamente');
        navigation.navigate('Inmuebles');
      } else {
        Alert.alert('Error', 'No se pudo actualizar el inmueble');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al enviar los datos');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Inmueble</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del Inmueble"
        value={formData.Nombre}
        onChangeText={(text) => handleChange('Nombre', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={formData.Descripcion}
        onChangeText={(text) => handleChange('Descripcion', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Localidad"
        value={formData.localidad}
        onChangeText={(text) => handleChange('localidad', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Precio"
        keyboardType="numeric"
        value={formData.precio}
        onChangeText={(text) => handleChange('precio', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Fecha de Publicación (YYYY-MM-DD)"
        value={formData.FechaPubli}
        onChangeText={(text) => handleChange('FechaPubli', text)}
      />

      {formData.ImagenUrl && (
        <Image source={{ uri: formData.ImagenUrl }} style={styles.image} />
      )}

      <Button title="Seleccionar nueva imagen" onPress={handleImagePick} />

      <Button title="Actualizar Inmueble" onPress={handleSubmit} color="#1a237e" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#1a237e',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    resizeMode: 'contain',
  },
});

export default EditarInmueble;
