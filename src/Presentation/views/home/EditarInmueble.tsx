import React, { useEffect, useState } from 'react';
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

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [estados, setEstados] = useState<any[]>([]);
  const [transacciones, setTransacciones] = useState<any[]>([]);
  const [tipos, setTipos] = useState<any[]>([]);

  // Cargar datos de estados, transacciones y tipos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const estadosResponse = await axios.get('http://192.168.0.3/ApiApp/estados.php');
        setEstados(estadosResponse.data);

        const transaccionesResponse = await axios.get('http://192.168.0.3/ApiApp/Variantes.php');
        setTransacciones(transaccionesResponse.data);

        const tiposResponse = await axios.get('http://192.168.0.3/ApiApp/tipos.php');
        setTipos(tiposResponse.data);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };

    fetchData();
  }, []);

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

      if (response.data.success) {
        Alert.alert('Éxito', 'Inmueble actualizado correctamente');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'No se pudo actualizar el inmueble');
      }
    } catch (error) {
      Alert.alert('Error', 'Error al conectar con el servidor');
      console.error(error);
    }
  };

  return (
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
