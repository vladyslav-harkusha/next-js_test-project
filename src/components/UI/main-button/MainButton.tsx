'use client';

import './MainButton.scss';

type Props = {
    buttonText: string;
    buttonOnclick?: () => void;
    isDisabled?: boolean;
}

export default function MainButton({ buttonText, buttonOnclick, isDisabled }: Props) {
    return (
        <div>
            <button className='main-button' disabled={isDisabled} onClick={buttonOnclick}>
                {buttonText}
            </button>
        </div>
    );
};