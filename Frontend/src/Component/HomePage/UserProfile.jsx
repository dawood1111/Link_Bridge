import React from 'react';
import { useNavigate } from 'react-router-dom';

export function UserProfilePanel({ user = {} }) {
    const navigate = useNavigate();

    const {
        firstName = 'Dawod',
        lastName = 'Jaber',
        email = 'dawod@apss.com',
        role = 'Administrator',
        company = 'APSS',
        location = 'Amman, Jordan',
        phone = '+962 7x xxx xxxx',
        joinDate = 'March 2024',
        isOnline = true,
        stats = { posts: 24, projects: 7, teams: 3 },
        permissions = ['Admin', 'IT Solution', 'Editor'],
        activity = [
            { label: 'Posted "Dallas — two video wall"', time: '1mo', color: '#E07B39' },
            { label: 'Completed CCTV installation',      time: '2mo', color: '#1D9E75' },
            { label: 'Joined APSS platform',             time: 'Mar 24', color: '#0c2b78' },
        ],
        projectActivity = [
            { name: 'IT Solution',   pct: 70, color: '#0c2b78' },
            { name: 'Construction',  pct: 45, color: '#E07B39' },
            { name: 'Maintenance',   pct: 20, color: '#1D9E75' },
        ],
    } = user;

    const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();

    const permissionStyle = (p) => {
        const map = {
            'Admin':        'bg-[#e8edf8] text-[#0c2b78]',
            'IT Solution':  'bg-[#FEF0E6] text-[#854F0B]',
            'Editor':       'bg-[#EAF3DE] text-[#3B6D11]',
            'Construction': 'bg-[#E6F1FB] text-[#0C447C]',
            'Maintenance':  'bg-[#FCEBEB] text-[#A32D2D]',
        };
        return map[p] ?? 'bg-gray-100 text-gray-600';
    };

    return (
        <div className="w-[450px] bg-white border border-gray-100 rounded-2xl overflow-scroll shadow-sm flex flex-col fixed top-22 h-160 right-2">

            {/* Cover */}
            <div className="bg-[#0c2b78] h-16 relative flex-shrink-0"
                style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 0, transparent 50%)',
                    backgroundSize: '12px 12px',
                }}
            />

            {/* Avatar + Info */}
            <div className="px-4 pb-4 -mt-7 relative z-10">
                <div className="relative inline-block">
                    <div className="w-14 h-14 rounded-full bg-[#E07B39] flex items-center justify-center text-white text-lg font-medium border-[3px] border-white">
                        {initials}
                    </div>
                    {isOnline && (
                        <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-[#1D9E75] border-2 border-white" />
                    )}
                </div>
                <p className="text-[15px] font-medium text-gray-900 mt-1">{firstName} {lastName}</p>
                <p className="text-xs text-gray-400 mt-0.5">{role} · {company}</p>
                <p className="text-xs text-[#378ADD] mt-0.5">{email}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 border-t border-b border-gray-100">
                {[
                    { label: 'Posts',    value: stats.posts    },
                    { label: 'Projects', value: stats.projects },
                    { label: 'Teams',    value: stats.teams    },
                ].map((s, i) => (
                    <div key={i} className={`py-2.5 text-center ${i < 2 ? 'border-r border-gray-100' : ''}`}>
                        <p className="text-base font-medium text-gray-900">{s.value}</p>
                        <p className="text-[10px] uppercase tracking-wide text-gray-400 mt-0.5">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Details */}
            <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-2.5">Details</p>
                {[
                    {
                        icon: (
                            <svg viewBox="0 0 24 24" fill="none" stroke="#0c2b78" strokeWidth="1.8" strokeLinecap="round" className="w-3.5 h-3.5">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                            </svg>
                        ),
                        label: 'Location', value: location,
                    },
                    {
                        icon: (
                            <svg viewBox="0 0 24 24" fill="none" stroke="#0c2b78" strokeWidth="1.8" strokeLinecap="round" className="w-3.5 h-3.5">
                                <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                            </svg>
                        ),
                        label: 'Joined', value: joinDate,
                    },
                    {
                        icon: (
                            <svg viewBox="0 0 24 24" fill="none" stroke="#0c2b78" strokeWidth="1.8" strokeLinecap="round" className="w-3.5 h-3.5">
                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.18 1.22 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.16a16 16 0 006.93 6.93l1.42-1.42a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                            </svg>
                        ),
                        label: 'Phone', value: phone,
                    },
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 mb-2 last:mb-0">
                        <div className="w-7 h-7 rounded-lg bg-[#e8edf8] flex items-center justify-center flex-shrink-0">
                            {item.icon}
                        </div>
                        <div>
                            <p className="text-[11px] text-gray-400">{item.label}</p>
                            <p className="text-xs font-medium text-gray-800">{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Roles & Permissions */}
            <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-2.5">Roles & permissions</p>
                <div className="flex flex-wrap gap-1.5">
                    {permissions.map((p, i) => (
                        <span key={i} className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${permissionStyle(p)}`}>
                            {p}
                        </span>
                    ))}
                </div>
            </div>

            {/* Project Activity */}
            <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-2.5">Project activity</p>
                {projectActivity.map((item, i) => (
                    <div key={i} className="mb-2 last:mb-0">
                        <div className="flex justify-between mb-1">
                            <span className="text-xs text-gray-500">{item.name}</span>
                            <span className="text-xs font-medium text-gray-800">{item.pct}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{ width: `${item.pct}%`, background: item.color }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-2.5">Recent activity</p>
                {activity.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 mb-2 last:mb-0">
                        <span className="w-2 h-2 rounded-full mt-1 flex-shrink-0" style={{ background: item.color }} />
                        <p className="text-xs text-gray-500 flex-1 leading-relaxed">{item.label}</p>
                        <span className="text-[11px] text-gray-400 whitespace-nowrap">{item.time}</span>
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2 px-4 py-3">
                <button
                    onClick={() => navigate('/MainPage/Profile')}
                    className="flex-1 bg-[#0c2b78] text-white text-xs font-medium py-2 rounded-lg hover:bg-[#1a3a8f] transition-colors"
                >
                    Edit profile
                </button>
                <button
                    onClick={() => navigate('/login')}
                    className="flex-1 border border-gray-200 text-gray-500 text-xs py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Sign out
                </button>
            </div>

        </div>
    );
}

export default UserProfilePanel;
