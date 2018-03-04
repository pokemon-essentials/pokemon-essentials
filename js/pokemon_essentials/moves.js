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
PE.Battle.Moves = PE.Battle.Moves || {};

function isOHKOMove(moveid) {}
PE.Battle.Moves.isOHKOMove = isOHKOMove;
var MoveFlags;
(function(MoveFlags) {
  MoveFlags["Protect"] = "protect";
  MoveFlags["Mirror"] = "mirror";
  MoveFlags["Heal"] = "heal";
  MoveFlags["Contact"] = "contact";
  MoveFlags["Snatch"] = "snatch";
  MoveFlags["Bullet"] = "bullet";
  MoveFlags["Distance"] = "distance";
  MoveFlags["Authentic"] = "authentic";
  MoveFlags["Mystery"] = "mystery";
  MoveFlags["Reflectable"] = "reflectable";
  MoveFlags["Pulse"] = "pulse";
  MoveFlags["Bite"] = "bite";
  MoveFlags["Recharge"] = "recharge";
  MoveFlags["Nonsky"] = "nonsky";
  MoveFlags["Sound"] = "sound";
  MoveFlags["Charge"] = "charge";
  MoveFlags["Gravity"] = "gravity";
  MoveFlags["Punch"] = "punch";
  MoveFlags["rost"] = "rost";
  MoveFlags["Powder"] = "powder";
  MoveFlags["Dance"] = "dance";
})(MoveFlags = PE.Battle.MoveFlags || (PE.Battle.Moves.MoveFlags = {}));
var Categories;
(function(Categories) {
  Categories[Categories["Special"] = 0] = "Special";
  Categories[Categories["Physical"] = 1] = "Physical";
  Categories[Categories["Status"] = 2] = "Status";
})(Categories = PE.Battle.Moves.Categories || (PE.Battle.Moves.Categories = {}));

/** @class */
PE.Battle.Moves.Move = function Move(id) {
  this.id = id;
  if (!$PE_MOVES[id])
    throw Error("Error 404: Move name " + id + " not found!");
  Object.assign(this, $PE_MOVES[id]);
}
//==================================================================================================================
// About the move
PE.Battle.Moves.Move.prototype.modifyType = function(type, attacker, opponent) {
  if (attacker && attacker.hasAbility(PE.Abilitydex.NORMALIZE)) {
    type = PE.Types.NORMAL;
    this.powerBoost = true;
  } else if (attacker && attacker.hasAbility(PE.Abilitydex.AERILATE)) {
    type = PE.Types.FLYING;
    this.powerBoost = true;
  } else if (attacker && attacker.hasAbility(PE.Abilitydex.REFRIGERATE)) {
    type = PE.Types.ICE;
    this.powerBoost = true;
  } else if (attacker && attacker.hasAbility(PE.Abilitydex.PIXILATE)) {
    type = PE.Types.FAIRY;
    this.powerBoost = true;
  }
  return type;
};
PE.Battle.Moves.Move.prototype.getType = function(type, attacker, opponent) {
  this.powerBoost = false;
  type = this.modifyType(type, attacker, opponent);
  if ($Battle.field.effects.IonDeluge && type === PE.Types.NORMAL) {
    type = PE.Types.ELECTRIC;
    this.powerBoost = false;
  }
  if ($Battle.field.effects.Electrify) {
    type = PE.Types.ELECTRIC;
    this.powerBoost = false;
  }
  return type;
};
PE.Battle.Moves.Move.prototype.isStatus = function() {
  return this.category === Categories.Status;
};
PE.Battle.Moves.Move.prototype.IsDamaging = function() {
  return !this.isStatus();
};
PE.Battle.Moves.Move.prototype.hasMultipleTarget = function() {
  // if(this.target === MoveTargets.)
};
PE.Battle.Moves.Move.prototype.isContactMove = function() {
  return this.flags[MoveFlags.Contact] !== 0;
};
PE.Battle.Moves.Move.prototype.canProtectAgainst = function() {
  return this.flags[MoveFlags.Protect] !== 0;
};
// canMagicCoat() {
//   return this.flags[MoveFlags.] !== 0;
//   return (@flags& 0x04)!= 0 # flag c: Magic Coat
// }
PE.Battle.Moves.Move.prototype.canSnatch = function() {
  return this.flags[MoveFlags.Snatch] !== 0;
};
PE.Battle.Moves.Move.prototype.canMirrorMove = function() {
  return this.flags[MoveFlags.Mirror] !== 0;
};
// canKingsRock() {
//   return this.flags[MoveFlags.] !== 0;
//   return (@flags& 0x20)!= 0 # flag f: King's Rock
// }
// canThawUser() {
//   return this.flags[MoveFlags.] !== 0;
//   return (@flags& 0x40)!= 0 # flag g: Thaws user before moving
// }
// hasHighCriticalRate() {
//   return this.flags[MoveFlags.] !== 0;
//   return (@flags& 0x80)!= 0 # flag h: Has high critical hit rate
// }
PE.Battle.Moves.Move.prototype.isBitingMove = function() {
  return this.flags[MoveFlags.Bite] !== 0;
};
PE.Battle.Moves.Move.prototype.isPunchingMove = function() {
  return this.flags[MoveFlags.Punch] !== 0;
};
PE.Battle.Moves.Move.prototype.isSoundBased = function() {
  return this.flags[MoveFlags.Sound] !== 0;
};
PE.Battle.Moves.Move.prototype.isPowderMove = function() {
  return this.flags[MoveFlags.Powder] !== 0;
};
PE.Battle.Moves.Move.prototype.isPulseMove = function() {
  return this.flags[MoveFlags.Pulse] !== 0;
};
PE.Battle.Moves.Move.prototype.isBombMove = function() {
  return this.flags[MoveFlags.Bullet] !== 0;
};
//==================================================================================================================

//==================================================================================================================
// This move's type effectiveness
PE.Battle.Moves.Move.prototype.typeImmunityByAbility = function(type, attacker, opponent) {
  if (attacker.index === opponent.index)
    return false;
  if (attacker.hasMoldBreaker())
    return false;
  return Battle.Abilities.moveHitTypeImmunity(this, attacker, opponent);
};
PE.Battle.Moves.Move.prototype.pbTypeModifier = function() {};
