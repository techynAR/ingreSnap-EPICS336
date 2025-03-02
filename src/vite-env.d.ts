/// <reference types="vite/client" />

// Remove .lottie declaration and add JSON declaration
declare module '*.json' {
  const value: any;
  export default value;
}