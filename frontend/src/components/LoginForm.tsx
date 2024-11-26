import React, {useState} from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from 'react-redux';
import {ILoginActionTypes} from "../types/ILogin.ts";
import {getItemFromLocalStorage} from "../services/localStorageService.ts";
import {AUTH_STATE} from "../constants.ts";
export interface ILoginFormInput {
    email: string;
    password: string;
}
export const LoginForm: React.FC = () => {
    const dispatch = useDispatch();
    const [isFromDisabled, ] = useState<boolean>(getItemFromLocalStorage(AUTH_STATE));
    const schema = yup.object().shape({
        email: yup.string()
            .email('Invalid email address').required("Email is a required field"),
        password: yup.string().required("Password is a required field")
            .min(8, "Must be 8 characters or more"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginFormInput>({ resolver: yupResolver(schema) });

    const onSubmit = (data: ILoginFormInput) => {
        console.log(data);
        dispatch({
            type: ILoginActionTypes.FETCH_REQUEST,
            payload: data,
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="gy-3 gy-md-4 overflow-hidden w-100">
                <div className="col-12">
                    <label className="form-label">Email
                        <span className="text-danger">*</span></label>
                    <input className="form-control" type='email' {...register("email")} disabled={isFromDisabled} />
                    <div>
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>
                </div>
                <div className="col-12">
                    <label className="form-label">Password
                        <span className="text-danger">*</span></label>
                    <input className="form-control" type='password' {...register("password")} disabled={isFromDisabled} />
                    <div>
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>
                </div>

                <input type="submit" className="btn bsb-btn-xl btn-primary w-100 my-4" disabled={isFromDisabled}/>
            </div>
        </form>
    );
};
