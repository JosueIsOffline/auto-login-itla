export interface Plugin {
  name: string;
  shouldRun(): boolean;
  init(): Promise<void> | void;
}
