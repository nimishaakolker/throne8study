'use client';

import { use } from 'react';
import GroupRoom from '../components/GroupRoom';

export default function GroupRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <GroupRoom groupId={parseInt(id)} />;
}
