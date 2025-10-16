import { Plugin } from "./plugin";

export class Core {
  private plugins: Plugin[] = [];

  register(plugins: Plugin[]): void {
    this.plugins = plugins;
  }

  async init(): Promise<void> {
    for (const plugin of this.plugins) {
      try {
        if (plugin.shouldRun()) {
          console.log(`[Core] Running plugin: ${plugin.name}`);
          await plugin.init();
        }
      } catch (error) {
        console.error(`[Core] Error in plugin ${plugin.name}:`, error);
      }
    }
  }
}
