import React from 'react';

import PayWidget from './PayWidget';
import PayWidgetProvider from '../context';

import type {
  RemitWidgetProps,
  WidgetActionRef,
  WidgetCloseParams,
  WidgetOpenParams,
} from '../types';

type PayWidgtRefObj = {
  current: WidgetActionRef | null;
};

let refs: PayWidgtRefObj[] = [];

function addNewRef(newRef: WidgetActionRef) {
  refs.push({
    current: newRef,
  });
}

function removeOldRef(oldRef: WidgetActionRef | null) {
  refs = refs.filter((r) => r.current !== oldRef);
}

const RemitWidgt = (props: RemitWidgetProps) => {
  const WidgetRef = React.useRef<WidgetActionRef | null>(null);

  const setRef = React.useCallback((ref: WidgetActionRef | null) => {
    if (ref) {
      WidgetRef.current = ref;
      addNewRef(ref);
    } else {
      removeOldRef(WidgetRef.current);
    }
  }, []);

  return (
    <PayWidgetProvider
      apiKey={props?.apiKey}
      testMode={props.testMode}
      customTheme={props.customTheme}
    >
      <PayWidget {...props} ref={setRef} />
    </PayWidgetProvider>
  );
};

function getRef() {
  const reversePriority = [...refs].reverse();
  const activeRef = reversePriority.find((ref) => ref?.current !== null);
  if (!activeRef) {
    return null;
  }
  return activeRef.current;
}

RemitWidgt.open = (params?: WidgetOpenParams) => {
  getRef()?.openPayWidget(params);
};

RemitWidgt.close = (params?: WidgetCloseParams) => {
  getRef()?.closePayWidget(params);
};

export default RemitWidgt;
