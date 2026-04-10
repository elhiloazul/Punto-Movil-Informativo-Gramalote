import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith(environment.apiUrl)) {
    return next(req);
  }

  const cloned = req.clone({
    setHeaders: { 'x-api-key': environment.apiKey },
  });

  return next(cloned);
};
