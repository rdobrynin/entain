import { map } from 'rxjs/operators';
import {getBearer$} from "../services/restApi.ts";
import {ITodoList} from "../types/ITodoList.ts";


const baseUrl = import.meta.env.VITE_API_URL;

export const fetchTodoList = (bearerToken: string) =>
    getBearer$<{ data: ITodoList }>(
        `${baseUrl}/todo`,
        {},
        {
            Authorization: `Bearer ${bearerToken}`,
        },
    ).pipe(map((res) => {
        return res;
    }));

