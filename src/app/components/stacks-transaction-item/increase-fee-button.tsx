import { HStack, styled } from 'leather-styles/jsx';

import { ChevronsRightIcon } from '@app/ui/icons/chevrons-right-icon';

interface IncreaseFeeButtonProps {
  isEnabled?: boolean;
  isSelected: boolean;
  onIncreaseFee(): void;
}
export function IncreaseFeeButton(props: IncreaseFeeButtonProps) {
  const { isEnabled, isSelected, onIncreaseFee } = props;
  const isActive = isEnabled && !isSelected;

  return (
    <styled.button
      _hover={{ color: 'accent.text-subdued' }}
      bg="accent.background-primary"
      minWidth="105px"
      ml="auto"
      onClick={e => {
        onIncreaseFee();
        e.stopPropagation();
      }}
      opacity={!isActive ? 0 : 1}
      pointerEvents={!isActive ? 'none' : 'all'}
      position="relative"
      px="space.02"
      py="space.01"
      rounded="xs"
      type="button"
      zIndex={999}
    >
      <HStack gap="space.00">
        <ChevronsRightIcon color="stacks" mr="3px" />
        <styled.span textStyle="label.03">Increase fee</styled.span>
      </HStack>
    </styled.button>
  );
}
