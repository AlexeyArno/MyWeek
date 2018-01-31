# My Week

![](https://raw.githubusercontent.com/AlexeyArno/MyWeek/dev/res/images/Screenshot.png)
### Сapabilities
My week is simple weeks organizer build by Typescript and Electrone.

  - Task planning for each hour in week
  - Few weeks
  - Support actions as open files/links
  - Support notifications by HTML5



### Tech

Dillinger uses a number of open source projects to work properly:

* [Typescript](http://www.typescriptlang.org/) - TypeScript is a typed superset of JavaScript that compiles to plain JavaScript!
* [Electron](https://electronjs.org/) -  open source library developed by GitHub for building cross-platform desktop applications with HTML, CSS, and JavaScript.

### Installation and Run

MyWeek requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies and start the server.

```sh
$ git clone https://github.com/AlexeyArno/MyWeek
$ cd MyWeek
$ npm install 
$ electron .
```
### Build

Build work by [electron-packager](https://www.npmjs.com/package/electron-packager)

```sh
$ electron-packager path\to\MyWeek MyWeek --icon="path\to\MyWeek\res\images\logo.ico"
```

### Development

MyWeek uses Webpack for fast developing.
Make a change in your file and instantanously see your updates!

Open your favorite Terminal and run these commands.

Run electrone:
```sh
$ electron .
```

Run webpack watch:
```sh
$ npm watch
```

License
----

GPL-3.0


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [node.js]: <http://nodejs.org>
   [Typescript]: <http://www.typescriptlang.org/>
   [Electron]: <https://electronjs.org/>
   [electron-packager]:<https://www.npmjs.com/package/electron-packager>
