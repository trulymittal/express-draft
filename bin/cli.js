#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs-extra');
const figlet = require('figlet');
const chalk = require('chalk');
const logSymbols = require('log-symbols');
const ora = require('ora');

const mArgs = process.argv.slice(2);
const startTime = new Date().getTime();

if (mArgs.length === 0) {
  console.log(logSymbols.error, chalk.red('invalid path...'));
  console.log(
    'use',
    chalk.green('exp .'),
    ', to install in current directory',
    process.cwd()
  );
  console.log(
    'or',
    chalk.green('exp mApp'),
    ', to install in mApp directory',
    path.join(process.cwd(), 'mApp')
  );
  return;
}

const appDir = path.join(process.cwd(), mArgs[0]);

figlet('Exp', { font: 'Ghost' }, (err, data) => {
  if (err) {
    console.log('Something went wrong...');
    console.log(err);
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
    if (!(await fs.pathExists(appDir))) {
      await fs.mkdir(appDir);
    }

    const files = await fs.readdir(appDir);
    if (files.length > 0) {
      console.log(logSymbols.error, 'Directory not empty, aborting');
      return;
    }
    console.log('🚚 Bootstrapping Express app in', chalk.green(appDir), '\n');

    await installScript('npm', ['init', '-y'], 'Creating Package.json ...');
    await installScript(
      'npm',
      ['i', 'express', 'dotenv', 'http-errors', 'morgan'],
      'Installing dependencies ...'
    );
    await installScript(
      'npm',
      ['i', '--save-dev', 'nodemon'],
      'Installing dev dependencies ...'
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
    const child = spawn(command, args, { cwd: appDir });
    // child.stderr.on('data', (data) => console.log('stderr...'));
    // child.stdout.on('data', (data) => console.log('stdout...'));
    child.on('exit', (code, signal) => {
      if (code) {
        spinner.fail();
        console.log(`Process exit with code: ${code}`);
        reject(`Process exit with code: ${code}`);
      } else if (signal) {
        spinner.fail();
        console.log(`Process exit with signal: ${signal}`);
        reject(`Process exit with signal: ${signal}`);
      } else {
        spinner.succeed();
        resolve();
      }
    });
  });
}

function copyFiles() {
  return new Promise(async (resolve, reject) => {
    const spinner = ora('Pouring files ...').start();
    try {
      const srcAppJs = path.join(__dirname, '..', 'templates', 'app.js');
      const destAppJs = path.join(appDir, 'app.js');
      await fs.copyFile(srcAppJs, destAppJs);

      const srcEnv = path.join(__dirname, '..', 'templates', 'default.env');
      const destEnv = path.join(appDir, '.env');
      await fs.copyFile(srcEnv, destEnv);

      const srcApiRoute = path.join(
        __dirname,
        '..',
        'templates',
        'api.route.js'
      );
      const routePath = path.join(appDir, 'routes');
      await fs.mkdir(routePath);
      const destApiRoute = path.join(routePath, 'api.route.js');
      await fs.copyFile(srcApiRoute, destApiRoute);

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
    const spinner = ora('Creating scripts ...').start();
    try {
      const pkgSrc = path.join(appDir, 'package.json');
      const pkgfile = await fs.readFile(pkgSrc, { encoding: 'utf-8' });
      let packageJson = JSON.parse(pkgfile);

      packageJson = {
        ...packageJson,
        main: 'app.js',
        scripts: {
          start: 'node app.js',
          dev: 'nodemon app.js',
        },
        license: 'MIT',
      };
      const pkgDest = path.join(appDir, 'package.json');
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
  console.log('Begin by typing:');
  console.group();
  console.log(chalk.blue('cd'), mArgs[0]);
  console.log(chalk.blue('npm run dev'));
  console.group();
  console.log('starts the development server (using nodemon 🧐)');
  console.groupEnd();
  console.log(chalk.blue('npm start'));
  console.group();
  console.log('starts the server (using node 😁)');
  console.groupEnd();
  console.groupEnd();
  console.log(chalk.yellow('------------------------------------'));

  const endTime = new Date().getTime();
  const timeDifference = (endTime - startTime) / 1000;
  console.log(`✅ Done in ${timeDifference} seconds 💫`);
  console.log('🌈 Happy hacking 🦄');
}
