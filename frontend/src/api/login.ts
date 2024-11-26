import { map } from 'rxjs/operators';

import { post$ } from '../services/restApi';
import {ILogin} from "../types/ILogin.ts";
import {ILoginFormInput} from "../components/LoginForm.tsx";

const baseUrl = import.meta.env.VITE_API_URL;

export const fetchLogin = (data: ILoginFormInput) =>
  post$<{ data: ILogin }>(`${baseUrl}/login`, data).pipe(
    map((res) => {
        console.log(res);
      return res;
    }),
  );
