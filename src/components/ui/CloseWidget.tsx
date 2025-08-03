import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { usePayWidget } from '../../context';

const CloseWidget = () => {
  const { theme, closeWithing } = usePayWidget();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderColor: theme.textColor,
        },
      ]}
      onPress={closeWithing}
    >
      <Text style={[styles.text, { color: theme.textColor }]}>✕</Text>
    </TouchableOpacity>
  );
};

export default CloseWidget;

const styles = StyleSheet.create({
  container: {
    height: 35,
    width: 35,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    alignSelf: 'center',
    fontSize: 18,
  },
});
