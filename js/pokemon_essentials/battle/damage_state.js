var PE;
(function (PE) {
    var Battle;
    (function (Battle) {
        var DamageState = /** @class */ (function () {
            function DamageState() {
                /** HP lost by opponent, inc. HP lost by a substitute */
                this.hplost = 0;
                /** Critical hit flag */
                this.critical = false;
                /**Calculated damage */
                this.calcdamage = 0;
                /**Type effectiveness */
                this.typemod = 0;
                /**A substitute took the damage */
                this.substitute = false;
                /**Focus Band used */
                this.focusband = false;
                /**Focus Sash used */
                this.focussash = false;
                /** Sturdy ability used */
                this.sturdy = false;
                /**Damage was endured */
                this.endured = false;
                /**A type - resisting berry was used */
                this.berryweakened = false;
            }
            DamageState.prototype.reset = function () {
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
            };
            return DamageState;
        }());
        Battle.DamageState = DamageState;
    })(Battle = PE.Battle || (PE.Battle = {}));
})(PE || (PE = {}));
