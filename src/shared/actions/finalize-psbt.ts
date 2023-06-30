import { PsbtData } from '@stacks/connect';

import { ExternalMethods, MESSAGE_SOURCE, PsbtResponseMessage } from '@shared/message-types';

interface FormatPsbtResponseArgs {
  request: string;
  response: PsbtData | string;
}
export function formatPsbtResponse({
  request,
  response,
}: FormatPsbtResponseArgs): PsbtResponseMessage {
  return {
    source: MESSAGE_SOURCE,
    method: ExternalMethods.psbtResponse,
    payload: {
      psbtRequest: request,
      psbtResponse: response,
    },
  };
}

interface FinalizePsbtArgs {
  data: PsbtData | string;
  requestPayload: string;
  tabId: number;
}
export function finalizePsbt({ data, requestPayload, tabId }: FinalizePsbtArgs) {
  const responseMessage = formatPsbtResponse({ request: requestPayload, response: data });
  chrome.tabs.sendMessage(tabId, responseMessage);
  window.close();
}
