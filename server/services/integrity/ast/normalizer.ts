import { AstNode } from "./parser";

/**
 * Normalizes loop types, anonymizes variable identifiers, and maps control constructs
 */
export function normalizeAst(nodes: AstNode[]): AstNode[] {
  // Map identifier names to anonymized tags per scope
  // For simplicity, we keep a global scope map that increments for every new identifier
  const varMap = new Map<string, string>();
  let varCounter = 0;

  const standardBoilerplate = new Set([
    "main", "solve", "Solution", "vector", "std", "cout", "cin", "endl", "print", "sys", "Main", "br", "br.readLine",
    "String", "args", "System.out.println", "Console", "log", "console.log"
  ]);

  function getAnonymizedLabel(type: string, label: string): string {
    if (standardBoilerplate.has(label)) {
      return label; // Keep standard entry points and boilerplate names
    }

    if (type === "Assignment" || type === "Call" || type === "VariableDeclaration") {
      if (!varMap.has(label)) {
        varMap.set(label, `var_${varCounter++}`);
      }
      return varMap.get(label)!;
    }

    // Normalize Loop nodes to 'loop'
    if (type === "Loop") {
      return "loop";
    }

    // Normalize Conditional nodes to 'cond'
    if (type === "Conditional") {
      return "cond";
    }

    return label;
  }

  function cloneAndNormalize(node: AstNode): AstNode {
    const normLabel = getAnonymizedLabel(node.type, node.label);
    const children = node.children.map((child) => cloneAndNormalize(child));
    
    return {
      type: node.type,
      label: normLabel,
      children,
      lineStart: node.lineStart,
      lineEnd: node.lineEnd,
      complexityValue: node.complexityValue,
    };
  }

  return nodes.map((n) => cloneAndNormalize(n));
}

/**
 * Converts a normalized AST tree into a string representation for structural comparisons
 */
export function stringifyAstStructure(nodes: AstNode[]): string {
  let result = "";

  function traverse(node: AstNode, depth: number) {
    const indent = "  ".repeat(depth);
    result += `${indent}${node.type}:${node.label}\n`;
    for (const child of node.children) {
      traverse(child, depth + 1);
    }
  }

  for (const node of nodes) {
    traverse(node, 0);
  }

  return result;
}
