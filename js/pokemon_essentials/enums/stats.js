var PE;
(function (PE) {
    var Stats;
    (function (Stats) {
        Stats["HP"] = "HP";
        Stats["Attack"] = "Attack";
        Stats["Defense"] = "Defense";
        Stats["Speed"] = "Speed";
        Stats["SpAtk"] = "SpAtk";
        Stats["SpDef"] = "SpDef";
        Stats["Accuracy"] = "Accuracy";
        Stats["Evasion"] = "Evasion";
    })(Stats = PE.Stats || (PE.Stats = {}));
})(PE || (PE = {}));
(function (PE) {
    var Stats;
    (function (Stats) {
        function name(stat) {
            return i18n._(stat);
        }
        Stats.name = name;
    })(Stats = PE.Stats || (PE.Stats = {}));
})(PE || (PE = {}));
