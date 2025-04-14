import React from "react";
import { View, Text, Image, Alert } from "react-native";
import { CustomTextInput } from "../../../Presentation/components/CustomTextInput";
import RoundedButton from "../../../Presentation/components/RoundedButton";
import useViewModel from "../home/viewModel";
import HomeStyles from "../home/Styles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../App"; 

export const RegisterScreen = () => {
  const registerViewModel = useViewModel();
  const { name, lastname, phone, email, password, confirmPassword, onChange, register } = registerViewModel;
  
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleRegister = async () => {
    console.log("Datos ingresados:", { name, lastname, phone, email, password, confirmPassword });
    
    if (!name || !lastname || !email || !phone || !password || !confirmPassword) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Correo electrónico no válido.");
      return;
    }

    if (phone.length < 8) {
      Alert.alert("Error", "El número de teléfono debe tener al menos 8 dígitos.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await register();

      Alert.alert("Éxito", response.message || "Registro exitoso.");
      navigation.navigate("HomeScreen");
    } catch (error: any) {
      console.error("❌ ERROR EN EL REGISTRO:", error);
      
      const errorMessage = error.response?.data?.message || "No se pudo completar el registro.";
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <View style={HomeStyles.container}>
      <Image source={require("../../../assets/chef.jpg")} style={HomeStyles.imageBackground} />
      
      <View style={HomeStyles.registerLogoContainer}>
        <Image source={require("../../../assets/logo.png")} style={HomeStyles.registerLogoImage} />
        <Text style={HomeStyles.registerFormText}></Text>
      </View>

      <View style={HomeStyles.registerForm}>
        <Text style={HomeStyles.registerFormText}>REGISTRARSE</Text>

        <CustomTextInput
          image={require("../../../assets/user.png")}
          placeholder="Nombres"
          keyboardType="default"
          property="name"
          value={name}
          onChangeText={(text) => onChange("name", text)}
        />
        <CustomTextInput
          image={require("../../../assets/my_user.png")}
          placeholder="Apellidos"
          keyboardType="default"
          property="lastname"
          value={lastname}
          onChangeText={(text) => onChange("lastname", text)}
        />
        <CustomTextInput
          image={require("../../../assets/email.png")}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          property="email"
          value={email}
          onChangeText={(text) => onChange("email", text)}
        />
        <CustomTextInput
          image={require("../../../assets/phone.png")}
          placeholder="Teléfono"
          keyboardType="numeric"
          property="phone"
          value={phone}
          onChangeText={(text) => onChange("phone", text)}
        />
        <CustomTextInput
          image={require("../../../assets/passwordd.png")}
          placeholder="Contraseña"
          keyboardType="default"
          secureTextEntry={true}
          property="password"
          value={password}
          onChangeText={(text) => onChange("password", text)}
        />
        <CustomTextInput
          image={require("../../../assets/passwordd.png")}
          placeholder="Confirmar Contraseña"
          keyboardType="default"
          secureTextEntry={true}
          property="confirmPassword"
          value={confirmPassword}
          onChangeText={(text) => onChange("confirmPassword", text)}
        />

        <View style={{ marginTop: 10 }}>
          <RoundedButton text="CONFIRMAR" onPress={handleRegister} />
        </View>
      </View>
    </View>
  );
};
