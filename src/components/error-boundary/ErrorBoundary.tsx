import type { ComponentProps, PropsWithChildren } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

type ErrorBoundaryProps = Omit<
  ComponentProps<typeof ReactErrorBoundary>,
  'fallbackRender'
> & {
  rejectedFallback: ComponentProps<typeof ReactErrorBoundary>['fallbackRender'];
};

// TODO : 에러가 발생했을 경우 보여지는 Fallback Component에 대한 공통 시안 필요
const ErrorFallback = () => <p>에러가 발생했습니다.</p>;

/**
 * 컴포넌트 내부에서 발생한 에러가 존재할 경우 이를 대체하는 fallback Component를 보여주는 ErrorBoundary
 * @param param.rejectedFallback ErrorBoundary의 fallbackRender Props에 넘겨줄 fallback Component 
 */
const ErrorBoundary = ({
  children,
  rejectedFallback,
}: PropsWithChildren<ErrorBoundaryProps>) => (
  <ReactErrorBoundary fallbackRender={rejectedFallback || ErrorFallback}>
    {children}
  </ReactErrorBoundary>
);

export default ErrorBoundary;
