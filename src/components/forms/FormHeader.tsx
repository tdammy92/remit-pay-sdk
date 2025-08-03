import { StyleSheet, Text, View } from 'react-native';
import { usePayWidget } from '../../context';
import CloseWidget from '../ui/CloseWidget';

const FormHeader = ({ title }: { title: string }) => {
  const { theme } = usePayWidget();
  return (
    <View style={[styles.container, {}]}>
      <CloseWidget />
      <Text style={[styles.title, { color: theme?.textColor }]}>{title}</Text>
      <View style={{ width: 30 }} />
    </View>
  );
};

export default FormHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    //     marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
