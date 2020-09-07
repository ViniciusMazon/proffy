import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: '#8257E5',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topBarName: {
    fontFamily: 'Archivo_400Regular',
    fontSize: 14,
    lineHeight: 15,
    color: '#D4C2FF',
  },
  header: {

  },
  title: {
    fontFamily: 'Archivo_700Bold',
    color: '#FFF',
    fontSize: 24,
    lineHeight: 32,
    marginTop: 41,
    marginBottom: 16,
  },
  subTitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
    color: '#D4C2FF',
    marginBottom: 32,
  },
});

export default styles;
