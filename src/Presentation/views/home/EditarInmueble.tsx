import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import styles from './Style_publicar';
interface Props {
  route: { params: { inmueble: any } };
  navigation: any;
}

const EditarInmueble: React.FC<Props> = ({ route, navigation }) => {
  const { inmueble } = route.params;

  const [nombre, setNombre] = useState(inmueble.Nombre || '');
  const [descripcion, setDescripcion] = useState(inmueble.Descripcion || '');
  const [localidad, setLocalidad] = useState(inmueble.localidad || '');
  const [direccion, setDireccion] = useState(inmueble.Direccion || '');
  const [numCont, setNumCont] = useState(String(inmueble.NumCont || ''));
  const [precio, setPrecio] = useState(String(inmueble.precio || ''));
  const [fechaPubli, setFechaPubli] = useState(inmueble.FechaPubli ? new Date(inmueble.FechaPubli) : new Date());
  const [estadoId, setEstadoId] = useState<number>(parseInt(inmueble.estado_id_estado) || 0);
  const [transaccionId, setTransaccionId] = useState<number>(parseInt(inmueble.transaccion_idtransaccion) || 0);
  const [tipoId, setTipoId] = useState<number>(parseInt(inmueble.tipo_idtipo) || 0);
=======
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

interface Props {
  route: {
    params: {
      inmueble: any;
    };
  };
  navigation: any;
}

const EditarInmueble: React.FC<Props> = ({ route, navigation }) => {
  const { inmueble } = route.params;

  const [nombre, setNombre] = useState(inmueble.Nombre);
  const [descripcion, setDescripcion] = useState(inmueble.Descripcion);
  const [localidad, setLocalidad] = useState(inmueble.localidad);
  const [direccion, setDireccion] = useState(inmueble.Direccion);
  const [numCont, setNumCont] = useState(String(inmueble.NumCont));
  const [precio, setPrecio] = useState(String(inmueble.precio));
  const [fechaPubli, setFechaPubli] = useState(new Date(inmueble.FechaPubli));
  const [estadoId, setEstadoId] = useState<number>(inmueble.estado_id_estado || 0);
  const [transaccionId, setTransaccionId] = useState<number>(inmueble.transaccion_idtransaccion || 0);
  const [tipoId, setTipoId] = useState<number>(inmueble.tipo_idtipo || 0);

>>>>>>> a5ff3884be50787a874e4edc85910a0cfadce28a
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [estados, setEstados] = useState<any[]>([]);
  const [transacciones, setTransacciones] = useState<any[]>([]);
  const [tipos, setTipos] = useState<any[]>([]);
<<<<<<< HEAD
  const [imagenActual, setImagenActual] = useState<string>(inmueble.imagen || '');
  const [nuevaImagen, setNuevaImagen] = useState<any>(null);
=======
>>>>>>> a5ff3884be50787a874e4edc85910a0cfadce28a

  // Cargar datos de estados, transacciones y tipos
  useEffect(() => {
    const fetchData = async () => {
      try {
<<<<<<< HEAD
        const [resEstados, resTransacciones, resTipos] = await Promise.all([
          axios.get('http://192.168.0.4/ApiApp/estados.php'),
          axios.get('http://192.168.0.4/ApiApp/Variantes.php'),
          axios.get('http://192.168.0.4/ApiApp/tipos.php'),
        ]);

        setEstados(resEstados.data);
        setTransacciones(resTransacciones.data);
        setTipos(resTipos.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
=======
        const estadosResponse = await axios.get('http://192.168.0.3/ApiApp/estados.php');
        setEstados(estadosResponse.data);

        const transaccionesResponse = await axios.get('http://192.168.0.3/ApiApp/Variantes.php');
        setTransacciones(transaccionesResponse.data);

        const tiposResponse = await axios.get('http://192.168.0.3/ApiApp/tipos.php');
        setTipos(tiposResponse.data);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
>>>>>>> a5ff3884be50787a874e4edc85910a0cfadce28a
      }
    };

    fetchData();
  }, []);

<<<<<<< HEAD
  const seleccionarImagen = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!resultado.canceled && resultado.assets.length > 0) {
      const uri = resultado.assets[0].uri;
      const nombreArchivo = uri.split('/').pop();
      const tipoArchivo = nombreArchivo?.split('.').pop();

      const archivo = {
        uri,
        name: nombreArchivo,
        type: `image/${tipoArchivo}`,
      };

      setNuevaImagen(archivo);
    }
  };

  const handleActualizar = async () => {
    const formData = new FormData();

    formData.append('idInmueble', inmueble.idInmueble.toString());
    formData.append('Nombre', nombre);
    formData.append('Descripcion', descripcion);
    formData.append('localidad', localidad);
    formData.append('Direccion', direccion);
    formData.append('NumCont', numCont);
    formData.append('precio', precio);
    formData.append('FechaPubli', fechaPubli.toISOString().split('T')[0]);
    formData.append('estadoId', estadoId.toString());
    formData.append('transaccionId', transaccionId.toString());
    formData.append('tipoId', tipoId.toString());

    if (nuevaImagen) {
      const archivo = {
        uri: nuevaImagen.uri,
        type: nuevaImagen.type,
        name: nuevaImagen.name,
      };

      formData.append('imagen', {
        uri: archivo.uri,
        type: archivo.type,
        name: archivo.name,
      } as unknown as Blob);
    }

    try {
      console.log('Enviando datos al servidor:', formData);

      const respuesta = await axios.post('http://192.168.0.4/ApiApp/editarInmueble.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Respuesta del servidor:', respuesta.data);
=======
  const handleActualizar = async () => {
    try {
      const response = await axios.post('http://192.168.0.3/ApiApp/editarInmueble.php', {
        idInmueble: inmueble.idInmueble,
        Nombre: nombre,
        Descripcion: descripcion,
        localidad,
        Direccion: direccion,
        NumCont: Number(numCont),
        precio: Number(precio),
        FechaPubli: fechaPubli.toISOString().split('T')[0],
        estadoId,
        transaccionId,
        tipoId,
      });
>>>>>>> a5ff3884be50787a874e4edc85910a0cfadce28a

      if (respuesta.data.success) {
        Alert.alert('Éxito', 'Inmueble actualizado correctamente');
        navigation.goBack();
      } else {
        Alert.alert('Error', respuesta.data.message || 'No se pudo actualizar el inmueble');
      }
    } catch (error) {
<<<<<<< HEAD
      console.error('Error al conectar con el servidor:', error);
      Alert.alert('Error', 'Error al conectar con el servidor');
=======
      Alert.alert('Error', 'Error al conectar con el servidor');
      console.error(error);
>>>>>>> a5ff3884be50787a874e4edc85910a0cfadce28a
    }
  };

  return (
<<<<<<< HEAD
    <ImageBackground
      source={require('../../../assets/diseno-de-casas-modernas-1_0.jpg')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Editar Inmueble</Text>

        <Text style={styles.label}>Nombre:</Text>
        <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

        <Text style={styles.label}>Descripción:</Text>
        <TextInput style={styles.input} value={descripcion} onChangeText={setDescripcion} multiline />

        <Text style={styles.label}>Localidad:</Text>
        <TextInput style={styles.input} value={localidad} onChangeText={setLocalidad} />

        <Text style={styles.label}>Dirección:</Text>
        <TextInput style={styles.input} value={direccion} onChangeText={setDireccion} />

        <Text style={styles.label}>Número de Contacto:</Text>
        <TextInput style={styles.input} keyboardType="phone-pad" value={numCont} onChangeText={setNumCont} />

        <Text style={styles.label}>Precio:</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={precio} onChangeText={setPrecio} />

        <Text style={styles.label}>Fecha de publicación:</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
          <Text>{fechaPubli.toISOString().split('T')[0]}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={fechaPubli}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setFechaPubli(selectedDate);
            }}
          />
        )}

        <Text style={styles.label}>Imagen actual:</Text>
        {imagenActual ? (
          <Image
            source={{
              uri: imagenActual.startsWith('http')
                ? imagenActual
                : `http://192.168.0.4/ApiApp/uploads/${imagenActual}`,
            }}
            style={styles.imagen}
          />
        ) : (
          <Text>No hay imagen actual</Text>
        )}

        <Text style={styles.label}>Nueva imagen (opcional):</Text>
        {nuevaImagen && <Image source={{ uri: nuevaImagen.uri }} style={styles.imagen} />}
        <TouchableOpacity style={styles.imageButton} onPress={seleccionarImagen}>
          <Text style={styles.imageButtonText}>Seleccionar Imagen</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Estado:</Text>
        <Picker selectedValue={estadoId} onValueChange={(itemValue) => setEstadoId(Number(itemValue))} style={styles.picker}>
          {estados.map((estado, index) => (
            <Picker.Item key={estado.id_estado ?? index} label={estado.descripcion} value={Number(estado.id_estado)} />
          ))}
        </Picker>

        <Text style={styles.label}>Transacción:</Text>
        <Picker selectedValue={transaccionId} onValueChange={(itemValue) => setTransaccionId(Number(itemValue))} style={styles.picker}>
          {transacciones.map((transaccion, index) => (
            <Picker.Item key={transaccion.idtransaccion ?? index} label={transaccion.descripcion} value={Number(transaccion.idtransaccion)} />
          ))}
        </Picker>

        <Text style={styles.label}>Tipo:</Text>
        <Picker selectedValue={tipoId} onValueChange={(itemValue) => setTipoId(Number(itemValue))} style={styles.picker}>
          {tipos.map((tipo, index) => (
            <Picker.Item key={tipo.idtipo ?? index} label={tipo.descripcion} value={Number(tipo.idtipo)} />
          ))}
        </Picker>

        <TouchableOpacity style={styles.submitButton} onPress={handleActualizar}>
          <Text style={styles.submitButtonText}>Actualizar Inmueble</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

export default EditarInmueble;
=======
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput style={styles.input} value={descripcion} onChangeText={setDescripcion} />

      <Text style={styles.label}>Localidad:</Text>
      <TextInput style={styles.input} value={localidad} onChangeText={setLocalidad} />

      <Text style={styles.label}>Dirección:</Text>
      <TextInput style={styles.input} value={direccion} onChangeText={setDireccion} />

      <Text style={styles.label}>Número de Contacto:</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={numCont} onChangeText={setNumCont} />

      <Text style={styles.label}>Precio:</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={precio} onChangeText={setPrecio} />

      <Text style={styles.label}>Fecha de Publicación:</Text>
      <Button title={fechaPubli.toDateString()} onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={fechaPubli}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setFechaPubli(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Estado:</Text>
      {estados && estados.length > 0 ? (
        <Picker
          selectedValue={estadoId}
          onValueChange={(itemValue) => setEstadoId(itemValue)}
          style={styles.input}
        >
          {estados.map((estado) => (
            <Picker.Item key={estado.id} label={estado.nombre} value={estado.id} />
          ))}
        </Picker>
      ) : (
        <Text>Cargando estados...</Text>
      )}

      <Text style={styles.label}>Transacción:</Text>
      {transacciones && transacciones.length > 0 ? (
        <Picker
          selectedValue={transaccionId}
          onValueChange={(itemValue) => setTransaccionId(itemValue)}
          style={styles.input}
        >
          {transacciones.map((transaccion) => (
            <Picker.Item key={transaccion.id} label={transaccion.nombre} value={transaccion.id} />
          ))}
        </Picker>
      ) : (
        <Text>Cargando transacciones...</Text>
      )}

      <Text style={styles.label}>Tipo:</Text>
      {tipos && tipos.length > 0 ? (
        <Picker
          selectedValue={tipoId}
          onValueChange={(itemValue) => setTipoId(itemValue)}
          style={styles.input}
        >
          {tipos.map((tipo) => (
            <Picker.Item key={tipo.id} label={tipo.nombre} value={tipo.id} />
          ))}
        </Picker>
      ) : (
        <Text>Cargando tipos...</Text>
      )}

      <Button title="Actualizar Inmueble" onPress={handleActualizar} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
});

export default EditarInmueble;
>>>>>>> a5ff3884be50787a874e4edc85910a0cfadce28a
