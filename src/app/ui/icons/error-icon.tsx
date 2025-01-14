import { Icon, IconProps } from './icon/icon';

export function ErrorIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M11.9971 10.0156V12.0121M11.1354 3.49213L2.88661 17.4956C2.4946 18.1611 2.9751 19 3.74825 19H20.2459C21.019 19 21.4995 18.1611 21.1075 17.4956L12.8587 3.49213C12.4722 2.83596 11.5219 2.83596 11.1354 3.49213Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="10.75" y="13.75" width="2.5" height="2.5" rx="1.25" fill="currentColor" />
    </Icon>
  );
}
