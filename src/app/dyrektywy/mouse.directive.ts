import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMouse]'
})
export class MouseDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.enlargeElement();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.resetElementSize();
  }

  private enlargeElement() {
    // Pobierz element HTML
    const element = this.el.nativeElement;

    // Powiększ element (np. podwójna szerokość i wysokość)
    this.renderer.setStyle(element, 'width', '50%');
    this.renderer.setStyle(element, 'height', '50%');
    this.renderer.setStyle(element, 'border', 'solid red 3px');
  }

  private resetElementSize() {
    // Pobierz element HTML
    const element = this.el.nativeElement;

    // Przywróć oryginalny rozmiar elementu
    this.renderer.setStyle(element, 'width', 'initial');
    this.renderer.setStyle(element, 'height', 'initial');
    this.renderer.setStyle(element, 'border', '2px solid white');
  }
}
