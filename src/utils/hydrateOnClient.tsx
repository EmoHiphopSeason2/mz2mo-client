'use client';

import {
  Hydrate as ReactQueryHydrate,
  HydrateProps,
} from '@tanstack/react-query';

function HydrateOnClient(props: HydrateProps) {
  return <ReactQueryHydrate {...props} />;
}

export default HydrateOnClient;
