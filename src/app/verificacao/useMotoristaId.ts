import { useSearchParams } from 'react-router-dom';

export function useMotoristaId() {
  const [searchParams] = useSearchParams();
  return searchParams.get('motoristaId');
}