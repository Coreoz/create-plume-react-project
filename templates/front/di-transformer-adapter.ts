import { di } from "@wessberg/di-compiler";
import * as ts from 'typescript';

/**
 * Transformer used for dependency injection.
 *
 * See package `plume-ts-di`.
 */
export default function(program: ts.Program) {
  return di({ program });
}
