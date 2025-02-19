'use client';

import {ChangeEvent} from "react";
import {useSearchParams, useRouter} from "next/navigation";
import './Pagination.scss';
import MainButton from "@/components/UI/main-button/MainButton";

type Props = { totalItems: number }

export default function Pagination({ totalItems }: Props) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const params = new URLSearchParams(searchParams.toString());

    const currPage = searchParams.get('page') || '1';
    const usersPerPage = searchParams.get('limit') || '15';
    const search = searchParams.get('searchParams');


    const handlePrevPage = () => {
        const prevPage = +currPage > 1 ? (+currPage - 1) : +currPage;

        params.set('page', prevPage.toString());
        params.set('limit', usersPerPage);
        router.push(`?${params.toString()}`);
    };

    const handleNextPage = () => {
        const nextPage = (totalItems > +currPage * +usersPerPage) ? (+currPage + 1) : +currPage;

        params.set('page', nextPage.toString());
        params.set('limit', usersPerPage);
        router.push(`?${params.toString()}`);
    };

    const handlePerPage = (event: ChangeEvent<HTMLInputElement>) => {
        params.set('limit', String(event.target.value));
        params.set('page', '1');
        router.push(`?${params.toString()}`);
    };

    return (
        <div className='pagination'>
            <div className='pages-wrapper'>
                <p className='pages-number'>Page №{currPage}</p>
                <label htmlFor='perPage'>
                    <span>items per page: </span>
                    <input
                        min='1'
                        max={totalItems}
                        className='per-page-input'
                        type="number"
                        id='perPage'
                        value={usersPerPage}
                        onChange={handlePerPage}
                        disabled={Boolean(search)}
                    />
                </label>
            </div>

            <div className='buttons-wrapper'>
                <MainButton
                    buttonText={`<< Prev ${usersPerPage}`}
                    buttonOnclick={handlePrevPage}
                    isDisabled={+currPage < 2}
                />
                <MainButton
                    buttonText={`Next ${usersPerPage} >>`}
                    buttonOnclick={handleNextPage}
                    isDisabled={(totalItems < +currPage * +usersPerPage) || Boolean(search)}
                />
            </div>
        </div>
    );
}