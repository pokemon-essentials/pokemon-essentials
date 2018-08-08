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
    EventManager.run("SwitchIn", this.slots[0]);
  }

  switchBattlers(slotIndex, partyIndex) {
    let out = this.slots[slotIndex];
    console.log(`> ${this.slots[slotIndex].species} switch to ${this.party[partyIndex].species}`);
    $BattleManager.showMessage(`${this.slots[slotIndex].name} switch to ${this.party[partyIndex].name}`);
    this.slots[slotIndex].slotIndex = undefined;
    this.slots[slotIndex] = this.party[partyIndex];
    this.slots[slotIndex].slotIndex = slotIndex;
    EventManager.emit("SWITCH_BATTLERS", out, this.slots[slotIndex]);
    EventManager.run("SwitchIn", out, this.slots[slotIndex]);
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
