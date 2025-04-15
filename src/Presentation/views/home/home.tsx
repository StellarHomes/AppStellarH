import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  ScrollView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../App";
import RoundedButton from "../../../Presentation/components/RoundedButton";
import { CustomTextInput } from "../../components/CustomTextInput";
import HomeStyles from "./Styles";
import useViewModel from "./viewModel";
import axios from "axios";
import * as Animatable from "react-native-animatable";

const HomeScreen = () => {
  const { email, password, onChange } = useViewModel();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Manejo de inicio de sesión
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    try {
      // Realiza la solicitud POST a la API PHP
      const response = await axios.post("http://192.168.0.3/Api/loginInmobiliaria.php", {
        email,//ME1234@gmail.com
        password,//ME1234
        loginType: "inmobiliaria",
      });

      if (response.data.success) {
        // Si la respuesta es exitosa, muestra la alerta de éxito
        Alert.alert("Éxito", "Has iniciado sesión correctamente.");

        // Luego, navega a la siguiente pantalla
        navigation.navigate("InmobiliariaPerfil",)
      } else {
        // Si la respuesta contiene un error, muestra el mensaje correspondiente
        Alert.alert("Error", response.data.message);
      }
    } catch (error: unknown) {
      // Manejo de errores si ocurre un fallo en la solicitud o en la conexión
      console.error(error); // Para depuración en consola

      if (axios.isAxiosError(error)) {
        Alert.alert("Error", error.response?.data?.message || "Error al iniciar sesión.");
      } else {
        Alert.alert("Error", "Hubo un problema con la conexión.");
      }
    }

    // Limpia los campos después de intentar el inicio de sesión
    onChange("email", "");
    onChange("password", "");
  };

  return (
    <ScrollView style={HomeStyles.scrollContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#1a237e" />

      <Image
        source={require("../../../assets/diseno-de-casas-modernas-1_0.jpg")}
        style={HomeStyles.imageBackground}
      />

      <View style={HomeStyles.overlay} />

      <View style={HomeStyles.logoContainer}>
        <Image
          source={require("../../../assets/sh_blanco-removebg-preview.png")}
          style={HomeStyles.logoImage}
        />
      </View>

      <View style={HomeStyles.form}>
        <Animatable.View animation="fadeInUp" duration={600}>
          <Text style={HomeStyles.formText}>Iniciar sesión como Inmobiliaria</Text>

          <CustomTextInput
            image={require("../../../assets/email.png")}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            property="email"
            value={email}
            onChangeText={(text) => onChange("email", text)}
          />
          <CustomTextInput
            image={require("../../../assets/passwordd.png")}
            placeholder="Contraseña"
            secureTextEntry
            property="password"
            value={password}
            onChangeText={(text) => onChange("password", text)}
          />

          <Text
            style={HomeStyles.forgotText}
            onPress={() => navigation.navigate("ForgotPasswordScreen")}
          >
            ¿Olvidaste tu contraseña?
          </Text>

          <View style={{ marginTop: 30 }}>
            <RoundedButton text="ENTRAR" onPress={handleLogin} />
          </View>
        </Animatable.View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
