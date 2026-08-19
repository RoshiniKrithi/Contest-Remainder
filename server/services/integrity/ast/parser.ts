export interface AstNode {
  type: string;
  label: string;
  children: AstNode[];
  lineStart: number;
  lineEnd: number;
  complexityValue?: number;
}

/**
 * Tokenize a line into key components for simple structure mapping
 */
function tokenizeLine(line: string): string[] {
  // Strip strings and comments for lexical analysis
  let cleanLine = line
    .replace(/\/\/.*/g, "") // remove single line comments
    .replace(/\/\*[\s\S]*?\*\//g, "") // remove block comments
    .replace(/"[^"\\]*(?:\\.[^"\\]*)*"/g, "\"\"") // normalize double-quote strings
    .replace(/'[^'\\]*(?:\\.[^'\\]*)*'/g, "''"); // normalize single-quote strings

  // Split on symbols but keep them, then filter out spaces
  return cleanLine
    .split(/(\s+|\{|\}|\(|\)|;|[=+\-*/&|<>!]+)/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
}

/**
 * Parse C-style brace languages: C++, Java, JavaScript, TypeScript
 */
function parseBraceLanguage(code: string, language: string): AstNode[] {
  const lines = code.split("\n");
  const root: AstNode = { type: "Block", label: "root", children: [], lineStart: 1, lineEnd: lines.length };
  const stack: AstNode[] = [root];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const lineNum = i + 1;
    const tokens = tokenizeLine(rawLine);

    if (tokens.length === 0) continue;

    // Check block starts/ends
    for (const token of tokens) {
      if (token === "{") {
        const newBlock: AstNode = {
          type: "Block",
          label: "block",
          children: [],
          lineStart: lineNum,
          lineEnd: lineNum,
        };
        stack[stack.length - 1].children.push(newBlock);
        stack.push(newBlock);
      } else if (token === "}") {
        if (stack.length > 1) {
          const finished = stack.pop()!;
          finished.lineEnd = lineNum;
        }
      }
    }

    // Inspect line content to classify statements within the current block context
    const currentBlock = stack[stack.length - 1];
    const lineStr = tokens.join(" ");

    if (tokens.includes("return")) {
      currentBlock.children.push({ type: "Return", label: "return", children: [], lineStart: lineNum, lineEnd: lineNum });
    } else if (tokens.includes("for") || tokens.includes("while")) {
      currentBlock.children.push({ type: "Loop", label: tokens.includes("for") ? "for" : "while", children: [], lineStart: lineNum, lineEnd: lineNum, complexityValue: 1 });
    } else if (tokens.includes("if") || tokens.includes("else")) {
      currentBlock.children.push({ type: "Conditional", label: tokens.includes("if") ? "if" : "else", children: [], lineStart: lineNum, lineEnd: lineNum, complexityValue: 1 });
    } else if (tokens.includes("class")) {
      const classIdx = tokens.indexOf("class");
      const className = tokens[classIdx + 1] || "anonymous";
      currentBlock.children.push({ type: "Class", label: className, children: [], lineStart: lineNum, lineEnd: lineNum });
    } else if (tokens.includes("function") || (language === "javascript" && lineStr.includes("=>"))) {
      const funcName = tokens.includes("function") ? (tokens[tokens.indexOf("function") + 1] || "anonymous") : "arrow";
      currentBlock.children.push({ type: "Function", label: funcName, children: [], lineStart: lineNum, lineEnd: lineNum });
    } else if (tokens.includes("=")) {
      // Assignment or declaration
      const eqIdx = tokens.indexOf("=");
      const varName = tokens[eqIdx - 1] || "temp";
      currentBlock.children.push({ type: "Assignment", label: varName, children: [], lineStart: lineNum, lineEnd: lineNum });
    } else if (lineStr.includes("(") && lineStr.includes(")")) {
      // Possible standalone call
      const openParen = tokens.indexOf("(");
      const callName = tokens[openParen - 1] || "call";
      currentBlock.children.push({ type: "Call", label: callName, children: [], lineStart: lineNum, lineEnd: lineNum });
    }
  }

  // Close any unclosed blocks
  while (stack.length > 0) {
    stack.pop()!.lineEnd = lines.length;
  }

  return root.children;
}

/**
 * Parse indentation-based languages: Python
 */
function parsePython(code: string): AstNode[] {
  const lines = code.split("\n");
  const root: AstNode = { type: "Block", label: "root", children: [], lineStart: 1, lineEnd: lines.length };
  
  // Track blocks by indent level
  // Stack format: { indent: number, node: AstNode }
  const stack = [{ indent: -1, node: root }];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const lineNum = i + 1;

    // Skip empty lines or comment-only lines
    if (rawLine.trim().length === 0 || rawLine.trim().startsWith("#")) continue;

    // Measure indent (number of leading spaces)
    const indent = rawLine.search(/\S/);
    const tokens = tokenizeLine(rawLine);

    if (tokens.length === 0) continue;

    // Pop stack if we decreased indent level
    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
      const finished = stack.pop()!.node;
      finished.lineEnd = lineNum - 1;
    }

    const currentBlock = stack[stack.length - 1].node;
    const lineStr = tokens.join(" ");

    let newNode: AstNode | null = null;

    if (tokens.includes("def")) {
      const defIdx = tokens.indexOf("def");
      const name = tokens[defIdx + 1] || "def";
      newNode = { type: "Function", label: name, children: [], lineStart: lineNum, lineEnd: lineNum };
    } else if (tokens.includes("class")) {
      const clsIdx = tokens.indexOf("class");
      const name = tokens[clsIdx + 1] || "class";
      newNode = { type: "Class", label: name, children: [], lineStart: lineNum, lineEnd: lineNum };
    } else if (tokens.includes("for") || tokens.includes("while")) {
      newNode = { type: "Loop", label: tokens.includes("for") ? "for" : "while", children: [], lineStart: lineNum, lineEnd: lineNum, complexityValue: 1 };
    } else if (tokens.includes("if") || tokens.includes("elif") || tokens.includes("else")) {
      newNode = { type: "Conditional", label: tokens[tokens.indexOf("if") >= 0 ? tokens.indexOf("if") : (tokens.indexOf("elif") >= 0 ? tokens.indexOf("elif") : tokens.indexOf("else"))], children: [], lineStart: lineNum, lineEnd: lineNum, complexityValue: 1 };
    } else if (tokens.includes("return")) {
      newNode = { type: "Return", label: "return", children: [], lineStart: lineNum, lineEnd: lineNum };
    } else if (tokens.includes("=")) {
      const eqIdx = tokens.indexOf("=");
      const varName = tokens[eqIdx - 1] || "temp";
      newNode = { type: "Assignment", label: varName, children: [], lineStart: lineNum, lineEnd: lineNum };
    } else if (lineStr.includes("(") && lineStr.includes(")")) {
      const openParen = tokens.indexOf("(");
      const callName = tokens[openParen - 1] || "call";
      newNode = { type: "Call", label: callName, children: [], lineStart: lineNum, lineEnd: lineNum };
    }

    if (newNode) {
      currentBlock.children.push(newNode);
      
      // If Python line ends with a colon, it begins a new indent block
      if (rawLine.trim().endsWith(":")) {
        stack.push({ indent, node: newNode });
      }
    }
  }

  // Close remaining blocks
  while (stack.length > 0) {
    stack.pop()!.node.lineEnd = lines.length;
  }

  return root.children;
}

/**
 * Global AST Parser entry point supporting C++, Python, Java, JS/TS
 */
export function parseCode(code: string, language: string): AstNode[] {
  const cleanLang = language.toLowerCase();
  try {
    if (cleanLang === "python") {
      return parsePython(code);
    }
    // Brace language fallback: C++, Java, JS, TS
    return parseBraceLanguage(code, cleanLang);
  } catch (err) {
    console.error(`Error parsing language ${language}:`, err);
    return []; // Failure tolerance — never crash the compiler
  }
}

/**
 * Calculates cyclomatic complexity value by summing branching nodes (loops, conditionals) + 1 base path
 */
export function getCyclomaticComplexity(nodes: AstNode[]): number {
  let complexity = 1;

  function traverse(n: AstNode) {
    if (n.complexityValue) {
      complexity += n.complexityValue;
    }
    for (const child of n.children) {
      traverse(child);
    }
  }

  for (const node of nodes) {
    traverse(node);
  }

  return complexity;
}

/**
 * Counts total AST Nodes recursively
 */
export function getAstNodeCount(nodes: AstNode[]): number {
  let count = 0;

  function traverse(n: AstNode) {
    count++;
    for (const child of n.children) {
      traverse(child);
    }
  }

  for (const node of nodes) {
    traverse(node);
  }

  return count;
}
