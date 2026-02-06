import {QueryClient} from '@tanstack/react-query';
import {apiConfig} from '../shared/utils/api';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: apiConfig.staleTimeMs,
    },
  },
});
