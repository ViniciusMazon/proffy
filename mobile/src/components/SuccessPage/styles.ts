import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8257E5',
  },
  icon: {
    marginTop: 163,
  },
  title: {
    marginTop: 24,
    width: 165,
    fontFamily: 'Archivo_700Bold',
    textAlign: 'center',
    fontSize: 32,
    lineHeight: 37,
    color: '#FFF',
  },
  description: {
    marginTop: 16,
    width: 169,
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
    color: '#D4C2FF',
  },
  okButton: {
    marginTop: 150,
    width: 294,
    backgroundColor: '#04D361',
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  okButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Archivo_700Bold',
  },
});

export default styles;
