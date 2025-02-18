'use client';

import {FC} from "react";
import './SearchComponent.scss';
import {useForm} from "react-hook-form";
import MainButton from "@/components/UI/main-button/MainButton";
import {redirect, useRouter, useSearchParams} from "next/navigation";

type SearchFormProps = {
    searchField: string;
}

type SearchComponentProps = {
    urlEndpoint: string;
}

export const SearchComponent: FC<SearchComponentProps> = ({ urlEndpoint }) => {
    const { handleSubmit, register, getValues, reset } = useForm<SearchFormProps>();
    const searchParams = useSearchParams();
    const router = useRouter();
    const params = new URLSearchParams(searchParams.toString());

    const handleSubmitCallback = () => {
        const { searchField } = getValues();

        if (!isNaN(+searchField)) {
            redirect(`${urlEndpoint}/${searchField}`)
        } else {
            params.set('searchParams', `/search?q=${searchField}&`);
            params.set('page', '1');
            router.push(`?${params.toString()}`);
        }

        reset();
    };

    return (
        <form className='search-wrapper' onSubmit={handleSubmit(handleSubmitCallback)}>
            <label>
                <p className='search-label'>Search: <span>you can search by id(number) or by name(string)</span></p>
                <input type="text" className='app-search' { ...register('searchField') } />
            </label>
            <MainButton buttonText='Search' />
        </form>
    );
};