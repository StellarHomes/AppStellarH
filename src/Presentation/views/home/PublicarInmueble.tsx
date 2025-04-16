import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

const PublicarInmueble = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [direccion, setDireccion] = useState('');
  const [imagen, setImagen] = useState<string | null>(null);

  const [tipos, setTipos] = useState<any[]>([]);
  const [estados, setEstados] = useState<any[]>([]);
  const [transacciones, setTransacciones] = useState<any[]>([]);
  const [inmobiliarias, setInmobiliarias] = useState<any[]>([]);

  const [idTipo, setIdTipo] = useState('');
  const [idEstado, setIdEstado] = useState('');
  const [idTransaccion, setIdTransaccion] = useState('');
  const [idInmobiliaria, setIdInmobiliaria] = useState('');

  useEffect(() => {
    // Cargar tipos
    fetch('http://192.168.0.3/ApiApp/tipo.php')
      .then((res) => res.json())
      .then((data) => {
        console.log('Tipos:', data);
        if (Array.isArray(data)) setTipos(data);
        else setTipos([]);
      })
      .catch((error) => {
        console.error('Error al cargar tipos:', error);
      });

    // Cargar estados
    fetch('http://192.168.0.3/ApiApp/estado.php')
      .then((res) => res.json())
      .then((data) => {
        console.log('Estados:', data);
        if (Array.isArray(data)) setEstados(data);
        else setEstados([]);
      })
      .catch((error) => {
        console.error('Error al cargar estados:', error);
      });

    // Cargar transacciones
    fetch('http://192.168.0.3/ApiApp/transaccion.php')
      .then((res) => res.json())
      .then((data) => {
        console.log('Transacciones:', data);
        if (Array.isArray(data)) setTransacciones(data);
        else setTransacciones([]);
      })
      .catch((error) => {
        console.error('Error al cargar transacciones:', error);
      });

    // Cargar inmobiliarias
    fetch('http://192.168.0.3/ApiApp/inmobiliaria.php')
      .then((res) => res.json())
      .then((data) => {
        console.log('Inmobiliarias:', data);
        if (Array.isArray(data)) setInmobiliarias(data);
        else setInmobiliarias([]);
      })
      .catch((error) => {
        console.error('Error al cargar inmobiliarias:', error);
      });
  }, []);

  const seleccionarImagen = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!resultado.canceled && resultado.assets.length > 0) {
      setImagen(resultado.assets[0].uri);
    }
  };

  const publicar = () => {
    const datos = {
      titulo,
      descripcion,
      precio,
      direccion,
      imagen,
      idTipo,
      idEstado,
      idTransaccion,
      idInmobiliaria,
    };

    fetch('http://192.168.0.3/ApiApp/publicar.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.mensaje);
      })
      .catch((error) => {
        alert('Error al publicar');
        console.error(error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Título:</Text>
      <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={styles.input}
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
      />

      <Text style={styles.label}>Precio:</Text>
      <TextInput
        style={styles.input}
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Dirección:</Text>
      <TextInput style={styles.input} value={direccion} onChangeText={setDireccion} />

      <Text style={styles.label}>Tipo:</Text>
      <Picker selectedValue={idTipo} onValueChange={setIdTipo}>
        <Picker.Item label="Selecciona un tipo" value="" />
        {tipos.map((item) => (
          <Picker.Item key={item.idTipo} label={item.nombre} value={item.idTipo} />
        ))}
      </Picker>

      <Text style={styles.label}>Estado:</Text>
      <Picker selectedValue={idEstado} onValueChange={setIdEstado}>
        <Picker.Item label="Selecciona un estado" value="" />
        {estados.map((item) => (
          <Picker.Item key={item.idEstado} label={item.nombre} value={item.idEstado} />
        ))}
      </Picker>

      <Text style={styles.label}>Transacción:</Text>
      <Picker selectedValue={idTransaccion} onValueChange={setIdTransaccion}>
        <Picker.Item label="Selecciona una transacción" value="" />
        {transacciones.map((item) => (
          <Picker.Item key={item.idTransaccion} label={item.nombre} value={item.idTransaccion} />
        ))}
      </Picker>

      <Text style={styles.label}>Inmobiliaria:</Text>
      <Picker selectedValue={idInmobiliaria} onValueChange={setIdInmobiliaria}>
        <Picker.Item label="Selecciona una inmobiliaria" value="" />
        {inmobiliarias.map((item) => (
          <Picker.Item key={item.idInmobiliaria} label={item.nombre} value={item.idInmobiliaria} />
        ))}
      </Picker>

      <Button title="Seleccionar Imagen" onPress={seleccionarImagen} />
      {imagen && <Image source={{ uri: imagen }} style={styles.imagen} />}

      <Button title="Publicar" onPress={publicar} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginTop: 15,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  imagen: {
    width: '100%',
    height: 200,
    marginTop: 10,
    resizeMode: 'cover',
    borderRadius: 5,
  },
});

export default PublicarInmueble;
