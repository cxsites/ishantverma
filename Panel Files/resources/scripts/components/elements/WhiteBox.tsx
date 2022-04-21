import styled from 'styled-components/macro';
import tw from 'twin.macro';

export default styled.div<{ $hoverable?: boolean }>`
    ${tw`rounded no-underline text-neutral-200 bg-neutral-900 p-4 border border-neutral-800 transition-all duration-150 overflow-hidden`};

    ${props => props.$hoverable !== false && tw`hover:shadow-lg`};

    & .icon {
        ${tw`rounded-full bg-neutral-500 p-3`};
    }
`;
