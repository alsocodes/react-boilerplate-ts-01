export const AUTH_KEY = 'AUTH_KEY';
export const APP_CONFIG_KEY = 'APP_CONFIG_KEY';
export const APP_LIST_CABANG = 'APP_LIST_CABANG';
export const APP_CABANG_SELECTED = 'APP_CABANG_SELECTED';

export type FormResult = {
  statusCode: number;
  message: string;
  result?: any | any[] | null;
};

export interface IGetParam {
  page?: number;
  size?: number;
  search?: string;
  orderBy?: string;
  order?: string;
}
