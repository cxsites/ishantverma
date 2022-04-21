import styled from 'styled-components/macro';
import tw, { theme } from 'twin.macro';

const SubNavigation = styled.div`
        ${tw`bg-neutral-700 w-40`};
        height: 100%;
        position: fixed;
        top: 0;
        flex: 0 0 auto;
        display: flex;
        flex-direction: column;
        margin-left: 5rem;

        @media only screen and (max-width: 768px) {
            width: 3.5rem;
        }

    & > div {
        ${tw`bg-neutral-905 w-40`};
        height: 100%;
        position: fixed;
        top: 0;
        flex: 0 0 auto;
        width: 10rem;
        display: flex;
        flex-direction: column;

        @media only screen and (max-width: 768px) {
            width: 3.5rem;
        }

        & > a, & > div {
            ${tw`inline-block py-3 px-4 text-white no-underline whitespace-nowrap transition-all duration-150`};

            &:hover {
              ${tw`bg-neutral-910`};
              transition: 500ms ease all;
            }

            &:active, &.active {
              ${tw`bg-neutral-910`};
              color: white;
              transition: 500ms ease all;
            }
        }
    }
`;

export default SubNavigation;
