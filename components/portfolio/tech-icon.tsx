import type { IconType } from 'react-icons'
import { FaAws } from 'react-icons/fa6'
import {
  SiAnsible,
  SiApachemaven,
  SiCss,
  SiDjango,
  SiDocker,
  SiFlask,
  SiGit,
  SiGnubash,
  SiGooglegemini,
  SiGrafana,
  SiHtml5,
  SiJaeger,
  SiJavascript,
  SiJenkins,
  SiKeycloak,
  SiKubernetes,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNumpy,
  SiOpencv,
  SiOpenjdk,
  SiOpentelemetry,
  SiOpenid,
  SiPandas,
  SiPostgresql,
  SiPrometheus,
  SiPytest,
  SiPython,
  SiRabbitmq,
  SiReact,
  SiScikitlearn,
  SiSpringboot,
  SiSpringsecurity,
  SiSqlite,
  SiTailwindcss,
  SiTalend,
  SiTypescript,
  SiYolo,
} from 'react-icons/si'
import {
  ArrowRightLeft,
  Boxes,
  Bot,
  Braces,
  ChartColumn,
  Crosshair,
  Cuboid,
  Database,
  GitBranch,
  Layers,
  Network,
  Radio,
  Server,
  TreeDeciduous,
  Trees,
  Workflow,
  type LucideIcon,
} from 'lucide-react'

const brand: Record<string, IconType> = {
  java: SiOpenjdk,
  springboot: SiSpringboot,
  rabbitmq: SiRabbitmq,
  springsecurity: SiSpringsecurity,
  keycloak: SiKeycloak,
  oauth: SiOpenid,
  django: SiDjango,
  react: SiReact,
  typescript: SiTypescript,
  javascript: SiJavascript,
  html5: SiHtml5,
  css3: SiCss,
  tailwind: SiTailwindcss,
  nextjs: SiNextdotjs,
  gemini: SiGooglegemini,
  python: SiPython,
  flask: SiFlask,
  opencv: SiOpencv,
  yolo: SiYolo,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  mysql: SiMysql,
  sqlite: SiSqlite,
  opentelemetry: SiOpentelemetry,
  prometheus: SiPrometheus,
  grafana: SiGrafana,
  jaeger: SiJaeger,
  linux: SiLinux,
  bash: SiGnubash,
  git: SiGit,
  maven: SiApachemaven,
  docker: SiDocker,
  jenkins: SiJenkins,
  kubernetes: SiKubernetes,
  ansible: SiAnsible,
  aws: FaAws,
  pytest: SiPytest,
  pandas: SiPandas,
  numpy: SiNumpy,
  scikit: SiScikitlearn,
  talend: SiTalend,
}

const generic: Record<string, LucideIcon> = {
  grpc: Radio,
  rest: Braces,
  gateway: Network,
  microservices: Workflow,
  ddd: Layers,
  cqrs: GitBranch,
  bytetrack: Crosshair,
  randomforest: TreeDeciduous,
  extratrees: Trees,
  agents: Bot,
  sql: Database,
  etl: ArrowRightLeft,
  ssis: Server,
  olap: Cuboid,
  powerbi: ChartColumn,
  fallback: Boxes,
}

export function isTechIconKey(name: string): boolean {
  const has = (map: object) => Object.prototype.hasOwnProperty.call(map, name)
  return has(brand) || (has(generic) && name !== 'fallback')
}

export function TechIcon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Brand = brand[name]
  if (Brand) return <Brand className={className} aria-hidden="true" />
  const Generic = generic[name] ?? generic.fallback
  return <Generic className={className} strokeWidth={1.6} aria-hidden="true" />
}
