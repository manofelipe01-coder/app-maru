'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Waves } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Verificar se usuário já completou onboarding
        const { data: profile } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (profile) {
          router.push('/home');
        } else {
          router.push('/onboarding');
        }
      } else {
        router.push('/signup');
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-3xl animate-pulse">
            <Waves className="w-20 h-20 text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-white">MARU</h1>
        <p className="text-xl text-white/90">Carregando...</p>
      </div>
    </div>
  );
}
