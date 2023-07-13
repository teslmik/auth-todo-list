import { APP_KEYS } from '../modules/common/consts';

export const logout = () => {
  localStorage.removeItem(APP_KEYS.STORAGE_KEYS.TOKEN);
  window.location.href = APP_KEYS.ROUTER_KEYS.AUTH;
};
