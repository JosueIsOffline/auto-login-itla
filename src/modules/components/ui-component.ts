export abstract class UIComponent {
  id: string;
  root: HTMLElement | null = null;

  constructor(id: string) {
    this.id = id;
  }

  abstract render(): HTMLElement;

  public mount(): void {
    if (!this.root) {
      this.root = this.render();
      this.root.id = this.id;
      document.body.appendChild(this.root);
      this.onMount(this.root);
    }
    // return this.root;
  }

  public update(): void {
    if (!this.root) return;
    const newNode = this.render();
    this.root.replaceWith(newNode);
    this.root = newNode;
    this.onUpdate();
  }

  public unmount(): void {
    if (this.root) {
      this.onUnmount();
      this.root.remove();
      this.root = null;
    }
  }

  protected async onMount(root?: HTMLElement): Promise<void> {}
  protected onUpdate() {}
  protected onUnmount() {}
}
