import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import useEventListener from '@/plugins/useEventListener';
import SearchModal from '@/components/dashboard/search/SearchModal';

export default () => {
  const [visible, setVisible] = useState(false);

  useEventListener('keydown', (e: KeyboardEvent) => {
    if (['input', 'textarea'].indexOf(((e.target as HTMLElement).tagName || 'input').toLowerCase()) < 0) {
      if (!visible && e.metaKey && e.key.toLowerCase() === '/') {
        setVisible(true);
      }
    }
  });

  return (
    <>
      {visible &&
        <SearchModal
          appear
          visible={visible}
          onDismissed={() => setVisible(false)}
        />
      }
      <div className={'navigation-link'} onClick={() => setVisible(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" css="color: white; height: 1.5rem; width: 1.5rem;" color="white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </div>
    </>
  );
};
