import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/Presentation/views/home/home";
import { RegisterScreen } from "./src/Presentation/views/register/Register";
import ForgotPasswordScreen from "./src/Presentation/views/forgotPassword/ForgotPasswordScreen";
import MenuScreen from "./src/Presentation/views/home/MenuScreen"; 

// Definir los parámetros de navegación
export type RootStackParamList = {
  HomeScreen: undefined;
  RegisterScreen: undefined;
  ForgotPasswordScreen: undefined; 
  MenuScreen: undefined; // Nueva ruta
};

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
          name="MenuScreen"
          component={MenuScreen} // Nueva pantalla del menú
          options={{ headerShown: true, title: "Menú" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
