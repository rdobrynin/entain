import { map } from 'rxjs/operators';
import {getBearer$} from "../services/restApi.ts";
import {IUserList} from "../types/IUserList.ts";


const baseUrl = import.meta.env.VITE_API_URL;

export const fetchUserList = (bearerToken: string) =>
    getBearer$<{ data: IUserList }>(
        `${baseUrl}/user`,
        {},
        {
            Authorization: `Bearer ${bearerToken}`,
        },
    ).pipe(map((res) => {
        return res;
    }));

