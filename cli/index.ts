import { DEFAULT_MODE } from './config.js'
import { runCheckCommand } from './commands/check.js'
import { runEvalCommand } from './commands/eval.js'
import { runReportCommand } from './commands/report.js'

const [, , command, filePath, maybeMode] = process.argv

if (command === 'check' && filePath) {
  const output = runCheckCommand({
    filePath,
    mode: maybeMode === 'receiver-check' ? 'receiver-check' : DEFAULT_MODE
  })
  process.stdout.write(`${output}\n`)
} else if (command === 'eval') {
  const results = runEvalCommand()
  const passed = results.filter(r => r.pass).length
  process.stdout.write(`${passed}/${results.length} fixtures passed\n`)
  results.filter(r => !r.pass).forEach(r => process.stdout.write(`  FAIL: ${r.name}\n`))
} else if (command === 'report') {
  const summary = runReportCommand()
  process.stdout.write(`total: ${summary.total}, passed: ${summary.passed}, failed: ${summary.failed}\n`)
}
