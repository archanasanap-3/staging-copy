'use client';

import {
  LayoutDashboard,
  FolderKanban,
  Zap,
  BarChart3,
  Plug,
  Users,
  Settings,
  ChevronDown,
  Clock,
  TrendingUp,
  ArrowUp,
} from 'lucide-react';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: FolderKanban, label: 'Projects' },
  { icon: Zap, label: 'Automations' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Plug, label: 'Integrations' },
  { icon: Users, label: 'Team' },
  { icon: Settings, label: 'Settings' },
];

const STATS = [
  { icon: FolderKanban, iconBg: '#ede9fe', iconColor: '#7c3aed', value: '12', label: 'Total Projects', trend: '↑ 20%' },
  { icon: Zap, iconBg: '#dcfce7', iconColor: '#16a34a', value: '28', label: 'Automations Running', trend: '↑ 35%' },
  { icon: Clock, iconBg: '#dbeafe', iconColor: '#2563eb', value: '320 hrs', label: 'Time Saved', trend: '↑ 41%' },
  { icon: TrendingUp, iconBg: '#ffe4d5', iconColor: '#FF4800', value: '₹4.2L', label: 'Cost Reduction', trend: '↑ 32%' },
];

const TASK_BREAKDOWN = [
  { label: 'Completed', value: 62, color: '#FF4800' },
  { label: 'In Progress', value: 24, color: '#ffb98a' },
  { label: 'Review', value: 10, color: '#cbd5e1' },
  { label: 'Blocked', value: 4, color: '#e2e8f0' },
];

const RECENT_ACTIVITY = [
  { icon: FolderKanban, iconColor: '#7c3aed', iconBg: '#ede9fe', title: 'New automation deployed', sub: 'Customer onboarding flow', time: '2m ago' },
  { icon: Plug, iconColor: '#2563eb', iconBg: '#dbeafe', title: 'Integration connected', sub: 'CRM integration', time: '12m ago' },
  { icon: Users, iconColor: '#16a34a', iconBg: '#dcfce7', title: 'Team member added', sub: 'priya@company.com', time: '28m ago' },
];

const WORKFLOWS = [
  { label: 'Lead Nurturing', status: 'Active' },
  { label: 'Client Onboarding', status: 'Active' },
  { label: 'Data Sync', status: 'Paused' },
  { label: 'Follow-up Reminders', status: 'Active' },
];

function donutSegments(radius: number, circumference: number) {
  let offset = 0;
  return TASK_BREAKDOWN.map((seg) => {
    const len = (seg.value / 100) * circumference;
    const dash = `${len} ${circumference - len}`;
    const dashoffset = -offset;
    offset += len;
    return { ...seg, dash, dashoffset };
  });
}

export default function DashboardMockup({ isDark }: { isDark: boolean }) {
  const panelBg = isDark ? 'rgba(13,13,24,0.97)' : '#ffffff';
  const sidebarBg = isDark ? 'rgba(9,9,18,0.9)' : '#fafaf9';
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.07)';
  const textPrimary = isDark ? '#f0f0f5' : '#0f172a';
  const textMuted = isDark ? '#8892a6' : '#8a94a6';
  const cardBg = isDark ? 'rgba(255,255,255,0.03)' : '#fbfbfa';

  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const segments = donutSegments(radius, circumference);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        background: panelBg,
        borderRadius: '20px',
        border: `1px solid ${border}`,
        overflow: 'hidden',
        fontFamily: 'var(--font-plus-jakarta-sans), "Plus Jakarta Sans", system-ui, sans-serif',
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: '96px',
          flexShrink: 0,
          background: sidebarBg,
          borderRight: `1px solid ${border}`,
          padding: '14px 8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '0 4px', marginBottom: '16px' }}>
          <span style={{ color: '#FF4800', fontSize: '10px', fontWeight: 900 }}>●</span>
          <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.04em', color: textPrimary }}>STRAVEDA</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 6px',
                borderRadius: '7px',
                background: active ? (isDark ? 'rgba(255,72,0,0.16)' : 'rgba(255,72,0,0.08)') : 'transparent',
              }}
            >
              <Icon size={10} strokeWidth={2.3} style={{ color: active ? '#FF4800' : textMuted, flexShrink: 0 }} />
              <span style={{ fontSize: '7.5px', fontWeight: active ? 700 : 500, color: active ? '#FF4800' : textMuted, whiteSpace: 'nowrap' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, minWidth: 0, padding: '14px 16px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div>
            <p style={{ fontSize: '12px', fontWeight: 800, color: textPrimary, margin: 0 }}>Good morning!</p>
            <p style={{ fontSize: '7.5px', color: textMuted, margin: '2px 0 0 0' }}>Here&apos;s what&apos;s happening with your business today.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            <div
              style={{
                display: 'flex', alignItems: 'center', gap: '3px',
                border: `1px solid ${border}`, borderRadius: '999px', padding: '3px 7px',
              }}
            >
              <span style={{ fontSize: '7px', fontWeight: 600, color: textMuted, whiteSpace: 'nowrap' }}>Last 30 days</span>
              <ChevronDown size={8} style={{ color: textMuted }} />
            </div>
            <div
              style={{
                width: '16px', height: '16px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #FF4800, #ff8c00)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '7px', fontWeight: 800, color: '#fff', flexShrink: 0,
              }}
            >
              V
            </div>
          </div>
        </div>

        {/* Stat tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '10px' }}>
          {STATS.map(({ icon: Icon, iconBg, iconColor, value, label, trend }) => (
            <div
              key={label}
              style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: '9px', padding: '6px 7px' }}
            >
              <div
                style={{
                  width: '16px', height: '16px', borderRadius: '5px', background: iconBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4px',
                }}
              >
                <Icon size={9} style={{ color: iconColor }} strokeWidth={2.4} />
              </div>
              <p style={{ fontSize: '11px', fontWeight: 800, color: textPrimary, margin: 0, letterSpacing: '-0.3px' }}>{value}</p>
              <p style={{ fontSize: '6px', color: textMuted, margin: '1px 0 3px 0', lineHeight: 1.2 }}>{label}</p>
              <span style={{ fontSize: '6.5px', fontWeight: 700, color: '#16a34a', display: 'flex', alignItems: 'center', gap: '1px' }}>
                <ArrowUp size={7} strokeWidth={3} />{trend.replace('↑ ', '')}
              </span>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '6px', marginBottom: '10px' }}>
          {/* Activity Overview */}
          <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: '9px', padding: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '8px', fontWeight: 800, color: textPrimary }}>Activity Overview</span>
              <span style={{ fontSize: '6px', color: textMuted }}>Last 30 days</span>
            </div>
            <svg viewBox="0 0 160 54" style={{ width: '100%', height: '46px', display: 'block' }}>
              <defs>
                <linearGradient id="activityFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF4800" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#FF4800" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,38 L18,30 L36,34 L54,20 L72,26 L90,14 L108,22 L126,10 L144,16 L160,6 L160,54 L0,54 Z"
                fill="url(#activityFill)"
              />
              <path
                d="M0,38 L18,30 L36,34 L54,20 L72,26 L90,14 L108,22 L126,10 L144,16 L160,6"
                fill="none"
                stroke="#FF4800"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Task Breakdown */}
          <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: '9px', padding: '8px' }}>
            <span style={{ fontSize: '8px', fontWeight: 800, color: textPrimary }}>Task Breakdown</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
              <svg viewBox="0 0 80 80" style={{ width: '46px', height: '46px', flexShrink: 0 }}>
                <g transform="translate(40,40) rotate(-90)">
                  <circle r={radius} fill="none" stroke={isDark ? 'rgba(255,255,255,0.06)' : '#f1f5f4'} strokeWidth="10" />
                  {segments.map((seg) => (
                    <circle
                      key={seg.label}
                      r={radius}
                      fill="none"
                      stroke={seg.color}
                      strokeWidth="10"
                      strokeDasharray={seg.dash}
                      strokeDashoffset={seg.dashoffset}
                    />
                  ))}
                </g>
                <text x="40" y="37" textAnchor="middle" fontSize="12" fontWeight="800" fill={textPrimary}>28</text>
                <text x="40" y="48" textAnchor="middle" fontSize="6.5" fill={textMuted}>Total</text>
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0 }}>
                {TASK_BREAKDOWN.map((seg) => (
                  <div key={seg.label} style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: seg.color, flexShrink: 0 }} />
                    <span style={{ fontSize: '6px', color: textMuted, whiteSpace: 'nowrap' }}>{seg.label}</span>
                    <span style={{ fontSize: '6px', fontWeight: 700, color: textPrimary, marginLeft: 'auto' }}>{seg.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Activity + Workflows row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
          <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: '9px', padding: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ fontSize: '8px', fontWeight: 800, color: textPrimary }}>Recent Activity</span>
              <span style={{ fontSize: '6px', fontWeight: 700, color: '#FF4800' }}>View all</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {RECENT_ACTIVITY.map(({ icon: Icon, iconColor, iconBg, title, sub, time }) => (
                <div key={title} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <div
                    style={{
                      width: '14px', height: '14px', borderRadius: '5px', background: iconBg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}
                  >
                    <Icon size={7.5} style={{ color: iconColor }} strokeWidth={2.4} />
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <p style={{ fontSize: '6.5px', fontWeight: 700, color: textPrimary, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</p>
                    <p style={{ fontSize: '6px', color: textMuted, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sub}</p>
                  </div>
                  <span style={{ fontSize: '5.5px', color: textMuted, flexShrink: 0 }}>{time}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: '9px', padding: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ fontSize: '8px', fontWeight: 800, color: textPrimary }}>Active Workflows</span>
              <span style={{ fontSize: '6px', fontWeight: 700, color: '#FF4800' }}>View all</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {WORKFLOWS.map(({ label, status }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span
                    style={{
                      width: '5px', height: '5px', borderRadius: '50%', flexShrink: 0,
                      background: status === 'Active' ? '#16a34a' : '#cbd5e1',
                    }}
                  />
                  <span style={{ fontSize: '6.5px', fontWeight: 600, color: textPrimary, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</span>
                  <span
                    style={{
                      fontSize: '5.5px', fontWeight: 700, padding: '1.5px 5px', borderRadius: '999px', flexShrink: 0,
                      color: status === 'Active' ? '#16a34a' : textMuted,
                      background: status === 'Active' ? (isDark ? 'rgba(22,163,74,0.15)' : '#dcfce7') : (isDark ? 'rgba(255,255,255,0.06)' : '#f1f5f9'),
                    }}
                  >
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
