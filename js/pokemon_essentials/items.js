/**
 * @namespace PE
 */
var PE = PE || {};
/**
 * @namespace Battle
 * @memberof PE
 */
PE.Battle = PE.Battle || {};
/**
 * @namespace Items
 * @memberof Battle
 */
PE.Battle.Items = PE.Battle.Items || {};

PE.Battle.Items.name = function(id) {
  return i18n._($PE_ITEMS[id].name);
}

PE.Battle.Items.SpeedStatEffects = function(pokemon, speed) {
  if (pokemon.hasItemIn(['MACHOBRACE', 'POWERWEIGHT', 'POWERBRACER', 'POWERBELT', 'POWERANKLET', 'POWERLENS',
      'POWERBAND', 'IRONBALL'
    ])) {
    speed = Math.round(speed / 2);
  }
  if (pokemon.hasItem('CHOICESCARF')) {
    speed = Math.round(speed * 1.5);
  }
  if (pokemon.hasItem('QUICKPOWDER') && pokemon.species === Pokedex.DITTO && !pokemon.effects.Transform) {
    speed *= 2;
  }
  return speed;
}

PE.Battle.Items.onDealingDamageEffects = function(move, user, target, damage) {
  if (damage < 0) return;
  var movetype = move.getType(move.type, user, target);
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
      $Battle.showMessage(target.name + "'s " + target.item + " was transferred to " + user.name + "!");
      console.log("[Item triggered] " + target.name + "'s Sticky Barb moved to " + user.name);
    }
    //===========================================================================
    //===========================================================================
    // Rocky Helmet
    if (target.hasItem('ROCKYHELMET', true) && !user.isFainted()) {
      if (!user.hasAbility(PE.Abilitydex.MAGICGUARD)) {
        // $Battle.scene.damageAnimation(user, 0);
        // user.ReduceHP(Math.floor(user.totalhp / 6));
        console.log(`[Item triggered] ${target.name}'s Rocky Helmet`);
        $Battle.showMessage(i18n._("%1 was hurt by the %2!", user.name, Items.name(target.item)));
      }
    }
    //===========================================================================
  }
  if (!target.damageState.substitute) {
    //===========================================================================
    // Air Balloon
    if (target.hasItem('AIRBALLOON', true)) {
      target.consumeItem(true, false);
      $Battle.showMessage(i18n._(target.name + "'s Air Balloon popped!"));
      console.log("[Item triggered] " + target.name + "'s Air Balloon popped");
    } else if (target.hasItem('ABSORBBULB') && movetype === PE.Types.WATER) {
      if (target.increaseStatWithCause(PE.Stats.SpAtk, 1, target, Items.name(target.item))) {
        target.consumeItem();
        console.log("[Item triggered] " + target.name + "'s " + Items.name(target.item));
      }
    } else if (target.hasItem('LUMINOUSMOSS') && movetype === PE.Types.WATER) {
      if (target.increaseStatWithCause(PE.Stats.SpDef, 1, target, Items.name(target.item))) {
        target.consumeItem();
        console.log("[Item triggered] " + target.name + "'s " + Items.name(target.item));
      }
    } else if (target.hasItem('CELLBATTERY') && movetype === PE.Types.ELECTRIC) {
      if (target.increaseStatWithCause(PE.Stats.Attack, 1, target, Items.name(target.item))) {
        target.consumeItem();
        console.log("[Item triggered] " + target.name + "'s " + Items.name(target.item));
      }
    } else if (target.hasItem('SNOWBALL') && movetype === PE.Types.ICE) {
      if (target.increaseStatWithCause(PE.Stats.Attack, 1, target, Items.name(target.item))) {
        target.consumeItem();
        console.log("[Item triggered] " + target.name + "'s " + Items.name(target.item));
      }
    } else if (target.hasItem('ENIGMABERRY') && PE.Types.effectiveness(movetype, target.types, undefined) >= 2) {
      // target.pbActivateBerryEffect();
    } else if ((target.hasItem('JABOCABERRY') && move.category === Battle.Moves.Categories.Physical) ||
      (target.hasItem('ROWAPBERRY') && move.category === Battle.Moves.Categories.Special)) {
      if (!user.hasAbility(PE.Abilitydex.MAGICGUARD) && !user.isFainted()) {
        // $Battle.scene.pbDamageAnimation(user, 0);
        // user.pbReduceHP(Math.floor(user.totalhp / 8));
        target.consumeItem();
        $Battle.showMessage(i18n._(target.name + " consumed its " + Items.name(target.item) + " and hurt " + user.name + "!"));
        console.log("[Item triggered] " + target.name + "'s " + Items.name(target.item));
      }
    } else if (target.hasItem('KEEBERRY') && move.category === Battle.Moves.Categories.Physical) {
      // target.pbActivateBerryEffect();
    } else if (target.hasItem('MARANGABERRY') && move.category === Battle.Moves.Categories.Special) {
      // target.pbActivateBerryEffect();
    }
    //===========================================================================
    //===========================================================================
    // Weakness Policy
    //===========================================================================
  }
}
