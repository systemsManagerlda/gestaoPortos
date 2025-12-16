'use client';

import { useSearchParams } from 'next/navigation';

export default function VerificacaoClient() {
  const searchParams = useSearchParams();
  const token = searchParams?.get('token');

  return (
    <div>
      Token: {token}
    </div>
  );
}
