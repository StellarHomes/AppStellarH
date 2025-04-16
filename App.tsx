import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/Presentation/views/home/home";
import { RegisterScreen } from "./src/Presentation/views/register/Register";
import ForgotPasswordScreen from "./src/Presentation/views/forgotPassword/ForgotPasswordScreen";
import InmobiliariaPerfil from "./src/Presentation/views/home/InmobiliariaPerfil";
import MisPublicaciones from "./src/Presentation/views/home/MisPublicaciones";
import PublicarInmueble from "./src/Presentation/views/home/PublicarInmueble";

// ✅ Definir los parámetros del stack, incluyendo todas las rutas
export type RootStackParamList = {
  HomeScreen: undefined;
  RegisterScreen: undefined;
  ForgotPasswordScreen: undefined;
  InmobiliariaPerfil: undefined;
  MisPublicaciones: undefined;
  PublicarInmueble: undefined;
};

// Crear el stack de navegación con el tipo definido
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: true, title: "Registro" }}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{ headerShown: true, title: "Recuperar Contraseña" }}
        />
        <Stack.Screen
          name="InmobiliariaPerfil"
          component={InmobiliariaPerfil}
          options={{ headerShown: true, title: "Perfil" }}
        />
        <Stack.Screen
          name="MisPublicaciones"
          component={MisPublicaciones}
          options={{ headerShown: true, title: "Mis Publicaciones" }}
        />
        <Stack.Screen
          name="PublicarInmueble"
          component={PublicarInmueble}
          options={{ headerShown: true, title: "Publicar Inmueble" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
