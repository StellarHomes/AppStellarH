import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  Dimensions,
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
import { ApiDelivery } from "../../../Data/sources/remote/api/ApiDelivery";
import axios from "axios";
import * as Animatable from "react-native-animatable";

const HomeScreen = () => {
  const { email, password, onChange } = useViewModel();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [selectedTab, setSelectedTab] = useState<"Usuario" | "Inmobiliaria">("Usuario");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await ApiDelivery.post("/auth/login", {
        email,
        password,
        accountType: selectedTab,
      });

      if (response.data.success) {
        navigation.navigate("MenuScreen");
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        Alert.alert("Error", error.response?.data?.message || "Error al iniciar sesión.");
      } else {
        Alert.alert("Error", "Hubo un problema con la conexión.");
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
        {/* Tabs de usuario / inmobiliaria */}
        <View style={HomeStyles.tabContainer}>
          {["Usuario", "Inmobiliaria"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedTab(tab as "Usuario" | "Inmobiliaria")}
              style={[
                HomeStyles.tabButton,
                selectedTab === tab && HomeStyles.activeTab,
              ]}
            >
              <Text
                style={[
                  HomeStyles.tabText,
                  selectedTab === tab && HomeStyles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Animatable.View animation="fadeInUp" duration={600}>
          <Text style={HomeStyles.formText}>Iniciar sesión como {selectedTab}</Text>

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

          <View style={HomeStyles.formRegister}>
            <Text>¿No tienes cuenta?</Text>
            <Text
              style={HomeStyles.formRegisterText}
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              Regístrate
            </Text>
          </View>
        </Animatable.View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
