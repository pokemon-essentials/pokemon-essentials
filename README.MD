![logo](img/titles1/pokelogo.png)

Pokémon Essentials is a Pokémon game project made in RPG Maker MV. Based on the [Pokémon Essentials](http://pokemonessentials.wikia.com/wiki/Pok%C3%A9mon_Essentials_Wiki)  project for RPG Maker XP and [Pokémon Showdown](https://github.com/Zarel/Pokemon-Showdown).


## Getting Started
This project don't use the RPG Maker MV editor, a custom editor is under construction. But right now,
 to launch and test the game you will need download and install some software. Follow the following steps
 setup a development environment.

1. Download and install [Node Js](https://nodejs.org/en/download/)
2. Download and install [NW JS](https://nwjs.io/) via npm
    ```
    npm install -g nw --nwjs_build_type=sdk
    ```
3. Download code editor whit Javascript support. I recommend [Atom](https://atom.io/) or [VS Code](https://code.visualstudio.com/) or [Sublime text](https://www.sublimetext.com/) they are  great options.

## Installing
Once you have setup the development environment follow the following steps to install the project on your machine:

1. Copy the repository to your machine using git clone or just download and unzip wherever you want.

    ```
    git clone https://github.com/pokemon-essentials/pokemon-essentials
    ```
2. Donwload aditional assets

    Some graphics like the Pokémon Battlers sprites and icons are not include in this repository.
    You can download the missing assets from [here](https://drive.google.com/drive/folders/1oXbTrwAlL1SBVLykaHS1HlZf9c-IJWLo?usp=sharing) and just uncompress each one on the root folder.

### Run

locate command line in the root directory of the project where is the package.json file and run ```nw .```

```bash
cd your-path-to-pokemon-essentials
nw .
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
