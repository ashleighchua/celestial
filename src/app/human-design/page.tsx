'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { SectionCard } from '@/components/ui/SectionCard';
import { Card } from '@/components/ui/Card';
import { ExpandableText } from '@/components/ui/ExpandableText';
import { calculateHumanDesign, HumanDesignProfile } from '@/lib/calculators/human-design';
import {
  typeContent,
  centerContent,
  authorityContent,
  profileContent,
} from '@/lib/data/human-design-content';

const THEME_COLOR = '#E07A4F';

const TYPE_SUBTITLES: Record<string, string> = {
  Manifestor: 'Initiator of the World',
  Generator: 'Builder of the World',
  'Manifesting Generator': 'Express Builder of the World',
  Projector: 'Guide of the World',
  Reflector: 'Mirror of the World',
};

// --- Body Graph SVG Component ---

interface BodyGraphProps {
  profile: HumanDesignProfile;
}

// Center positions for the body graph layout
const CENTER_POSITIONS: Record<string, { x: number; y: number; shape: 'triangle-up' | 'triangle-down' | 'square' | 'diamond' }> = {
  Head:          { x: 150, y: 30,  shape: 'triangle-up' },
  Ajna:          { x: 150, y: 90,  shape: 'triangle-down' },
  Throat:        { x: 150, y: 155, shape: 'square' },
  G:             { x: 150, y: 230, shape: 'diamond' },
  Heart:         { x: 215, y: 210, shape: 'square' },
  Sacral:        { x: 150, y: 310, shape: 'square' },
  'Solar Plexus': { x: 215, y: 320, shape: 'triangle-down' },
  Spleen:        { x: 85,  y: 320, shape: 'triangle-up' },
  Root:          { x: 150, y: 395, shape: 'square' },
};

// Channel connections between centers with gate pairs
const CHANNEL_CONNECTIONS: { from: string; to: string; gates: [number, number] }[] = [
  { from: 'Throat', to: 'Sacral', gates: [20, 34] },
  { from: 'Sacral', to: 'Spleen', gates: [34, 57] },
  { from: 'Throat', to: 'Spleen', gates: [20, 57] },
  { from: 'G', to: 'Throat', gates: [1, 8] },
  { from: 'G', to: 'Throat', gates: [13, 33] },
  { from: 'G', to: 'Throat', gates: [7, 31] },
  { from: 'G', to: 'Throat', gates: [10, 20] },
  { from: 'G', to: 'Heart', gates: [25, 51] },
  { from: 'Heart', to: 'Throat', gates: [21, 45] },
  { from: 'Heart', to: 'Spleen', gates: [26, 44] },
  { from: 'Spleen', to: 'Sacral', gates: [50, 27] },
  { from: 'Sacral', to: 'Solar Plexus', gates: [59, 6] },
  { from: 'Sacral', to: 'Root', gates: [42, 53] },
  { from: 'Sacral', to: 'Root', gates: [3, 60] },
  { from: 'Sacral', to: 'Root', gates: [9, 52] },
  { from: 'Root', to: 'Spleen', gates: [54, 32] },
  { from: 'Root', to: 'Solar Plexus', gates: [19, 49] },
  { from: 'Root', to: 'Solar Plexus', gates: [39, 55] },
  { from: 'Solar Plexus', to: 'Throat', gates: [36, 35] },
  { from: 'Head', to: 'Ajna', gates: [64, 47] },
  { from: 'Head', to: 'Ajna', gates: [61, 24] },
  { from: 'Head', to: 'Ajna', gates: [63, 4] },
  { from: 'Ajna', to: 'Throat', gates: [17, 62] },
  { from: 'Ajna', to: 'Throat', gates: [43, 23] },
  { from: 'Ajna', to: 'Throat', gates: [11, 56] },
  { from: 'Spleen', to: 'Throat', gates: [48, 16] },
  { from: 'Spleen', to: 'Root', gates: [28, 38] },
  { from: 'Spleen', to: 'Root', gates: [18, 58] },
];

function renderCenterShape(
  name: string,
  x: number,
  y: number,
  shape: string,
  defined: boolean,
  color: string
) {
  const size = 28;
  const fill = defined ? color : '#FFFFFF';
  const stroke = defined ? color : '#D1D5DB';
  const strokeWidth = 2;

  switch (shape) {
    case 'triangle-up':
      return (
        <polygon
          key={name}
          points={`${x},${y - size} ${x - size},${y + size * 0.6} ${x + size},${y + size * 0.6}`}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          opacity={defined ? 0.85 : 1}
        />
      );
    case 'triangle-down':
      return (
        <polygon
          key={name}
          points={`${x},${y + size} ${x - size},${y - size * 0.6} ${x + size},${y - size * 0.6}`}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          opacity={defined ? 0.85 : 1}
        />
      );
    case 'diamond':
      return (
        <polygon
          key={name}
          points={`${x},${y - size} ${x + size},${y} ${x},${y + size} ${x - size},${y}`}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          opacity={defined ? 0.85 : 1}
        />
      );
    case 'square':
    default:
      return (
        <rect
          key={name}
          x={x - size}
          y={y - size}
          width={size * 2}
          height={size * 2}
          rx={4}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          opacity={defined ? 0.85 : 1}
        />
      );
  }
}

function BodyGraph({ profile }: BodyGraphProps) {
  // Determine which channels are active
  const allGates = new Set([...profile.personalityGates, ...profile.designGates]);
  const personalityGateSet = new Set(profile.personalityGates);
  const designGateSet = new Set(profile.designGates);

  const activeChannels = CHANNEL_CONNECTIONS.filter(
    (ch) => allGates.has(ch.gates[0]) && allGates.has(ch.gates[1])
  );

  return (
    <div className="flex justify-center py-4">
      <svg viewBox="0 0 300 440" width="280" height="410" className="drop-shadow-sm">
        {/* Background silhouette hint */}
        <ellipse cx="150" cy="220" rx="95" ry="200" fill="#FFF5F0" stroke="none" />

        {/* Channel lines */}
        {activeChannels.map((ch, idx) => {
          const from = CENTER_POSITIONS[ch.from];
          const to = CENTER_POSITIONS[ch.to];
          if (!from || !to) return null;

          const bothPersonality =
            personalityGateSet.has(ch.gates[0]) && personalityGateSet.has(ch.gates[1]);
          const bothDesign =
            designGateSet.has(ch.gates[0]) && designGateSet.has(ch.gates[1]);
          const mixed = !bothPersonality && !bothDesign;

          let strokeColor = '#1F2937'; // personality = black
          if (bothDesign) strokeColor = '#DC2626'; // design = red
          const strokeDash = mixed ? '6,3' : 'none';

          // Offset slightly for parallel channels between same centers
          const sameChannels = activeChannels.filter(
            (c) =>
              (c.from === ch.from && c.to === ch.to) ||
              (c.from === ch.to && c.to === ch.from)
          );
          const myIndex = sameChannels.indexOf(ch);
          const offset = (myIndex - (sameChannels.length - 1) / 2) * 5;

          // Calculate perpendicular offset
          const dx = to.x - from.x;
          const dy = to.y - from.y;
          const len = Math.sqrt(dx * dx + dy * dy);
          const nx = -dy / len;
          const ny = dx / len;

          return (
            <g key={`channel-${idx}`}>
              <line
                x1={from.x + nx * offset}
                y1={from.y + ny * offset}
                x2={to.x + nx * offset}
                y2={to.y + ny * offset}
                stroke={strokeColor}
                strokeWidth={2.5}
                strokeDasharray={strokeDash}
                opacity={0.7}
              />
              {/* Gate numbers along the channel */}
              <text
                x={from.x + (to.x - from.x) * 0.3 + nx * (offset + 8)}
                y={from.y + (to.y - from.y) * 0.3 + ny * (offset + 8)}
                fontSize="8"
                fill="#6B7280"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {ch.gates[0]}
              </text>
              <text
                x={from.x + (to.x - from.x) * 0.7 + nx * (offset + 8)}
                y={from.y + (to.y - from.y) * 0.7 + ny * (offset + 8)}
                fontSize="8"
                fill="#6B7280"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {ch.gates[1]}
              </text>
            </g>
          );
        })}

        {/* Inactive channel lines (faint) */}
        {CHANNEL_CONNECTIONS.filter(
          (ch) => !activeChannels.includes(ch)
        ).map((ch, idx) => {
          const from = CENTER_POSITIONS[ch.from];
          const to = CENTER_POSITIONS[ch.to];
          if (!from || !to) return null;

          const sameChannels = CHANNEL_CONNECTIONS.filter(
            (c) =>
              !activeChannels.includes(c) &&
              ((c.from === ch.from && c.to === ch.to) ||
                (c.from === ch.to && c.to === ch.from))
          );
          const myIndex = sameChannels.indexOf(ch);
          const offset = (myIndex - (sameChannels.length - 1) / 2) * 4;

          const dx = to.x - from.x;
          const dy = to.y - from.y;
          const len = Math.sqrt(dx * dx + dy * dy);
          const nx = -dy / len;
          const ny = dx / len;

          return (
            <line
              key={`inactive-${idx}`}
              x1={from.x + nx * offset}
              y1={from.y + ny * offset}
              x2={to.x + nx * offset}
              y2={to.y + ny * offset}
              stroke="#E5E7EB"
              strokeWidth={1}
              opacity={0.5}
            />
          );
        })}

        {/* Center shapes */}
        {profile.centers.map((center) => {
          const pos = CENTER_POSITIONS[center.name];
          if (!pos) return null;
          return renderCenterShape(
            center.name,
            pos.x,
            pos.y,
            pos.shape,
            center.defined,
            center.color
          );
        })}

        {/* Center labels */}
        {profile.centers.map((center) => {
          const pos = CENTER_POSITIONS[center.name];
          if (!pos) return null;
          const labelName = center.name === 'Solar Plexus' ? 'SP' : center.name === 'Heart' ? 'Heart' : center.name;
          return (
            <text
              key={`label-${center.name}`}
              x={pos.x}
              y={pos.y + 2}
              fontSize="9"
              fontWeight="bold"
              fill={center.defined ? '#FFFFFF' : '#9CA3AF'}
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {labelName}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

// --- Badge Component ---

function Badge({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
      style={{ backgroundColor: color + '15', color }}
    >
      <span className="text-xs opacity-70">{label}:</span>
      <span>{value}</span>
    </div>
  );
}

// --- Main Page Component ---

export default function HumanDesignPage() {
  const router = useRouter();
  const { profile: userProfile } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hdProfile = useMemo(() => {
    if (!userProfile) return null;
    return calculateHumanDesign(
      userProfile.birthDate,
      userProfile.birthTime || '12:00'
    );
  }, [userProfile]);

  if (!mounted) return <div className="min-h-screen bg-white" />;

  if (!userProfile) {
    router.push('/profile');
    return <div className="min-h-screen bg-white" />;
  }

  if (!hdProfile) return <div className="min-h-screen bg-white" />;

  const typeInfo = typeContent[hdProfile.type];
  const authorityInfo = authorityContent[hdProfile.authority];
  const profileInfo = profileContent[hdProfile.profile];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white pb-8">
      <ModuleHeader title="Human Design" subtitle="Your Energetic Blueprint" color={THEME_COLOR} />

      {/* Type Display */}
      <div className="px-5 pt-5 pb-2">
        <Card className="!bg-gradient-to-br !from-orange-500 !via-orange-400 !to-amber-400 !border-0 text-white text-center">
          <p className="text-white/80 text-sm mb-1">You are a</p>
          <h2 className="text-3xl font-bold mb-1">{hdProfile.type}</h2>
          <p className="text-white/80 text-sm">{TYPE_SUBTITLES[hdProfile.type]}</p>
          <div className="flex justify-center gap-2 mt-4 flex-wrap">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
              {typeInfo?.percentage}
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
              Signature: {typeInfo?.signature}
            </span>
          </div>
        </Card>
      </div>

      {/* Strategy, Authority, Profile Badges */}
      <div className="px-5 py-3 flex flex-wrap gap-2">
        <Badge label="Strategy" value={hdProfile.strategy} color={THEME_COLOR} />
        <Badge label="Authority" value={hdProfile.authority} color="#8B6914" />
        <Badge label="Profile" value={`${hdProfile.profile} ${hdProfile.profileName}`} color="#E74C3C" />
      </div>

      {/* Body Graph Visualization */}
      <div className="px-5">
        <Card>
          <h3 className="font-bold text-gray-900 text-center mb-1" style={{ color: THEME_COLOR }}>
            Your Body Graph
          </h3>
          <p className="text-xs text-gray-500 text-center mb-2">
            Defined centers are filled, undefined centers are white
          </p>
          <BodyGraph profile={hdProfile} />
          <div className="flex justify-center gap-4 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="inline-block w-4 h-0.5 bg-gray-800" /> Personality
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-4 h-0.5 bg-red-600" /> Design
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-4 h-0.5 border-t-2 border-dashed border-gray-600" /> Both
            </span>
          </div>
        </Card>
      </div>

      {/* Type Overview */}
      <div className="px-5 mt-4 space-y-4">
        {typeInfo && (
          <SectionCard icon="&#9883;" title={`About ${hdProfile.type}s`} color={THEME_COLOR}>
            <ExpandableText text={typeInfo.overview} maxLength={200} color={THEME_COLOR} />
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 rounded-full bg-orange-50 text-orange-700">
                Aura: {typeInfo.aura}
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-red-50 text-red-700">
                Not-Self: {typeInfo.theme}
              </span>
            </div>
          </SectionCard>
        )}

        {/* Strategy */}
        <SectionCard
          icon="&#10148;"
          title="Strategy"
          description={`Your strategy as a ${hdProfile.type} is: ${hdProfile.strategy}`}
          color={THEME_COLOR}
        >
          {hdProfile.type === 'Manifestor' && (
            <p>
              As a Manifestor, your strategy is to inform those who will be impacted before
              you take action. This is not asking for permission -- it is a courtesy that
              reduces resistance and allows your initiatives to flow more smoothly. When you
              inform, you experience peace. When you do not, you encounter anger and
              opposition.
            </p>
          )}
          {(hdProfile.type === 'Generator' || hdProfile.type === 'Manifesting Generator') && (
            <p>
              Your strategy is to wait to respond to life rather than initiating from your
              mind. Pay attention to what shows up in your environment -- opportunities,
              invitations, questions -- and notice your Sacral gut response. A rising,
              excited energy means yes. A flat or sinking feeling means no. Trusting this
              response leads to deep satisfaction in everything you do.
            </p>
          )}
          {hdProfile.type === 'Projector' && (
            <p>
              Your strategy is to wait for recognition and invitation before sharing your
              guidance or entering into major life commitments (career, relationships,
              living situations). When you are truly recognized for your gifts and formally
              invited, your guidance lands powerfully and leads to success. Without
              invitation, your wisdom may be ignored or resented.
            </p>
          )}
          {hdProfile.type === 'Reflector' && (
            <p>
              Your strategy is to wait a full lunar cycle (approximately 28 days) before
              making major decisions. Because your energy changes with the movement of the
              Moon through the gates of the mandala, what feels right on one day may feel
              completely different a week later. Give yourself the full month to experience
              all the different perspectives before committing.
            </p>
          )}
        </SectionCard>

        {/* Authority */}
        {authorityInfo && (
          <SectionCard
            icon="&#9878;"
            title="Authority"
            description={hdProfile.authority}
            color="#8B6914"
          >
            <ExpandableText text={authorityInfo.description} maxLength={180} color="#8B6914" />
            <div className="mt-3 p-3 bg-amber-50 rounded-lg">
              <p className="text-xs font-semibold text-amber-800 mb-1">How to Use Your Authority:</p>
              <p className="text-xs text-amber-700">{authorityInfo.howToUse}</p>
            </div>
          </SectionCard>
        )}

        {/* Profile */}
        {profileInfo && (
          <SectionCard
            icon="&#128100;"
            title="Profile"
            description={`${hdProfile.profile} ${profileInfo.name}`}
            color="#E74C3C"
          >
            <ExpandableText text={profileInfo.description} maxLength={200} color="#E74C3C" />
          </SectionCard>
        )}

        {/* Incarnation Cross */}
        <SectionCard
          icon="&#10010;"
          title="Incarnation Cross"
          description={hdProfile.incarnationCross}
          color={THEME_COLOR}
        >
          <p>
            Your Incarnation Cross represents your life purpose and the overarching theme of
            your existence. It is determined by the positions of your Sun and Earth gates in
            both your personality (conscious) and design (unconscious) calculations. Living
            your design correctly -- following your strategy and authority -- naturally
            brings you into alignment with your cross.
          </p>
        </SectionCard>

        {/* Defined Centers */}
        <SectionCard icon="&#9724;" title="Defined Centers" color={THEME_COLOR}>
          <div className="space-y-3">
            {hdProfile.definedCenters.length === 0 ? (
              <p className="text-gray-500 italic">
                As a Reflector, you have no defined centers. Your complete openness is your
                greatest gift, allowing you to mirror and sample the energies around you.
              </p>
            ) : (
              hdProfile.definedCenters.map((centerName) => {
                const info = centerContent[centerName];
                if (!info) return null;
                return (
                  <div key={centerName} className="border-l-2 pl-3" style={{ borderColor: THEME_COLOR }}>
                    <p className="font-semibold text-sm text-gray-900">{info.name}</p>
                    <p className="text-xs text-gray-500 mb-1">{info.theme}</p>
                    <p className="text-xs text-gray-600">{info.definedMeaning}</p>
                  </div>
                );
              })
            )}
          </div>
        </SectionCard>

        {/* Undefined Centers */}
        <SectionCard icon="&#9723;" title="Undefined Centers (Open)" color="#9CA3AF">
          <div className="space-y-3">
            {hdProfile.undefinedCenters.length === 0 ? (
              <p className="text-gray-500 italic">All your centers are defined.</p>
            ) : (
              hdProfile.undefinedCenters.map((centerName) => {
                const info = centerContent[centerName];
                if (!info) return null;
                return (
                  <div key={centerName} className="border-l-2 border-gray-300 pl-3">
                    <p className="font-semibold text-sm text-gray-900">{info.name}</p>
                    <p className="text-xs text-gray-500 mb-1">{info.theme}</p>
                    <p className="text-xs text-gray-600">{info.undefinedMeaning}</p>
                  </div>
                );
              })
            )}
          </div>
        </SectionCard>

        {/* Active Channels */}
        {hdProfile.channels.length > 0 && (
          <SectionCard icon="&#9866;" title="Active Channels" color={THEME_COLOR}>
            <div className="space-y-2">
              {hdProfile.channels.map((channel) => (
                <div
                  key={channel}
                  className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg"
                >
                  <span className="text-sm font-mono font-bold" style={{ color: THEME_COLOR }}>
                    {channel.split(' ')[0]}
                  </span>
                  <span className="text-xs text-gray-600">
                    {channel.includes('(') ? channel.split('(')[1]?.replace(')', '') : ''}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Channels connect two centers and represent consistent life themes and energies
              that are always active in your design.
            </p>
          </SectionCard>
        )}

        {/* Gates */}
        <SectionCard icon="&#9947;" title="Active Gates" color={THEME_COLOR}>
          <div className="mb-3">
            <p className="text-xs font-semibold text-gray-800 mb-1.5">
              Personality Gates (Conscious)
            </p>
            <div className="flex flex-wrap gap-1.5">
              {hdProfile.personalityGates.map((gate) => (
                <span
                  key={`p-${gate}`}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold bg-gray-100 text-gray-800 border border-gray-300"
                >
                  {gate}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800 mb-1.5">
              Design Gates (Unconscious)
            </p>
            <div className="flex flex-wrap gap-1.5">
              {hdProfile.designGates.map((gate) => (
                <span
                  key={`d-${gate}`}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200"
                >
                  {gate}
                </span>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Gates represent specific energetic themes from the I Ching. Personality gates
            are qualities you are conscious of; design gates operate beneath your awareness.
          </p>
        </SectionCard>

        {/* Career */}
        {typeInfo && (
          <SectionCard icon="&#128188;" title="Career & Work" color={THEME_COLOR}>
            <ExpandableText text={typeInfo.career} maxLength={200} color={THEME_COLOR} />
          </SectionCard>
        )}

        {/* Relationships */}
        {typeInfo && (
          <SectionCard icon="&#10084;" title="Relationships" color="#E74C3C">
            <ExpandableText text={typeInfo.relationships} maxLength={200} color="#E74C3C" />
          </SectionCard>
        )}

        {/* Strengths & Challenges */}
        {typeInfo && (
          <SectionCard icon="&#9889;" title="Strengths & Challenges" color={THEME_COLOR}>
            <div className="mb-3">
              <p className="text-xs font-semibold text-green-700 mb-1">Strengths</p>
              <ExpandableText text={typeInfo.strengths} maxLength={180} color="#16A34A" />
            </div>
            <div>
              <p className="text-xs font-semibold text-amber-700 mb-1">Challenges</p>
              <ExpandableText text={typeInfo.challenges} maxLength={180} color="#D97706" />
            </div>
          </SectionCard>
        )}
      </div>
    </div>
  );
}
