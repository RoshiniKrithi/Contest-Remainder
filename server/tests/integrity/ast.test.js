import { parseCode, getAstNodeCount, getCyclomaticComplexity } from "../../services/integrity/ast/parser";
import { normalizeAst, stringifyAstStructure } from "../../services/integrity/ast/normalizer";
import { getAstFingerprints } from "../../services/integrity/ast/winnowing";

const jsCode = `
function findSum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 0) {
      sum += arr[i];
    }
  }
  return sum;
}
`;

const cppCode = `
int findSum(vector<int>& arr) {
  int total = 0;
  for (int x : arr) {
    if (x > 0) {
      total += x;
    }
  }
  return total;
}
`;

console.log("🧪 Running AST Parser and Normalizer verification test...");

try {
  // Test JS Parsing
  const jsNodes = parseCode(jsCode, "javascript");
  const jsCount = getAstNodeCount(jsNodes);
  const jsComplexity = getCyclomaticComplexity(jsNodes);

  console.log(`✅ JS parsed. Nodes: ${jsCount}, Complexity: ${jsComplexity}`);
  if (jsComplexity !== 3) throw new Error("Expected JS complexity to be 3");

  // Test C++ Parsing
  const cppNodes = parseCode(cppCode, "cpp");
  const cppCount = getAstNodeCount(cppNodes);
  const cppComplexity = getCyclomaticComplexity(cppNodes);

  console.log(`✅ C++ parsed. Nodes: ${cppCount}, Complexity: ${cppComplexity}`);
  if (cppComplexity !== 3) throw new Error("Expected C++ complexity to be 3");

  // Test Normalization & Fingerprinting
  const jsNormalized = normalizeAst(jsNodes);
  const jsString = stringifyAstStructure(jsNormalized);
  const jsFingerprints = getAstFingerprints(jsNodes);

  const cppNormalized = normalizeAst(cppNodes);
  const cppString = stringifyAstStructure(cppNormalized);
  const cppFingerprints = getAstFingerprints(cppNodes);

  console.log(`✅ Normalized structures generated successfully.`);
  console.log(`JS fingerprints generated: ${jsFingerprints.length}`);
  console.log(`C++ fingerprints generated: ${cppFingerprints.length}`);

  if (jsFingerprints.length === 0 || cppFingerprints.length === 0) {
    throw new Error("Failed to generate fingerprints");
  }

  console.log("🎉 AST verification tests passed successfully!");
  process.exit(0);
} catch (err) {
  console.error("❌ AST verification tests failed:", err);
  process.exit(1);
}
