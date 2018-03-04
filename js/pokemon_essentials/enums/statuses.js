var PE;
(function (PE) {
    var Statuses;
    (function (Statuses) {
        Statuses[Statuses["Healthy"] = 0] = "Healthy";
        Statuses[Statuses["Sleep"] = 1] = "Sleep";
        Statuses[Statuses["Poison"] = 2] = "Poison";
        Statuses[Statuses["Burn"] = 3] = "Burn";
        Statuses[Statuses["Paralysis"] = 4] = "Paralysis";
        Statuses[Statuses["Frozen"] = 5] = "Frozen";
    })(Statuses = PE.Statuses || (PE.Statuses = {}));
})(PE || (PE = {}));
(function (PE) {
    var Statuses;
    (function (Statuses) {
        function name(id) {
            var names = [
                i18n._("Healthy"),
                i18n._("Asleep"),
                i18n._("Poisoned"),
                i18n._("Burned"),
                i18n._("Paralyzed"),
                i18n._("Frozen")
            ];
            return names[id];
        }
        Statuses.name = name;
    })(Statuses = PE.Statuses || (PE.Statuses = {}));
})(PE || (PE = {}));
