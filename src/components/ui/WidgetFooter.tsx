import { Text, View } from 'react-native';
import { usePayWidget } from '../../context';

const WidgetFooter = () => {
  const { theme } = usePayWidget();

  return (
    <View>
      <Text
        style={{
          color: theme.textColor,
          fontSize: 14,
          textAlign: 'center',
          marginTop: 14,
        }}
      >
        Powered by Widget Pay
      </Text>
    </View>
  );
};

export default WidgetFooter;
