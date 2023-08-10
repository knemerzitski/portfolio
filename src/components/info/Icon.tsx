import Bars from '@/assets/icons/bars.svg';
import XMark from '@/assets/icons/xmark.svg';
import Envelope from '@/assets/icons/envelope.svg';
import ArrowDown from '@/assets/icons/arrow-down.svg';
import ExternalLink from '@/assets/icons/external-link.svg';
import Terminal from '@/assets/icons/terminal.svg';
import Eye from '@/assets/icons/eye.svg';
import Building from '@/assets/icons/building.svg';

import GithubLogo from '@/assets/icons/third-party/github-mark-white.svg';
import PythonLogo from '@/assets/icons/third-party/python-logo-only.svg';
import CSharpLogo from '@/assets/icons/third-party/logo-C-sharp.svg';
import JavaLogo from '@/assets/icons/third-party/java-icon.svg';
import PHPLogo from '@/assets/icons/third-party/php-logo.svg';
import HTMLLogo from '@/assets/icons/third-party/html5-badge.svg';
import CSSLogo from '@/assets/icons/third-party/css3-logo.svg';
import TSLogo from '@/assets/icons/third-party/ts-logo.svg';
import VueLogo from '@/assets/icons/third-party/vue.js-logo.svg';
import ReactLogo from '@/assets/icons/third-party/react-icon.svg';
import DockerLogo from '@/assets/icons/third-party/docker-logo.svg';
import GitLogo from '@/assets/icons/third-party/git-icon.svg';
import BlenderLogo from '@/assets/icons/third-party/blender-logo-no-text.svg';
import DatabaseLogo from '@/assets/icons/database.svg';

import { SVGProps } from 'react';

const ICON_COMPONENTS = {
  bars: Bars,
  xmark: XMark,
  envelope: Envelope,
  arrowDown: ArrowDown,
  externalLink: ExternalLink,
  terminal: Terminal,
  eye: Eye,
  building: Building,

  // Third party icons
  github: GithubLogo,
  python: PythonLogo,
  csharp: CSharpLogo,
  java: JavaLogo,
  php: PHPLogo,
  html: HTMLLogo,
  css: CSSLogo,
  ts: TSLogo,
  vue: VueLogo,
  react: ReactLogo,
  docker: DockerLogo,
  git: GitLogo,
  blender: BlenderLogo,
  db: DatabaseLogo
}

export type IconNames = keyof typeof ICON_COMPONENTS;

type IconProps = {
  type: IconNames,
} & SVGProps<SVGElement>;

export default function Icon({ type, ...restProps }: IconProps) {
  const IconComponent = ICON_COMPONENTS[type];

  return (
    <IconComponent {...restProps} />
  );
}