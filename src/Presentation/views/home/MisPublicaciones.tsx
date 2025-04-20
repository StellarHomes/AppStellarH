import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  EditarInmueble: { inmueble: Inmueble };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditarInmueble'>;

interface Inmueble {
  idInmueble: string;
  Nombre: string;
  Descripcion: string;
  localidad: string;
  precio: string;
  FechaPubli: string;
  imagen?: string;
  id_estado?: string;
  estado_descripcion?: string;
}

const InmueblesList = () => {
  const [inmuebles, setInmuebles] = useState<Inmueble[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const BASE_URL = 'http://192.168.0.4/ApiApp/';

  const fetchInmuebles = async (): Promise<Inmueble[] | undefined> => {
    try {
      const response = await fetch(`${BASE_URL}getInmuebles.php`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener los inmuebles:', error);
    }
  };

  const reloadInmuebles = async () => {
    setLoading(true);
    const data = await fetchInmuebles();
    if (data && Array.isArray(data)) {
      setInmuebles(data);
    } else {
      console.log('No se recibieron datos válidos:', data);
    }
    setLoading(false);
  };

  useEffect(() => {
    reloadInmuebles();
  }, []);

  const handleDelete = (id: string) => {
    Alert.alert(
      '¿Estás seguro?',
      '¡Esta acción no se puede deshacer!',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí, eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`${BASE_URL}deleteInmueble.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idInmueble: id }),
              });
              const data = await response.json();
              if (data.message === 'Inmueble eliminado con éxito') {
                setInmuebles((prev) => prev.filter(item => item.idInmueble !== id));
                Alert.alert('Eliminado', 'El inmueble fue eliminado con éxito.');
              }
            } catch (error) {
              console.error('Error al eliminar inmueble:', error);
            }
          },
        },
      ]
    );
  };

  const handleEdit = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}getInmuebleById.php?idInmueble=${id}`);
      const inmueble: Inmueble = await response.json();
      if (inmueble && !('error' in inmueble)) {
        navigation.navigate('EditarInmueble', { inmueble });
      } else {
        Alert.alert('Error', 'No se encontró el inmueble.');
      }
    } catch (error) {
      console.error('Error al obtener el inmueble para editar:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/diseno-de-casas-modernas-1_0.jpg')} 
      style={styles.background}
      imageStyle={{ opacity: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={reloadInmuebles} />}
      >
        <Text style={styles.title}>Mis Publicaciones</Text>

        

        {inmuebles.length > 0 ? (
          inmuebles.map((inmueble) => {
            const imageUrl = inmueble.imagen
              ? inmueble.imagen.startsWith('http')
                ? inmueble.imagen
                : `${BASE_URL}uploads/${inmueble.imagen}`
              : 'https://via.placeholder.com/150';

            return (
              <View key={inmueble.idInmueble} style={styles.card}>
                <Image source={{ uri: imageUrl }} style={styles.image} />
                <Text style={styles.name}>{inmueble.Nombre}</Text>
                <Text style={styles.description}>{inmueble.Descripcion}</Text>
                <Text style={styles.info}>📍 {inmueble.localidad}</Text>
                <Text style={styles.info}>💲 ${inmueble.precio}</Text>
                <Text style={styles.info}>📅 {inmueble.FechaPubli}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.editButton]}
                    onPress={() => handleEdit(inmueble.idInmueble)}
                  >
                    <Text style={styles.buttonText}>Editar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={() => handleDelete(inmueble.idInmueble)}
                  >
                    <Text style={styles.buttonText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        ) : (
          <Text>No hay inmuebles disponibles.</Text>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#1a237e',
  },
  reloadButton: {
    backgroundColor: '#3949ab',
    padding: 10,
    borderRadius: 6,
    alignSelf: 'center',
    marginBottom: 16,
  },
  reloadText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    height: 160,
    width: '100%',
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  description: {
    color: '#555',
    marginBottom: 6,
  },
  info: {
    color: '#333',
    marginBottom: 2,
  },
  estado: {
    color: '#2e7d32',
    marginTop: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    padding: 10,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 5,
  },
  editButton: {
    backgroundColor: '#3498db',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default InmueblesList;
