// app/components/Views.tsx
import { unstable_after as after } from 'next/server';
import { client } from '@/sanity/lib/client';
import { writeClient } from '@/sanity/lib/write-client';
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries';
import Ping from './Ping';

export default async function Views({ id }: { id: string }) {
  // Fetch total views from Sanity
  const { views } = await client.withConfig({ useCdn: false }).fetch(STARTUP_VIEWS_QUERY, { id });

  // Schedule an update to increment views after the response
  after(async () => {
    await writeClient.patch(id).set({ views: views + 1 }).commit();
  });

  return (
    <div className='view-container'>
      <div className='absolute -top-1 -right-1'>
        <Ping />
      </div>
      <p className='view-text'>
        <span className='text-20-medium'>views: {views ?? 'Loading...'}</span>
      </p>
    </div>
  );
}
