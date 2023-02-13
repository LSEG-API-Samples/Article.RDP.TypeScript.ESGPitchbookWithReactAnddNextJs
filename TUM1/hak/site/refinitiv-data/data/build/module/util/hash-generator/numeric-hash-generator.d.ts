import { AbstractHashGenerator, HashGenerator } from './abstract-hash-generator';
export declare class NumericHashGenerator extends AbstractHashGenerator<number> {
    protected factoryMethod(): HashGenerator<number>;
}
