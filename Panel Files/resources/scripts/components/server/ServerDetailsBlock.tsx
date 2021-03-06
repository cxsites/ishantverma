import React, { useEffect, useState } from 'react';
import tw, { TwStyle } from 'twin.macro';
import { faCircle, faEthernet, faHdd, faMemory, faMicrochip, faServer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { bytesToHuman, megabytesToHuman } from '@/helpers';
import TitledGreyBox from '@/components/elements/TitledGreyBox';
import { ServerContext } from '@/state/server';
import CopyOnClick from '@/components/elements/CopyOnClick';
import { SocketEvent, SocketRequest } from '@/components/server/events';

interface Stats {
  memory: number;
  cpu: number;
  disk: number;
}

function statusToColor(status: string | null, installing: boolean): TwStyle {
  if (installing) {
    status = '';
  }

  switch (status) {
    case 'offline':
      return tw`text-red-910`;
    case 'running':
      return tw`text-green-910`;
    default:
      return tw`text-yellow-910`;
  }
}

const ServerDetailsBlock = () => {
  const [stats, setStats] = useState<Stats>({ memory: 0, cpu: 0, disk: 0 });

  const status = ServerContext.useStoreState(state => state.status.value);
  const connected = ServerContext.useStoreState(state => state.socket.connected);
  const instance = ServerContext.useStoreState(state => state.socket.instance);

  const statsListener = (data: string) => {
    let stats: any = {};
    try {
      stats = JSON.parse(data);
    } catch (e) {
      return;
    }

    setStats({
      memory: stats.memory_bytes,
      cpu: stats.cpu_absolute,
      disk: stats.disk_bytes,
    });
  };

  useEffect(() => {
    if (!connected || !instance) {
      return;
    }

    instance.addListener(SocketEvent.STATS, statsListener);
    instance.send(SocketRequest.SEND_STATS);

    return () => {
      instance.removeListener(SocketEvent.STATS, statsListener);
    };
  }, [instance, connected]);

  const name = ServerContext.useStoreState(state => state.server.data!.name);
  const node = ServerContext.useStoreState(state => state.server.data!.node);
  const id = ServerContext.useStoreState(state => state.server.data!.id);
  const isInstalling = ServerContext.useStoreState(state => state.server.data!.isInstalling);
  const isTransferring = ServerContext.useStoreState(state => state.server.data!.isTransferring);
  const limits = ServerContext.useStoreState(state => state.server.data!.limits);
  const primaryAllocation = ServerContext.useStoreState(state => state.server.data!.allocations.filter(alloc => alloc.isDefault).map(
    allocation => (allocation.alias || allocation.ip) + ':' + allocation.port
  )).toString();

  const diskLimit = limits.disk ? megabytesToHuman(limits.disk) : 'Unlimited';
  const memoryLimit = limits.memory ? megabytesToHuman(limits.memory) : 'Unlimited';
  const cpuLimit = limits.cpu ? limits.cpu + '%' : 'Unlimited';

  return (
    <TitledGreyBox css={tw`break-words`} title={name} icon={faServer}>
      <p css={tw`text-xs uppercase`}>
        <FontAwesomeIcon
          icon={faCircle}
          fixedWidth
          css={[
            tw`mr-1`,
            statusToColor(status, isInstalling || isTransferring),
          ]}
        />
        &nbsp;{!status ? 'Connecting...' : (isInstalling ? 'Installing' : (isTransferring) ? 'Transferring' : status)}
      </p>
      <CopyOnClick text={primaryAllocation}>
        <p css={tw`text-xs mt-2`}>
          <FontAwesomeIcon icon={faEthernet} fixedWidth css={tw`mr-1 text-cyan-700`} />
          <code css={tw`ml-1`}>{primaryAllocation}</code>
        </p>
      </CopyOnClick>
      <p css={tw`text-xs mt-2`}>
        <FontAwesomeIcon icon={faMicrochip} fixedWidth css={tw`mr-1 text-cyan-700`} /> {stats.cpu.toFixed(2)}%
         <span css={tw`text-white`}> / {cpuLimit}</span>
      </p>
      <p css={tw`text-xs mt-2`}>
        <FontAwesomeIcon icon={faMemory} fixedWidth css={tw`mr-1 text-cyan-700`} /> {bytesToHuman(stats.memory)}
        <span css={tw`text-white`}> / {memoryLimit}</span>
      </p>
      <p css={tw`text-xs mt-2`}>
        <FontAwesomeIcon icon={faHdd} fixedWidth css={tw`mr-1 text-cyan-700`} />&nbsp;{bytesToHuman(stats.disk)}
        <span css={tw`text-white`}> / {diskLimit}</span>
      </p>
      <CopyOnClick text={id}>
        <p css={tw`text-xs mt-2`}>
          <span css={tw`text-cyan-700`}>ID: </span><code css={tw`text-xs mr-1 text-white`}>{id}</code>
        </p>
        </CopyOnClick>
          <CopyOnClick text={node}>
            <p css={tw`text-xs mt-2`}>
              <span css={tw`text-cyan-700`}>Node: </span><code css={tw`text-xs mr-1 text-white`}>{node}</code>
            </p>
            </CopyOnClick>
        </TitledGreyBox>
            );
        };


        export default ServerDetailsBlock;
