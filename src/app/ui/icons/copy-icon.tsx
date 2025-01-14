import { Icon, IconProps } from './icon/icon';

export function CopyIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M9 9V3.5C9 3.22386 9.22386 3 9.5 3H20.5C20.7761 3 21 3.22386 21 3.5V14.5C21 14.7761 20.7761 15 20.5 15H15M14.5 9H3.5C3.22386 9 3 9.22386 3 9.5V20.5C3 20.7761 3.22386 21 3.5 21H14.5C14.7761 21 15 20.7761 15 20.5V9.5C15 9.22386 14.7761 9 14.5 9Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
