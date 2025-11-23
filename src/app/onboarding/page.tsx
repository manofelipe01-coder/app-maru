'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Waves, ChevronRight, Check } from 'lucide-react';
import { ACTIVITIES } from '@/lib/constants';
import { supabase } from '@/lib/supabase';

type Step = 1 | 2 | 3;

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState({
    sand: [] as string[],
    sea: [] as string[],
    navigation: [] as string[]
  });

  const sandActivities = ACTIVITIES.filter(a => a.category === 'sand');
  const seaActivities = ACTIVITIES.filter(a => a.category === 'sea');
  const navigationActivities = ACTIVITIES.filter(a => a.category === 'navigation');

  const toggleActivity = (category: 'sand' | 'sea' | 'navigation', activityId: string) => {
    setSelectedActivities(prev => ({
      ...prev,
      [category]: prev[category].includes(activityId)
        ? prev[category].filter(id => id !== activityId)
        : [...prev[category], activityId]
    }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep((step + 1) as Step);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((step - 1) as Step);
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        await supabase.from('user_preferences').insert({
          user_id: user.id,
          activities_sand: selectedActivities.sand,
          activities_sea: selectedActivities.sea,
          activities_navigation: selectedActivities.navigation
        });

        router.push('/home');
      }
    } catch (error) {
      console.error('Erro ao salvar preferências:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderActivityGrid = (
    activities: typeof ACTIVITIES,
    category: 'sand' | 'sea' | 'navigation'
  ) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {activities.map(activity => {
        const isSelected = selectedActivities[category].includes(activity.id);
        return (
          <button
            key={activity.id}
            onClick={() => toggleActivity(category, activity.id)}
            className={`
              relative p-4 rounded-xl border-2 transition-all duration-200
              ${isSelected 
                ? 'border-blue-500 bg-blue-50 shadow-lg scale-105' 
                : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
              }
            `}
          >
            {isSelected && (
              <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
            <div className="text-center space-y-2">
              <div className={`text-2xl ${isSelected ? 'scale-110' : ''} transition-transform`}>
                {activity.icon === 'Waves' && '🌊'}
                {activity.icon === 'Volleyball' && '🏐'}
                {activity.icon === 'Trophy' && '🏆'}
                {activity.icon === 'CircleDot' && '⚪'}
                {activity.icon === 'Football' && '⚽'}
                {activity.icon === 'PersonStanding' && '🚶'}
                {activity.icon === 'Footprints' && '👣'}
                {activity.icon === 'Bike' && '🚴'}
                {activity.icon === 'UtensilsCrossed' && '🧺'}
                {activity.icon === 'Sun' && '☀️'}
                {activity.icon === 'BookOpen' && '📖'}
                {activity.icon === 'Armchair' && '🪑'}
                {activity.icon === 'Fish' && '🐟'}
                {activity.icon === 'Droplet' && '💧'}
                {activity.icon === 'Wind' && '💨'}
                {activity.icon === 'Anchor' && '⚓'}
                {activity.icon === 'Ship' && '🚢'}
                {activity.icon === 'Zap' && '⚡'}
                {activity.icon === 'Sailboat' && '⛵'}
              </div>
              <p className={`text-sm font-medium ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>
                {activity.name}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 p-4 flex items-center justify-center">
      <Card className="w-full max-w-3xl shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-2xl">
              <Waves className="w-10 h-10 text-white" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">
              {step === 1 && 'Atividades na Areia'}
              {step === 2 && 'Atividades no Mar'}
              {step === 3 && 'Navegação'}
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Selecione todas as atividades que você gosta de fazer
            </CardDescription>
          </div>
          
          {/* Progress indicator */}
          <div className="flex justify-center gap-2">
            {[1, 2, 3].map(s => (
              <div
                key={s}
                className={`h-2 w-16 rounded-full transition-all ${
                  s === step ? 'bg-blue-600' : s < step ? 'bg-blue-400' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && renderActivityGrid(sandActivities, 'sand')}
          {step === 2 && renderActivityGrid(seaActivities, 'sea')}
          {step === 3 && renderActivityGrid(navigationActivities, 'navigation')}

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className="w-24"
            >
              Voltar
            </Button>

            {step < 3 ? (
              <Button
                onClick={handleNext}
                className="w-24 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              >
                Próximo
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={handleFinish}
                disabled={loading}
                className="w-32 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              >
                {loading ? 'Salvando...' : 'Começar'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
