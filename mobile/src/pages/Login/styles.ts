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
  textGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#32264D',
    fontSize: 24,
    lineHeight: 32,
    maxWidth: 160,
    marginVertical: 40,
  },
  linkPurple: {
    color: '#8257E5',
    lineHeight: 24,
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
  },
  link: {
    fontSize: 12,
    color: '#9C98A6',
    lineHeight: 24,
    fontFamily: 'Poppins_400Regular',
  },
  input: {
    height: 54,
    backgroundColor: '#FFF',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16,
  },
  okButton: {
    marginVertical: 40,
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
  }
});

export default styles;
