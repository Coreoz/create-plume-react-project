import { di } from "@wessberg/di-compiler";
import * as ts from 'typescript';

export default function(program: ts.Program) {
  return di({ program });
}
