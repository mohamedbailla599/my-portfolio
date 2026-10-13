const labelProps = {
  fill: '#aeb8d6',
  fontSize: 9,
  fontFamily: 'var(--font-geist-mono), monospace',
  textAnchor: 'middle' as const,
}

function Defs({ p }: { p: string }) {
  return (
    <defs>
      <linearGradient id={`${p}-g`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#4c93ff" />
        <stop offset="1" stopColor="#9a5cff" />
      </linearGradient>
      <radialGradient id={`${p}-glow`} cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor="#287bff" stopOpacity="0.28" />
        <stop offset="1" stopColor="#287bff" stopOpacity="0" />
      </radialGradient>
      <pattern id={`${p}-dots`} width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.8" fill="#6f8cff" fillOpacity="0.22" />
      </pattern>
    </defs>
  )
}

function Node({
  x,
  y,
  w,
  h,
  label,
  p,
  accent,
}: {
  x: number
  y: number
  w: number
  h: number
  label: string
  p: string
  accent?: boolean
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="8"
        fill="#0d1430"
        stroke={accent ? `url(#${p}-g)` : '#3a4a8f'}
        strokeOpacity={accent ? 1 : 0.7}
      />
      <text x={x + w / 2} y={y + h / 2 + 3} {...labelProps} fill="#dfe6ff">
        {label}
      </text>
    </g>
  )
}

function Booking() {
  const p = 'bk'
  return (
    <svg viewBox="0 0 360 200" className="size-full" aria-hidden="true" focusable="false">
      <Defs p={p} />
      <rect width="360" height="200" fill={`url(#${p}-dots)`} />
      <ellipse cx="180" cy="100" rx="170" ry="90" fill={`url(#${p}-glow)`} />
      <g fill="none" stroke="#4c7fe0" strokeOpacity="0.75" strokeWidth="1.2">
        <path className="flow-dash" d="M88 54 L88 85" />
        <path className="flow-dash" d="M88 100 C110 100 110 43 130 43" />
        <path className="flow-dash" d="M88 100 L130 100" />
        <path className="flow-dash" d="M88 100 C110 100 110 157 130 157" />
        <path className="flow-dash" stroke="#9a5cff" d="M200 43 C225 43 225 92 238 92" />
        <path className="flow-dash" stroke="#9a5cff" d="M200 100 L238 100" />
        <path className="flow-dash" stroke="#9a5cff" d="M200 157 C225 157 225 108 238 108" />
        <path className="flow-dash" d="M200 43 C240 43 255 50 262 58" />
        <path className="flow-dash" d="M200 157 C250 157 290 160 300 150" />
      </g>
      <Node x={20} y={22} w={68} h={32} label="Keycloak" p={p} />
      <Node x={20} y={85} w={68} h={30} label="API Gateway" p={p} accent />
      <Node x={130} y={28} w={70} h={30} label="Flight" p={p} />
      <Node x={130} y={85} w={70} h={30} label="Passenger" p={p} />
      <Node x={130} y={142} w={70} h={30} label="Booking" p={p} />
      <g>
        <rect x="238" y="84" width="104" height="32" rx="16" fill="#12183a" stroke="#9a5cff" strokeOpacity="0.8" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={252 + i * 24} y={94} width="16" height="12" rx="3" fill="url(#bk-g)" opacity={0.9 - i * 0.2} />
        ))}
        <text x="290" y="132" {...labelProps}>RabbitMQ</text>
      </g>
      <g>
        <path d="M252 28 v24 a15 6 0 0 0 30 0 v-24 a15 6 0 0 0 -30 0 z" fill="#0d1430" stroke="#4c93ff" />
        <ellipse cx="267" cy="28" rx="15" ry="6" fill="#16224f" stroke="#4c93ff" />
        <text x="267" y="68" {...labelProps}>Postgres</text>
      </g>
      <g>
        <path d="M300 142 v24 a15 6 0 0 0 30 0 v-24 a15 6 0 0 0 -30 0 z" fill="#0d1430" stroke="#9a5cff" />
        <ellipse cx="315" cy="142" rx="15" ry="6" fill="#241a52" stroke="#9a5cff" />
        <text x="315" y="184" {...labelProps}>Mongo</text>
      </g>
    </svg>
  )
}

function GreenFlow() {
  const p = 'gf'
  return (
    <svg viewBox="0 0 360 200" className="size-full" aria-hidden="true" focusable="false">
      <Defs p={p} />
      <rect width="360" height="200" fill={`url(#${p}-dots)`} />
      <ellipse cx="110" cy="110" rx="130" ry="90" fill={`url(#${p}-glow)`} />
      <path d="M110 26 C100 42 94 50 94 58 a16 16 0 0 0 32 0 C126 50 120 42 110 26 z" fill={`url(#${p}-g)`} opacity="0.9" />
      <path d="M110 74 v78" stroke="#3ddc97" strokeWidth="3" strokeLinecap="round" />
      <path d="M110 128 C84 126 72 110 74 94 C98 94 110 108 110 128 z" fill="#1fa86f" fillOpacity="0.85" />
      <path d="M110 108 C136 106 148 90 146 74 C122 74 110 88 110 108 z" fill="#3ddc97" fillOpacity="0.85" />
      <path d="M64 156 h92 l-8 22 h-76 z" fill="#1a2250" stroke="#4c7fe0" strokeOpacity="0.6" />
      <g fill="none" stroke="#4c93ff" strokeOpacity="0.5">
        <circle className="animate-blink" cx="110" cy="156" r="18" />
        <circle className="animate-blink" cx="110" cy="156" r="30" style={{ animationDelay: '0.6s' }} />
      </g>
      <path className="flow-dash" d="M150 120 C190 120 200 100 226 100" fill="none" stroke="#9a5cff" strokeWidth="1.2" />
      <rect x="226" y="40" width="112" height="120" rx="12" fill="#0d1430" stroke="#3a4a8f" />
      <text x="238" y="60" fill="#dfe6ff" fontSize="9" fontFamily="var(--font-geist-mono), monospace">Soil moisture</text>
      <path d="M238 118 L254 100 L270 108 L288 80 L304 90 L326 70" fill="none" stroke={`url(#${p}-g)`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M238 118 L254 100 L270 108 L288 80 L304 90 L326 70 V138 H238 z" fill="#287bff" fillOpacity="0.1" />
      <rect x="238" y="144" width="62" height="10" rx="5" fill="#16224f" />
      <path d="M248 149 l3 -4 l3 4 l-3 4 z M262 147 l1.4 2 l2.2 .3 -1.6 1.5 .4 2.2 -2 -1 -2 1 .4 -2.2 -1.6 -1.5 2.2 -.3 z" fill="#9a5cff" />
      <text x="282" y="152" fill="#aeb8d6" fontSize="7" fontFamily="var(--font-geist-mono), monospace">Gemini</text>
    </svg>
  )
}

function Traffic() {
  const p = 'tf'
  return (
    <svg viewBox="0 0 360 200" className="size-full" aria-hidden="true" focusable="false">
      <Defs p={p} />
      <rect width="360" height="200" fill={`url(#${p}-dots)`} />
      <polygon points="100,0 262,0 352,200 8,200" fill="#0a1128" stroke="#3a4a8f" strokeOpacity="0.7" />
      <g stroke="#6f8cff" strokeOpacity="0.45" strokeDasharray="8 8" fill="none">
        <path d="M153 0 L123 200" />
        <path d="M207 0 L237 200" />
      </g>
      <path className="flow-dash" d="M20 104 H340" stroke="#9a5cff" strokeOpacity="0.8" fill="none" />
      <path d="M140 52 L136 84 L133 110" fill="none" stroke="#4c93ff" strokeDasharray="3 4" strokeWidth="1.5" />
      <g>
        <rect x="122" y="108" width="34" height="22" rx="4" fill="#223a8c" />
        <path d="M118 112 v-4 h8 M152 108 h8 v4 M118 126 v4 h8 M152 130 h8 v-4" stroke="#9a5cff" strokeWidth="1.6" fill="none" />
        <text x="139" y="104" {...labelProps}>car · 07</text>
      </g>
      <g>
        <rect x="203" y="70" width="24" height="16" rx="3" fill="#2f2a8c" />
        <path d="M199 74 v-4 h6 M225 70 h6 v4 M199 82 v4 h6 M225 86 h6 v-4" stroke="#4c93ff" strokeWidth="1.4" fill="none" />
        <text x="215" y="66" {...labelProps}>car · 12</text>
      </g>
      <g>
        <rect x="252" y="140" width="48" height="30" rx="4" fill="#3a2494" />
        <path d="M247 144 v-5 h9 M296 139 h9 v5 M247 166 v5 h9 M296 171 h9 v-5" stroke="#9a5cff" strokeWidth="1.6" fill="none" />
        <text x="276" y="135" {...labelProps}>truck · 03</text>
      </g>
      <g fill="#aeb8d6" fontSize="8" fontFamily="var(--font-geist-mono), monospace">
        <text x="20" y="22">LANE 1</text>
        <text x="20" y="34">LANE 2</text>
        <text x="20" y="46">LANE 3</text>
      </g>
    </svg>
  )
}

function Pos() {
  const p = 'pos'
  return (
    <svg viewBox="0 0 360 200" className="size-full" aria-hidden="true" focusable="false">
      <Defs p={p} />
      <rect width="360" height="200" fill={`url(#${p}-dots)`} />
      <ellipse cx="180" cy="100" rx="170" ry="90" fill={`url(#${p}-glow)`} />
      <rect x="28" y="18" width="88" height="164" rx="16" fill="#0d1430" stroke={`url(#${p}-g)`} strokeWidth="1.5" />
      <rect x="62" y="24" width="20" height="4" rx="2" fill="#2a356f" />
      {[0, 1, 2].map((r) =>
        [0, 1].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={38 + c * 36}
            y={40 + r * 40}
            width="32"
            height="32"
            rx="7"
            fill={r === 1 && c === 1 ? '#287bff' : '#16224f'}
            fillOpacity={r === 1 && c === 1 ? 0.55 : 1}
            stroke="#3a4a8f"
            strokeOpacity="0.6"
          />
        )),
      )}
      <path className="flow-dash" d="M120 100 H168" stroke="#9a5cff" strokeWidth="1.4" fill="none" />
      <path d="M168 96 l6 4 l-6 4" fill="none" stroke="#9a5cff" strokeWidth="1.4" />
      <path d="M180 26 h84 v136 l-7 -6 l-7 6 l-7 -6 l-7 6 l-7 -6 l-7 6 l-7 -6 l-7 6 l-7 -6 l-7 6 l-7 -6 z" fill="#0d1430" stroke="#4c7fe0" strokeOpacity="0.75" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="190" y={42 + i * 16} width={44 - i * 4} height="4" rx="2" fill="#5b6cb0" fillOpacity="0.8" />
          <rect x="244" y={42 + i * 16} width="14" height="4" rx="2" fill="#9a5cff" fillOpacity="0.8" />
        </g>
      ))}
      <g stroke="#dfe6ff" strokeWidth="1.4">
        {[0, 4, 7, 12, 15, 20, 24, 28, 31, 36, 40, 45, 49, 52].map((o) => (
          <path key={o} d={`M${192 + o * 1.1} 116 v22`} />
        ))}
      </g>
      <g>
        <rect x="284" y="26" width="58" height="58" rx="10" fill="#0d1430" stroke="#3a4a8f" strokeOpacity="0.7" />
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <rect key={`${r}-${c}`} x={291 + c * 17} y={33 + r * 17} width="12" height="12" rx="3" fill={(r + c) % 2 ? '#287bff' : '#9a5cff'} fillOpacity={(r * 3 + c) % 4 === 0 ? 0.25 : 0.7} />
          )),
        )}
        <text x="313" y="98" {...labelProps}>Inventory</text>
      </g>
      <circle cx="313" cy="145" r="22" fill="#0d1430" stroke={`url(#${p}-g)`} strokeWidth="1.5" />
      <path d="M303 145 l7 7 l13 -14" fill="none" stroke="#3ddc97" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Crowd() {
  const p = 'cs'
  return (
    <svg viewBox="0 0 360 200" className="size-full" aria-hidden="true" focusable="false">
      <Defs p={p} />
      <rect width="360" height="200" fill={`url(#${p}-dots)`} />
      <g fill="none" stroke="#4c7fe0" strokeOpacity="0.55">
        <ellipse cx="180" cy="100" rx="150" ry="84" />
        <ellipse cx="180" cy="100" rx="122" ry="66" strokeOpacity="0.4" />
        <ellipse cx="180" cy="100" rx="94" ry="48" strokeOpacity="0.3" />
      </g>
      <rect x="128" y="76" width="104" height="48" rx="24" fill="#0f2a63" fillOpacity="0.55" stroke="#4c93ff" strokeOpacity="0.8" />
      <path d="M180 76 v48 M128 100 h104" stroke="#4c93ff" strokeOpacity="0.35" />
      <circle cx="238" cy="150" r="30" fill="#823dff" fillOpacity="0.28" className="animate-blink" />
      {[
        [226, 142], [236, 150], [246, 144], [232, 158], [244, 158], [252, 150], [224, 152],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.4" fill="#c9a6ff" />
      ))}
      <path
        className="flow-dash"
        d="M34 150 C70 170 110 176 150 170 C200 160 230 110 262 62"
        fill="none"
        stroke={`url(#${p}-g)`}
        strokeWidth="2"
      />
      <path d="M262 62 l-9 3 m9 -3 l1 9" stroke="#9a5cff" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="34" cy="150" r="5" fill="#0d1430" stroke="#4c93ff" strokeWidth="2" />
      <text x="34" y="170" {...labelProps}>Gate</text>
      <g>
        <circle cx="272" cy="52" r="9" fill="#9a5cff" fillOpacity="0.25" />
        <circle cx="272" cy="52" r="4" fill="#9a5cff" />
        <text x="272" y="36" {...labelProps}>Seat</text>
      </g>
      <text x="238" y="194" {...labelProps}>Crowded</text>
    </svg>
  )
}

function Fallback() {
  const p = 'fb'
  return (
    <svg viewBox="0 0 360 200" className="size-full" aria-hidden="true" focusable="false">
      <Defs p={p} />
      <rect width="360" height="200" fill={`url(#${p}-dots)`} />
      <ellipse cx="180" cy="100" rx="170" ry="90" fill={`url(#${p}-glow)`} />
      <Node x={130} y={85} w={100} h={30} label="Project" p={p} accent />
    </svg>
  )
}

export function ProjectIllustration({ name }: { name: string }) {
  switch (name) {
    case 'booking':
      return <Booking />
    case 'greenflow':
      return <GreenFlow />
    case 'traffiq':
      return <Traffic />
    case 'pos':
      return <Pos />
    case 'crowdsense':
      return <Crowd />
    default:
      return <Fallback />
  }
}
