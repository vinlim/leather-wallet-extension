import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { AuthType, StacksTransaction } from '@stacks/transactions';

import { finalizeTxSignature } from '@shared/actions/finalize-tx-signature';
import { logger } from '@shared/logger';
import { CryptoCurrencies } from '@shared/models/currencies.model';
import { RouteUrls } from '@shared/route-urls';
import { isError, isString } from '@shared/utils';

import { useDefaultRequestParams } from '@app/common/hooks/use-default-request-search-params';
import { LoadingKeys } from '@app/common/hooks/use-loading';
import { useSubmitTransactionCallback } from '@app/common/hooks/use-submit-stx-transaction';
import { stacksTransactionToHex } from '@app/common/transactions/stacks/transaction.utils';
import { delay } from '@app/common/utils';
import { useTransactionRequest } from '@app/store/transactions/requests.hooks';
import { useSignStacksTransaction } from '@app/store/transactions/transaction.hooks';

import { useStacksTransactionSummary } from './use-stacks-transaction-summary';

async function simulateShortDelayToAvoidUndefinedTabId() {
  await delay(1000);
}

export function useStacksBroadcastTransaction(token: CryptoCurrencies, decimals?: number) {
  const signStacksTransaction = useSignStacksTransaction();
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const { tabId } = useDefaultRequestParams();
  const requestToken = useTransactionRequest();
  const { formSentSummaryTxState } = useStacksTransactionSummary(token);
  const navigate = useNavigate();

  const broadcastTransactionFn = useSubmitTransactionCallback({
    loadingKey: LoadingKeys.SUBMIT_SEND_FORM_TRANSACTION,
  });

  return useMemo(() => {
    function handlePreviewSuccess(signedTx: StacksTransaction, txId?: string) {
      if (requestToken && tabId) {
        finalizeTxSignature({
          requestPayload: requestToken,
          tabId,
          data: {
            txRaw: stacksTransactionToHex(signedTx),
            txId,
          },
        });
      }
      if (txId) {
        navigate(
          RouteUrls.SentStxTxSummary.replace(':symbol', token.toLowerCase()).replace(
            ':txId',
            `${txId}`
          ),
          formSentSummaryTxState(txId, signedTx, decimals)
        );
      }
    }

    async function broadcastTransactionAction(signedTx: StacksTransaction) {
      if (!signedTx) {
        logger.error('Cannot broadcast transaction, no tx in state');
        toast.error('Unable to broadcast transaction');
        return;
      }
      try {
        setIsBroadcasting(true);
        const isSponsored = signedTx.auth?.authType === AuthType.Sponsored;
        if (isSponsored) {
          await simulateShortDelayToAvoidUndefinedTabId();
          handlePreviewSuccess(signedTx);
        } else {
          await broadcastTransactionFn({
            onError(e: Error | string) {
              const message = isString(e) ? e : e.message;
              navigate(RouteUrls.TransactionBroadcastError, { state: { message } });
            },
            onSuccess(txId) {
              handlePreviewSuccess(signedTx, txId);
            },
            replaceByFee: false,
          })(signedTx);
        }
      } catch (e) {
        navigate(RouteUrls.TransactionBroadcastError, {
          state: { message: isError(e) ? e.message : 'Unknown error' },
        });
      } finally {
        setIsBroadcasting(false);
      }
    }

    async function broadcastTransaction(unsignedTx: StacksTransaction) {
      try {
        if (!unsignedTx) return;
        const signedTx = await signStacksTransaction(unsignedTx);
        // TODO: Maybe better error handling here?
        if (!signedTx) return;
        await broadcastTransactionAction(signedTx);
      } catch (e) {}
    }

    return {
      stacksBroadcastTransaction: broadcastTransaction,
      isBroadcasting,
    };
  }, [
    broadcastTransactionFn,
    navigate,
    signStacksTransaction,
    isBroadcasting,
    token,
    formSentSummaryTxState,
    decimals,
    requestToken,
    tabId,
  ]);
}
