import chalk from 'chalk'
import { exec } from 'child_process'
import { readdirSync } from 'node:fs'
import inquirer from 'inquirer'
import inquirerSearchList from 'inquirer-search-list'
import process from 'node:process'

inquirer.registerPrompt('search-list', inquirerSearchList)

function compile(name) {
  console.log(chalk.yellow(`\n${name}: begin compile\n`))
  exec(
    `cd packages/${name} && npx rollup -c ../../rollup.config.js --environment PACKAGENAME:${name}`,
    (e, stdout, stderr) => {
      if (e) {
        console.log(chalk.yellow(`\n${name}: ${e}\n`))
      }
      if (stderr) {
        console.log(chalk.yellow(`\n${name}: ${stderr}\n`))
      }
      if (stdout) {
        console.log(chalk.yellow(`\n${name}: ${stdout}\n`))
      }
    }
  ).on('close', () => {
    console.log(chalk.yellow(`\n${name}: end compile\n`))
  })
}

async function compileCore(name, mode) {
  let compileMode = mode
  if (!mode) {
    const modes = await inquirer.prompt([
      {
        type: 'search-list',
        name: 'selected',
        message: 'select packages build?',
        choices: ['test', 'pre', 'online'],
      },
    ])
    compileMode = modes.selected
  }
  console.log(chalk.yellow(`\n${name}: begin compile\n`))
  exec(
    `cd packages/${name} && npm run build:${compileMode}`,
    (e, stdout, stderr) => {
      if (e) {
        console.log(chalk.yellow(`\n${name}: ${e}\n`))
      }
      if (stderr) {
        console.log(chalk.yellow(`\n${name}: ${stderr}\n`))
      }
      if (stdout) {
        console.log(chalk.yellow(`\n${name}: ${stdout}\n`))
      }
    }
  ).on('close', () => {
    console.log(chalk.yellow(`\n${name}: end compile\n`))
  })
}

function buildPlugins() {
  const packages = readdirSync('packages')
  for (const buildPackage of packages) {
    if (buildPackage === 'core') continue
    compile(buildPackage)
  }
}

async function main() {
  if (process.argv[2] === 'core') {
    return compileCore('core', process.argv[3])
  }
  if (process.argv[2] === 'plugins') {
    return buildPlugins()
  }

  const packageDirs = readdirSync('packages')
  const packages = await inquirer.prompt([
    {
      type: 'search-list',
      name: 'selected',
      message: 'select packages build?',
      choices: packageDirs,
    },
  ])
  const buildPackage = packages.selected
  if (buildPackage === 'core') {
    compileCore(packages.selected)
  } else {
    compile(packages.selected)
  }
}

main()
