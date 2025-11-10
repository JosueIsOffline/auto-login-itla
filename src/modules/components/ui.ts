import { UIComponent } from "./ui-component";

export class UI {
  private static instances: Map<string, UIComponent> = new Map();

  static render(component: UIComponent): void {
    const existing = this.instances.get(component.id);
    if (!existing) {
      component.mount();
      this.instances.set(component.id, component);
    } else {
      existing.update();
    }
  }

  static unmount(id: string): void {
    const comp = this.instances.get(id);
    if (comp) {
      comp.unmount();
      this.instances.delete(id);
    }
  }

  static toggle(component: UIComponent) {
    const existing = this.instances.get(component.id);
    if (existing) {
      this.unmount(component.id);
    } else {
      this.render(component);
    }
  }
}
