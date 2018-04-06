import { HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';

export const createParams = (params: Params) => {
  return Object.keys(params).reduce((res, key) => {
    return res.append(key, params[key]);
  }, new HttpParams());
};

export const getRandomHexColor = () => {
  return '#' + Math.random().toString(16).slice(-6);
};
