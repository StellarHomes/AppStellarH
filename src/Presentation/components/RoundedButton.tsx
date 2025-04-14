import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface RoundedButtonProps {
    text: string;
    onPress: () => void;
    disabled?: boolean; // ✅ Asegurar que disabled sea opcional
}

const RoundedButton: React.FC<RoundedButtonProps> = ({ text, onPress, disabled = false }) => {
    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.disabled]}
            onPress={onPress}
            disabled={disabled} // ✅ Pasamos la propiedad disabled al botón
        >
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#ff5733",
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: "center",
    },
    disabled: {
        backgroundColor: "#ccc", // ✅ Cambia el color cuando está deshabilitado
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default RoundedButton;
