namespace PE.Battle {
  export class DamageState {
    /** HP lost by opponent, inc. HP lost by a substitute */
    hplost = 0;
    /** Critical hit flag */
    critical = false;
    /**Calculated damage */
    calcdamage = 0;
    /**Type effectiveness */
    typemod = 0;
    /**A substitute took the damage */
    substitute = false;
    /**Focus Band used */
    focusband = false;
    /**Focus Sash used */
    focussash = false;
    /** Sturdy ability used */
    sturdy = false;
    /**Damage was endured */
    endured = false;
    /**A type - resisting berry was used */
    berryweakened = false;

    constructor() { }

    reset() {
      this.hplost = 0;
      this.critical = false;
      this.calcdamage = 0;
      this.typemod = 0;
      this.substitute = false;
      this.focusband = false;
      this.focussash = false;
      this.sturdy = false;
      this.endured = false;
      this.berryweakened = false;
    }
  }
}
