import * as ts from "typescript";

import * as nodePath from "path";

// Inspired by https://github.com/grrowl/ts-transformer-imports/blob/master/transformer.ts

// Liste des extensions à traiter
const PATH_EXTENSIONS_TO_VISIT = [".tsx"];
const MODULE_PATTERNS = [".module.scss", ".scss", ".module.css", ".css"];

/**
 * Transformer permettant de modifier les imports des scss modules dans les fichier js issue de la compilation ts
 * seul les fichier .tsx sont impacté par ce transformer, grâce au PATH_EXTENSIONS_TO_VISIT.
 * Les path sont update pour référencer les module scss présent dans src.
 * @param program
 */
const transform = (program: ts.Program) => transformerFactory;

const transformerFactory: ts.TransformerFactory<ts.SourceFile> = context => {
  return file => visitSourceFile(file, context) as ts.SourceFile;
};

function visitSourceFile(
  sourceFile: ts.SourceFile,
  context: ts.TransformationContext,
) {
  // On suppose que les module scss ne sont utilisé que dans les composant react
  // donc importé uniquement dans les fichiers .tsx
  if(!PATH_EXTENSIONS_TO_VISIT.includes(nodePath.extname(sourceFile.fileName))) {
    return sourceFile;
  }

  return ts.visitEachChild(
    sourceFile,
    childNode => visitNode(childNode),
    context
  );

  function visitNode(node: ts.Node) {
    if (ts.isImportDeclaration(node)) {
      return visitImportNode(node);
    }
    return node;
  }

  function visitImportNode(node: ts.ImportDeclaration) {
    if (!node.moduleSpecifier || !isImportMatchModulePattern(node)) {
      return node;
    }

    const sourceFilePath = nodePath.dirname(sourceFile.fileName);
    return relativizeImportExportNode(node, sourceFilePath);
  }

  function isImportMatchModulePattern(node: ts.ImportDeclaration) {
    if (node.moduleSpecifier && node.moduleSpecifier.getSourceFile()) {
      const fileName = getFileName(node.moduleSpecifier);
      return MODULE_PATTERNS.some(pattern => fileName.endsWith(pattern));
    }
    return false;
  }

  function getFileName(specifier: ts.Expression) {
    const splitedFilePath = specifier
      .getText()
      .split('/');
    return splitedFilePath[splitedFilePath.length-1].replace("'", '');
  }

  function relativizeImportExportNode(
    node: ts.ImportDeclaration,
    sourceFilePath: string
  ) {
    if (!node.moduleSpecifier || !node.moduleSpecifier.getSourceFile()) {
      return node;
    }

    const replacePath = nodePath
      .relative(
        sourceFilePath.replace('src', 'ts-built'),
        sourceFilePath+'/'+getFileName(node.moduleSpecifier)
      ).replace(/\\/g, "/");

    // replace the module specifier
    return ts.factory.updateImportDeclaration(node, node.decorators, node.modifiers, node.importClause,
      ts.factory.createStringLiteral(`./${replacePath}`, true));
  }
}

export default transform;
