#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs-extra');
const figlet = require('figlet');
const chalk = require('chalk');
const logSymbols = require('log-symbols');
const ora = require('ora');

figlet('Exp', { font: 'Ghost' }, (err, data) => {
  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }
  console.log(chalk.green(data));
  const channel = 'https://youtube.com/c/yourstruly267';
  const paypal = 'https://paypal.me/trulymittal';
  console.log(chalk.yellow('-----------------------------------------------'));
  console.log(chalk.white('📺 Visit us @'), chalk.red(channel));
  console.log(chalk.white('💰 Support us @'), chalk.blue(paypal));
  console.log(chalk.yellow('-----------------------------------------------'));
  createApp();
});

async function createApp() {
  try {
    const files = await fs.readdir(process.cwd());
    if (files.length > 0) {
      console.log(logSymbols.error, 'Directory not empty, aborting');
      // return;
    }
    console.log(
      '🚚 Bootstrapping Express app in',
      chalk.green(process.cwd()),
      '\n'
    );
    await installScript('npm', ['init', '-y'], 'Creating Package.json');
    await installScript(
      'npm',
      ['i', 'express', 'dotenv', 'http-errors', 'morgan'],
      'Installing dependencies'
    );
    await installScript(
      'npm',
      ['i', '--save-dev', 'nodemon'],
      'Installing dev dependencies'
    );
    await copyFiles();
    await modifyPackageJson();
    done();
  } catch (error) {
    console.log(error);
  }
}

function installScript(command, args, spinnerText) {
  return new Promise((resolve, reject) => {
    const spinner = ora(spinnerText).start();
    const child = spawn(command, args);
    // child.stderr.on('data', (data) => console.log('stderr...'));
    // child.stdout.on('data', (data) => console.log('stdout...'));
    child.on('exit', (code, signal) => {
      if (code) {
        spinner.fail();
        console.log(`Process exit with code: ${code}`);
        reject();
      } else if (signal) {
        spinner.fail();
        console.log(`Process exit with signal: ${signal}`);
        reject();
      } else {
        spinner.succeed();
        resolve();
      }
    });
  });
}

function copyFiles() {
  return new Promise(async (resolve, reject) => {
    const spinner = ora('Pouring files...').start();
    try {
      const srcAppJs = path.join(__dirname, '..', 'app.js');
      const destAppJs = path.join(process.cwd(), 'app.js');
      // fs.copyFileSync(srcAppJs, destAppJs);
      await fs.copyFile(srcAppJs, destAppJs);

      const srcEnv = path.join(__dirname, '..', 'default.env');
      const destEnv = path.join(process.cwd(), '.env');
      await fs.copyFile(srcEnv, destEnv);
      spinner.succeed();
      resolve();
    } catch (error) {
      spinner.fail();
      reject(error);
    }
  });
}

function modifyPackageJson() {
  return new Promise(async (resolve, reject) => {
    const spinner = ora('Creating scripts...').start();
    try {
      const pkgSrc = path.join(process.cwd(), 'package.json');
      const pkgfile = await fs.readFile(pkgSrc, { encoding: 'utf-8' });
      let packageJson = JSON.parse(pkgfile);

      packageJson = {
        ...packageJson,
        main: 'app.js',
        scripts: {
          start: 'node app.js',
          dev: 'nodemon app.js',
        },
      };
      const pkgDest = path.join(process.cwd(), 'package.json');
      await fs.writeFile(pkgDest, JSON.stringify(packageJson, null, 2));
      spinner.succeed();
      resolve();
    } catch (error) {
      spinner.fail();
      reject(error);
    }
  });
}

function done() {
  console.log(chalk.yellow('------------------------------------'));
  console.log('🧐 development server @', chalk.blue('npm run dev'));
  console.log('😁 production server @', chalk.green('npm start'));
  console.log(chalk.yellow('------------------------------------'));
  console.log('🌈 Happy hacking 🦄');
}
