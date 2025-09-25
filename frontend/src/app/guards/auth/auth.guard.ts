import { CanActivateFn, Router } from '@angular/router';

export const appGuard: CanActivateFn = (route, state) => {
  const router: Router = new Router();
  const authUser = !!localStorage.getItem('user-auth');
  if (authUser) {
    return true;
  } else {
    router.navigateByUrl('/auth');
    return false;
  }
};

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = new Router();
  const authUser = !!localStorage.getItem('user-auth');
  if (!authUser) {
    return true;
  } else {
    router.navigateByUrl('/app');
    return false;
  }
};
