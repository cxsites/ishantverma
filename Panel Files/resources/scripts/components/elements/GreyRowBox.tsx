import styled from 'styled-components/macro';
import tw from 'twin.macro';

export default styled.div<{ $hoverable?: boolean }>`
    ${tw`flex rounded-3xl no-underline text-neutral-200 items-center bg-neutral-700 p-4 border border-transparent transition-colors duration-150 overflow-hidden`};

    ${props => props.$hoverable !== false && tw`hover:border-cyan-700`};
    transition: 300ms ease all;

    & .icon {
        ${tw`rounded-full bg-neutral-910 p-3`};
    }
`;
