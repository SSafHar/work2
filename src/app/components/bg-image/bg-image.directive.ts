import { AfterViewChecked, Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

type DeepString = string | string[];
type VeryDeepString = string | DeepString[];

const imgToUrl = (img: string) => `url(${img})`;
const buildImage = (urls: string, linearGradients: string, radialGradients: string) => {
  const res = [];
  if(urls) {
    res.push(urls);
  }

  if(linearGradients) {
    res.push(linearGradients);
  }

  if(radialGradients) {
    res.push(radialGradients);
  }

  return res.join(', ');
};
const buildGradientArgs = (value: string | DeepString[]) => {
  return Array.isArray(value) ? value.map(x => Array.isArray(x) ? x.join(' ') : x).join(', ') : value;
};
const buildGradients = (type: string, g: string | DeepString[], gs?: VeryDeepString[]) => {
  const gradients = [];

  if(g) {
    gradients.push(buildGradientArgs(g));
  }

  if(gs) {
    gradients.push(...gs.map(buildGradientArgs));
  }

  return gradients.map(x => `${type}(${x})`).join(', ');
};

@Directive({
  selector: '[appBgImage]'
})
export class BgImageDirective implements OnChanges, AfterViewChecked {
  @Input() urls: string | string[];
  @Input() linearGradient: string | DeepString[];
  @Input() linearGradients: VeryDeepString[];
  @Input() radialGradient: string | DeepString[];
  @Input() radialGradients: VeryDeepString[];

  private image: string;
  private anyChanges = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes) {
    const anyChanges = changes.urls || changes.linearGradient ||
      changes.linearGradients || changes.radialGradient || changes.radialGradients;

    this.anyChanges = anyChanges;

    if(!anyChanges) {
      return;
    }

    const urls = this.buildUrls();
    const linearGradients = this.buildLinearGradients();
    const radialGradients = this.buildRadialGradients();

    this.image = buildImage(urls, linearGradients, radialGradients);
  }

  buildUrls() {
    const {urls} = this;

    if(!urls) {
      return;
    }

    return Array.isArray(urls) ? urls.map(imgToUrl).join() : imgToUrl(urls);
  }

  buildLinearGradients() {
    return buildGradients('linear-gradient', this.linearGradient, this.linearGradients);
  }

  buildRadialGradients() {
    return buildGradients('radial-gradient', this.radialGradient, this.radialGradients);
  }

  ngAfterViewChecked() {
    if(!this.anyChanges) {
      return;
    }

    this.renderer.setStyle(this.el.nativeElement, 'background-image', this.image);
    this.renderer.setStyle(this.el.nativeElement, 'background-size', 'cover');
    this.renderer.setStyle(this.el.nativeElement, 'background-repeat', 'no-repeat');
    this.renderer.setStyle(this.el.nativeElement, 'background-position', 'center');
    this.renderer.setStyle(this.el.nativeElement, 'background-blend-mode', 'multiply');
  }
}
