import { map } from 'rxjs/operators';

import { post$ } from '../services/restApi';
import { ISignup } from '../types/ISignup';
import {IFormInput} from "../components/RegisterForm.tsx";

const baseUrl = import.meta.env.VITE_API_URL;

export const fetchSignup = (data: IFormInput) =>
  post$<{ data: ISignup }>(`${baseUrl}/register`, data).pipe(
    map((res) => {
        console.log(res);
      return res;
    }),
  );
