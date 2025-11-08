// Minimal shims so TypeScript can compile even if React packages aren't installed yet
declare module 'react' {
  const React: any
  export default React
  export const useState: any
  export const useEffect: any
  export const useRef: any
}

declare module 'react/jsx-runtime' {
  const jsx: any
  export default jsx
  export const jsxDEV: any
  export const jsxs: any
}

declare module 'react-blessed' {
  export function render(node: any, screen: any): any
}
