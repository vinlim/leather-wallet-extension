import { Stack, StackProps } from 'leather-styles/jsx';

export function SwapAssetListLayout({ children }: StackProps) {
  return (
    <Stack pb="space.05" width="100%">
      {children}
    </Stack>
  );
}
