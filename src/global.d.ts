export { };

declare global {
  interface window {
    chrome: any;
  }
  const chrome: any;
}

// declare type ProxyType = 'http' | 'https' | 'socks' | 'socks4' | 'direct' | 'unknown';