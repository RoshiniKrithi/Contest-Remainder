import { executeCode } from "../judge";

async function test() {
  console.log("Testing C++ execution runner...");
  const code = `#include <iostream>
using namespace std;
int main() {
    cout << "Two Sum Result: [0, 1]" << endl;
    return 0;
}`;

  const res = await executeCode(code, "cpp", "nums = [2,7,11,15], target = 9");
  console.log("EXECUTION RESULT:", res);
}

test().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
