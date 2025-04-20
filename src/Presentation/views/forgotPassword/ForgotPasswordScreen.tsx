import React, { useState } from "react";
import { View, Text, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../App";
import RoundedButton from "../../components/RoundedButton";
import { CustomTextInput } from "../../components/CustomTextInput";
import HomeStyles from "../home/Styles";
import axios from "axios"; 

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Por favor, ingresa tu correo electrónico.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Correo electrónico no válido.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://192.168.0.4/ApiApp/ForgotPasswordScreen.php", { email });

      if (response.data.success) {
        Alert.alert("Recuperación de Contraseña", "Revisa tu correo para restablecer tu contraseña.");
        navigation.navigate("HomeScreen");
      } else {
        Alert.alert("Error", response.data.message || "No se pudo enviar el correo.");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema con la solicitud.");
      console.error("Error en la recuperación de contraseña:", error);
    }

    setLoading(false);
  };

  return (
    <View style={HomeStyles.container}>
      <Image source={require("../../../assets/diseno-de-casas-modernas-1_0.jpg")} style={HomeStyles.imageBackground} />
      <View style={HomeStyles.logoContainer}>
        <Image source={require("../../../assets/sh_blanco-removebg-preview.png")} style={HomeStyles.logoImage} />
        <Text style={HomeStyles.logoText}>FOOD APP</Text>
      </View>

      <View style={HomeStyles.form}>
        <Text style={HomeStyles.formText}>Recuperar Contraseña</Text>
        <Text style={HomeStyles.formText}>
          Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
        </Text>

        <CustomTextInput
          image={require("../../../assets/email.png")}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          property="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <View style={{ marginTop: 30 }}>
          <RoundedButton text={loading ? "Enviando..." : "ENVIAR"} onPress={handleResetPassword} disabled={loading} />
        </View>

        <View style={HomeStyles.formRegister}>
          <Text style={HomeStyles.backToLoginText} onPress={() => navigation.navigate("HomeScreen")}>
            Volver al inicio de sesión
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
