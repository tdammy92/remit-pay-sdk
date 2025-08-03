import React, { forwardRef, useImperativeHandle } from 'react';
import PayBox from '../components/ui/PayBox';
import { usePayWidget } from '../context';
import type { RemitWidgetProps } from '../types';

const PayWidget = forwardRef((props: RemitWidgetProps, ref) => {
  const { openPayBox, openPayWidget, closePayWidget } = usePayWidget();

  // This must use useCallback to ensure the ref doesn't get set to null and then a new ref every render.
  useImperativeHandle(
    ref,
    React.useCallback(
      () => ({
        openPayWidget,
        closePayWidget,
      }),
      [openPayWidget, closePayWidget]
    )
  );

  if (!openPayBox) {
    return null;
  }

  return <PayBox {...props} />;
});

export default PayWidget;
