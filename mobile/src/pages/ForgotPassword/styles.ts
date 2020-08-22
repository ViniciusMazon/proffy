import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f7',
  },
  banner: {
    backgroundColor: '#8257E5',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 90,
  },
  logo: {
    marginTop: 20,
    width: 160,
    height: 50,
  },
  description: {
    marginTop: 24,
    color: '#D4C2FF',
    fontSize: 16,
    lineHeight: 26,
    fontFamily: 'Poppins_400Regular',
    maxWidth: 200,
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#32264D',
    fontSize: 24,
    lineHeight: 32,
    marginTop: 31,
    marginBottom: 16,
  },
  subtitle: {
    maxWidth: 264,
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
    color: '#6A6180',
    marginBottom: 40,
  },
  linkButton: {
    height: 20,
    width: 50,
    marginTop: 16,
  },
  input: {
    height: 54,
    backgroundColor: '#FFF',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#E6E6F0',
  },
  okButton: {
    marginVertical: 24,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  okButtonText: {
    fontSize: 16,
    fontFamily: 'Archivo_700Bold',
  }
});

export default styles;
