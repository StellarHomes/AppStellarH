import React, { useState, useEffect } from 'react';
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
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../../../../App"; 
import styles from './Style_publicar';

// Definir tipos de datos para transacción, tipo, estado
type Transaccion = {
  idtransaccion: string;
  descripcion: string;
};

type Tipo = {
  idtipo: string;
  descripcion: string;
};

type Estado = {
  id_estado: string;
  descripcion: string;
};

// Definir el tipo de navegación para PublicarInmueble
type PublicarInmuebleNavigationProp = StackNavigationProp<RootStackParamList, 'PublicarInmueble'>;

const PublicarInmueble = () => {
  const [formData, setFormData] = useState({
    Nombre: '',
    descripcion: '',
    localidad: '',
    direccion: '',
    numCont: '',
    precio: '',
    fechaPubli: '',
    estado_id_estado: '',
    tipo_idtipo: '',
    transaccion_idtransaccion: '',
    imagen: null as any,
    inmobiliaria_idInmobiliaria: '1',
  });

  const [estados, setEstados] = useState<Estado[]>([]);
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [transacciones, setTransacciones] = useState<Transaccion[]>([]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const navigation = useNavigation<PublicarInmuebleNavigationProp>(); // Usamos el tipo de navegación aquí

  const handleChange = (name: keyof typeof formData, value: string | null) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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

      setFormData({
        ...formData,
        imagen: archivo,
      });
    }
  };

  const validarFormulario = () => {
    const {
      Nombre,
      descripcion,
      localidad,
      direccion,
      numCont,
      precio,
      fechaPubli,
      estado_id_estado,
      tipo_idtipo,
      transaccion_idtransaccion,
      imagen,
    } = formData;

    if (
      !Nombre ||
      !descripcion ||
      !localidad ||
      !direccion ||
      !numCont ||
      !precio ||
      !fechaPubli ||
      !estado_id_estado ||
      !tipo_idtipo ||
      !transaccion_idtransaccion ||
      !imagen
    ) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validarFormulario()) return;

    try {
      const formDataObj = new FormData();
      Object.keys(formData).forEach((key) => {
        const value = formData[key as keyof typeof formData];
        formDataObj.append(key, value instanceof Object ? value : String(value));
      });

      const response = await fetch('http://192.168.0.4/ApiApp/Publicar.php', {
        method: 'POST',
        body: formDataObj,
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert('Publicación exitosa', 'El inmueble se ha publicado correctamente.');
        setFormData({
          Nombre: '',
          descripcion: '',
          localidad: '',
          direccion: '',
          numCont: '',
          precio: '',
          fechaPubli: '',
          estado_id_estado: '',
          tipo_idtipo: '',
          transaccion_idtransaccion: '',
          imagen: null,
          inmobiliaria_idInmobiliaria: '1',
        });
        setSelectedDate(null);
        navigation.navigate('MisPublicaciones'); // Navegar después de publicar
      } else {
        Alert.alert('Error', data.error || 'Error desconocido.');
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      Alert.alert('Error', 'Hubo un error al intentar publicar el inmueble.');
    }
  };

  useEffect(() => {
    const fetchData = async (
      url: string,
      setState: React.Dispatch<React.SetStateAction<any[]>>,
      label: string
    ) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setState(data);
      } catch (error) {
        console.error(`Error al cargar ${label}:`, error);
        Alert.alert('Error', `No se pudo cargar ${label}.`);
      }
    };

    fetchData('http://192.168.0.4/ApiApp/Variantes.php', setTransacciones, 'Transacciones');
    fetchData('http://192.168.0.4/ApiApp/tipos.php', setTipos, 'Tipos');
    fetchData('http://192.168.0.4/ApiApp/estados.php', setEstados, 'Estados');
  }, []);

  return (
    <ImageBackground
      source={require('../../../assets/diseno-de-casas-modernas-1_0.jpg')} 
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Publicar Inmueble</Text>

        {/* Formulario de publicación */}
        <Text style={styles.label}>Nombre del Inmueble:</Text>
        <TextInput
          style={styles.input}
          value={formData.Nombre}
          onChangeText={(text) => handleChange('Nombre', text)}
          placeholder="Ingrese el Nombre del Inmueble"
        />

        <Text style={styles.label}>Descripción:</Text>
        <TextInput
          style={styles.input}
          value={formData.descripcion}
          onChangeText={(text) => handleChange('descripcion', text)}
          placeholder="Descripción del inmueble"
          multiline
        />

        <Text style={styles.label}>Localidad:</Text>
        <TextInput
          style={styles.input}
          value={formData.localidad}
          onChangeText={(text) => handleChange('localidad', text)}
          placeholder="Ingrese la localidad"
        />

        <Text style={styles.label}>Dirección:</Text>
        <TextInput
          style={styles.input}
          value={formData.direccion}
          onChangeText={(text) => handleChange('direccion', text)}
          placeholder="Dirección del inmueble"
        />

        <Text style={styles.label}>Número de Contacto:</Text>
        <TextInput
          style={styles.input}
          value={formData.numCont}
          onChangeText={(text) => handleChange('numCont', text)}
          placeholder="Número de contacto"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Precio:</Text>
        <TextInput
          style={styles.input}
          value={formData.precio}
          onChangeText={(text) => handleChange('precio', text)}
          placeholder="Ingrese el precio"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Fecha de Publicación:</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.input}
        >
          <Text>
            {selectedDate
              ? selectedDate.toISOString().split('T')[0]
              : 'Selecciona una fecha'}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate || new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) {
                setSelectedDate(date);
                handleChange('fechaPubli', date.toISOString().split('T')[0]);
              }
            }}
          />
        )}

        <Text style={styles.label}>Transacción:</Text>
        <Picker
          selectedValue={formData.transaccion_idtransaccion}
          onValueChange={(value) => handleChange('transaccion_idtransaccion', value)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione una transacción" value="" />
          {transacciones.map((item) => (
            <Picker.Item key={item.idtransaccion} label={item.descripcion} value={item.idtransaccion} />
          ))}
        </Picker>

        <Text style={styles.label}>Tipo de Inmueble:</Text>
        <Picker
          selectedValue={formData.tipo_idtipo}
          onValueChange={(value) => handleChange('tipo_idtipo', value)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione el tipo de inmueble" value="" />
          {tipos.map((item) => (
            <Picker.Item key={item.idtipo} label={item.descripcion} value={item.idtipo} />
          ))}
        </Picker>

        <Text style={styles.label}>Estado del Inmueble:</Text>
        <Picker
          selectedValue={formData.estado_id_estado}
          onValueChange={(value) => handleChange('estado_id_estado', value)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione el estado" value="" />
          {estados.map((item) => (
            <Picker.Item key={item.id_estado} label={item.descripcion} value={item.id_estado} />
          ))}
        </Picker>

        <TouchableOpacity style={styles.imageButton} onPress={seleccionarImagen}>
          <Text style={styles.imageButtonText}>Seleccionar Imagen</Text>
        </TouchableOpacity>

        {/* Mostrar la imagen seleccionada */}
        {formData.imagen && <Image source={{ uri: formData.imagen.uri }} style={styles.imagen} />}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Publicar</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

export default PublicarInmueble;
