import { StateEvents, StateManager } from '../../state';
declare const Complete: 'Complete';
export declare const ItemStreamEvent: {
    Complete: "Complete";
    Error: "error";
    StateChanged: "stateChanged";
};
export interface ItemStreamEvents extends StateEvents {
    [Complete]: (stream: ItemStream) => void;
}
export interface ItemStream extends StateManager<ItemStreamEvents> {
}
export {};
