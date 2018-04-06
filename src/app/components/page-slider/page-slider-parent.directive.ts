import { AfterViewInit, Directive, DoCheck, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageSliderFragmentDirective } from './page-slider-fragment.directive';
import { PageSliderComponent } from './page-slider.component';

interface FragmentMap {
  [key: string]: PageSliderFragmentDirective;
}

@Directive({
  selector: '[appPageSliderParent]'
})
export class PageSliderParentDirective implements OnInit, DoCheck, AfterViewInit {
  @Input('fragment') selectedFragment = '';
  @Output() fragmentChange = new EventEmitter();
  private fragment = '';

  private fragmentMap = {} as FragmentMap;
  private slider: PageSliderComponent = null;
  private scrollTriggered = false;
  private scrollStarted = false;

  constructor(private activatedRoute: ActivatedRoute, private element: ElementRef) {}

  ngOnInit() {
    this.activatedRoute.fragment.subscribe((fragment) => this.select(fragment));
  }

  ngDoCheck() {
    if(this.fragment === this.selectedFragment) {
      return;
    }

    if(this.scrollTriggered && this.scrollStarted) {
      return;
    }

    this.scrollToFragment();
    this.scrollTriggered = true;
  }

  ngAfterViewInit() {
    this.element.nativeElement.addEventListener('scroll', () => {
      const fragment = this.getVisibleFragment();
      this.changeFragment(fragment);

      this.scrollStarted = this.scrollTriggered;
    });
  }

  registerFragment(fragmentName: string, fragment: PageSliderFragmentDirective) {
    this.fragmentMap[fragmentName] = fragment;
  }

  registerSlider(slider: PageSliderComponent) {
    this.slider = slider;
  }

  select(fragment) {
    this.selectedFragment = fragment;
  }

  scrollToFragment(fragment = this.selectedFragment) {
    const fragmentInstance = this.fragmentMap[fragment];
    if(!fragmentInstance) {
      return;
    }

    fragmentInstance.scrollToView();

  }

  private changeFragment(fragment) {
    if(fragment === this.selectedFragment) {
      this.scrollTriggered = false;
      this.scrollStarted = false;
    }

    if(fragment === this.fragment) {
      return;
    }

    this.fragment = fragment;
    this.fragmentChange.emit(fragment);
    this.slider.select(fragment);
  }

  private getVisibleFragment() {
    const {offsetTop, scrollTop} = this.element.nativeElement;
    const {fragmentMap} = this;

    return Object.keys(fragmentMap).find((fr) => {
      const fragment = fragmentMap[fr];
      return fragment.isSelected(offsetTop + scrollTop);
    });
  }
}
