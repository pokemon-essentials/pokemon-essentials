namespace PE.Battle.Items {
  export function name(id: string) {
    return i18n._($PE_ITEMS[id].name);
  }

  export function SpeedStatEffects(pokemon: Battler, speed: number) {
    if (pokemon.hasItemIn(['MACHOBRACE', 'POWERWEIGHT', 'POWERBRACER', 'POWERBELT', 'POWERANKLET', 'POWERLENS',
      'POWERBAND', 'IRONBALL'])) {
      speed = Math.round(speed / 2);
    }
    if (pokemon.hasItem('CHOICESCARF')) {
      speed = Math.round(speed * 1.5);
    }
    if (pokemon.hasItem('QUICKPOWDER') && pokemon.species === POKEDEX.DITTO && !pokemon.effects.Transform) {
      speed *= 2;
    }
    return speed;
  }

  export function onDealingDamageEffects(move: Moves.Move, user: Battler, target: Battler, damage: number) {
    if (damage < 0) return;
    let movetype = move.getType(move.type, user, target);
    if (move.flags.contact && !target.damageState.substitute) {
      //===========================================================================
      // Sticky Barb
      if (target.hasItem('STICKYBARB', true) && user.item === null && !user.isFainted()) {
        user.item = target.item;
        target.item = null;
        target.effects.Unburden = true;
        // research what do this
        // if !@battle.opponent && !@battle.pbIsOpposing?(user.index)
        //     if user.pokemon.itemInitial==0 && target.pokemon.itemInitial==user.item
        //       user.pokemon.itemInitial=user.item
        //       target.pokemon.itemInitial=0
        //     end
        //   end
        $Battle.showMessage(`${target.name}'s ${target.item} was transferred to ${user.name}!`);
        console.log(`[Item triggered] ${target.name}'s Sticky Barb moved to ${user.name}`)
      }
      //===========================================================================

      //===========================================================================
      // Rocky Helmet
      if (target.hasItem('ROCKYHELMET', true) && !user.isFainted()) {
        if (!user.hasAbility(ABILITYDEX.MAGICGUARD)) {
          // $Battle.scene.damageAnimation(user, 0);
          // user.ReduceHP(Math.floor(user.totalhp / 6));
          console.log(`[Item triggered] #{target.pbThis}'s Rocky Helmet`);
          $Battle.showMessage(i18n._(`${user.name} was hurt by the ${Items.name(target.item)}!`));
        }
      }
      //===========================================================================
    }

    if (!target.damageState.substitute) {
      //===========================================================================
      // Air Balloon
      if (target.hasItem('AIRBALLOON', true)) {
        target.consumeItem(true, false);
        $Battle.showMessage(i18n._(`${target.name}'s Air Balloon popped!`))
        console.log(`[Item triggered] ${target.name}'s Air Balloon popped`);
      }
      //===========================================================================

      //===========================================================================
      // Absorb Bulb
      else if (target.hasItem('ABSORBBULB') && movetype === Types.WATER) {
        if (target.increaseStatWithCause(Stats.SpAtk, 1, target, Items.name(target.item))) {
          target.consumeItem();
          console.log(`[Item triggered] ${target.name}'s ${Items.name(target.item)}`);
        }
      }
      //===========================================================================

      //===========================================================================
      // Luminous Moss
      else if (target.hasItem('LUMINOUSMOSS') && movetype === Types.WATER) {
        if (target.increaseStatWithCause(Stats.SpDef, 1, target, Items.name(target.item))) {
          target.consumeItem();
          console.log(`[Item triggered] ${target.name}'s ${Items.name(target.item)}`);
        }
      }
      //===========================================================================

      //===========================================================================
      // Cell Battery
      else if (target.hasItem('CELLBATTERY') && movetype === Types.ELECTRIC) {
        if (target.increaseStatWithCause(Stats.Attack, 1, target, Items.name(target.item))) {
          target.consumeItem();
          console.log(`[Item triggered] ${target.name}'s ${Items.name(target.item)}`);
        }
      }
      //===========================================================================

      //===========================================================================
      // Snow Ball
      else if (target.hasItem('SNOWBALL') && movetype === Types.ICE) {
        if (target.increaseStatWithCause(Stats.Attack, 1, target, Items.name(target.item))) {
          target.consumeItem();
          console.log(`[Item triggered] ${target.name}'s ${Items.name(target.item)}`);
        }
      }
      //===========================================================================

      //===========================================================================
      // Enigma Berry
      else if (target.hasItem('ENIGMABERRY') && Types.effectiveness(movetype, target.types, undefined) >= 2) {
        // target.pbActivateBerryEffect();
      }
      //===========================================================================

      //===========================================================================
      // Jaboca Berry, Rowap Berry
      else if ((target.hasItem('JABOCABERRY') && move.category === Moves.Categories.Physical)
        || (target.hasItem('ROWAPBERRY') && move.category === Moves.Categories.Special)) {
        if (!user.hasAbility(ABILITYDEX.MAGICGUARD) && !user.isFainted()) {
          // $Battle.scene.pbDamageAnimation(user, 0);
          // user.pbReduceHP(Math.floor(user.totalhp / 8));
          target.consumeItem();
          $Battle.showMessage(i18n._(`${target.name} consumed its ${Items.name(target.item)} and hurt ${user.name}!`));
          console.log(`[Item triggered] ${target.name}'s ${Items.name(target.item)}`);
        }
      }
      //===========================================================================

      //===========================================================================
      // Kee Berry
      else if (target.hasItem('KEEBERRY') && move.category === Moves.Categories.Physical) {
        // target.pbActivateBerryEffect();
      }
      //===========================================================================

      //===========================================================================
      // Maranga Berry
      else if (target.hasItem('MARANGABERRY') && move.category === Moves.Categories.Special) {
        // target.pbActivateBerryEffect();
      }
      //===========================================================================

      //===========================================================================
      // Weakness Policy
      //===========================================================================
    }
  }

}
