'use client';

import {
  HydrateProps,
  Hydrate as ReactQueryHydrate,
} from '@tanstack/react-query';

function HydrateOnClient(props: HydrateProps) {
  return <ReactQueryHydrate {...props} />;
}

export default HydrateOnClient;
