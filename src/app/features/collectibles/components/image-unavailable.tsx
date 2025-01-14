import { styled } from 'leather-styles/jsx';

import { EyeSlashIcon } from '@app/ui/icons/eye-slash-icon';

import { CollectiblePlaceholderLayout } from './_collectible-types/collectible-placeholder.layout';

export function ImageUnavailable() {
  return (
    <CollectiblePlaceholderLayout>
      <EyeSlashIcon width="md" />
      <styled.span pt="space.02" px="space.04" textStyle="label.03">
        Image currently unavailable
      </styled.span>
    </CollectiblePlaceholderLayout>
  );
}
