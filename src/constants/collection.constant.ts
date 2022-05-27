export class Collection<K, V> extends Map<K, V> {
    find(fn: (value: V, key: K, collection: this) => boolean): V | undefined {
        for (const [key, val] of this) {
            if (fn(val, key, this)) return val
        }
        return undefined
    }
}
