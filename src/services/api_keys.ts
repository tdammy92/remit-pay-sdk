export const simpleHexHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return (hash >>> 0).toString(16);
};

const hashedHexKey = simpleHexHash('');
console.log(`Hashed Key (Hex): ${hashedHexKey}`);
