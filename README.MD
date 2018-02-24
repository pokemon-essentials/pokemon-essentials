![logo](img/titles1/pokelogo.png)

Pokémon Essentials is a Pokémon game project made in RPG Maker MV. Based on the [Pokémon Essentials](http://pokemonessentials.wikia.com/wiki/Pok%C3%A9mon_Essentials_Wiki)  project for RPG Maker XP and [Pokémon Showdown](https://github.com/Zarel/Pokemon-Showdown).


## Getting Started
This project don't use the RPG Maker MV editor, a custom editor is under construction. But right now,
 to lauch ans test the game you will need download and install some software. Follow the following steps 
 setup a development environment.

1. Donwload and install [Node Js](https://nodejs.org/en/download/)
2. Use npm to donwload install [NW JS](https://nwjs.io/)
    ```
    npm install -g nw --nwjs_build_type=sdk
    ```
3. Use npm to donwload and install [gulp]()
    ```
    npm i -g gulp-cli
    ```
4. Download code editor whit Typescript support. I recommend [VS Code](https://code.visualstudio.com/) is the best editor 
for Typescript projects. [Atom](https://atom.io/) or [Sublime text](https://www.sublimetext.com/) they are also great options
but you will need download aditional plugin to wokrs with Typescript.

## Installing
Once you have setup the development environment follow the following steps to install the project on your machine:

1. Copy the repository to your machine using git clone or just download and unzip wherever you want.

    ```
    git clone https://github.com/pokemon-essentials/pokemon-essentials
    ```
2. Donwload aditional assets 

    Some graphics like the Pokémon Battlers sprites and icons are not include in this repository.
    You can download the missing assets from [here](https://drive.google.com/drive/folders/1oXbTrwAlL1SBVLykaHS1HlZf9c-IJWLo?usp=sharing) and just uncompress each one on the root folder.

3. Install Dev dependencies

    ```bash
    cd your-path-to-pokemon-essentials
    npm i
    ```

### Run and Build

There are some gulp task defined to build the project. All the **.ts** files in the ts directory will be traspiled and concatenated into a single output **.js** file in the dist directory.

use ``` gulp build ``` to build the minified file.

use ``` gulp watch ``` to build a the **.js** file and watch for changes.

#### Run
locate command line in the root directory of the project where is the package.json file and run ```nw .```

```bash
cd your-path-to-pokemon-essentials
nw .
```



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
