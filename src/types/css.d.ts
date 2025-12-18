/**
 * TypeScript module declaration for CSS Modules.
 *
 * This allows importing `.module.css` files in TypeScript
 */
declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}
