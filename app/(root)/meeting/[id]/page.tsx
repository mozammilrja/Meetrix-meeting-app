'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import {
  StreamCall,
  StreamTheme,
  useStreamVideoClient,
} from '@stream-io/video-react-sdk';
import { useParams } from 'next/navigation';
import { Loader } from 'lucide-react';

import { useGetCallById } from '@/hooks/useGetCallById';
import Alert from '@/components/Alert';
import MeetingSetup from '@/components/MeetingSetup';
import MeetingRoom from '@/components/MeetingRoom';

const MeetingPage = () => {
  const  id:any = useParams();
  const { isLoaded, user } = useUser();
  const { call, isCallLoading } = useGetCallById(id);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const client = useStreamVideoClient();

  // ✅ Fetch token and connect Stream client
  useEffect(() => {
    const getTokenAndConnect = async () => {
      if (!client || !user) return;

      try {
        const res = await fetch('/api/stream-token');
        const data = await res.json();

        if (!data.token) throw new Error('Token not received');

        await client.connectUser(
          {
            id: user.id,
            name: user.fullName || 'Guest',
            image: user.imageUrl || '',
          },
          data.token
        );
      } catch (error) {
        console.error('Error connecting Stream client:', error);
      }
    };

    getTokenAndConnect();
  }, [client, user]);

  if (!isLoaded || isCallLoading) return <Loader />;

  if (!call)
    return (
      <p className="text-center text-3xl font-bold text-white">
        Call Not Found
      </p>
    );

  const notAllowed =
    call.type === 'invited' &&
    (!user || !call.state.members.find((m) => m.user.id === user.id));

  if (notAllowed)
    return <Alert title="You are not allowed to join this meeting" />;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingPage;
