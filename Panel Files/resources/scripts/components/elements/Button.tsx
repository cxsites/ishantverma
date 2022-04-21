import React from 'react';
import styled, { css } from 'styled-components/macro';
import tw from 'twin.macro';
import Spinner from '@/components/elements/Spinner';

interface Props {
    isLoading?: boolean;
    size?: 'xsmall' | 'small' | 'large' | 'xlarge';
    color?: 'green' | 'red' | 'primary' | 'grey';
    isSecondary?: boolean;
}

const ButtonStyle = styled.button<Omit<Props, 'isLoading'>>`
    ${tw`relative inline-block rounded p-2 uppercase tracking-wide text-sm transition-all duration-150`};

    ${props => ((!props.isSecondary && !props.color) || props.color === 'primary') && css<Props>`
        ${props => !props.isSecondary && tw`bg-cyan-700 border-cyan-700 border text-white`};

        &:hover:not(:disabled) {
            ${tw`bg-cyan-710 border-cyan-710`};
        }
    `};

    ${props => props.color === 'grey' && css`
        ${tw`bg-cyan-700 border-cyan-700 border text-white`};

        &:hover:not(:disabled) {
            ${tw`bg-cyan-710 border-cyan-710`};
        }
    `};

    ${props => props.color === 'green' && css<Props>`
        ${tw`bg-cyan-700 border-cyan-700 border text-white`};

        &:hover:not(:disabled) {
            ${tw`bg-cyan-710 border-cyan-710`};
        }

        ${props => props.isSecondary && css`
            &:active:not(:disabled) {
                ${tw`bg-cyan-710 border-cyan-710`};
            }
        `};
    `};

    ${props => props.color === 'red' && css<Props>`
        ${tw`bg-cyan-700 border-cyan-700 border text-white`};

        &:hover:not(:disabled) {
            ${tw`bg-cyan-710 border-cyan-710`};
        }

        ${props => props.isSecondary && css`
            &:active:not(:disabled) {
                ${tw`bg-cyan-710 border-cyan-710`};
            }
        `};
    `};

    ${props => props.size === 'xsmall' && tw`px-2 py-1 text-xs`};
    ${props => (!props.size || props.size === 'small') && tw`px-4 py-2`};
    ${props => props.size === 'large' && tw`p-4 text-sm`};
    ${props => props.size === 'xlarge' && tw`p-4 w-full`};

    ${props => props.isSecondary && css<Props>`
      ${tw`bg-cyan-700 border-cyan-700 border text-white`};

        &:hover:not(:disabled) {
            ${tw`bg-cyan-710 border-cyan-710 text-white`};
            ${props => props.color === 'red' && tw`bg-cyan-710 border-cyan-710 text-white`};
            ${props => props.color === 'primary' && tw`bg-cyan-710 border-cyan-710 text-white`};
            ${props => props.color === 'green' && tw`bg-cyan-710 border-cyan-710 text-white`};
        }
    `};

    &:disabled { opacity: 0.55; cursor: default }
`;

type ComponentProps = Omit<JSX.IntrinsicElements['button'], 'ref' | keyof Props> & Props;

const Button: React.FC<ComponentProps> = ({ children, isLoading, ...props }) => (
    <ButtonStyle {...props}>
        {isLoading &&
        <div css={tw`flex absolute justify-center items-center w-full h-full left-0 top-0`}>
            <Spinner size={'small'}/>
        </div>
        }
        <span css={isLoading ? tw`text-transparent` : undefined}>
            {children}
        </span>
    </ButtonStyle>
);

type LinkProps = Omit<JSX.IntrinsicElements['a'], 'ref' | keyof Props> & Props;

const LinkButton: React.FC<LinkProps> = props => <ButtonStyle as={'a'} {...props}/>;

export { LinkButton, ButtonStyle };
export default Button;
