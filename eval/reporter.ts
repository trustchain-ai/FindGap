export function summarizeFixtureResults(results: Array<{ name: string; pass: boolean }>) {
  const passed = results.filter(result => result.pass).length
  return {
    total: results.length,
    passed,
    failed: results.length - passed
  }
}
