# README

This README would normally document whatever steps are necessary to get your
application up and running.

### What is this repository for?

-   Quick summary
-   Version
-   [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

---

## Requirements

For development, you will only need Node.js and a node global package, Yarn,
installed in your environement.

### Node

-   #### Node installation on Windows

    Just go on [official Node.js website](https://nodejs.org/) and download the
    installer. Also, be sure to have `git` available in your PATH, `npm` might
    need it (You can find git [here](https://git-scm.com/)).

-   #### Node installation on Ubuntu

    You can install nodejs and npm easily with apt install, just run the
    following commands.

        $ sudo apt install nodejs
        $ sudo apt install npm

-   #### Other Operating Systems
    You can find more information about the installation on the
    [official Node.js website](https://nodejs.org/) and the
    [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following
command.

    $ node --version
    v12.6.0  or above

    $ npm --version
    6.13.4 or above

If you need to update `npm`, you can make it using `npm`! Cool right? After
running the following command, just open again the command line and be happy.

    $ npm install npm -g

###

### Yarn installation

After installing node, this project will need yarn too, so just run the
following command.

      $ npm install -g yarn

---

## Install

    $ git clone git+ssh://git@bitbucket.org/kojoadobaw/metasolution-alpha.git
    $ cd metasolution-alpha
    $ yarn install

## Configuration

Create a .env file in project root directory for your enviroment config. You can
refer to the example.env for app configuration.

     $ APP=dev
     $ PORT=*******
     $ BCRYPT_SALT = *******
     $ DB_DIALECT=*******
     $ DB_HOST=*******
     $ DB_PORT=*******
     $ DB_NAME=*******
     $ DB_USER=*******
     $ DB_PASSWORD=*******
     $ JWT_ENCRYPTION=****************************
     $ JWT_EXPIRATION=*******

## Running the project

-   #### Build Application

        $ yarn build

    This will compile typescript to javascript

-   #### Start Application

        $ yarn start

-   #### Start Application With Nodemom

        $ yarn debug

    Application will restart on changes to ./src source folder

### Who do I talk to?

-   Repo owner or admin
-   Other community or team contact

##
