declare namespace RPG {
    export interface MetaData {
        /**
         * The text of the note.
         */
        note: string;

        /**
         * The Meta.
         */
        meta: {[key: string]: any};
    }

    /**
     * The data class for maps.
     */
    export interface Map extends MetaData {
        /**
         * The map's display name.
         */
        displayName: string;

        /**
         * The map's tile set.
         */
        tilesetId: number;

        /**
         * The map's width.
         */
        width: number;

        /**
         * The map's height.
         */
        height: number;

        /**
         * The scroll type (0: No Loop, 1: Vertical Loop, 2: Horizontal Loop, 3: Both Loop).
         */
        scrollType: number;

        /**
         * The truth value indicating whether the battle background specification is enabled.
         */
        specifyBattleback: boolean;

        /**
         * The file name of the floor graphic if the battle background specification is enabled.
         */
        battleback1Name: string;

        /**
         * The file name of the wall graphic if the battle background specification is enabled.
         */
        battleback2_name: string;

        /**
         * The truth value indicating whether BGM autoswitching is enabled.
         */
        autoplayBgm: boolean;

        /**
         * The name of that BGM (RPG.AudioFile) if BGM autoswitching is enabled.
         */
        bgm: AudioFile;

        /**
         * The truth value indicating whether BGS autoswitching is enabled.
         */
        autoplayBgs: boolean;

        /**
         * The name of that BGS (RPG.AudioFile) if BGS autoswitching is enabled.
         */
        bgs: AudioFile;

        /**
         * The truth value of the [Disable Dashing] option.
         */
        disableDashing: boolean;

        /**
         * An encounter list. A RPG.Map.Encounter ID array.
         */
        encounterList: Array<Map.Encounter>;

        /**
         * The average number of steps between encounters.
         */
        encounterStep: number;

        /**
         * The file name of the parallax background's graphic.
         */
        parallaxName: string;

        /**
         * The truth value of the [Loop Horizontal] option for the parallax background.
         */
        parallaxLoopX: boolean;

        /**
         * The truth value of the [Loop Vertical] option for the parallax background.
         */
        parallaxLoopY: boolean;

        /**
         * The automatic x-axis scrolling speed for the parallax background.
         */
        parallaxSx: number;

        /**
         * The automatic y-axis scrolling speed for the parallax background.
         */
        parallaxSy: number;

        /**
         * The truth value of the [Show in the Editor] option for the parallax background.
         */
        parallaxShow: boolean;

        /**
         * The map data. A 3-dimensional tile ID array (Table).
         */
        data: Array<number>;

        /**
         * The array of RPG.Event data.
         */
        events: Array<Event>;
    }

    namespace Map {
        /**
         * The data class for the encounter settings.
         */
        export interface Encounter {
            /**
             * The enemy troop ID.
             */
            troopId: number;

            /**
             * Weight.
             */
            weight: number;

            /**
             * An array containing region IDs.
             */
            regionSet: Array<number>;
        }
    }

    /**
     * The data class for map information.
     */
    export interface MapInfo {
        /**
         * The map name.
         */
        name: string;

        /**
         * The parent map ID.
         */
        parentId: number;

        /**
         * The map tree display order, which is used internally.
         */
        order: number;
    }

    /**
     * The data class for map events.
     */
    export interface Event extends MetaData {
        /**
         * The event ID.
         */
        id: number;

        /**
         * The event name.
         */
        name: string;

        /**
         * The event's x-coordinate on the map.
         */
        x: number;

        /**
         * The event's y-coordinate on the map.
         */
        y: number;

        /**
         * The event pages. RPG.EventPage array.
         */
        pages: Array<EventPage>;
    }

    /**
     * The data class for the event page.
     */
    export interface EventPage {
        /**
         * The event condition (RPG.EventPage.Condition).
         */
        conditions: EventPage.Conditions;

        /**
         * The event graphic (RPG.EventPage.Image) .
         */
        image: EventPage.Image;

        /**
         * The type of movement (0: fixed, 1: random, 2: approach, 3: custom).
         */
        moveType: number;

        /**
         * The movement speed (1: x8 slower, 2: x4 slower, 3: x2 slower, 4: normal, 5: x2 faster, 6: x4 faster).
         */
        moveSpeed: number;

        /**
         * The movement frequency (1: lowest, 2: lower, 3: normal, 4: higher, 5: highest).
         */
        moveFrequency: number;

        /**
         * The movement route (RPG.MoveRoute). Referenced only when the movement type is set to custom.
         */
        moveRoute: Array<MoveRoute>;

        /**
         * The truth value of the [Walking Animation] option.
         */
        walkAnime: boolean;

        /**
         * The truth value of the [Stepping Animation] option.
         */
        stepAnime: boolean;

        /**
         * The truth value of the [Direction Fix] option.
         */
        directionFix: boolean;

        /**
         * The truth value of the [Through] option.
         */
        through: boolean;

        /**
         * The priority type (0: below characters, 1: same as characters, 2: above characters).
         */
        priorityType: number;

        /**
         * The event trigger (0: action button, 1: player touch, 2: event touch, 3: autorun, 4: parallel).
         */
        trigger: number;

        /**
         * A list of event commands. An RPG.EventCommand array.
         */
        list: Array<EventCommand>;
    }

    namespace EventPage {
        /**
         * The data class for the event page conditions.
         */
        export interface Conditions {
            /**
             * The truth value indicating whether the first [Switch] condition is valid.
             */
            switch1Valid: boolean;

            /**
             * The truth value indicating whether the second [Switch] condition is valid.
             */
            switch2Valid: boolean;

            /**
             * The truth value indicating whether the [Variable] condition is valid.
             */
            variableValid: boolean;

            /**
             * The truth value indicating whether the [Self Switch] condition is valid.
             */
            selfSwitchValid: boolean;

            /**
             * The truth value indicating whether the [Item] condition is valid.
             */
            itemValid: boolean;

            /**
             * The truth value indicating whether the [Actor] condition is valid.
             */
            actorValid: boolean;

            /**
             * The ID of that switch if the first [Switch] condition is valid.
             */
            switch1Id: number;

            /**
             * The ID of that switch if the second [Switch] condition is valid.
             */
            switch2Id: number;

            /**
             * The ID of that variable if the [Variable] condition is valid.
             */
            variableId: number;

            /**
             * The standard value of that variable (x and greater) if the [Variable] condition is valid.
             */
            variableValue: number;

            /**
             * The letter of that self switch ("A".."D") if the [Self Switch] condition is valid.
             */
            selfSwitchCh: string;

            /**
             * The ID of that item if the [Item] condition is valid.
             */
            itemId: number;

            /**
             * The ID of that actor if the [Actor] condition is valid.
             */
            actorId: number;
        }

        /**
         * The data class for the Event page [Graphics].
         */
        export interface Image {
            /**
             * The tile ID. If the specified graphic is not a tile, this value is 0.
             */
            tileId: number;

            /**
             * The file name of the character's graphic.
             */
            characterName: string;

            /**
             * The index of the character's graphic file (0..7).
             */
            characterIndex: number;

            /**
             * The direction in which the character is facing (2: down, 4: left, 6: right, 8: up).
             */
            direction: number;

            /**
             * The character's pattern (0..2).
             */
            pattern: number;
        }
    }

    /**
     * The data class for the event page.
     */
    export interface BattleEventPage {
         /**
          * The event condition (RPG.EventPage.Condition).
          */
         conditions: BattleEventPage.Conditions;

         /**
          * A list of event commands. An RPG.EventCommand array.
          */
         list: Array<EventCommand>;

         /**
          * The span.
          */
         span: number;
    }

    namespace BattleEventPage {
        /**
         * The data class for the event page conditions.
         */
        export interface Conditions {
            /**
             * The percentage of actor HP.
             */
            actorHp: number;

            /**
             * The ID of that actor if the [Actor] condition is valid.
             */
            actorId: number;

            /**
             * The truth value indicating whether the [Actor] condition is valid.
             */
            actorValid: boolean;

            /**
             * The percentage of enemy HP.
             */
            enemyHp: number;

            /**
             * The enemy index.
             */
            enemyIndex: number;

            /**
             * The truth value indicating whether the [Enemy] condition is valid.
             */
            enemyValid: boolean;

            /**
             * The ID of that switch if the [Switch] condition is valid.
             */
            switchId: number;

            /**
             * The truth value indicating whether the [Switch] condition is valid.
             */
            switchValid: boolean;

            /**
             * The turn condition value A.
             */
            turnA: number;

            /**
             * The turn condition value B.
             */
            turnB: number;

            /**
             * The boolean value indicating whether the "turn end" is valid.
             */
            turnEnding: boolean;

            /**
             * The boolean value indicating whether the "turn" is valid.
             */
            turnValid: boolean;
        }
    }

    /**
     * The data class for the Event command.
     */
    export interface EventCommand {
        /**
         * The event code.
         */
        code: number;

        /**
         * The indent depth. Usually 0. The [Conditional Branch] command, among others, adds 1 with every step deeper.
         */
        indent: number;

        /**
         * An array containing the Event command's arguments. The contents vary for each command.
         */
        parameters: Array<any>;
    }

    /**
     * The data class for the Move route.
     */
    export interface MoveRoute {
        /**
         * The truth value of the [Repeat Action] option.
         */
        repeat: boolean;

        /**
         * The truth value of the [Skip If Cannot Move] option.
         */
        skippable: boolean;

        /**
         * The truth value of the [Wait for Completion] option.
         */
        wait: boolean;

        /**
         * Program contents. An RPG.MoveCommand array.
         */
        list: Array<MoveCommand>;
    }

    /**
     * The data class for the Move command.
     */
    export interface MoveCommand {
        /**
         * Move command code.
         */
        code: number;

        /**
         * An array containing the Move command's arguments. The contents vary for each command.
         */
        parameters: Array<any>;
    }

    /**
     * The data class for actors.
     */
    export interface Actor extends MetaData {
        /**
         * The ID.
         */
        id: number;

        /**
         * The name.
         */
        name: string;

        /**
         * The actor's nickname.
         */
        nickname: string;

        /**
         * The actor's class ID.
         */
        classId: number;

        /**
         * The actor's initial level.
         */
        initialLevel: number;

        /**
         * The actor's max level
         */
        maxLevel: number;

        /**
         * The file name of the actor's walking graphic.
         */
        characterName: string;

        /**
         * The index (0..7) of the actor's walking graphic.
         */
        characterIndex: number;

        /**
         * The file name of the actor's face graphic.
         */
        faceName: string;

        /**
         * The index (0..7) of the actor's face graphic.
         */
        faceIndex: number;

        /**
         * The file name of the actor's battler graphic.
         */
        battlerName: string;

        /**
         * The actor's initial equipment. An array of weapon IDs or armor IDs with the following subscripts:
         */
        equips: Array<number>;

        /**
         * The profile.
         */
        profile: string;

        /**
         * The array of Trait data.
         */
        traits: Array<Trait>;
    }

    /**
     * The data class for class.
     */
    export interface Class extends MetaData {
        /**
         * The ID.
         */
        id: number;

        /**
         * The name.
         */
        name: string;

        /**
         * An array of values that decides the experience curve. The subscripts are as follows:
         *
         * 0: Base value
         * 1: Extra value
         * 2: Acceleration A
         * 3: Acceleration B
         */
        expParams: Array<number>;

        /**
         * The parameter development curve. A 2-dimensional array containing ordinary parameters according to level (Table).
         *
         * The format is params[param_id, level], and param_id is assigned as follows:
         *
         * 0: Maximum hit points
         * 1: Maximum magic points
         * 2: Attack power
         * 3: Defense power
         * 4: Magic attack power
         * 5: Magic defense power
         * 6: Agility
         * 7: Luck
         */
        params: Array<Array<number>>;

        /**
         * The skills to learn. An array of RPG.Class.Learning.
         */
        learnings: Array<Class.Learning>;

        /**
         * The array of Trait data.
         */
        traits: Array<Trait>;
    }

    namespace Class {
        /**
         * The data class for a class's [Skills to Learn].
         */
        export interface Learning extends MetaData {
            /**
             * The data class for a class's [Skills to Learn].
             */
            level: number;

            /**
             * The ID of the skill to learn.
             */
            skillId: number;
        }
    }

    /**
     * A superclass of actor, class, skill, item, weapon, armor, enemy, and state.
     *
     * Some items are unnecessary depending on the type of data, but they are included for convenience sake.
     */
    export interface BaseItem extends MetaData {
        /**
         * The item ID.
         */
        id: number;

        /**
         * The item name.
         */
        name: string;

        /**
         * The icon number.
         */
        iconIndex: number;

        /**
         * The description text.
         */
        description: string;
    }
    /**
     * The Superclass of Skill and Item.
     */

    export interface UsableItem extends BaseItem {
        /**
         * The scope of effects.
         *
         * 0: None
         * 1: One Enemy
         * 2: All Enemies
         * 3: One Random Enemy
         * 4: Two Random Enemies
         * 5: Three Random Enemies
         * 6: Four Random Enemies
         * 7: One Ally
         * 8: All Allies
         * 9: One Ally (Dead)
         * 10: All Allies (Dead)
         * 11: The User
         */
        scope: number;

        /**
         * When the item/skill may be used.
         *
         * 0: Always
         * 1: Only in battle
         * 2: Only from the menu
         * 3: Never
         */
        occasion: number;

        /**
         * The speed correction.
         */
        speed: number;

        /**
         * The success rate.
         */
        successRate: number;

        /**
         * The number of repeats.
         */
        repeats: number;

        /**
         * The number of TP gained.
         */
        tpGain: number;

        /**
         * The type of hit.
         *
         * 0: Certain hit
         * 1: Physical attack
         * 2: Magical attack
         */
        hitType: number;

        /**
         * The animation ID.
         */
        animationId: number;

        /**
         * Damage (RPG.Damage).
         */
        damage: Damage;

        /**
         * A list of use effects. An RPG.Effect array.
         */
        effects: Array<Effect>;
    }
    /**
     * The data class for skills.
     */

    export interface Skill extends UsableItem {
        /**
         * Skill type ID.
         */
        stypeId: number;

        /**
         * Number of MP consumed.
         */
        mpCost: number;

        /**
         * Number of TP consumed
         */
        tpCost: number;

        /**
         * The use message.
         */
        message1: string;

        /**
         * The use message.
         */
        message2: string;

        /**
         * Weapon type required.
         */
        requiredWtypeId1: number;

        /**
         * Weapon type required.
         */
        requiredWtypeId2: number;
    }
    /**
     * The data class for items.
     */
    export interface Item extends UsableItem {
        /**
         * The item type ID.
         *
         * 1: Regular item
         * 2: Key item
         */
        itypeId: number;

        /**
         * The item's price.
         */
        price: number;

        /**
         * The truth value indicating whether the item disappears when used.
         */
        consumable: boolean;
    }

    /**
     * A superclass of weapons and armor.
     */
    export interface EquipItem extends BaseItem {
        /**
         * The price of the weapon or armor.
         */
        price: number;

        /**
         * The type of weapon or armor.
         *
         * 0: Weapon
         * 1: Shield
         * 2: Head
         * 3: Body
         * 4: Accessory
         */
        etypeId: number;

        /**
         * The amount of parameter change. An array of integers using the following IDs as subscripts:
         *
         * 0: Maximum hit points
         * 1: Maximum magic points
         * 2: Attack power
         * 3: Defense power
         * 4: Magic attack power
         * 5: Magic defense power
         * 6: Agility
         * 7: Luck
         */
        params: Array<number>;

        /**
         * The array of Trait data.
         */
        traits: Array<Trait>;
    }

    /**
     * The data class for weapons.
     */
    export interface Weapon extends EquipItem {
        /**
         * The weapon type ID.
         */
        wtypeId: number;

        /**
         * The animation ID when using the weapon.
         */
        animationId: number;
    }

    /**
     * The data class for armor.
     */
    export interface Armor extends EquipItem {
        /**
         * The armor type ID.
         */
        atypeId: number;
    }

    /**
     * The data class for enemies.
     */
    export interface Enemy extends MetaData {
        /**
         * The file name of the enemy's battler graphic.
         */
        battlerName: string;

        /**
         * The adjustment value for the battler graphic's hue (0..360).
         */
        battlerHue: number;

        /**
         * Parameters. An array of integers using the following IDs as subscripts:
         *
         * 0: Maximum hit points
         * 1: Maximum magic points
         * 2: Attack power
         * 3: Defense power
         * 4: Magic attack power
         * 5: Magic defense power
         * 6: Agility
         * 7: Luck
         */
        params: Array<number>;

        /**
         * The enemy's experience.
         */
        exp: number;

        /**
         * The enemy's gold.
         */
        gold: number;

        /**
         * The items the enemy drops. An RPG.Enemy.DropItem array.
         */
        dropItems: Array<Enemy.DropItem>;

        /**
         * The enemy's action pattern. An array of RPG.Enemy.Action.
         */
        actions: Array<Enemy.Action>;
    }

    namespace Enemy {
        /**
         * The data class for enemy [Drop Items].
         */
        export interface DropItem {
            /**
             * The type of dropped item.
             *
             * 0: None
             * 1: Item
             * 2: Weapon
             * 3: Armor
             */
            kind: number;

            /**
             * The ID of the data depending on the type of dropped item (item, weapon, or armor).
             */
            dataId: number;

            /**
             * N of the probability that the item will be dropped, 1/N.
             */
            denominator: number;
        }

        /**
         * The data class for enemy [Actions].
         */
        export interface Action {
            /**
             * The ID of skills to be employed as actions.
             */
            skillId: number;

            /**
             * The type of condition.
             *
             * 0: Always
             * 1: Turn No.
             * 2: HP
             * 3: MP
             * 4: State
             * 5: Party Level
             * 6: Switch
             */
            conditionType: number;

            /**
             * The first parameter of the condition.
             */
            conditionParam1: number;

            /**
             * The second parameter of the condition.
             */
            conditionParam2: number;

            /**
             * The action's priority rating (1..10).
             */
            rating: number;
        }
    }

    /**
     * The data class for state.
     */
    export interface State extends MetaData {
        /**
         * The ID.
         */
        id: number;

        /**
         * The name.
         */
        name: string;

        /**
         * Action restrictions.
         *
         * 0: None
         * 1: Attack enemy
         * 2: Attack enemy or ally
         * 3: Attack ally
         * 4: Cannot act
         */
        restriction: number;

        /**
         * The state priority (0..100).
         */
        priority: number;

        /**
         * Removes state at end of battle (true/false).
         */
        removeAtBattleEnd: boolean;

        /**
         * Removes state by action restriction (true/false).
         */
        removeByRestriction: boolean;

        /**
         * The timing of automatic state removal.
         *
         * 0: None
         * 1: At end of action
         * 2: At end of turn
         */
        autoRemovalTiming: number;

        /**
         * The minimum turns of the duration.
         */
        minTurns: number;

        /**
         * The maximum turns of the duration.
         */
        maxTurns: number;

        /**
         * Removes state by damage (true/false).
         */
        removeByDamage: boolean;

        /**
         * Chance of state being removed by damage (%).
         */
        chanceByDamage: number;

        /**
         * Removes state by walking (true/false).
         */
        removeByWalking: boolean;

        /**
         * Number of steps until state is removed.
         */
        stepToRemove: number;

        /**
         * The icon number.
         */
        iconIndex: number;

        /**
         * The message when an actor fell in the state.
         */
        message1: string;

        /**
         * The message when an enemy fell in the state.
         */
        message2: string;

        /**
         * The message when the state remains.
         */
        message3: string;

        /**
         * The message when the state is removed.
         */
        message4: string;

        /**
         * The side-view motion.
         */
        motion: number;

        /**
         * The side-view overlay.
         */
        overlay: number;

        /**
         * The array of Trait data.
         */
        traits: Array<Trait>;
        releaseByDamage?: boolean;
        description?: string;
    }

    export interface Trait {
        /**
         * The trait code.
         */
        code: number;

        /**
         * The ID of the data (such as elements or states) according to the type of the trait.
         */
        dataId: number;

        /**
         * The value set according to the type of the trait.
         */
        value: number;

        /**
         * The map tree expansion flag, which is used internally.
         */
        expanded: boolean;

        /**
         * The x-axis scroll position, which is used internally.
         */
        scrollX: number;

        /**
         * The y-axis scroll position, which is used internally.
         */
        scrollY: number;
    }

    /**
     * The data class for damage.
     */
    export interface Damage {
        /**
         * The type of damage.
         *
         * 0: None
         * 1: HP damage
         * 2: MP damage
         * 3: HP recovery
         * 4: MP recovery
         * 5: HP drain
         * 6: MP drain
         */
        type: number;

        /**
         * The element ID.
         */
        elementId: number;

        /**
         * The formula.
         */
        formula: string;

        /**
         * The degree of variability.
         */
        variance: number;

        /**
         * Critical hit (true/false).
         */
        critical: boolean;
    }

    /**
     * The data class for use effects.
     */
    export interface Effect {
        /**
         * The use effect code.
         */
        code: number;

        /**
         * The ID of data (state, parameter, and so on) according to the type of use effect.
         */
        dataId: number;

        /**
         * Value 1 set according to the type of use effect.
         */
        value1: number;

        /**
         * Value 2 set according to the type of use effect.
         */
        value2: number;
    }

    /**
     * The data class for enemy troops.
     */
    export interface Troop {
        /**
         * The troop ID.
         */
        id: number;

        /**
         * The troop name.
         */
        name: string;

        /**
         * The troop members. An RPG.Troop.Member array.
         */
        members: Array<RPG.Troop.Member>;

        /**
         * The battle events. An RPG.Troop.Page array.
         */
        pages: Array<RPG.Troop.Page>;
    }

    namespace Troop {
        /**
         * The data class for enemy troop members.
         */
        export interface Member {
            /**
             * The enemy ID.
             */
            enemyId: number;

            /**
             * The troop member's x-coordinate.
             */
            x: number;

            /**
             * The troop member's y-coordinate.
             */
            y: number;

            /**
             * The truth value of the [Appear Halfway] option.
             */
            hidden: boolean;
        }

        /**
         * The data class for battle events (pages).
         */
        export interface Page {
            /**
             * Condition (RPG.Troop.Page.Condition).
             */
            condition: Page.Condition;

            /**
             * Span (0: battle, 1: turn, 2: moment).
             */
            span: number;

            /**
             * Program contents. An RPG.EventCommand array.
             */
            list: Array<EventCommand>;
        }

        namespace Page {
            /**
             * The data class of battle event [Conditions].
             */
            export interface Condition {
                /**
                 * The truth value indicating whether the [At End of Turn] condition is valid.
                 */
                turnEnding: boolean;

                /**
                 * The truth value indicating whether the [Turn No.] condition is valid.
                 */
                turnValid: boolean;

                /**
                 * The truth value indicating whether the [Enemy] condition is valid.
                 */
                enemyValid: boolean;

                /**
                 * The truth value indicating whether the [Actor] condition is valid.
                 */
                actorValid: boolean;

                /**
                 * The truth value indicating whether the [Switch] condition is valid.
                 */
                switchValid: boolean;

                /**
                 * The a and b values specified in the [Turn No.] condition. To be input in the form A + B * X.
                 */
                turnA: number;

                /**
                 * The a and b values specified in the [Turn No.] condition. To be input in the form A + B * X.
                 */
                turnB: number;

                /**
                 * The troop member index specified in the [Enemy] condition (0..7).
                 */
                enemyIndex: number;

                /**
                 * The HP percentage specified in the [Enemy] condition.
                 */
                enemyHp: number;

                /**
                 * The actor ID specified in the [Actor] condition.
                 */
                actorId: number;

                /**
                 * The HP percentage specified in the [Actor] condition.
                 */
                actorHp: number;

                /**
                 * The switch ID specified in the [Switch] condition.
                 */
                switchId: number;
            }
        }
    }

    /**
     * The data class for animation.
     */
    export interface Animation {
        /**
         * The animation ID.
         */
        id: number;

        /**
         * The animation name.
         */
        name: string;

        /**
         * The file name of the first animation's graphic.
         */
        animation1Name: string;

        /**
         * The adjustment value for the hue of the first animation's graphic (0..360).
         */
        animation1Hue: number;

        /**
         * The file name of the second animation's graphic.
         */
        animation2Name: string;

        /**
         * The adjustment value for the hue of the second animation's graphic (0..360).
         */
        animation2Hue: number;

        /**
         * The base position (0: head, 1: center, 2: feet, 3: screen).
         */
        position: number;

        /**
         * Number of frames.
         */
        frameMax: number;

        /**
         * The three-dimensional array containing the frame contents.
         */
        frames: Array<Array<Array<number>>>;

        /**
         * Timing for SE and flash effects. An RPG.Animation.Timing array.
         */
        timings: Array<Animation.Timing>;
    }

    namespace Animation {
        /**
         * The data class for the timing of an animation's SE and flash effects.
         */
        export interface Timing {
            /**
             * The frame number. 1 less than the number displayed in RPG Maker.
             */
            frame: number;

            /**
             * The sound effect or SE (RPG.AudioFile).
             */
            se: AudioFile;

            /**
             * The flash area (0: none, 1: target, 2: screen; 3: hide target).
             */
            flashScope: number;

            /**
             * The color of the flash (Color).
             */
            flashColor: Array<number>;

            /**
             * The duration of the flash.
             */
            flashDuration: number;
        }
    }

    /**
     * The data class for tile sets.
     */
    export interface Tileset extends MetaData {
        /**
         * The ID of the tile set.
         */
        id: number;

        /**
         * The name of the tile set.
         */
        name: string;

        /**
         * The mode of the tile set (0: Field type, 1: Area type, 2: VX compatible type).
         */
        mode: number;

        /**
         * The file name of the graphic used as the number index (0-8) tile set.
         *
         * The correspondence between numbers and sets is illustrated in the table below.
         *
         * 0 TileA1
         * 1 TileA2
         * 2 TileA3
         * 3 TileA4
         * 4 TileA5
         * 5 TileB
         * 6 TileC
         * 7 TileD
         * 8 TileE
         */
        tilesetNames: Array<string>;

        /**
         * The flags table. A 1-dimensional array containing a variety of flags (Table).
         *
         * Uses tile IDs as subscripts. The correspondence of each bit is as shown below:
         *
         * 0x0001: Impassable downward
         * 0x0002: Impassable leftward
         * 0x0004: Impassable rightward
         * 0x0008: Impassable upward
         * 0x0010: Display on normal character
         * 0x0020: Ladder
         * 0x0040: Bush
         * 0x0080: Counter
         * 0x0100: Damage floor
         * 0x0200: Impassable by boat
         * 0x0400: Impassable by ship
         * 0x0800: Airship cannot land
         * 0xF000: Terrain tag
         * This manual does not discuss bit operations, but they are similar to those in C.
         * We recommend an Internet search using keywords such as "hexadecimal bit operations" when necessary.
         */
        flags: Array<number>;
    }

    /**
     * The data class for common events.
     */
    export interface CommonEvent {
        /**
         * The event ID.
         */
        id: number;

        /**
         * The event name.
         */
        name: string;

        /**
         * The event trigger (0: none, 1: autorun; 2: parallel).
         */
        trigger: number;

        /**
         * The condition switch ID.
         */
        switchId: number;

        /**
         * A list of event commands. An RPG.EventCommand array.
         */
        list: Array<EventCommand>;
    }

    export interface System {
        /**
         * The game title.
         */
        gameTitle: string;

        /**
         * A random number used for update checks. The number changes every time data is saved in RPG Maker.
         */
        versionId: number;

        /**
         * The locale string such as "ja_JP" and "en_US".
         */
        locale: string;

        /**
         * The initial party. An array of actor IDs.
         */
        partyMembers: Array<number>;

        /**
         * The unit of currency.
         */
        currencyUnit: string;

        /**
         * The window color.
         */
        windowTone: Array<number>;

        /**
         * The array of System.AttackMotion data.
         */
        attackMotions: Array<System.AttackMotion>;

        /**
         * A list of elements. A string array using element IDs as subscripts, with the element in the 0 position being nil.
         */
        elements: Array<string>;

        /**
         * he equipment type. A string array with the following subscripts:
         * 1: Weapon
         * 2: Shield
         * 3: Head
         * 4: Body
         * 5: Accessory
         */
        equipTypes: Array<string>;

        /**
         * A list of skill types. A string array using skill type IDs as subscripts, with the element in the 0 position being nil.
         */
        skillTypes: Array<string>;

        /**
         * A list of weapon types. A string array using weapon type IDs as subscripts, with the element in the 0 position being nil.
         */
        weaponTypes: Array<string>;

        /**
         * A list of armor types. A string array using armor type IDs as subscripts, with the element in the 0 position being nil.
         */
        armorTypes: Array<string>;

        /**
         * A switch name list. A string array using switch IDs as subscripts, with the element in the 0 position being nil.
         */
        switches: Array<string>;

        /**
         * A variable name list. A string array using variable IDs as subscripts, with the element in the 0 position being nil.
         */
        variables: Array<string>;

        /**
         * Boat settings (RPG.System.Vehicle).
         */
        boat: System.Vehicle;

        /**
         * Ship settings (RPG.System.Vehicle).
         */
        ship: System.Vehicle;

        /**
         * Airship settings (RPG.System.Vehicle).
         */
        airship: System.Vehicle;

        /**
         * The file name of the title (background) graphic.
         */
        title1Name: string;

        /**
         * The file name of the title (frame) graphic.
         */
        title2Name: string;

        /**
         * The truth value of the [Draw Game Title] option.
         */
        optDrawTitle: boolean;

        /**
         * The truth value of the [Start Transparent] option.
         */
        optTransparent: boolean;

        /**
         * The truth value of the [Show Player Followers] option.
         */
        optFollowers: boolean;

        /**
         * The truth value of the [K.O. by Slip Damage] option.
         */
        optSlipDeath: boolean;

        /**
         * The truth value of the [K.O. by Floor Damage] option.
         */
        optFloorDeath: boolean;

        /**
         * The truth value of the [Display TP in Battle] option.
         */
        optDisplayTp: boolean;

        /**
         * The truth value of the [Reserve Members' EXP] option.
         */
        optExtraExp: boolean;

        /**
         * The truth value of the [use side-view battle] option.
         */
        optSideView: boolean;

        /**
         * The title BGM (RPG.AudioFile).
         */
        titleBgm: AudioFile;

        /**
         * The battle BGM (RPG.AudioFile).
         */
        battleBgm: AudioFile;

        /**
         * The battle end ME (RPG.AudioFile).
         */
        battleEndMe: AudioFile;

        /**
         * The gameover ME (RPG.AudioFile).
         */
        gameoverMe: AudioFile;

        /**
         * Sound effects. An RPG.SE array.
         */
        sounds: Array<AudioFile>;

        /**
         * The map ID of the player's initial position.
         */
        startMapId: number;

        /**
         * The map's x-coordinate of the player's initial position.
         */
        startX: number;

        /**
         * The map's y-coordinate of the player's initial position.
         */
        startY: number;

        /**
         * Terms (RPG.System.Terms).
         */
        terms: System.Terms;

        /**
         * Party settings for battle tests. An RPG.System.TestBattler array.
         */
        testBattlers: Array<System.TestBattler>;

        /**
         * The enemy troop ID for battle tests.
         */
        testTroopId: number;

        /**
         * The file name of the battle background (floor) graphic for use in editing enemy troops and battle tests.
         */
        battleback1Name: string;

        /**
         * The file name of the battle background (wall) graphic for use in editing enemy troops and battle tests.
         */
        battleback2Name: string;

        /**
         * The battler graphic file name for use in editing animations.
         */
        battlerName: string;

        /**
         * The adjustment value for the battler graphic's hue (0..360) for use in editing animations.
         */
        battlerHue: number;

        /**
         * The ID of the map currently being edited. For internal use.
         */
        editMapId: number;
    }

    namespace System {
        /**
         * The data class for vehicles.
         */
        export interface Vehicle {
            /**
             * The file name of the vehicle's walking graphic.
             */
            characterName: string;
            /**

             * The index of the vehicle's walking graphic (0..7).
             */
            characterIndex: number;

            /**
             * The vehicle's BGM (RPG.AudioFile).
             */
            bgm: AudioFile;

            /**
             * The map ID of the vehicle's initial position.
             */
            startMapId: number;

            /**
             * The map's x-coordinate of the vehicle's initial position.
             */
            startX: number;

            /**
             * The map's y-coordinate of the vehicle's initial position.
             */
            startY: number;
        }

        /**
         * The data class for terminology.
         */
        export interface Terms {
            /**
             * The basic status. A string array with the following subscripts:
             *
             * 0: Level
             * 1: Level (short)
             * 2: HP
             * 3: HP (short)
             * 4: MP
             * 5: MP (short)
             * 6: TP
             * 7: TP (short)
             * 8: EXP
             * 9: EXP (short)
             */
            basic: Array<string>;

            /**
             * Parameters. A string array with the following subscripts:
             *
             * 0: Maximum hit points
             * 1: Maximum magic points
             * 2: Attack power
             * 3: Defense power
             * 4: Magic attack power
             * 5: Magic defense power
             * 6: Agility
             * 7: Luck
             * 8: Hit
             * 9: Evasion
             */
            params: Array<string>;

            /**
             * 0: Fight
             * 1: Escape
             * 2: Attack
             * 3: Defend
             * 4: Item
             * 5: Skill
             * 6: Equip
             * 7: Status
             * 8: Sort
             * 9: Save
             * 10: Exit Game
             * 11: Option
             * 12: Weapon
             * 13: Armor
             * 14: Key Item
             * 15: Change Equipment
             * 16: Ultimate Equipment
             * 17: Remove All
             * 18: New Game
             * 19: Continue
             * 20: (not used)
             * 21: Go to Title
             * 22: Cancel
             * 23: (not used)
             * 24: Buy
             * 25: Sell
             */
            commands: Array<string>;

            /**
             * The messages.
             */
            messages: {[key: string]: string};
        }

        /**
         * The data class for the actors used in battle tests.
         */
        export interface TestBattler {
            /**
             * The actor ID.
             */
            actorId: number;

            /**
             * The actor's level.
             */
            level: number;

            /**
             * The actor's equipment. An array of weapon IDs or armor IDs with the following subscripts:
             *
             * 0: Weapon
             * 1: Shield
             * 2: Head
             * 3: Body
             * 4: Accessory
             */
            equips: Array<number>;
        }

        export interface AttackMotion {
            /**
             * The type of the motion.
             */
            type: number;

            /**
             * The ID of the weapon image.
             */
            weaponImageId: number;
        }
    }

    /**
     * The data class for audio file.
     */
    export interface AudioFile {
        /**
         * The sound file name.
         */
        name: string;

        /**
         * The pan.
         */
        pan: number;

        /**
         * The sound's pitch (50..150). The default value is 100.
         */
        pitch: number;

        /**
         * The sound's volume (0..100). The default values are 100 for BGM and ME and 80 for BGS and SE.
         */
        volume: number;
    }
}
