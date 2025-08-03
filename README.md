# 📦 Remit Pay SDK

**Remit Pay SDK** is a cross-platform React Native widget library that provides an embeddable and customizable remittance payment flow. With just a few lines of code, you can integrate a fully functional remittance interface into your mobile app.

---

## ✨ Features

- 💸 Simple money sending flow
- 🌐 Supports cross-currency remittance (e.g., USD ➡️ NGN)
- 🌙 Light/Dark theming
- ✅ Success & error callbacks
- 🧪 Test mode for sandbox simulation
- 🔒 API key-based secure initialization

---

## 📦 Installation

Using [Yarn](https://yarnpkg.com):

```bash
yarn add remit-pay-sdk
```

Or using [npm](https://www.npmjs.com/):

```bash
npm install remit-pay-sdk
```

> Make sure your project is React Native 0.60+.

---

## 🛠️ Usage

```tsx
import RemitWidgt, {
  type Transaction,
  type TransactionError,
} from 'remit-pay-sdk';
```

### Example App

#### Exanple app can be found in [`./example/src`](./example/src/)

```tsx
const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleSuccess = (transaction: Transaction) => {
    console.log('Transaction successful:', transaction);
  };

  const handleError = (error: TransactionError) => {
    Alert.alert('Error', error.message);
  };

  const handleCancel = () => {
    console.log('Transaction cancelled');
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => RemitWidgt.open()}>
          <Text>Send Money</Text>
        </TouchableOpacity>
      </SafeAreaView>

      <RemitWidgt
        apiKey="YOUR_API_KEY"
        onSuccess={handleSuccess}
        onError={handleError}
        onCancel={handleCancel}
        customTheme={theme}
        defaultSendCurrency="USD"
        defaultReceiveCurrency="NGN"
        testMode={true}
      />
    </>
  );
};
```

---

## ⚙️ Props

| Prop                     | Type                                 | Required | Description                                            |
| ------------------------ | ------------------------------------ | -------- | ------------------------------------------------------ | ------------------------------------------------------ |
| `apiKey`                 | `string`                             | ✅       | Your API key for authentication.                       |
| `onSuccess`              | `(transaction: Transaction) => void` | ✅       | Callback when a transaction is completed successfully. |
| `onError`                | `(error: TransactionError) => void`  | ✅       | Callback for handling errors.                          |
| `onCancel`               | `() => void`                         | ❌       | Callback when the user cancels the transaction.        |
| `customTheme`            | `'light'                             | 'dark'`  | ❌                                                     | Sets the widget's visual theme. Defaults to `'light'`. |
| `defaultSendCurrency`    | `string`                             | ❌       | Default currency to send from (e.g., `'USD'`).         |
| `defaultReceiveCurrency` | `string`                             | ❌       | Default currency to receive into (e.g., `'NGN'`).      |
| `testMode`               | `boolean`                            | ❌       | If `true`, enables sandbox/test environment.           |

---

## 🧾 Types

### `RemitWidgetProps`

Defined in [`index.ts`](./src/types/index.ts):

```ts
export interface RemitWidgetProps {
  apiKey: string;
  onSuccess: (transaction: Transaction) => void;
  onError: (error: TransactionError) => void;
  onCancel?: () => void;
  customTheme?: 'light' | 'dark' | Theme;
  defaultSendCurrency?: string;
  defaultReceiveCurrency?: string;
  enabledCountries?: string[];
  testMode?: boolean;
  openPayWidget?: (params?: WidgetOpenParams) => void;
  closePayWidget?: (params?: WidgetCloseParams) => void;
}
```

### `Transaction`

Defined in [`transaction.types.ts`](./src/types/transaction.types.ts):

```ts
export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: 'success' | 'pending' | 'failed';
  sender: User;
  receiver: User;
  reference: string;
  timestamp: string;
}
```

### `TransactionError`

```ts
export interface TransactionError {
  code: string;
  message: string;
}
```

### `User`

Defined in [`user.types.ts`](./src/types/user.types.ts):

```ts
export interface User {
  id: string;
  name: string;
  email: string;
  country: string;
}
```

---

## 🎨 Theming

Pass `customTheme="dark"` or `"light"` to enable dark/light mode.  
You can dynamically toggle this based on user preferences.

---

## 📸 UI Preview

![Widget Screenshot](https://user-images.example.com/remit-widget-demo.png)

> _Image is a placeholder. Replace with a screenshot of the widget UI._
