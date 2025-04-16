import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    padding: 20,
    paddingBottom: 60,
  },
  header: {
    marginBottom: 20,
    backgroundColor: '#4050d4', // Semi-transparente para un efecto moderno
    padding: 35,
    borderRadius: 12,
    alignItems: 'center',
    position: 'relative',
    
  },
  logo: {
  width: 200,
  height: 200,
  resizeMode: 'contain',
  marginBottom: 15,
  position: 'absolute',  // Permite que se posicione en relación al contenedor
  left: -10,              // Se posiciona 10 unidades desde el borde izquierdo
  top: -70,               // Se posiciona 10 unidades desde la parte superior
},

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
  },
  logoutButton: {
    position: 'absolute',
    right: 10,
    top: 15,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    borderColor: '#fff',
    borderWidth: 1,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
  profileContainer: {
    backgroundColor: '#ffffff90', 
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 5, 
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  updateButton: {
    backgroundColor: '#FFB300', // Amarillo vibrante para destacarse
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5, // Sombra
  },
  secondaryButton: {
    backgroundColor: '#3949ab',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 8,
    elevation: 5, // Sombra
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  bottomButtons: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default styles;
