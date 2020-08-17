import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f7',
  },
  banner: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 90,
  },
  logo: {
    marginTop: 20,
    height: 120,
    width: 120,
  },
  number: {
    fontFamily: 'Archivo_400Regular',
    fontSize: 40,
    lineHeight: 44,
    color: '#6A6180',
    opacity: 0.16,
    marginLeft: 40,
    marginTop: 90,
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#6A6180',
    fontSize: 24,
    lineHeight: 34,
    maxWidth: 206,
    marginLeft: 40,
    marginTop: 24,
  },
  footer: {
    marginHorizontal: 40,
    marginTop: 90,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dotContainer: {
    flexDirection: 'row',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 3,
    marginRight: 8,
  },
  linkButton: {
    height: 20,
    justifyContent: 'center'
  },
});

export default styles;
