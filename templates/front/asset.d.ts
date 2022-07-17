/**
 * this file is use to make import available on different file type than .ts or .tsx .js .css etc.
 * You can declare here any type of file that you want to import
 */
/**
 * ajout des modules vite
 */
/// <reference types="vite/client" />

declare module '*.png'
declare module '*.jpg'
declare module '*.gif'
