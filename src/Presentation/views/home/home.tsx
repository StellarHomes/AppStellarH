import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  ScrollView,
  StatusBar,
  TouchableOpacity,
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
<<<<<<< HEAD
  const [passwordVisible, setPasswordVisible] = useState(false);
=======
  const [passwordVisible, setPasswordVisible] = useState(false); // Estado para controlar la visibilidad de la contraseña
>>>>>>> a5ff3884be50787a874e4edc85910a0cfadce28a

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    try {
<<<<<<< HEAD
      const response = await axios.post("http://192.168.0.4/ApiApp/loginInmobiliaria.php", {
=======
      const response = await axios.post("http://192.168.0.3/ApiApp/loginInmobiliaria.php", {
>>>>>>> a5ff3884be50787a874e4edc85910a0cfadce28a
        email,
        password,
        loginType: "inmobiliaria",
      });

      if (response.data.success) {
        Alert.alert("Éxito", "Has iniciado sesión correctamente.");
        navigation.navigate("InmobiliariaPerfil");
      } else {
<<<<<<< HEAD
        Alert.alert("Error", response.data.error || "Credenciales incorrectas.");
      }
    } catch (error: unknown) {
      console.error("Error de login:", error);
=======
        Alert.alert("Error", response.data.message);
      }
    } catch (error: unknown) {
      console.error(error);
>>>>>>> a5ff3884be50787a874e4edc85910a0cfadce28a

      if (axios.isAxiosError(error)) {
        Alert.alert("Error", error.response?.data?.error || "Error de red al iniciar sesión.");
      } else {
        Alert.alert("Error", "Hubo un problema inesperado.");
      }
    }

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

          <View style={{ position: "relative" }}>
            <CustomTextInput
              image={require("../../../assets/passwordd.png")}
              placeholder="Contraseña"
<<<<<<< HEAD
              secureTextEntry={!passwordVisible}
=======
              secureTextEntry={!passwordVisible} // Cambia según el estado
>>>>>>> a5ff3884be50787a874e4edc85910a0cfadce28a
              property="password"
              value={password}
              onChangeText={(text) => onChange("password", text)}
            />
            <TouchableOpacity
              style={HomeStyles.eyeIcon}
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <Image
                source={
                  passwordVisible
<<<<<<< HEAD
                    ? require("../../../assets/eye-open.png")
                    : require("../../../assets/eye-closed.png")
=======
                    ? require("../../../assets/eye-open.png") // Icono de ojo abierto
                    : require("../../../assets/eye-closed.png") // Icono de ojo cerrado
>>>>>>> a5ff3884be50787a874e4edc85910a0cfadce28a
                }
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
          </View>

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