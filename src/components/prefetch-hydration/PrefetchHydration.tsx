import { type PropsWithChildren, cache } from 'react';

import { QueryClient } from '@tanstack/query-core';
import { type QueryFunction, QueryKey, dehydrate } from '@tanstack/query-core';

import HydrateOnClient from './hydrateOnClient';

type PrefetchHydrationProps = {
  queryKey: QueryKey;
  queryFunction: QueryFunction;
};

const PrefetchHydration = async ({
  queryKey,
  queryFunction,
  children,
}: PropsWithChildren<PrefetchHydrationProps>) => {
  // NOTE : 매 요청마다 같은 QueryClient를 사용하도록 Singleton Instance 를 사용
  const getQueryClient = cache(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            useErrorBoundary: true,
            retry: 0,
          },
        },
      }),
  );
  const queryClient = getQueryClient();

  // NOTE : RSC 에서 데이터를 prefetch 한 후, 클라이언트 컴포넌트에 Hydration 하기 위해 dehydrated 상태로 변경시킨다.
  await queryClient.prefetchQuery(queryKey, queryFunction);
  const dehydratedState = dehydrate(queryClient);

  return <HydrateOnClient state={dehydratedState}>{children}</HydrateOnClient>;
};

export default PrefetchHydration;
