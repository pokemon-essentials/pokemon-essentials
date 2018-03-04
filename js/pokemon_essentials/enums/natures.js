var PE;
(function (PE) {
    /** Pokémon natures */
    var Natures;
    (function (Natures) {
        Natures[Natures["Hardy"] = 0] = "Hardy";
        Natures[Natures["Lonely"] = 1] = "Lonely";
        Natures[Natures["Brave"] = 2] = "Brave";
        Natures[Natures["Adamant"] = 3] = "Adamant";
        Natures[Natures["Naughty"] = 4] = "Naughty";
        Natures[Natures["Bold"] = 5] = "Bold";
        Natures[Natures["Docile"] = 6] = "Docile";
        Natures[Natures["Relaxed"] = 7] = "Relaxed";
        Natures[Natures["Impish"] = 8] = "Impish";
        Natures[Natures["Lax"] = 9] = "Lax";
        Natures[Natures["Timid"] = 10] = "Timid";
        Natures[Natures["Hasty"] = 11] = "Hasty";
        Natures[Natures["Serious"] = 12] = "Serious";
        Natures[Natures["Jolly"] = 13] = "Jolly";
        Natures[Natures["Naive"] = 14] = "Naive";
        Natures[Natures["Modest"] = 15] = "Modest";
        Natures[Natures["Mild"] = 16] = "Mild";
        Natures[Natures["Quiet"] = 17] = "Quiet";
        Natures[Natures["Bashful"] = 18] = "Bashful";
        Natures[Natures["Rash"] = 19] = "Rash";
        Natures[Natures["Calm"] = 20] = "Calm";
        Natures[Natures["Gentle"] = 21] = "Gentle";
        Natures[Natures["Sassy"] = 22] = "Sassy";
        Natures[Natures["Careful"] = 23] = "Careful";
        Natures[Natures["Quirky"] = 24] = "Quirky";
    })(Natures = PE.Natures || (PE.Natures = {}));
})(PE || (PE = {}));
(function (PE) {
    var Natures;
    (function (Natures) {
        var NATURES = {
            Hardy: {
                name: 'Hardy',
                stats: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 }
            },
            Lonely: {
                name: 'Lonely',
                stats: { atk: 1.1, def: 0.9, spa: 1, spd: 1, spe: 1 }
            },
            Brave: {
                name: 'Brave',
                stats: { atk: 1.1, def: 1, spa: 1, spd: 1, spe: 0.9 }
            },
            Adamant: {
                name: 'Adamant',
                stats: { atk: 1.1, def: 1, spa: 0.9, spd: 1, spe: 1 }
            },
            Naughty: {
                name: 'Naughty',
                stats: { atk: 1.1, def: 1, spa: 1, spd: 0.9, spe: 1 }
            },
            Bold: {
                name: 'Bold',
                stats: { atk: 0.9, def: 1.1, spa: 1, spd: 1, spe: 1 }
            },
            Docile: {
                name: 'Docile',
                stats: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 }
            },
            Relaxed: {
                name: 'Relaxed',
                stats: { atk: 1, def: 1.1, spa: 1, spd: 1, spe: 0.9 }
            },
            Impish: {
                name: 'Impish',
                stats: { atk: 1, def: 1.1, spa: 0.9, spd: 1, spe: 1 }
            },
            Lax: {
                name: 'Lax',
                stats: { atk: 1, def: 1.1, spa: 0.9, spd: 1, spe: 1 }
            },
            Timid: {
                name: 'Timid',
                stats: { atk: 0.9, def: 1, spa: 1, spd: 1, spe: 1.1 }
            },
            Hasty: {
                name: 'Hasty',
                stats: { atk: 1, def: 0.9, spa: 1, spd: 1, spe: 1.1 }
            },
            Serious: {
                name: 'Serious',
                stats: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 }
            },
            Jolly: {
                name: 'Jolly',
                stats: { atk: 1, def: 1, spa: 0.9, spd: 1, spe: 1.1 }
            },
            Naive: {
                name: 'Naive',
                stats: { atk: 1, def: 1, spa: 1, spd: 0.9, spe: 1.1 }
            },
            Modest: {
                name: 'Modest',
                stats: { atk: 0.9, def: 1, spa: 1.1, spd: 1, spe: 1 }
            },
            Mild: {
                name: 'Mild',
                stats: { atk: 1, def: 0.9, spa: 1.1, spd: 1, spe: 1 }
            },
            Quiet: {
                name: 'Quiet',
                stats: { atk: 1, def: 1, spa: 1.1, spd: 1, spe: 0.9 }
            },
            Bashful: {
                name: 'Bashful',
                stats: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 }
            },
            Rash: {
                name: 'Rash',
                stats: { atk: 1, def: 1, spa: 1.1, spd: 0.9, spe: 1 }
            },
            Calm: {
                name: 'Calm',
                stats: { atk: 0.9, def: 1, spa: 1, spd: 1.1, spe: 1 }
            },
            Gentle: {
                name: 'Gentle',
                stats: { atk: 1, def: 0.9, spa: 1, spd: 1.1, spe: 1 }
            },
            Sassy: {
                name: 'Sassy',
                stats: { atk: 1, def: 1, spa: 1, spd: 1.1, spe: 0.9 }
            },
            Careful: {
                name: 'Careful',
                stats: { atk: 1, def: 1, spa: 0.9, spd: 1, spe: 1 }
            },
            Quirky: {
                name: 'Quirky',
                stats: { atk: 1, def: 1, spa: 1, spd: 1.1, spe: 1 }
            }
        };
        function stats(nature) {
            return NATURES[nature].stats;
        }
        Natures.stats = stats;
        function name(nature) {
            return NATURES[nature].name;
        }
        Natures.name = name;
    })(Natures = PE.Natures || (PE.Natures = {}));
})(PE || (PE = {}));
