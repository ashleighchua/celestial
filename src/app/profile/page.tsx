'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';

export default function ProfilePage() {
  const router = useRouter();
  const { profile, setProfile } = useAppStore();

  const [name, setName] = useState(profile?.name || '');
  const [birthDate, setBirthDate] = useState(profile?.birthDate || '');
  const [birthTime, setBirthTime] = useState(profile?.birthTime || '');
  const [birthPlace, setBirthPlace] = useState(profile?.birthPlace || '');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>(profile?.gender || 'female');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !birthDate) return;

    setProfile({
      name,
      birthDate,
      birthTime: birthTime || '12:00',
      birthPlace: birthPlace || 'Unknown',
      gender,
      mbtiType: profile?.mbtiType,
    });

    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-purple-50 to-white">
      <div className="px-6 pt-16 pb-8">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">&#10024;</div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome to Celestial</h1>
          <p className="text-gray-500 mt-2">Enter your birth details to unlock your cosmic profile</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Birth Date *</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Birth Time <span className="text-gray-400">(for accurate readings)</span></label>
            <input
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Birth Place <span className="text-gray-400">(city)</span></label>
            <input
              type="text"
              value={birthPlace}
              onChange={(e) => setBirthPlace(e.target.value)}
              placeholder="e.g., New York, London"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <div className="flex gap-3">
              {(['female', 'male', 'other'] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                    gender === g
                      ? 'bg-indigo-500 text-white shadow-md'
                      : 'bg-gray-50 text-gray-600 border border-gray-200'
                  }`}
                >
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
          >
            Discover My Cosmic Profile
          </button>
        </form>
      </div>
    </div>
  );
}
