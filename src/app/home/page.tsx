'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Waves, Search, MapPin, Star, User, Menu } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/signup');
        return;
      }

      // Buscar dados do usuário
      const { data: profile } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (!profile) {
        router.push('/onboarding');
        return;
      }

      setUser({ name: session.user.user_metadata.name || 'Usuário' });
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/signup');
  };

  if (loading) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-xl">
                <Waves className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                MARU
              </h1>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <button 
                onClick={handleLogout}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <User className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Olá, {user?.name}! 👋
          </h2>
          <p className="text-gray-600">
            Encontre a praia perfeita para suas atividades favoritas
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar praias..."
              className="pl-12 h-14 text-lg bg-white shadow-md border-gray-200"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <button className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all border-2 border-transparent hover:border-blue-500 text-left">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">Favoritos</h3>
                <p className="text-sm text-gray-600">Suas praias salvas</p>
              </div>
            </div>
          </button>

          <button className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all border-2 border-transparent hover:border-blue-500 text-left">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">Praias Próximas</h3>
                <p className="text-sm text-gray-600">Até 50km de você</p>
              </div>
            </div>
          </button>
        </div>

        {/* Globe/Map Placeholder */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="aspect-video bg-gradient-to-br from-cyan-100 to-blue-200 rounded-2xl flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl inline-block">
                <Waves className="w-24 h-24 text-blue-600 animate-pulse" />
              </div>
              <p className="text-xl font-semibold text-blue-900">
                Mapa interativo em breve
              </p>
              <p className="text-gray-600">
                Visualize praias e condições em tempo real
              </p>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-6 text-white">
          <h3 className="text-xl font-bold mb-2">🎉 Módulo 1 Completo!</h3>
          <p className="text-white/90 mb-4">
            Sistema de autenticação e onboarding implementados com sucesso.
          </p>
          <p className="text-sm text-white/80">
            Próximos módulos: Localização, APIs de clima/oceano, recomendações inteligentes e muito mais!
          </p>
        </div>
      </main>
    </div>
  );
}
