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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Archivo_700Bold',
    color: '#FFF',
    fontSize: 24,
    lineHeight: 32,
    marginTop: 41,
    marginBottom: 16,
    maxWidth: 160,
  },
  subTitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
    color: '#D4C2FF',
  },
  icon: {
    marginTop: 27,
    marginLeft: 40,
    marginRight: 8,
  },
  iconText: {
    marginTop: 27,
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#D4C2FF',
  },
});

export default styles;
