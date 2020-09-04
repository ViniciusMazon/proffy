import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F7',
  },
  header: {
    height: 340,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8257E5',
  },
  card: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E6E6F0',
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: -30,
    paddingHorizontal: 40,
    paddingBottom: 40,
    marginBottom: 30,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginTop: 40,
  },
  name: {
    fontFamily: 'Archivo_700Bold',
    color: '#FFF',
    fontSize: 24,
    lineHeight: 25,
    marginTop: 24,
  },
  subject: {
    marginTop: 4,
    color: '#D4C2FF',
    fontSize: 16,
    lineHeight: 26,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 40,
  },
  label: {
    color: '#9C98A6',
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    lineHeight: 22,
  },
  input: {
    height: 54,
    backgroundColor: '#FAFAFC',
    borderRadius: 8,
    borderColor: '#E6E6F0',
    borderStyle: 'solid',
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16,
  },
  textArea: {
    height: 295,
    backgroundColor: '#FAFAFC',
    borderRadius: 8,
    borderColor: '#E6E6F0',
    borderStyle: 'solid',
    borderWidth: 1,
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16,
    justifyContent: 'flex-start',
  },
  titleAndButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  addButton: {
  },
  addButtonText: {
    fontFamily: 'Archivo_600SemiBold',
    fontSize: 14,
    lineHeight: 26,
    color: '#8257E5',
  },
  fieldset: {},
  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputBlock: {
    width: '48%',
  },
  title: {
    fontFamily: 'Archivo_600SemiBold',
    fontSize: 18,
    lineHeight: 30,
    color: '#32264D',
    borderBottomColor: '#E6E6F0',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingBottom: 10,
    marginVertical: 30,
  },
  footerSeparator: {
    alignItems: 'center'
  },
  line: {
    width: '100%',
    borderStyle: 'solid',
    borderBottomColor: '#E6E6F0',
    borderWidth: .5,
    marginTop: 16,
  },
  deleteLineButton: {
    backgroundColor: '#FFF',
    width: 120,
    height: 30,
    marginTop: -12,
    alignItems: 'center',
  },
  deleteLineButtonText: {
    fontFamily: 'Archivo_600SemiBold',
    fontSize: 12,
    lineHeight: 20,
    color: '#E33D3D',
  }
});



export default styles;
