declare namespace MV {
    export interface Matrix {
        type: string;
        value: Array<number>;
    }
    export interface TouchInputEvents {
        trigger: boolean;
        cancelled: boolean;
        moved: boolean;
        released: boolean;
        wheelX: number;
        wheelY: number;
    }
    export interface AudioParameters {
        name: string;
        volume: number;
        pitch: number;
        pan: number;
        pos: number;
    }
    export interface BattleRewards {
        gold: number;
        exp: number;
        items: Array<RPG.BaseItem>;
    }
    export interface BattlerAnimation {
        animationId: number;
        mirror: boolean;
        delay: number;
    }
    export interface CommandItem {
        name: string;
        symbol: string;
        enabled: boolean;
        ext: any;
    }
    export interface TextState {
        index: number;
        x: number;
        y: number;
        left: number;
    }
    export interface BattleLogMethod {
        name: string;
        params: any;
    }
    export interface Motion {
        index: number;
        loop: boolean;
    }
    export interface ConfigData {
        alwaysDash: boolean;
        commandRemember: boolean;
        bgmVolume: number;
        bgsVolume: number;
        meVolume: number;
        seVolume: number;
    }
    export interface DatabaseFile {
        name: string;
        src: string;
    }
    export interface SaveFileInfo {
        globalId: string;
        title: string;
        characters: Array<Array<any>>;
        faces: Array<Array<any>>;
        playtime: string;
        timestamp: number;
    }
    export interface SaveContents {
        system: Game_System;
        screen: Game_Screen;
        timer: Game_Timer;
        switches: Game_Switches;
        variables: Game_Variables;
        selfSwitches: Game_SelfSwitches;
        actors: Game_Actors;
        party: Game_Party;
        map: Game_Map;
        player: Game_Party;
    }
    export interface PluginSettings {
        name: string;
        status: string;
        description: string;
        parameters: {[key: string]: string};
    }
}
