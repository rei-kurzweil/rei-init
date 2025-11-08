// Allow JSX intrinsic elements for react-blessed without strict typing
declare global {
  namespace JSX {
    interface IntrinsicElements {
      element: any
      box: any
      list: any
      log: any
      button: any
      [elemName: string]: any
    }
    interface IntrinsicAttributes {
      [attr: string]: any
    }
  }
}

export {}
