import { map } from 'rxjs/operators';

import { del$ } from "../services/restApi.ts";
import {ITodoList} from "../types/ITodoList.ts";

const baseUrl = import.meta.env.VITE_API_URL;

export const fetchTodoDelete = (bearerToken: string, id: string) =>
  del$<{ data: ITodoList }>(
    `${baseUrl}/todo/${id}`,
    {},
    {},
    {
      Authorization: `Bearer ${bearerToken}`,
    },
  ).pipe(map((res) => {
      return res;
  }));
