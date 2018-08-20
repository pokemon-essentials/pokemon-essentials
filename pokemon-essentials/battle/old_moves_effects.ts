namespace PE.Battle.Moves {
  /**
   * in-battle secondary effect of a damaging move.
   * @param attacker
   * @param opponent
   * @param move
   */
  export function AdditionalEffect(attacker: Battler, opponent: Battler, move: Move) {
    let sereneGrace = attacker.hasAbility(ABILITYDEX.SERENEGRACE) ? 1 : 2;
    switch (move.id) {
      case MOVEDEX.ACID:
      case MOVEDEX.BUGBUZZ:
      case MOVEDEX.EARTHPOWER:
      case MOVEDEX.ENERGYBALL:
      case MOVEDEX.FLASHCANNON:
      case MOVEDEX.FOCUSBLAST:
      case MOVEDEX.PSYCHIC:
        if (Utils.chance(10 * sereneGrace) && opponent.canReduceStatStage(Stats.SpDef))
          opponent.reduceStat(Stats.SpDef, 1, attacker, true);
        break;

      case MOVEDEX.ACIDSPRAY:
        if (opponent.canReduceStatStage(Stats.SpDef))
          opponent.reduceStat(Stats.SpDef, 2, attacker, false);
        break;

      case MOVEDEX.AIRSLASH:
      case MOVEDEX.ASTONISH:
      case MOVEDEX.BITE:
      case MOVEDEX.HEADBUTT:
      case MOVEDEX.HEARTSTAMP:
      case MOVEDEX.ICICLECRASH:
      case MOVEDEX.IRONHEAD:
      case MOVEDEX.NEEDLEARM:
      case MOVEDEX.ROCKSLIDE:
      case MOVEDEX.ROLLINGKICK:
      case MOVEDEX.SKYATTACK:
      case MOVEDEX.SNORE:
      case MOVEDEX.STEAMROLLER:
      case MOVEDEX.STOMP:
      case MOVEDEX.ZINGZAP:
        // if (Utils.chance(30 * sereneGrace)) opponent.flinch();
        break;

      case MOVEDEX.ANCHORSHOT:
      case MOVEDEX.SPIRITSHACKLE:
        // if (Utils.chance(100)) opponent.traps(); //Traps the target.
        break;

      case MOVEDEX.ANCIENTPOWER:
      case MOVEDEX.OMINOUSWIND:
      case MOVEDEX.SILVERWIND:
        if (Utils.chance(10 * sereneGrace)) {
          if (attacker.canIncreaseStatStage(Stats.Attack)) attacker.increaseStat(Stats.Attack, 1, undefined, false);
          if (attacker.canIncreaseStatStage(Stats.Defense)) attacker.increaseStat(Stats.Defense, 1, undefined, false);
          if (attacker.canIncreaseStatStage(Stats.SpAtk)) attacker.increaseStat(Stats.SpAtk, 1, undefined, false);
          if (attacker.canIncreaseStatStage(Stats.SpDef)) attacker.increaseStat(Stats.SpDef, 1, undefined, false);
          if (attacker.canIncreaseStatStage(Stats.Speed)) attacker.increaseStat(Stats.Speed, 1, undefined, false);
        }
        break;

      case MOVEDEX.AURORABEAM:
        if (opponent.canReduceStatStage(Stats.Attack))
          opponent.reduceStat(Stats.Attack, 1, attacker, true);
        break;

      case MOVEDEX.BLAZEKICK:
      case MOVEDEX.EMBER:
      case MOVEDEX.FIREBLAST:
      case MOVEDEX.FIREPUNCH:
      case MOVEDEX.HEATWAVE:
        if (Utils.chance(10 * sereneGrace) && opponent.canBurn(attacker, false)) opponent.burn();
        break;

      case MOVEDEX.BLIZZARD:
      case MOVEDEX.FREEZEDRY:
      case MOVEDEX.ICEBEAM:
      case MOVEDEX.ICEPUNCH:
      case MOVEDEX.POWDERSNOW:
        // if (Utils.chance(10 * sereneGrace) && opponent.canFreeze(attacker, false))
        //   opponent.freeze();
        break;

      case MOVEDEX.BLUEFLARE:
        if (Utils.chance(20 * sereneGrace) && opponent.canBurn(attacker, false)) opponent.burn();
        break;

      case MOVEDEX.BODYSLAM:
      case MOVEDEX.BOUNCE:
      case MOVEDEX.DISCHARGE:
      case MOVEDEX.DRAGONBREATH:
      case MOVEDEX.FORCEPALM:
      case MOVEDEX.FREEZESHOCK:
      case MOVEDEX.LICK:
      case MOVEDEX.SPARK:
      case MOVEDEX.THUNDER:
        if (Utils.chance(30 * sereneGrace) && opponent.canParalize(attacker, false)) opponent.paralize();
        break;

      case MOVEDEX.BOLTSTRIKE:
        if (Utils.chance(20 * sereneGrace) && opponent.canParalize(attacker, false)) opponent.paralize();
        break;

      case MOVEDEX.BONECLUB:
      case MOVEDEX.EXTRASENSORY:
      case MOVEDEX.HYPERFANG:
        // if (Utils.chance(10 * sereneGrace)) opponent.flinch();
        break;

      case MOVEDEX.BUBBLE:
      case MOVEDEX.BUBBLEBEAM:
      case MOVEDEX.CONSTRICT:
        if (Utils.chance(10 * sereneGrace) && opponent.canReduceStatStage(Stats.Speed))
          opponent.reduceStat(Stats.Speed, 1, attacker, true);
        break;

      case MOVEDEX.BULLDOZE:
      case MOVEDEX.ELECTROWEB:
      case MOVEDEX.GLACIATE:
      case MOVEDEX.ICYWIND:
      case MOVEDEX.LOWSWEEP:
      case MOVEDEX.MUDSHOT:
      case MOVEDEX.ROCKTOMB:
        if (opponent.canReduceStatStage(Stats.Speed)) opponent.reduceStat(Stats.Speed, 1, attacker, true);
        break;

      case MOVEDEX.CHARGEBEAM:
        if (Utils.chance(70 * sereneGrace) && attacker.canIncreaseStatStage(Stats.SpAtk))
          attacker.increaseStat(Stats.SpAtk, 1, undefined, false);
        break;

      case MOVEDEX.CHATTER:
      case MOVEDEX.DYNAMICPUNCH:
        // if (opponent.canConfuse())
        //   opponent.confuse()
        break;

      case MOVEDEX.CLANGOROUSSOULBLAZE:
      case MOVEDEX.POWERUPPUNCH:
        if (attacker.canIncreaseStatStage(Stats.Attack)) attacker.increaseStat(Stats.Attack, 1, undefined, false);
        if (attacker.canIncreaseStatStage(Stats.Defense)) attacker.increaseStat(Stats.Defense, 1, undefined, false);
        if (attacker.canIncreaseStatStage(Stats.SpAtk)) attacker.increaseStat(Stats.SpAtk, 1, undefined, false);
        if (attacker.canIncreaseStatStage(Stats.SpDef)) attacker.increaseStat(Stats.SpDef, 1, undefined, false);
        if (attacker.canIncreaseStatStage(Stats.Speed)) attacker.increaseStat(Stats.Speed, 1, undefined, false);
        break;

      case MOVEDEX.CONFUSION:
      case MOVEDEX.PSYBEAM:
      case MOVEDEX.SIGNALBEAM:
        // if (Utils.chance(10*sereneGraace) && opponent.canConfuse())
        //   opponent.confuse()
        break;

      case MOVEDEX.CROSSPOISON:
      case MOVEDEX.POISONTAIL:
      case MOVEDEX.SLUDGEWAVE:
        if (Utils.chance(10 * sereneGrace) && opponent.canPoison(attacker, false)) opponent.poison();
        break;

      case MOVEDEX.CRUNCH:
      case MOVEDEX.LIQUIDATION:
      case MOVEDEX.SHADOWBONE:
        if (Utils.chance(20 * sereneGrace) && opponent.canReduceStatStage(Stats.Defense))
          opponent.reduceStat(Stats.Defense, 1, attacker, true);
        break;

      case MOVEDEX.CRUSHCLAW:
      case MOVEDEX.RAZORSHELL:
      case MOVEDEX.ROCKSMASH:
        if (Utils.chance(50 * sereneGrace) && opponent.canReduceStatStage(Stats.Defense))
          opponent.reduceStat(Stats.Defense, 1, attacker, true);
        break;

      case MOVEDEX.DARKPULSE:
      case MOVEDEX.DRAGONRUSH:
      case MOVEDEX.TWISTER:
      case MOVEDEX.WATERPULSE:
      case MOVEDEX.ZENHEADBUTT:
        // if (Utils.chance(20 * sereneGrace)) opponent.flinch();
        break;

      case MOVEDEX.DIAMONDSTORM:
        if (Utils.chance(50 * sereneGrace) && attacker.canIncreaseStatStage(Stats.Defense))
          attacker.increaseStat(Stats.Defense, 1, undefined, false);
        break;

      case MOVEDEX.DIZZYPUNCH:
        // if (Utils.chance(20*sereneGraace) && opponent.canConfuse())
        //   opponent.confuse()
        break;

      case MOVEDEX.FAKEOUT:
        // opponent.flinch();
        break;

      case MOVEDEX.FIERYDANCE:
        if (Utils.chance(50 * sereneGrace) && attacker.canIncreaseStatStage(Stats.SpAtk))
          attacker.increaseStat(Stats.SpAtk, 1, undefined, false);
        break;

      case MOVEDEX.FIREFANG:
        if (Utils.chance(10 * sereneGrace) && opponent.canBurn(attacker, false)) opponent.burn();
        // else if (Utils.chance(10 * sereneGrace) && opponent.canParalize(attacker, false)) opponent.paralize();
        break;

      case MOVEDEX.FIRELASH:
        if (attacker.canReduceStatStage(Stats.Defense)) attacker.reduceStat(Stats.Defense, 1, undefined, false);
        break;

      case MOVEDEX.GUNKSHOT:
      case MOVEDEX.POISONJAB:
      case MOVEDEX.POISONSTING:
      case MOVEDEX.SLUDGE:
      case MOVEDEX.SLUDGEBOMB:
        if (Utils.chance(30 * sereneGrace) && opponent.canPoison(attacker, false)) opponent.poison();
        break;

      case MOVEDEX.HURRICANE:
        // if (Utils.chance(30*sereneGraace) && opponent.canConfuse())
        //   opponent.confuse()
        break;

      case MOVEDEX.ICEBURN:
      case MOVEDEX.LAVAPLUME:
      case MOVEDEX.SCALD:
      case MOVEDEX.SEARINGSHOT:
      case MOVEDEX.STEAMERUPTION:
        if (Utils.chance(30 * sereneGrace) && opponent.canBurn(attacker, false)) opponent.burn();
        break;

      case MOVEDEX.ICEFANG:
        // if (Utils.chance(10 * sereneGrace) && opponent.canBurn(attacker, false)) opponent.burn();
        // else if (Utils.chance(10 * sereneGrace) && opponent.canParalize(attacker, false)) opponent.paralize();
        break;

      case MOVEDEX.INFERNO:
        if (opponent.canBurn(attacker, false)) opponent.burn();
        break;

      case MOVEDEX.IRONTAIL:
        if (Utils.chance(10 * sereneGrace) && opponent.canReduceStatStage(Stats.Defense))
          opponent.reduceStat(Stats.Defense, 1, attacker, true);
        break;

      case MOVEDEX.LEAFTORNADO:
      case MOVEDEX.MIRRORSHOT:
      case MOVEDEX.MUDBOMB:
      case MOVEDEX.MUDDYWATER:
        if (Utils.chance(30 * sereneGrace) && opponent.canReduceStatStage(Stats.Accuracy))
          opponent.reduceStat(Stats.Accuracy, 1, attacker, true);
        break;

      case MOVEDEX.LUNGE:
      case MOVEDEX.TROPKICK:
        if (opponent.canReduceStatStage(Stats.Attack)) opponent.reduceStat(Stats.Attack, 1, attacker, true);
        break;

      case MOVEDEX.LUSTERPURGE:
        if (Utils.chance(50 * sereneGrace) && opponent.canReduceStatStage(Stats.SpDef))
          opponent.reduceStat(Stats.SpDef, 1, attacker, true);
        break;

      case MOVEDEX.METALCLAW:
      case MOVEDEX.PLAYROUGH:
        if (Utils.chance(10 * sereneGrace) && attacker.canReduceStatStage(Stats.Attack))
          attacker.reduceStat(Stats.SpDef, 1, undefined, false);
        break;

      case MOVEDEX.METEORMASH:
        if (Utils.chance(20 * sereneGrace) && attacker.canReduceStatStage(Stats.Attack))
          attacker.reduceStat(Stats.SpDef, 1, undefined, false);
        break;

      case MOVEDEX.MISTBALL:
        if (Utils.chance(50 * sereneGrace) && opponent.canReduceStatStage(Stats.SpAtk))
          opponent.reduceStat(Stats.SpAtk, 1, attacker, true);
        break;

      case MOVEDEX.MOONBLAST:
        if (Utils.chance(30 * sereneGrace) && opponent.canReduceStatStage(Stats.SpAtk))
          opponent.reduceStat(Stats.SpAtk, 1, attacker, true);
        break;

      case MOVEDEX.MUDSLAP:
        if (opponent.canReduceStatStage(Stats.Accuracy)) opponent.reduceStat(Stats.Accuracy, 1, attacker, true);
        break;

      case MOVEDEX.MYSTICALFIRE:
        if (opponent.canReduceStatStage(Stats.SpAtk)) opponent.reduceStat(Stats.SpAtk, 1, attacker, true);
        break;

      case MOVEDEX.NIGHTDAZE:
        if (Utils.chance(40 * sereneGrace) && opponent.canReduceStatStage(Stats.Accuracy))
          opponent.reduceStat(Stats.Accuracy, 1, attacker, true);
        break;

      case MOVEDEX.NUZZLE:
      case MOVEDEX.STOKEDSPARKSURFER:
      case MOVEDEX.ZAPCANNON:
        if (opponent.canParalize(attacker, false)) opponent.paralize();
        break;

      case MOVEDEX.OCTAZOOKA:
        if (Utils.chance(50 * sereneGrace) && opponent.canReduceStatStage(Stats.Accuracy))
          opponent.reduceStat(Stats.Accuracy, 1, attacker, true);
        break;

      case MOVEDEX.POISONFANG:
        // if (Utils.chance(50 * sereneGrace) && opponent.canPoison(attacker, false)) opponent.toxic();
        break;

      case MOVEDEX.RELICSONG:
        if (Utils.chance(10 * sereneGrace) && opponent.canSleep(attacker, false)) opponent.sleep();
        break;

      case MOVEDEX.ROCKCLIMB:
      case MOVEDEX.WATERPULSE:
        // if (Utils.chance(20*sereneGraace) && opponent.canConfuse())
        //   opponent.confuse()
        break;

      case MOVEDEX.SACREDFIRE:
        if (Utils.chance(50 * sereneGrace) && opponent.canBurn(attacker, false)) opponent.burn();
        break;

      case MOVEDEX.SECRETPOWER:
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

      case MOVEDEX.SEEDFLARE:
        if (Utils.chance(40 * sereneGrace) && opponent.canReduceStatStage(Stats.SpDef))
          opponent.reduceStat(Stats.SpDef, 2, attacker, true);
        break;

      case MOVEDEX.SHADOWBALL:
        if (Utils.chance(20 * sereneGrace) && opponent.canReduceStatStage(Stats.SpDef))
          opponent.reduceStat(Stats.SpDef, 1, attacker, true);
        break;

      case MOVEDEX.SMOG:
        if (Utils.chance(40 * sereneGrace) && opponent.canPoison(attacker, false)) opponent.poison();
        break;

      case MOVEDEX.SNARL:
      case MOVEDEX.STRUGGLEBUG:
        if (opponent.canReduceStatStage(Stats.SpAtk))
          opponent.reduceStat(Stats.SpAtk, 1, attacker, true);

      case MOVEDEX.STEELWING:
        if (Utils.chance(10 * sereneGrace) && attacker.canIncreaseStatStage(Stats.Defense))
          attacker.increaseStat(Stats.Defense, 1, undefined, false);
        break;

      case MOVEDEX.THUNDERFANG:
        if (Utils.chance(10 * sereneGrace) && opponent.canParalize(attacker, false)) opponent.paralize();
        // else if (Utils.chance(10 * sereneGrace) && opponent.canFiflnch(attacker, false)) opponent.burn();
        break;

      case MOVEDEX.THUNDERPUNCH:
      case MOVEDEX.THUNDERSHOCK:
      case MOVEDEX.THUNDERBOLT:
      case MOVEDEX.VOLTTACKLE:
        if (Utils.chance(10 * sereneGrace) && opponent.canParalize(attacker, false)) opponent.paralize();

      case MOVEDEX.TRIATTACK:
        if (Utils.chance(6.67 * sereneGrace) && opponent.canParalize(attacker, false)) opponent.paralize();
        else if (Utils.chance(6.67 * sereneGrace) && opponent.canBurn(attacker, false)) opponent.burn();
        // else if (Utils.chance(6.67 * sereneGrace) && opponent.canFreeze(attacker, false)) opponent.freeze();
        break;

      case MOVEDEX.TWINEEDLE:
        if (Utils.chance(40 * sereneGrace) && opponent.canPoison(attacker, false)) opponent.poison();
        break;

    }
  }
}
