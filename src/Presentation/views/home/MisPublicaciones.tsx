import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  RefreshControl
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
}

const InmueblesList = () => {
  const [inmuebles, setInmuebles] = useState<Inmueble[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const BASE_URL = 'http://192.168.0.3/ApiApp/';

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
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={reloadInmuebles} />}
    >
      <Text style={styles.title}>Mis Publicaciones</Text>

      <TouchableOpacity style={styles.reloadButton} onPress={reloadInmuebles}>
        <Text style={styles.reloadText}>Recargar</Text>
      </TouchableOpacity>

      {inmuebles.length > 0 ? (
        inmuebles.map((inmueble) => {
          const imageUrl = inmueble.imagen
            ? inmueble.imagen.startsWith('http')
              ? inmueble.imagen
              : `${BASE_URL}${inmueble.imagen}`
            : 'https://via.placeholder.com/150';

          return (
            <View key={inmueble.idInmueble} style={styles.card}>
              <Image source={{ uri: imageUrl }} style={styles.image} />
              <Text style={styles.name}>{inmueble.Nombre}</Text>
              <Text style={styles.description}>{inmueble.Descripcion}</Text>
              <Text>{inmueble.localidad}</Text>
              <Text>{inmueble.precio}</Text>
              <Text>{inmueble.FechaPubli}</Text>

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
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  reloadButton: {
    backgroundColor: '#3949ab',
    padding: 10,
    borderRadius: 6,
    alignSelf: 'center',
    marginBottom: 10,
  },
  reloadText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },
  image: {
    height: 150,
    width: '100%',
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
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
  },
});

export default InmueblesList;
