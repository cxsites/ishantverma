import PageContentBlock, { PageContentBlockProps } from '@/components/elements/PageContentBlock';
import React from 'react';
import { ServerContext } from '@/state/server';
import tw from 'twin.macro';

interface Props extends PageContentBlockProps {
    title: string;
}

const ServerContentBlock: React.FC<Props> = ({ title, children, ...props }) => {
    const name = ServerContext.useStoreState(state => state.server.data!.name);

    return (
        <PageContentBlock className="ServerContentBlock" css={tw`pl-40`} title={`${name} | ${title}`} {...props}>
            {children}
        </PageContentBlock>
    );
};

export default ServerContentBlock;
