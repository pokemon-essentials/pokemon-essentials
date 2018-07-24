class Battle_Side {
  slots: Battle_Battler[] = [];
  party: Battle_Battler[] = [];
  constructor() {}

  get actives() {
    return this.slots;
  }

  switchInStartBattlers() {
    this.slots[0] = this.party[0];
    this.slots[0].slotIndex = 0;
  }

  switchBattlers(slotIndex, partyIndex) {
    // let aux = this.slots[slotIndex];
    // debugger;
    this.slots[slotIndex].slotIndex = undefined;
    this.slots[slotIndex] = this.party[partyIndex];
    this.slots[slotIndex].slotIndex = slotIndex;
  }

  areAllFainted() {
    for (const battler of this.party) {
      if (!battler.isFainted()) return false;
    }
    return true;
  }

  nextUnfaited(partyIndex?) {
    if (this.areAllFainted()) return undefined;
    for (const battler of this.party) {
      if (battler.partyIndex === partyIndex) continue;
      if (!battler.isFainted()) return battler;
    }
  }
}
