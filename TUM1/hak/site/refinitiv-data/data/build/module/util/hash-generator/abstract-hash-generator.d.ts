export interface HashGenerator<T> {
    generate(): T;
}
export declare abstract class AbstractHashGenerator<T> {
    protected abstract factoryMethod(): HashGenerator<T>;
    generateHash(): T;
}
