import { map } from 'rxjs/operators';
import {get$} from "../services/restApi.ts";
import {IHealthCheck} from "../types/IHealthCheck.ts";


const baseUrl = import.meta.env.VITE_API_URL;

export const fetchHealthCheck = () =>
  get$<{ data: IHealthCheck }>(`${baseUrl}/health`).pipe(
    map((res) => {
        console.log(5555)
      return res;
    }),
  );
