import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F7',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  linkButton: {
    marginTop: 12,
    height: 20,
    justifyContent: 'center',
  },
  title: {
    marginTop: 76,
    width: 236,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 32,
    lineHeight: 42,
    color: '#32264D',

  },
  description: {
    marginTop: 16,
    width: 208,
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
    color: '#6A6180',
  },
  subTitle: {
    marginTop: 174,
    marginBottom: 24,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    lineHeight: 42,
    color: '#32264D',
  },
  input: {
    height: 54,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    paddingHorizontal: 16,
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
  },
  dotContainer: {
    flexDirection: 'row',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 3,
    marginRight: 8,
  }
});

export default styles;
