import React from "react"; 
import { View, TextInput, Image, StyleSheet } from "react-native";

interface CustomTextInputProps {
  image: any;
  placeholder: string;
  keyboardType?: "default" | "numeric" | "email-address";
  secureTextEntry?: boolean;
  property?: string; // 🔹 Hacer `property` opcional
  value: string;
  onChangeText: (text: string) => void;
}

export const CustomTextInput: React.FC<CustomTextInputProps> = ({
  image,
  placeholder,
  keyboardType = "default",
  secureTextEntry = false,
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginVertical: 10,
    padding: 5,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
