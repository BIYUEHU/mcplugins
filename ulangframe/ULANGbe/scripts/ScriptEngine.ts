// 1.16
interface Position {
    x: number,
    y: number,
    z: number
}

interface BlockJSAPIObject {
    __identifier__: string,
    __type__: string,
    block_position: Position,
    ticking_area: object
}

interface ComponentJSAPIObject {
    __type__: string,
    data: object
}

interface EntityJSAPIObject {
    __identifier__: string,
    __type__: string,
    id: number
}

interface EntityTickingAreaJSAPIObject {
    __type__: string,
    entity_ticking_area_id: number
}

interface ItemStackJSAPIObject {
    __identifier__: string,
    __type__: string,
    count: string,
    item: string
}

interface LevelJSAPIObject {
    __type__: string,
    level_id: number
}

interface LevelTickingAreaJSAPIObject {
    __type__: string,
    level_ticking_area_id: string
}

interface QueryJSAPIObject {
    __type__: string,
    query_id: number
}

/**
 * 滴答区域对象有两种类型。 实体和级别。 当一个函数需要一个滴答区域时，它可以使用任一类型作为参数。
 */
type TickingAreaJSAPIObject = any;

declare namespace client {
    function registerSystem(majorVersion:number, minorVersion:number): System;
}

declare namespace server {
    function registerSystem(majorVersion:number, minorVersion:number): System;
}

declare class System {
    //Block
    getBlock(TickingArea:TickingAreaJSAPIObject, PositionObject: Position): BlockJSAPIObject;
    getBlock(TickingArea:TickingAreaJSAPIObject, x:number, y:number, z:number): any;
    getBlocks(TickingArea: TickingAreaJSAPIObject, MinimumPositionObject:Position, MaximumPositionObject:Position): Array<any>;
    getBlocks(TickingArea:TickingAreaJSAPIObject, xMin:number, yMin:number, zMin:number, xMax:number, yMax:number, zMax:number): any;
    //ComponentChanges
    /**
    * ```js
    *   let globals = {
    *     pig: null
    *   };
    *
    *   const mySystem = server.registerSystem(0, 0);
    *
    *   mySystem.update = function() {
    *    if(globals.pig == null) {
    *      globals.pig = this.createEntity("entity", "minecraft:pig");
    *    }
    *    else {
    *      let positionComponent = this.getComponent(globals.pig, "minecraft:position");
    *      positionComponent.data.y += 0.1;
    *      this.applyComponentChanges(globals.pig, positionComponent);
    *    }
    *  }; 
    * ```
    */
    applyComponentChanges(EntityObject:EntityJSAPIObject, ComponentObject:ComponentJSAPIObject): boolean;
    createComponent(EntityObject:EntityJSAPIObject, ComponentIdentifier:ComponentJSAPIObject): ComponentJSAPIObject;
    destroyComponent(EntityObject:EntityJSAPIObject, ComponentIdentifier:string): boolean;
    getComponent(EntityObject:EntityJSAPIObject, ComponentIdentifier:string): ComponentJSAPIObject;
    hasComponent(EntityObject:EntityJSAPIObject, ComponentIdentifier:string):boolean;
    registerComponent(ComponentIdentifier:object, ComponentData:string): boolean;
    //Entity
    createEntity():EntityJSAPIObject;
    createEntity(Type:string, TemplateIdentifier:string):EntityJSAPIObject;
    destroyEntity(EntityObject:EntityJSAPIObject):boolean;
    isValidEntity(EntityObject:EntityJSAPIObject):boolean;
    //Entity Queries
    addFilterToQuery(Query:QueryJSAPIObject, ComponentIdentifier:string);
    getEntitiesFromQuery(Query:QueryJSAPIObject): Array<EntityJSAPIObject>;
    getEntitiesFromQuery(Query:QueryJSAPIObject, ComponentField1_Min:number, ComponentField2_Min:number, ComponentField3_Min:number, ComponentField1_Max:number, ComponentField2_Max:number, ComponentField3_Max:number): Array<EntityJSAPIObject>;
    registerQuery(): QueryJSAPIObject;
    registerQuery(Component:string, ComponentField1:string, ComponentField2:string, ComponentField3:string):QueryJSAPIObject;
    //Event
    broadcastEvent(EventIdentifier:string, EventData:object): boolean;
    createEventData(EventIdentifier:string): object;
    listenForEvent(EventIdentifier:string, CallbackObject:object): boolean;
    registerEventData(EventIdentifier:string, EventData:object): boolean;
    //Logging
    log(Message:string):void;
    //Slash Commands
    executeCommand(Command:string, Callback:object): void;
}
