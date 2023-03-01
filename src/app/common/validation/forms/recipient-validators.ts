import * as yup from 'yup';

import { NetworkConfiguration } from '@shared/constants';

import { FormErrorMessages } from '@app/common/error-messages';
import { StacksClient } from '@app/query/stacks/stacks-client';

import {
  notCurrentAddressValidator,
  stxAddressNetworkValidatorFactory,
  stxAddressValidator,
} from './address-validators';

export function stxRecipientValidator(
  currentAddress: string,
  currentNetwork: NetworkConfiguration
) {
  return stxAddressValidator(FormErrorMessages.InvalidAddress)
    .test({
      message: FormErrorMessages.IncorrectNetworkAddress,
      test: stxAddressNetworkValidatorFactory(currentNetwork),
    })
    .concat(notCurrentAddressValidator(currentAddress || ''));
}

interface StxRecipientAddressOrBnsNameValidatorArgs {
  client: StacksClient;
  currentAddress: string;
  currentNetwork: NetworkConfiguration;
}
export function stxRecipientAddressOrBnsNameValidator({
  client,
  currentAddress,
  currentNetwork,
}: StxRecipientAddressOrBnsNameValidatorArgs) {
  return yup.string().test({
    message: FormErrorMessages.InvalidAddress,
    test: async value => {
      try {
        await stxRecipientValidator(currentAddress, currentNetwork).validate(value);
        return true;
      } catch (e) {}
      try {
        const res = await client.namesApi.getNameInfo({ name: value ?? '' });
        if (typeof res.address !== 'string' || res.address.length === 0) return false;
        return true;
      } catch (e) {
        return false;
      }
    },
  });
}
