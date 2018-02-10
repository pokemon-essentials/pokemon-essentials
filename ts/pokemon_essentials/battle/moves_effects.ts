namespace PE.Battle.Moves {
  export function AdditionalEffect(attacker: Battler, opponent: Battler, move: Move) {
    let sereneGrace = attacker.hasAbility(Abilitydex.SERENEGRACE) ? 1 : 2;
    switch (move.id) {
      case Movedex.ACID:
      case Movedex.BUGBUZZ:
        if (Utils.chance(10 * sereneGrace) && opponent.canReduceStatStage(Stats.SpDef))
          opponent.reduceStat(Stats.SpDef, 1, attacker, false);
        break;
      case Movedex.ACIDSPRAY:
        if (opponent.canReduceStatStage(Stats.SpDef))
          opponent.reduceStat(Stats.SpDef, 2, attacker, false);
        break;
      case Movedex.AIRSLASH:
      case Movedex.ASTONISH:
      case Movedex.BITE:
        // if (Utils.chance(30 * sereneGrace)) opponent.flinch();
        break;
      case Movedex.ANCHORSHOT:
        // if (Utils.chance(100)) opponent.traps(); //Traps the target.
        break;
      case Movedex.ANCIENTPOWER:
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
          opponent.reduceStat(Stats.Attack, 1, attacker, false);
        break;
      case Movedex.BLAZEKICK:
        if (Utils.chance(10 * sereneGrace) && opponent.canBurn(attacker, false))
          opponent.burn();
        break;
      case Movedex.BLIZZARD:
        // if (Utils.chance(10 * sereneGrace) && opponent.canFreeze(attacker, false))
        //   opponent.freeze();
        break;
      case Movedex.BLUEFLARE:
        if (Utils.chance(20 * sereneGrace) && opponent.canBurn(attacker, false))
          opponent.burn();
        break;
      case Movedex.BODYSLAM:
      case Movedex.BOUNCE:
        if (Utils.chance(30 * sereneGrace) && opponent.canParalize(attacker, false))
          opponent.paralize();
        break;
      case Movedex.BOLTSTRIKE:
        if (Utils.chance(20 * sereneGrace) && opponent.canParalize(attacker, false))
          opponent.paralize();
        break;
      case Movedex.BONECLUB:
        // if (Utils.chance(10 * sereneGrace)) opponent.flinch();
        break;
      case Movedex.BUBBLE:
      case Movedex.BUBBLEBEAM:
        if (Utils.chance(10 * sereneGrace) && opponent.canReduceStatStage(Stats.Speed))
          opponent.reduceStat(Stats.Speed, 1, attacker, false);
        break;
      case Movedex.BULLDOZE:
        if (opponent.canReduceStatStage(Stats.Speed))
          opponent.reduceStat(Stats.Speed, 1, attacker, false);
        break;
      case Movedex.CHARGEBEAM:
        if (Utils.chance(70 * sereneGrace) && attacker.canIncreaseStatStage(Stats.SpAtk))
          attacker.increaseStat(Stats.SpAtk, 1, undefined, false);
        break;
      // case Movedex.CHATTER:
      //   if (opponent.cancon(Stats.Speed))
      //     opponent.reduceStat(Stats.Speed, 1, attacker, false);
      //   break;

    }
  }
}
