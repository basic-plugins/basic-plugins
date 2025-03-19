export type HookKey = any;
export type HookCallback = (...rest: any[]) => void

export class EventHook<K = HookKey, F = HookCallback> {
    private map = new Map<K, Set<F>>();

    public on(key: K, cb: F, override = false): void {
        const s = this.map.get(key);
        if (!s) {
            this.map.set(key, new Set([cb]));
            return
        }
        if (override) {
            s.clear();
        }
        s.add(cb);
    }

    public off(key: K, cb: F): void {
        const s = this.map.get(key);
        if (!s) {
            return
        }
        s.delete(cb);
    }

    public trigger(key: K, ...rest: any[]): void {
        const s = this.map.get(key);
        if (!s) {
            return
        }
        for (const cb of s) {
            try {
                if (typeof cb === 'function') {
                    cb(...rest)
                }
            } catch (e) {
                console.warn(`trigger event hook ${key} failed:`, e);
            }
        }
    }

    public destroy(): void {
        this.map.clear();
    }
}
