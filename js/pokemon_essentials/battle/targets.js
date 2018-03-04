var PE;
(function (PE) {
    var Battle;
    (function (Battle) {
        var MoveTargets;
        (function (MoveTargets) {
            MoveTargets["Normal"] = "NORMAL";
            MoveTargets["AllAdjacentFoes"] = "ALLADJACENTFOES";
            MoveTargets["Self"] = "SELF";
            MoveTargets["Any"] = "ANY";
            MoveTargets["AdjacentAllyOrSelf"] = "ADJACENTALLYORSELF";
            MoveTargets["AllyTeam"] = "ALLYTEAM";
            MoveTargets["AdjacentAlly"] = "ADJACENTALLY";
            MoveTargets["AllySide"] = "ALLYSIDE";
            MoveTargets["AllAdjacent"] = "ALLADJACENT";
            MoveTargets["Scripted"] = "SCRIPTED";
            MoveTargets["All"] = "ALL";
            MoveTargets["AdjacentFoe"] = "ADJACENTFOE";
            MoveTargets["RandomNormal"] = "RANDOMNORMAL";
            MoveTargets["FoeSide"] = "FOESIDE";
        })(MoveTargets = Battle.MoveTargets || (Battle.MoveTargets = {}));
    })(Battle = PE.Battle || (PE.Battle = {}));
})(PE || (PE = {}));
