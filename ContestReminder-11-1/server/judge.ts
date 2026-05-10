import axios from "axios";

// Judge0 language IDs
export const LANGUAGE_IDS: Record<string, number> = {
  c:          50,
  cpp:        54,
  java:       62,
  python:     71,
  javascript: 63,
};

export const LANGUAGE_NAMES: Record<string, string> = {
  c:          "C (GCC 9.2.0)",
  cpp:        "C++ (GCC 9.2.0)",
  java:       "Java (OpenJDK 13.0.1)",
  python:     "Python (3.8.1)",
  javascript: "JavaScript (Node.js 12.14.0)",
};

export interface ExecutionResult {
  status: string;       // "Accepted" | "Wrong Answer" | "Time Limit Exceeded" | "Runtime Error" | "Compilation Error"
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  time: string | null;
  memory: number | null;
  statusId: number;
}

const JUDGE0_URL = process.env.JUDGE0_API_URL || "https://judge0-ce.p.rapidapi.com";
const JUDGE0_KEY = process.env.JUDGE0_API_KEY || "";

// Status ID mapping
const STATUS_MAP: Record<number, string> = {
  1:  "In Queue",
  2:  "Processing",
  3:  "Accepted",
  4:  "Wrong Answer",
  5:  "Time Limit Exceeded",
  6:  "Compilation Error",
  7:  "Runtime Error (SIGSEGV)",
  8:  "Runtime Error (SIGXFSZ)",
  9:  "Runtime Error (SIGFPE)",
  10: "Runtime Error (SIGABRT)",
  11: "Runtime Error (NZEC)",
  12: "Runtime Error (Other)",
  13: "Internal Error",
  14: "Exec Format Error",
};

export async function executeCode(
  sourceCode: string,
  language: string,
  stdin: string = "",
  expectedOutput?: string
): Promise<ExecutionResult> {
  const languageId = LANGUAGE_IDS[language];
  if (!languageId) throw new Error(`Unsupported language: ${language}`);

  if (!JUDGE0_KEY || JUDGE0_KEY === "your_rapidapi_key_here") {
    // Fallback: simulate execution for demo
    return simulateExecution(sourceCode, language, stdin, expectedOutput);
  }

  try {
    // Submit to Judge0
    const submitRes = await axios.post(
      `${JUDGE0_URL}/submissions?base64_encoded=false&wait=false`,
      {
        source_code: sourceCode,
        language_id: languageId,
        stdin: stdin || "",
        expected_output: expectedOutput || null,
        cpu_time_limit: 5,
        memory_limit: 128000,
      },
      {
        headers: {
          "X-RapidAPI-Key": JUDGE0_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    const token = submitRes.data.token;

    // Poll for result (max 10 attempts, 1s apart)
    for (let i = 0; i < 10; i++) {
      await new Promise(r => setTimeout(r, 1000));
      const resultRes = await axios.get(
        `${JUDGE0_URL}/submissions/${token}?base64_encoded=false`,
        {
          headers: {
            "X-RapidAPI-Key": JUDGE0_KEY,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
          timeout: 10000,
        }
      );

      const data = resultRes.data;
      if (data.status?.id <= 2) continue; // Still processing

      return {
        status: STATUS_MAP[data.status?.id] || "Unknown",
        stdout: data.stdout,
        stderr: data.stderr,
        compile_output: data.compile_output,
        time: data.time,
        memory: data.memory,
        statusId: data.status?.id,
      };
    }

    return { status: "Time Limit Exceeded", stdout: null, stderr: "Execution timed out", compile_output: null, time: null, memory: null, statusId: 5 };
  } catch (err: any) {
    throw new Error(`Execution failed: ${err.message}`);
  }
}

// Demo simulation when no Judge0 key is configured
function simulateExecution(code: string, language: string, stdin: string, expectedOutput?: string): ExecutionResult {
  const hasError = code.includes("syntax error") || code.includes("undefined_var_xyz");
  if (hasError) {
    return { status: "Compilation Error", stdout: null, stderr: null, compile_output: "SyntaxError: Unexpected token", time: null, memory: null, statusId: 6 };
  }
  const output = stdin ? `Output for input: ${stdin}` : "Hello, World!";
  const accepted = !expectedOutput || output.trim() === expectedOutput.trim();
  return {
    status: accepted ? "Accepted" : "Wrong Answer",
    stdout: output,
    stderr: null,
    compile_output: null,
    time: "0.05",
    memory: 1024,
    statusId: accepted ? 3 : 4,
  };
}
