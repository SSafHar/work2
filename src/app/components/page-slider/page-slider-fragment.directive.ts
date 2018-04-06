import { Directive, ElementRef, Host, Input, OnInit } from '@angular/core';
import { PageSliderParentDirective } from './page-slider-parent.directive';

const isElementVisible = (element, visibleTop) => {
  const {offsetTop, offsetHeight} = element;

  return offsetTop <= visibleTop && visibleTop < offsetTop + offsetHeight;
};

@Directive({
  selector: '[appPageSliderFragment]'
})
export class PageSliderFragmentDirective implements OnInit {
  @Input('appPageSliderFragment') fragment: string;

  constructor(@Host() private parent: PageSliderParentDirective,
              private element: ElementRef) {
  }

  ngOnInit() {
    this.parent.registerFragment(this.fragment, this);
  }

  // todo: notify parent about changes

  isSelected(visibleTop: number) {
    return isElementVisible(this.element.nativeElement, visibleTop);
  }

  scrollToView() {
    this.element.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start'});
  }
}
