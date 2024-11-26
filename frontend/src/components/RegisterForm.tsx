import React, {useState} from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from 'react-redux';
import {ISignupActionTypes} from "../types/ISignup.ts";
import {getItemFromLocalStorage} from "../services/localStorageService.ts";
import {AUTH_STATE} from "../constants.ts";
export interface IFormInput {
    name: string;
    email: string;
    password: string;
    c_password: string;
}
export const RegisterForm: React.FC = () => {
    const dispatch = useDispatch();
    const [isFromDisabled, ] = useState<boolean>(getItemFromLocalStorage(AUTH_STATE));
    const schema = yup.object().shape({
        name: yup.string().required("Name is a required field"),
        email: yup.string()
            .email('Invalid email address').required("Email is a required field"),
        password: yup.string().required("Password is a required field")
            .min(8, "Must be 8 characters or more"),
        c_password: yup.string()
            .oneOf([yup.ref('password')], 'Passwords must match')
    });


    const {
        register,
        handleSubmit,
        formState: { errors },
        // @ts-expect-error
    } = useForm<IFormInput>({ resolver: yupResolver(schema) });

    const onSubmit = (data: IFormInput) => {
        console.log(data);
        dispatch({
            type: ISignupActionTypes.FETCH_REQUEST,
            payload: data,
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="gy-3 gy-md-4 overflow-hidden w-100">
                <div className="col-12">
                    <label className="form-label">Name
                        <span className="text-danger">*</span></label>
                    <input className="form-control" {...register("name")} disabled={isFromDisabled} />
                    <div>
                        {errors.name && <p>{errors.name.message}</p>}
                    </div>
                </div>
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
                <div className="col-12">
                    <label className="form-label">Confirm Password
                        <span className="text-danger">*</span></label>
                    <input className="form-control" type='password' {...register("c_password")} disabled={isFromDisabled} />
                    <div>
                        {errors.c_password && <p>{errors.c_password.message}</p>}
                    </div>
                </div>

                <input type="submit" className="btn bsb-btn-xl btn-primary w-100 my-4" disabled={isFromDisabled}/>
            </div>
        </form>
    );
};
