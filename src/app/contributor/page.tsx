
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ContributorPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/contributor/profile');
  }, [router]);

  return null; // Or a loading spinner
}
