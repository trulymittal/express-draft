```bash
   ('-.  ) (`-.       _ (`-.
 _(  OO)  ( OO ).    ( (OO  )
(,------.(_/.  \_)-._.`     \
 |  .---' \  `.'  /(__...--''
 |  |      \     /\ |  /  | |
(|  '--.    \   \ | |  |_.' |
 |  .--'   .'    \_)|  .___.'
 |  `---. /  .'.  \ |  |
 `------''--'   '--'`--'
```

# Express API Scaffolding (express-draft)

This is a no nonsense and minimal Express.js application generator, which is can be used as a starting point for any express application.

## Installation 🏭

```bash
$ npm install -g express-draft
```

## Why another express generator ❓

1.  This generates the API scaffolding with the **error handler** ⚠️, which is always a good idea.

2.  Only installs the bare bones 💀 and "mostly" required dependencies whenever you try to start a new express application.

## Quick Start 🏃‍♂️

The quickest way to get started with express is to utilize the executable `exp` (OR `express-draft`) to generate an application as shown below:

Create (and start) the app in current folder:

```bash
$ exp .
$ npm run dev
```

OR, create (and start) the app (in `myApp` folder):

```bash
$ exp myApp
$ cd myApp
$ npm run dev
```

This will basically create this structure in your folder

```bash
.
├── .env
├── app.js
├── node_modules
├── package-lock.json
├── package.json
└── routes
    └── api.route.js
```

This is how easy it is to get going.

## A picture is worth a thousand words.

<p align='center'>
<img src='https://raw.githubusercontent.com/trulymittal/express-draft/master/SCREENCAST.svg' width='600' alt='express-draft'>
</p>

## What dependencies it installs ?

- **express** - express framework
- **dotenv** - for env variables
- **http-errors** - to create http errors
- **morgan** - to log http requests
- **nodemon** (dev) - monitors changes in files

## Command Line Options

Actually NONE is required 😊 as of now, incase I continue this project OR I'll get requests then certainly this is not the end.

## Author ✍️

[**Truly Mittal 🇮🇳**](https://trulymittal.com)

## YouTube 📺

https://youtube.com/c/yourstruly267

## Donations 💰

https://paypal.me/trulymittal

## License 🎫

[MIT](LICENSE)

## Contribute 🤝

You can fork this repo and send me a PR.
