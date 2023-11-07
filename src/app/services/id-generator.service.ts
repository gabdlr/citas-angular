import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdGeneratorService {
  constructor() {}

  uuid() {
    return (
      Math.random().toString(36).substring(2) +
      Date.now().toString(36).substring(2)
    );
  }
}
