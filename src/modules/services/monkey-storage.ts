export class MonkeyStorage {
  async set<T>(key: string, value: T): Promise<void> {
    const serialized = JSON.stringify(value);
    await GM.setValue(key, serialized);
  }

  async get<T>(key: string, defaultValue?: T): Promise<T | null> {
    const serialized = await GM.getValue(key, null);

    if (serialized === null) {
      return defaultValue ?? null;
    }

    try {
      return JSON.parse(serialized) as T;
    } catch (e) {
      console.error(`Error parsing key "${key}":`, e);
      return defaultValue ?? null;
    }
  }

  async remove(key: string): Promise<void> {
    await GM.deleteValue(key);
  }

  async has(key: string): Promise<boolean> {
    return await GM.listValues().then((values) => values.includes(key));
  }

  async clear(): Promise<void> {
    await GM.listValues().then((values) =>
      values.forEach((value) => this.remove(value)),
    );
  }

  async keys(): Promise<string[]> {
    return await GM.listValues();
  }
}
