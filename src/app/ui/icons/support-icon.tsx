import { Icon, IconProps } from './icon/icon';

export function SupportIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M18.5 5.5L14.8659 9.13411M9.1289 14.8711L5.5 18.5M5.5 5.5L9.1289 9.1289M14.8659 14.8659L18.5 18.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </Icon>
  );
}
