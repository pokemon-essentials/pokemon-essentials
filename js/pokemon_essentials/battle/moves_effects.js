var PE;
(function (PE) {
    var Battle;
    (function (Battle) {
        var Moves;
        (function (Moves) {
            /**
             * in-battle secondary effect of a damaging move.
             * @param attacker
             * @param opponent
             * @param move
             */
            function AdditionalEffect(attacker, opponent, move) {
                var sereneGrace = attacker.hasAbility(PE.Abilitydex.SERENEGRACE) ? 1 : 2;
                switch (move.id) {
                    case PE.Movedex.ACID:
                    case PE.Movedex.BUGBUZZ:
                    case PE.Movedex.EARTHPOWER:
                    case PE.Movedex.ENERGYBALL:
                    case PE.Movedex.FLASHCANNON:
                    case PE.Movedex.FOCUSBLAST:
                    case PE.Movedex.PSYCHIC:
                        if (PE.Utils.chance(10 * sereneGrace) && opponent.canReduceStatStage(PE.Stats.SpDef))
                            opponent.reduceStat(PE.Stats.SpDef, 1, attacker, true);
                        break;
                    case PE.Movedex.ACIDSPRAY:
                        if (opponent.canReduceStatStage(PE.Stats.SpDef))
                            opponent.reduceStat(PE.Stats.SpDef, 2, attacker, false);
                        break;
                    case PE.Movedex.AIRSLASH:
                    case PE.Movedex.ASTONISH:
                    case PE.Movedex.BITE:
                    case PE.Movedex.HEADBUTT:
                    case PE.Movedex.HEARTSTAMP:
                    case PE.Movedex.ICICLECRASH:
                    case PE.Movedex.IRONHEAD:
                    case PE.Movedex.NEEDLEARM:
                    case PE.Movedex.ROCKSLIDE:
                    case PE.Movedex.ROLLINGKICK:
                    case PE.Movedex.SKYATTACK:
                    case PE.Movedex.SNORE:
                    case PE.Movedex.STEAMROLLER:
                    case PE.Movedex.STOMP:
                    case PE.Movedex.ZINGZAP:
                        // if (Utils.chance(30 * sereneGrace)) opponent.flinch();
                        break;
                    case PE.Movedex.ANCHORSHOT:
                    case PE.Movedex.SPIRITSHACKLE:
                        // if (Utils.chance(100)) opponent.traps(); //Traps the target.
                        break;
                    case PE.Movedex.ANCIENTPOWER:
                    case PE.Movedex.OMINOUSWIND:
                    case PE.Movedex.SILVERWIND:
                        if (PE.Utils.chance(10 * sereneGrace)) {
                            if (attacker.canIncreaseStatStage(PE.Stats.Attack))
                                attacker.increaseStat(PE.Stats.Attack, 1, undefined, false);
                            if (attacker.canIncreaseStatStage(PE.Stats.Defense))
                                attacker.increaseStat(PE.Stats.Defense, 1, undefined, false);
                            if (attacker.canIncreaseStatStage(PE.Stats.SpAtk))
                                attacker.increaseStat(PE.Stats.SpAtk, 1, undefined, false);
                            if (attacker.canIncreaseStatStage(PE.Stats.SpDef))
                                attacker.increaseStat(PE.Stats.SpDef, 1, undefined, false);
                            if (attacker.canIncreaseStatStage(PE.Stats.Speed))
                                attacker.increaseStat(PE.Stats.Speed, 1, undefined, false);
                        }
                        break;
                    case PE.Movedex.AURORABEAM:
                        if (opponent.canReduceStatStage(PE.Stats.Attack))
                            opponent.reduceStat(PE.Stats.Attack, 1, attacker, true);
                        break;
                    case PE.Movedex.BLAZEKICK:
                    case PE.Movedex.EMBER:
                    case PE.Movedex.FIREBLAST:
                    case PE.Movedex.FIREPUNCH:
                    case PE.Movedex.HEATWAVE:
                        if (PE.Utils.chance(10 * sereneGrace) && opponent.canBurn(attacker, false))
                            opponent.burn();
                        break;
                    case PE.Movedex.BLIZZARD:
                    case PE.Movedex.FREEZEDRY:
                    case PE.Movedex.ICEBEAM:
                    case PE.Movedex.ICEPUNCH:
                    case PE.Movedex.POWDERSNOW:
                        // if (Utils.chance(10 * sereneGrace) && opponent.canFreeze(attacker, false))
                        //   opponent.freeze();
                        break;
                    case PE.Movedex.BLUEFLARE:
                        if (PE.Utils.chance(20 * sereneGrace) && opponent.canBurn(attacker, false))
                            opponent.burn();
                        break;
                    case PE.Movedex.BODYSLAM:
                    case PE.Movedex.BOUNCE:
                    case PE.Movedex.DISCHARGE:
                    case PE.Movedex.DRAGONBREATH:
                    case PE.Movedex.FORCEPALM:
                    case PE.Movedex.FREEZESHOCK:
                    case PE.Movedex.LICK:
                    case PE.Movedex.SPARK:
                    case PE.Movedex.THUNDER:
                        if (PE.Utils.chance(30 * sereneGrace) && opponent.canParalize(attacker, false))
                            opponent.paralize();
                        break;
                    case PE.Movedex.BOLTSTRIKE:
                        if (PE.Utils.chance(20 * sereneGrace) && opponent.canParalize(attacker, false))
                            opponent.paralize();
                        break;
                    case PE.Movedex.BONECLUB:
                    case PE.Movedex.EXTRASENSORY:
                    case PE.Movedex.HYPERFANG:
                        // if (Utils.chance(10 * sereneGrace)) opponent.flinch();
                        break;
                    case PE.Movedex.BUBBLE:
                    case PE.Movedex.BUBBLEBEAM:
                    case PE.Movedex.CONSTRICT:
                        if (PE.Utils.chance(10 * sereneGrace) && opponent.canReduceStatStage(PE.Stats.Speed))
                            opponent.reduceStat(PE.Stats.Speed, 1, attacker, true);
                        break;
                    case PE.Movedex.BULLDOZE:
                    case PE.Movedex.ELECTROWEB:
                    case PE.Movedex.GLACIATE:
                    case PE.Movedex.ICYWIND:
                    case PE.Movedex.LOWSWEEP:
                    case PE.Movedex.MUDSHOT:
                    case PE.Movedex.ROCKTOMB:
                        if (opponent.canReduceStatStage(PE.Stats.Speed))
                            opponent.reduceStat(PE.Stats.Speed, 1, attacker, true);
                        break;
                    case PE.Movedex.CHARGEBEAM:
                        if (PE.Utils.chance(70 * sereneGrace) && attacker.canIncreaseStatStage(PE.Stats.SpAtk))
                            attacker.increaseStat(PE.Stats.SpAtk, 1, undefined, false);
                        break;
                    case PE.Movedex.CHATTER:
                    case PE.Movedex.DYNAMICPUNCH:
                        // if (opponent.canConfuse())
                        //   opponent.confuse()
                        break;
                    case PE.Movedex.CLANGOROUSSOULBLAZE:
                    case PE.Movedex.POWERUPPUNCH:
                        if (attacker.canIncreaseStatStage(PE.Stats.Attack))
                            attacker.increaseStat(PE.Stats.Attack, 1, undefined, false);
                        if (attacker.canIncreaseStatStage(PE.Stats.Defense))
                            attacker.increaseStat(PE.Stats.Defense, 1, undefined, false);
                        if (attacker.canIncreaseStatStage(PE.Stats.SpAtk))
                            attacker.increaseStat(PE.Stats.SpAtk, 1, undefined, false);
                        if (attacker.canIncreaseStatStage(PE.Stats.SpDef))
                            attacker.increaseStat(PE.Stats.SpDef, 1, undefined, false);
                        if (attacker.canIncreaseStatStage(PE.Stats.Speed))
                            attacker.increaseStat(PE.Stats.Speed, 1, undefined, false);
                        break;
                    case PE.Movedex.CONFUSION:
                    case PE.Movedex.PSYBEAM:
                    case PE.Movedex.SIGNALBEAM:
                        // if (Utils.chance(10*sereneGraace) && opponent.canConfuse())
                        //   opponent.confuse()
                        break;
                    case PE.Movedex.CROSSPOISON:
                    case PE.Movedex.POISONTAIL:
                    case PE.Movedex.SLUDGEWAVE:
                        if (PE.Utils.chance(10 * sereneGrace) && opponent.canPoison(attacker, false))
                            opponent.poison();
                        break;
                    case PE.Movedex.CRUNCH:
                    case PE.Movedex.LIQUIDATION:
                    case PE.Movedex.SHADOWBONE:
                        if (PE.Utils.chance(20 * sereneGrace) && opponent.canReduceStatStage(PE.Stats.Defense))
                            opponent.reduceStat(PE.Stats.Defense, 1, attacker, true);
                        break;
                    case PE.Movedex.CRUSHCLAW:
                    case PE.Movedex.RAZORSHELL:
                    case PE.Movedex.ROCKSMASH:
                        if (PE.Utils.chance(50 * sereneGrace) && opponent.canReduceStatStage(PE.Stats.Defense))
                            opponent.reduceStat(PE.Stats.Defense, 1, attacker, true);
                        break;
                    case PE.Movedex.DARKPULSE:
                    case PE.Movedex.DRAGONRUSH:
                    case PE.Movedex.TWISTER:
                    case PE.Movedex.WATERPULSE:
                    case PE.Movedex.ZENHEADBUTT:
                        // if (Utils.chance(20 * sereneGrace)) opponent.flinch();
                        break;
                    case PE.Movedex.DIAMONDSTORM:
                        if (PE.Utils.chance(50 * sereneGrace) && attacker.canIncreaseStatStage(PE.Stats.Defense))
                            attacker.increaseStat(PE.Stats.Defense, 1, undefined, false);
                        break;
                    case PE.Movedex.DIZZYPUNCH:
                        // if (Utils.chance(20*sereneGraace) && opponent.canConfuse())
                        //   opponent.confuse()
                        break;
                    case PE.Movedex.FAKEOUT:
                        // opponent.flinch();
                        break;
                    case PE.Movedex.FIERYDANCE:
                        if (PE.Utils.chance(50 * sereneGrace) && attacker.canIncreaseStatStage(PE.Stats.SpAtk))
                            attacker.increaseStat(PE.Stats.SpAtk, 1, undefined, false);
                        break;
                    case PE.Movedex.FIREFANG:
                        if (PE.Utils.chance(10 * sereneGrace) && opponent.canBurn(attacker, false))
                            opponent.burn();
                        // else if (Utils.chance(10 * sereneGrace) && opponent.canParalize(attacker, false)) opponent.paralize();
                        break;
                    case PE.Movedex.FIRELASH:
                        if (attacker.canReduceStatStage(PE.Stats.Defense))
                            attacker.reduceStat(PE.Stats.Defense, 1, undefined, false);
                        break;
                    case PE.Movedex.GUNKSHOT:
                    case PE.Movedex.POISONJAB:
                    case PE.Movedex.POISONSTING:
                    case PE.Movedex.SLUDGE:
                    case PE.Movedex.SLUDGEBOMB:
                        if (PE.Utils.chance(30 * sereneGrace) && opponent.canPoison(attacker, false))
                            opponent.poison();
                        break;
                    case PE.Movedex.HURRICANE:
                        // if (Utils.chance(30*sereneGraace) && opponent.canConfuse())
                        //   opponent.confuse()
                        break;
                    case PE.Movedex.ICEBURN:
                    case PE.Movedex.LAVAPLUME:
                    case PE.Movedex.SCALD:
                    case PE.Movedex.SEARINGSHOT:
                    case PE.Movedex.STEAMERUPTION:
                        if (PE.Utils.chance(30 * sereneGrace) && opponent.canBurn(attacker, false))
                            opponent.burn();
                        break;
                    case PE.Movedex.ICEFANG:
                        // if (Utils.chance(10 * sereneGrace) && opponent.canBurn(attacker, false)) opponent.burn();
                        // else if (Utils.chance(10 * sereneGrace) && opponent.canParalize(attacker, false)) opponent.paralize();
                        break;
                    case PE.Movedex.INFERNO:
                        if (opponent.canBurn(attacker, false))
                            opponent.burn();
                        break;
                    case PE.Movedex.IRONTAIL:
                        if (PE.Utils.chance(10 * sereneGrace) && opponent.canReduceStatStage(PE.Stats.Defense))
                            opponent.reduceStat(PE.Stats.Defense, 1, attacker, true);
                        break;
                    case PE.Movedex.LEAFTORNADO:
                    case PE.Movedex.MIRRORSHOT:
                    case PE.Movedex.MUDBOMB:
                    case PE.Movedex.MUDDYWATER:
                        if (PE.Utils.chance(30 * sereneGrace) && opponent.canReduceStatStage(PE.Stats.Accuracy))
                            opponent.reduceStat(PE.Stats.Accuracy, 1, attacker, true);
                        break;
                    case PE.Movedex.LUNGE:
                    case PE.Movedex.TROPKICK:
                        if (opponent.canReduceStatStage(PE.Stats.Attack))
                            opponent.reduceStat(PE.Stats.Attack, 1, attacker, true);
                        break;
                    case PE.Movedex.LUSTERPURGE:
                        if (PE.Utils.chance(50 * sereneGrace) && opponent.canReduceStatStage(PE.Stats.SpDef))
                            opponent.reduceStat(PE.Stats.SpDef, 1, attacker, true);
                        break;
                    case PE.Movedex.METALCLAW:
                    case PE.Movedex.PLAYROUGH:
                        if (PE.Utils.chance(10 * sereneGrace) && attacker.canReduceStatStage(PE.Stats.Attack))
                            attacker.reduceStat(PE.Stats.SpDef, 1, undefined, false);
                        break;
                    case PE.Movedex.METEORMASH:
                        if (PE.Utils.chance(20 * sereneGrace) && attacker.canReduceStatStage(PE.Stats.Attack))
                            attacker.reduceStat(PE.Stats.SpDef, 1, undefined, false);
                        break;
                    case PE.Movedex.MISTBALL:
                        if (PE.Utils.chance(50 * sereneGrace) && opponent.canReduceStatStage(PE.Stats.SpAtk))
                            opponent.reduceStat(PE.Stats.SpAtk, 1, attacker, true);
                        break;
                    case PE.Movedex.MOONBLAST:
                        if (PE.Utils.chance(30 * sereneGrace) && opponent.canReduceStatStage(PE.Stats.SpAtk))
                            opponent.reduceStat(PE.Stats.SpAtk, 1, attacker, true);
                        break;
                    case PE.Movedex.MUDSLAP:
                        if (opponent.canReduceStatStage(PE.Stats.Accuracy))
                            opponent.reduceStat(PE.Stats.Accuracy, 1, attacker, true);
                        break;
                    case PE.Movedex.MYSTICALFIRE:
                        if (opponent.canReduceStatStage(PE.Stats.SpAtk))
                            opponent.reduceStat(PE.Stats.SpAtk, 1, attacker, true);
                        break;
                    case PE.Movedex.NIGHTDAZE:
                        if (PE.Utils.chance(40 * sereneGrace) && opponent.canReduceStatStage(PE.Stats.Accuracy))
                            opponent.reduceStat(PE.Stats.Accuracy, 1, attacker, true);
                        break;
                    case PE.Movedex.NUZZLE:
                    case PE.Movedex.STOKEDSPARKSURFER:
                    case PE.Movedex.ZAPCANNON:
                        if (opponent.canParalize(attacker, false))
                            opponent.paralize();
                        break;
                    case PE.Movedex.OCTAZOOKA:
                        if (PE.Utils.chance(50 * sereneGrace) && opponent.canReduceStatStage(PE.Stats.Accuracy))
                            opponent.reduceStat(PE.Stats.Accuracy, 1, attacker, true);
                        break;
                    case PE.Movedex.POISONFANG:
                        // if (Utils.chance(50 * sereneGrace) && opponent.canPoison(attacker, false)) opponent.toxic();
                        break;
                    case PE.Movedex.RELICSONG:
                        if (PE.Utils.chance(10 * sereneGrace) && opponent.canSleep(attacker, false))
                            opponent.sleep();
                        break;
                    case PE.Movedex.ROCKCLIMB:
                    case PE.Movedex.WATERPULSE:
                        // if (Utils.chance(20*sereneGraace) && opponent.canConfuse())
                        //   opponent.confuse()
                        break;
                    case PE.Movedex.SACREDFIRE:
                        if (PE.Utils.chance(50 * sereneGrace) && opponent.canBurn(attacker, false))
                            opponent.burn();
                        break;
                    case PE.Movedex.SECRETPOWER:
                        if (PE.Utils.chance(30 * sereneGrace)) {
                            if ($Battle.enviroment == 5 /* Plain */ && opponent.canParalize())
                                opponent.paralize();
                            else if ($Battle.enviroment == 4 /* Building */ && opponent.canParalize())
                                opponent.paralize();
                            else if ($Battle.enviroment == 6 /* Sand */ && opponent.canReduceStatStage(PE.Stats.Accuracy))
                                opponent.reduceStat(PE.Stats.Accuracy, 1, attacker, true);
                            else if ($Battle.enviroment == 1 /* TallGrass */ && opponent.canPoison(attacker, false))
                                opponent.poison();
                            else if ($Battle.enviroment == 8 /* LongGrass */ && opponent.canSleep(attacker, false))
                                opponent.sleep();
                            else if ($Battle.enviroment == 9 /* PondWater */ && opponent.canReduceStatStage(PE.Stats.Speed))
                                opponent.reduceStat(PE.Stats.Speed, 1, attacker, true);
                            else if ($Battle.enviroment == 10 /* SeaWater */ && opponent.canReduceStatStage(PE.Stats.Attack))
                                opponent.reduceStat(PE.Stats.Attack, 1, attacker, true);
                            else if ($Battle.enviroment == 11 /* UnderWater */ && opponent.canReduceStatStage(PE.Stats.Defense))
                                opponent.reduceStat(PE.Stats.Defense, 1, attacker, true);
                        }
                        break;
                    case PE.Movedex.SEEDFLARE:
                        if (PE.Utils.chance(40 * sereneGrace) && opponent.canReduceStatStage(PE.Stats.SpDef))
                            opponent.reduceStat(PE.Stats.SpDef, 2, attacker, true);
                        break;
                    case PE.Movedex.SHADOWBALL:
                        if (PE.Utils.chance(20 * sereneGrace) && opponent.canReduceStatStage(PE.Stats.SpDef))
                            opponent.reduceStat(PE.Stats.SpDef, 1, attacker, true);
                        break;
                    case PE.Movedex.SMOG:
                        if (PE.Utils.chance(40 * sereneGrace) && opponent.canPoison(attacker, false))
                            opponent.poison();
                        break;
                    case PE.Movedex.SNARL:
                    case PE.Movedex.STRUGGLEBUG:
                        if (opponent.canReduceStatStage(PE.Stats.SpAtk))
                            opponent.reduceStat(PE.Stats.SpAtk, 1, attacker, true);
                    case PE.Movedex.STEELWING:
                        if (PE.Utils.chance(10 * sereneGrace) && attacker.canIncreaseStatStage(PE.Stats.Defense))
                            attacker.increaseStat(PE.Stats.Defense, 1, undefined, false);
                        break;
                    case PE.Movedex.THUNDERFANG:
                        if (PE.Utils.chance(10 * sereneGrace) && opponent.canParalize(attacker, false))
                            opponent.paralize();
                        // else if (Utils.chance(10 * sereneGrace) && opponent.canFiflnch(attacker, false)) opponent.burn();
                        break;
                    case PE.Movedex.THUNDERPUNCH:
                    case PE.Movedex.THUNDERSHOCK:
                    case PE.Movedex.THUNDERBOLT:
                    case PE.Movedex.VOLTTACKLE:
                        if (PE.Utils.chance(10 * sereneGrace) && opponent.canParalize(attacker, false))
                            opponent.paralize();
                    case PE.Movedex.TRIATTACK:
                        if (PE.Utils.chance(6.67 * sereneGrace) && opponent.canParalize(attacker, false))
                            opponent.paralize();
                        else if (PE.Utils.chance(6.67 * sereneGrace) && opponent.canBurn(attacker, false))
                            opponent.burn();
                        // else if (Utils.chance(6.67 * sereneGrace) && opponent.canFreeze(attacker, false)) opponent.freeze();
                        break;
                    case PE.Movedex.TWINEEDLE:
                        if (PE.Utils.chance(40 * sereneGrace) && opponent.canPoison(attacker, false))
                            opponent.poison();
                        break;
                }
            }
            Moves.AdditionalEffect = AdditionalEffect;
        })(Moves = Battle.Moves || (Battle.Moves = {}));
    })(Battle = PE.Battle || (PE.Battle = {}));
})(PE || (PE = {}));
