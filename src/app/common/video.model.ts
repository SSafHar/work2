export interface Video {
  uri: string;
  name: string;
  duration: number;
  pictures: Picture;
}

export interface Picture {
  active: boolean;
  resource_key: string;
  sizes: Size[];
  type: string;
  uri: string;
}

export interface Size {
  height: number;
  link: string;
  link_with_play_button: string;
  width: number;
}

export interface Duration {
  mins: string;
  secs: string;
}

