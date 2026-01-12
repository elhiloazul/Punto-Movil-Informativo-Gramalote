import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4
}

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private readonly level: LogLevel;

  constructor() {
    this.level = LogLevel[environment.logLevel];
  }

  debug(message: string, data?: unknown): void {
    if (this.level <= LogLevel.DEBUG) {
      console.debug('[DEBUG]', message, data ?? '');
    }
  }

  info(message: string, data?: unknown): void {
    if (this.level <= LogLevel.INFO) {
      console.info('[INFO]', message, data ?? '');
    }
  }

  warn(message: string, data?: unknown): void {
    if (this.level <= LogLevel.WARN) {
      console.warn('[WARN]', message, data ?? '');
    }
  }

  error(message: string, error?: unknown): void {
    if (this.level <= LogLevel.ERROR) {
      console.error('[ERROR]', message, error ?? '');
    }
  }
}
