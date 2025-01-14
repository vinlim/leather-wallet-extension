import { Icon, IconProps } from './icon/icon';

export function KeyIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="7" cy="12" r="1.5" fill="currentColor" />
      <path
        d="M2 12C2 14.7614 4.23858 17 7 17C8.64408 17 10.1028 16.2065 11.0141 14.9816C11.2272 14.6952 11.5509 14.5 11.9079 14.5H14L16 13.5L18 14.5H20.0194C20.3232 14.5 20.6105 14.3619 20.8002 14.1247L22.0002 12.6247C22.2924 12.2595 22.2924 11.7405 22.0002 11.3753L20.8002 9.8753C20.6105 9.63809 20.3232 9.5 20.0194 9.5H11.9079C11.5509 9.5 11.2272 9.30482 11.0141 9.01843C10.1028 7.79351 8.64408 7 7 7C4.23858 7 2 9.23858 2 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
