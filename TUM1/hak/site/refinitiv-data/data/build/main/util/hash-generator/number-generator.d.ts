import { HashGenerator } from './abstract-hash-generator';
export declare class NumberGenerator implements HashGenerator<number> {
    generate(): number;
}
