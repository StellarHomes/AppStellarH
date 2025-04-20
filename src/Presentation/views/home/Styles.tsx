import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const HomeStyles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  imageBackground: {
    width: "100%",
    height: 280,
    position: "absolute",
    top: 0,
  },
  overlay: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 280,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  logoContainer: {
    alignItems: "center",
    marginTop:100
  },
  logoImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },

  // FORM GENERAL
  form: {
    width: "85%",
    alignSelf: "center",
    padding: 20,
    marginTop: 30,
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  formText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#444",
  },

  // TABS DE LOGIN
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 8,
  },
  activeTab: {
    backgroundColor: "#1a237e",
  },
  tabText: {
    color: "#333",
    fontWeight: "600",
  },
  activeTabText: {
    color: "#fff",
  },

  // TEXTO DE OLVIDASTE CONTRASEÑA
  forgotText: {
    color: "#1a237e",
    textAlign: "right",
    marginTop: 10,
    fontSize: 14,
  },

  // LINK DE REGISTRO
  formRegister: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  formRegisterText: {
    color: "#1a237e",
    fontWeight: "bold",
    marginLeft: 5,
  },

  // PANTALLA DE REGISTRO
  registerLogoContainer: {
    alignItems: "center",
    marginTop: 80,
  },
  registerLogoImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  registerForm: {
    width: "90%",
    padding: 20,
    marginTop: 30,
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  registerFormText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#1a237e",
  },
  backToLoginText: {
    fontSize: 16,
    color: "#3498db",
    textDecorationLine: "underline",
    textAlign: "center",
    marginTop: 20,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
});

export default HomeStyles;
