import styled, { css } from 'styled-components/macro';
import tw from 'twin.macro';

export interface Props {
    isLight?: boolean;
    hasError?: boolean;
}

const light = css<Props>`
    ${tw`bg-neutral-905 border-t-0 border-r-0 border-l-0 border-b-2 border-white text-white`};
    &:focus { ${tw`border-cyan-700`} }

    &:disabled {
        ${tw`bg-neutral-905 border-b-2 border-neutral-905`};
    }
`;

const checkboxStyle = css<Props>`
    ${tw`bg-neutral-905 cursor-pointer appearance-none inline-block align-middle select-none flex-shrink-0 w-4 h-4 text-primary-400 border-neutral-300 rounded-sm`};
    color-adjust: exact;
    background-origin: border-box;
    transition: all 75ms linear, box-shadow 25ms linear;

    &:checked {
        ${tw`border-transparent bg-no-repeat bg-center`};
        background: #7289DA;
        background-size: 100% 100%;
    }

    &:focus {
        ${tw`outline-none border-white`};
        box-shadow: 0 0 0 1px #fff;
    }
`;

const inputStyle = css<Props>`
    // Reset to normal styling.
    resize: none;
    ${tw`appearance-none outline-none w-full min-w-0`};
    ${tw`p-3 border-b-2 border-t-0 border-r-0 border-l-0 border-white text-white rounded text-sm transition-all duration-150`};
    ${tw`bg-neutral-905 border-white hover:border-cyan-700 text-white shadow-none focus:ring-0`};

    transition: 300ms ease all;

    & + .input-help {
        ${tw`mt-1 text-xs`};
        ${props => props.hasError ? tw`text-red-200` : tw`text-white`};
    }

    &:required, &:invalid {
        ${tw`shadow-none`};
    }

    &:not(:disabled):not(:read-only):focus {
        ${tw`shadow-md border-cyan-700 ring-2 ring-cyan-700 ring-opacity-50`};
        ${props => props.hasError && tw`border-red-300 ring-red-200`};
        transition: 300ms ease all;
    }

    &:disabled {
        ${tw`opacity-75`};
    }

    ${props => props.isLight && light};
    ${props => props.hasError && tw`text-red-100 border-red-400 hover:border-red-300`};
    transition: 300ms ease all;

`;

const Input = styled.input<Props>`
    &:not([type="checkbox"]):not([type="radio"]) {
        ${inputStyle};
    }

    &[type="checkbox"], &[type="radio"] {
        ${checkboxStyle};

        &[type="radio"] {
            ${tw`rounded-full`};
        }
    }
`;
const Textarea = styled.textarea<Props>`${inputStyle}`;

export { Textarea };
export default Input;
