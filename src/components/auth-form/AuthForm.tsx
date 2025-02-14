'use client';

import './AuthForm.scss';
import {useForm} from "react-hook-form";
import {ChangeEvent, useState} from "react";
import {authFormValidator} from "@/validators/authForm.validator";
import {authUsersData} from "@/components/auth-form/constants/authUsersData";
import {joiResolver} from "@hookform/resolvers/joi";
import MainButton from "@/components/UI/main-button/MainButton";
import Loader from "@/components/UI/loader/Loader";
import {IAuthFormData} from "@/models/IAuthFormData";
import {ILoginData} from "@/models/ILoginData";
import {getAuthUserData} from "@/services/api.service";
import {getCookie} from "cookies-next";

export const AuthForm = () => {
    const [isAuthUserLoading, setIsAuthUserLoading] = useState<boolean>(false);
    const [isAuthError, setIsAuthError] = useState<boolean>(false);
    const authUser = getCookie('authUser')
    console.log(authUser);

    const {
        handleSubmit, register, reset, formState: { errors, isValid }, setValue
    } = useForm<IAuthFormData>({
        mode: "all",
        resolver: joiResolver(authFormValidator),
    });

    const handleSubmitCallback = async (formData: ILoginData) => {
        if (!isValid) return;

        try {
            setIsAuthUserLoading(true);
            await getAuthUserData(formData);
        } catch (e) {
            setIsAuthError(true);
            console.log(e)
        } finally {
            setIsAuthUserLoading(false);
        }

        reset();
    };

    const handleOnChangeInputs = () => {
        setIsAuthError(false);
    };

    const handleOnChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const chosenUser = authUsersData.find(user => user.nameOfUser === e.target.value);

        if (chosenUser) {
            setValue('username', chosenUser.username);
            setValue('password', chosenUser.password);
        }

        setIsAuthError(false);
    };

    if (isAuthUserLoading) {
        return <Loader />
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleSubmitCallback)} className='auth-form'>
                <h4 className='title'>You can enter username and password manually or choose user in selection menu</h4>

                <div className='form-wrapper'>
                    <div className='inputs-wrapper'>
                        <label>
                            <p>username: </p>
                            {errors.username && <span className='input-error-message'>{errors.username.message}</span>}
                            <input type="text" className='auth-form-input' {...register('username', {onChange: handleOnChangeInputs})} />
                        </label>

                        <label>
                            <p>password: </p>
                            {errors.password && <span className='input-error-message'>{errors.password.message}</span>}
                            <input type="text" className='auth-form-input' {...register('password', {onChange: handleOnChangeInputs})} />
                        </label>

                        {isAuthError && <p className='auth-error-message'>Your username or password is incorrect</p>}
                    </div>

                    <label className='select-label'>
                        <p>choose user:</p>
                        <select className='auth-form-select' {...register('usersSelect', {
                            onChange: handleOnChangeSelect,
                        })}>
                            {authUsersData.map(user => (
                                <option key={user.nameOfUser}>{user.nameOfUser}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <MainButton buttonText='Log in' isDisabled={!isValid} />
            </form>
        </>
    );
};