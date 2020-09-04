import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#8257E5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 30,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  profileName: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: '#D4C2FF'
  },
  logoffButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#774DD6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    width: '100%',
    resizeMode: 'contain',
  },
  footer: {
    backgroundColor: '#F0F0F7',
    paddingHorizontal: 30,
  },
  title: {
    fontFamily: 'Poppins_400Regular',
    color: '#6A6180',
    fontSize: 20,
    lineHeight: 30,
    paddingTop: 40,
  },
  titleBold: {
    fontFamily: 'Poppins_600SemiBold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    paddingTop: 24,
    justifyContent: 'space-between',
  },
  button: {
    height: 150,
    width: '48%',
    borderRadius: 8,
    padding: 24,
    justifyContent: 'space-between'
  },
  buttonPrimary: {
    backgroundColor: '#9871F5',
  },
  buttonSecondary: {
    backgroundColor: '#04D361',
  },
  buttonText: {
    fontFamily: "Archivo_700Bold",
    color: '#FFF',
    fontSize: 19,
  },
  totalConnections: {
    fontFamily: 'Poppins_400Regular',
    color: '#9C98A6',
    fontSize: 12,
    lineHeight: 20,
    maxWidth: 140,
    paddingTop: 40,
    paddingBottom: 20,
  }
});

export default styles;
