namespace PE.Battle.Moves {
  export function AdditionalEffect(attacker: Battler, opponent: Battler, move: Move) {
    let sereneGrace = attacker.hasAbility(Abilitydex.SERENEGRACE) ? 1 : 2;
    switch (move.id) {
      case Movedex.ACID:
      case Movedex.BUGBUZZ:
      case Movedex.EARTHPOWER:
      case Movedex.ENERGYBALL:
      case Movedex.FLASHCANNON:
      case Movedex.FOCUSBLAST:
      case Movedex.PSYCHIC:
        if (Utils.chance(10 * sereneGrace) && opponent.canReduceStatStage(Stats.SpDef))
          opponent.reduceStat(Stats.SpDef, 1, attacker, true);
        break;

      case Movedex.ACIDSPRAY:
        if (opponent.canReduceStatStage(Stats.SpDef))
          opponent.reduceStat(Stats.SpDef, 2, attacker, false);
        break;

      case Movedex.AIRSLASH:
      case Movedex.ASTONISH:
      case Movedex.BITE:
      case Movedex.HEADBUTT:
      case Movedex.HEARTSTAMP:
      case Movedex.ICICLECRASH:
      case Movedex.IRONHEAD:
      case Movedex.NEEDLEARM:
      case Movedex.ROCKSLIDE:
      case Movedex.ROLLINGKICK:
      case Movedex.SKYATTACK:
      case Movedex.SNORE:
      case Movedex.STEAMROLLER:
      case Movedex.STOMP:
      case Movedex.ZINGZAP:
        // if (Utils.chance(30 * sereneGrace)) opponent.flinch();
        break;

      case Movedex.ANCHORSHOT:
      case Movedex.SPIRITSHACKLE:
        // if (Utils.chance(100)) opponent.traps(); //Traps the target.
        break;

      case Movedex.ANCIENTPOWER:
      case Movedex.OMINOUSWIND:
      case Movedex.SILVERWIND:
        if (Utils.chance(10 * sereneGrace)) {
          if (attacker.canIncreaseStatStage(Stats.Attack)) attacker.increaseStat(Stats.Attack, 1, undefined, false);
          if (attacker.canIncreaseStatStage(Stats.Defense)) attacker.increaseStat(Stats.Defense, 1, undefined, false);
          if (attacker.canIncreaseStatStage(Stats.SpAtk)) attacker.increaseStat(Stats.SpAtk, 1, undefined, false);
          if (attacker.canIncreaseStatStage(Stats.SpDef)) attacker.increaseStat(Stats.SpDef, 1, undefined, false);
          if (attacker.canIncreaseStatStage(Stats.Speed)) attacker.increaseStat(Stats.Speed, 1, undefined, false);
        }
        break;

      case Movedex.AURORABEAM:
        if (opponent.canReduceStatStage(Stats.Attack))
          opponent.reduceStat(Stats.Attack, 1, attacker, true);
        break;

      case Movedex.BLAZEKICK:
      case Movedex.EMBER:
      case Movedex.FIREBLAST:
      case Movedex.FIREPUNCH:
      case Movedex.HEATWAVE:
        if (Utils.chance(10 * sereneGrace) && opponent.canBurn(attacker, false)) opponent.burn();
        break;

      case Movedex.BLIZZARD:
      case Movedex.FREEZEDRY:
      case Movedex.ICEBEAM:
      case Movedex.ICEPUNCH:
      case Movedex.POWDERSNOW:
        // if (Utils.chance(10 * sereneGrace) && opponent.canFreeze(attacker, false))
        //   opponent.freeze();
        break;

      case Movedex.BLUEFLARE:
        if (Utils.chance(20 * sereneGrace) && opponent.canBurn(attacker, false)) opponent.burn();
        break;

      case Movedex.BODYSLAM:
      case Movedex.BOUNCE:
      case Movedex.DISCHARGE:
      case Movedex.DRAGONBREATH:
      case Movedex.FORCEPALM:
      case Movedex.FREEZESHOCK:
      case Movedex.LICK:
      case Movedex.SPARK:
      case Movedex.THUNDER:
        if (Utils.chance(30 * sereneGrace) && opponent.canParalize(attacker, false)) opponent.paralize();
        break;

      case Movedex.BOLTSTRIKE:
        if (Utils.chance(20 * sereneGrace) && opponent.canParalize(attacker, false)) opponent.paralize();
        break;

      case Movedex.BONECLUB:
      case Movedex.EXTRASENSORY:
      case Movedex.HYPERFANG:
        // if (Utils.chance(10 * sereneGrace)) opponent.flinch();
        break;

      case Movedex.BUBBLE:
      case Movedex.BUBBLEBEAM:
      case Movedex.CONSTRICT:
        if (Utils.chance(10 * sereneGrace) && opponent.canReduceStatStage(Stats.Speed))
          opponent.reduceStat(Stats.Speed, 1, attacker, true);
        break;

      case Movedex.BULLDOZE:
      case Movedex.ELECTROWEB:
      case Movedex.GLACIATE:
      case Movedex.ICYWIND:
      case Movedex.LOWSWEEP:
      case Movedex.MUDSHOT:
      case Movedex.ROCKTOMB:
        if (opponent.canReduceStatStage(Stats.Speed)) opponent.reduceStat(Stats.Speed, 1, attacker, true);
        break;

      case Movedex.CHARGEBEAM:
        if (Utils.chance(70 * sereneGrace) && attacker.canIncreaseStatStage(Stats.SpAtk))
          attacker.increaseStat(Stats.SpAtk, 1, undefined, false);
        break;

      case Movedex.CHATTER:
      case Movedex.DYNAMICPUNCH:
        // if (opponent.canConfuse())
        //   opponent.confuse()
        break;

      case Movedex.CLANGOROUSSOULBLAZE:
      case Movedex.POWERUPPUNCH:
        if (attacker.canIncreaseStatStage(Stats.Attack)) attacker.increaseStat(Stats.Attack, 1, undefined, false);
        if (attacker.canIncreaseStatStage(Stats.Defense)) attacker.increaseStat(Stats.Defense, 1, undefined, false);
        if (attacker.canIncreaseStatStage(Stats.SpAtk)) attacker.increaseStat(Stats.SpAtk, 1, undefined, false);
        if (attacker.canIncreaseStatStage(Stats.SpDef)) attacker.increaseStat(Stats.SpDef, 1, undefined, false);
        if (attacker.canIncreaseStatStage(Stats.Speed)) attacker.increaseStat(Stats.Speed, 1, undefined, false);
        break;

      case Movedex.CONFUSION:
      case Movedex.PSYBEAM:
      case Movedex.SIGNALBEAM:
        // if (Utils.chance(10*sereneGraace) && opponent.canConfuse())
        //   opponent.confuse()
        break;

      case Movedex.CROSSPOISON:
      case Movedex.POISONTAIL:
      case Movedex.SLUDGEWAVE:
        if (Utils.chance(10 * sereneGrace) && opponent.canPoison(attacker, false)) opponent.poison();
        break;

      case Movedex.CRUNCH:
      case Movedex.LIQUIDATION:
      case Movedex.SHADOWBONE:
        if (Utils.chance(20 * sereneGrace) && opponent.canReduceStatStage(Stats.Defense))
          opponent.reduceStat(Stats.Defense, 1, attacker, true);
        break;

      case Movedex.CRUSHCLAW:
      case Movedex.RAZORSHELL:
      case Movedex.ROCKSMASH:
        if (Utils.chance(50 * sereneGrace) && opponent.canReduceStatStage(Stats.Defense))
          opponent.reduceStat(Stats.Defense, 1, attacker, true);
        break;

      case Movedex.DARKPULSE:
      case Movedex.DRAGONRUSH:
      case Movedex.TWISTER:
      case Movedex.WATERPULSE:
      case Movedex.ZENHEADBUTT:
        // if (Utils.chance(20 * sereneGrace)) opponent.flinch();
        break;

      case Movedex.DIAMONDSTORM:
        if (Utils.chance(50 * sereneGrace) && attacker.canIncreaseStatStage(Stats.Defense))
          attacker.increaseStat(Stats.Defense, 1, undefined, false);
        break;

      case Movedex.DIZZYPUNCH:
        // if (Utils.chance(20*sereneGraace) && opponent.canConfuse())
        //   opponent.confuse()
        break;

      case Movedex.FAKEOUT:
        // opponent.flinch();
        break;

      case Movedex.FIERYDANCE:
        if (Utils.chance(50 * sereneGrace) && attacker.canIncreaseStatStage(Stats.SpAtk))
          attacker.increaseStat(Stats.SpAtk, 1, undefined, false);
        break;

      case Movedex.FIREFANG:
        if (Utils.chance(10 * sereneGrace) && opponent.canBurn(attacker, false)) opponent.burn();
        // else if (Utils.chance(10 * sereneGrace) && opponent.canParalize(attacker, false)) opponent.paralize();
        break;

      case Movedex.FIRELASH:
        if (attacker.canReduceStatStage(Stats.Defense)) attacker.reduceStat(Stats.Defense, 1, undefined, false);
        break;

      case Movedex.GUNKSHOT:
      case Movedex.POISONJAB:
      case Movedex.POISONSTING:
      case Movedex.SLUDGE:
      case Movedex.SLUDGEBOMB:
        if (Utils.chance(30 * sereneGrace) && opponent.canPoison(attacker, false)) opponent.poison();
        break;

      case Movedex.HURRICANE:
        // if (Utils.chance(30*sereneGraace) && opponent.canConfuse())
        //   opponent.confuse()
        break;

      case Movedex.ICEBURN:
      case Movedex.LAVAPLUME:
      case Movedex.SCALD:
      case Movedex.SEARINGSHOT:
      case Movedex.STEAMERUPTION:
        if (Utils.chance(30 * sereneGrace) && opponent.canBurn(attacker, false)) opponent.burn();
        break;

      case Movedex.ICEFANG:
        // if (Utils.chance(10 * sereneGrace) && opponent.canBurn(attacker, false)) opponent.burn();
        // else if (Utils.chance(10 * sereneGrace) && opponent.canParalize(attacker, false)) opponent.paralize();
        break;

      case Movedex.INFERNO:
        if (opponent.canBurn(attacker, false)) opponent.burn();
        break;

      case Movedex.IRONTAIL:
        if (Utils.chance(10 * sereneGrace) && opponent.canReduceStatStage(Stats.Defense))
          opponent.reduceStat(Stats.Defense, 1, attacker, true);
        break;

      case Movedex.LEAFTORNADO:
      case Movedex.MIRRORSHOT:
      case Movedex.MUDBOMB:
      case Movedex.MUDDYWATER:
        if (Utils.chance(30 * sereneGrace) && opponent.canReduceStatStage(Stats.Accuracy))
          opponent.reduceStat(Stats.Accuracy, 1, attacker, true);
        break;

      case Movedex.LUNGE:
      case Movedex.TROPKICK:
        if (opponent.canReduceStatStage(Stats.Attack)) opponent.reduceStat(Stats.Attack, 1, attacker, true);
        break;

      case Movedex.LUSTERPURGE:
        if (Utils.chance(50 * sereneGrace) && opponent.canReduceStatStage(Stats.SpDef))
          opponent.reduceStat(Stats.SpDef, 1, attacker, true);
        break;

      case Movedex.METALCLAW:
      case Movedex.PLAYROUGH:
        if (Utils.chance(10 * sereneGrace) && attacker.canReduceStatStage(Stats.Attack))
          attacker.reduceStat(Stats.SpDef, 1, undefined, false);
        break;

      case Movedex.METEORMASH:
        if (Utils.chance(20 * sereneGrace) && attacker.canReduceStatStage(Stats.Attack))
          attacker.reduceStat(Stats.SpDef, 1, undefined, false);
        break;

      case Movedex.MISTBALL:
        if (Utils.chance(50 * sereneGrace) && opponent.canReduceStatStage(Stats.SpAtk))
          opponent.reduceStat(Stats.SpAtk, 1, attacker, true);
        break;

      case Movedex.MOONBLAST:
        if (Utils.chance(30 * sereneGrace) && opponent.canReduceStatStage(Stats.SpAtk))
          opponent.reduceStat(Stats.SpAtk, 1, attacker, true);
        break;

      case Movedex.MUDSLAP:
        if (opponent.canReduceStatStage(Stats.Accuracy)) opponent.reduceStat(Stats.Accuracy, 1, attacker, true);
        break;

      case Movedex.MYSTICALFIRE:
        if (opponent.canReduceStatStage(Stats.SpAtk)) opponent.reduceStat(Stats.SpAtk, 1, attacker, true);
        break;

      case Movedex.NIGHTDAZE:
        if (Utils.chance(40 * sereneGrace) && opponent.canReduceStatStage(Stats.Accuracy))
          opponent.reduceStat(Stats.Accuracy, 1, attacker, true);
        break;

      case Movedex.NUZZLE:
      case Movedex.STOKEDSPARKSURFER:
      case Movedex.ZAPCANNON:
        if (opponent.canParalize(attacker, false)) opponent.paralize();
        break;

      case Movedex.OCTAZOOKA:
        if (Utils.chance(50 * sereneGrace) && opponent.canReduceStatStage(Stats.Accuracy))
          opponent.reduceStat(Stats.Accuracy, 1, attacker, true);
        break;

      case Movedex.POISONFANG:
        // if (Utils.chance(50 * sereneGrace) && opponent.canPoison(attacker, false)) opponent.toxic();
        break;

      case Movedex.RELICSONG:
        if (Utils.chance(10 * sereneGrace) && opponent.canSleep(attacker, false)) opponent.sleep();
        break;

      case Movedex.ROCKCLIMB:
      case Movedex.WATERPULSE:
        // if (Utils.chance(20*sereneGraace) && opponent.canConfuse())
        //   opponent.confuse()
        break;

      case Movedex.SACREDFIRE:
        if (Utils.chance(50 * sereneGrace) && opponent.canBurn(attacker, false)) opponent.burn();
        break;

      case Movedex.SECRETPOWER:
        if (Utils.chance(30 * sereneGrace)) {
          if ($Battle.enviroment == Enviroments.Plain && opponent.canParalize()) opponent.paralize();
          else if ($Battle.enviroment == Enviroments.Building && opponent.canParalize()) opponent.paralize();
          else if ($Battle.enviroment == Enviroments.Sand && opponent.canReduceStatStage(Stats.Accuracy))
            opponent.reduceStat(Stats.Accuracy, 1, attacker, true);
          // else if ($Battle.enviroment == Enviroments.cave && opponent.canFlinch()) opponent.flinch();
          // else if ($Battle.enviroment == Enviroments.rock && opponent.canConfuse()) opponent.confuse();
          else if ($Battle.enviroment == Enviroments.TallGrass && opponent.canPoison(attacker, false)) opponent.poison();
          else if ($Battle.enviroment == Enviroments.LongGrass && opponent.canSleep(attacker, false)) opponent.sleep();
          else if ($Battle.enviroment == Enviroments.PondWater && opponent.canReduceStatStage(Stats.Speed))
            opponent.reduceStat(Stats.Speed, 1, attacker, true);
          else if ($Battle.enviroment == Enviroments.SeaWater && opponent.canReduceStatStage(Stats.Attack))
            opponent.reduceStat(Stats.Attack, 1, attacker, true);
          else if ($Battle.enviroment == Enviroments.UnderWater && opponent.canReduceStatStage(Stats.Defense))
            opponent.reduceStat(Stats.Defense, 1, attacker, true);
        }
        break;

      case Movedex.SEEDFLARE:
        if (Utils.chance(40 * sereneGrace) && opponent.canReduceStatStage(Stats.SpDef))
          opponent.reduceStat(Stats.SpDef, 2, attacker, true);
        break;

      case Movedex.SHADOWBALL:
        if (Utils.chance(20 * sereneGrace) && opponent.canReduceStatStage(Stats.SpDef))
          opponent.reduceStat(Stats.SpDef, 1, attacker, true);
        break;

      case Movedex.SMOG:
        if (Utils.chance(40 * sereneGrace) && opponent.canPoison(attacker, false)) opponent.poison();
        break;

      case Movedex.SNARL:
      case Movedex.STRUGGLEBUG:
        if (opponent.canReduceStatStage(Stats.SpAtk))
          opponent.reduceStat(Stats.SpAtk, 1, attacker, true);

      case Movedex.STEELWING:
        if (Utils.chance(10 * sereneGrace) && attacker.canIncreaseStatStage(Stats.Defense))
          attacker.increaseStat(Stats.Defense, 1, undefined, false);
        break;

      case Movedex.THUNDERFANG:
        if (Utils.chance(10 * sereneGrace) && opponent.canParalize(attacker, false)) opponent.paralize();
        // else if (Utils.chance(10 * sereneGrace) && opponent.canFiflnch(attacker, false)) opponent.burn();
        break;

      case Movedex.THUNDERPUNCH:
      case Movedex.THUNDERSHOCK:
      case Movedex.THUNDERBOLT:
      case Movedex.VOLTTACKLE:
        if (Utils.chance(10 * sereneGrace) && opponent.canParalize(attacker, false)) opponent.paralize();

      case Movedex.TRIATTACK:
        if (Utils.chance(6.67 * sereneGrace) && opponent.canParalize(attacker, false)) opponent.paralize();
        else if (Utils.chance(6.67 * sereneGrace) && opponent.canBurn(attacker, false)) opponent.burn();
        // else if (Utils.chance(6.67 * sereneGrace) && opponent.canFreeze(attacker, false)) opponent.freeze();
        break;

      case Movedex.TWINEEDLE:
        if (Utils.chance(40 * sereneGrace) && opponent.canPoison(attacker, false)) opponent.poison();
        break;

    }
  }
}
