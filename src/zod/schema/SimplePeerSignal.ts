import type { z as zod } from 'zod'

export const SimplePeerSignal = (z: typeof zod) =>
  z
    .object({
      type: z.literal('transceiverRequest'),
      transceiverRequest: z.object({
        kind: z.string(),
        init: z
          .object({
            direction: z
              .literal('inactive')
              .optional()
              .or(z.literal('recvonly'))
              .optional()
              .or(z.literal('sendonly'))
              .optional()
              .or(z.literal('sendrecv'))
              .optional()
              .or(z.literal('stopped'))
              .optional(),

            sendEncodings: z.any().optional(),

            streams: z.array(z.any()).optional(),
          })
          .nullish(),
      }),
    })
    .or(
      z.object({
        type: z.literal('renegotiate'),
        renegotiate: z.boolean(),
      }),
    )
    .or(
      z.object({
        type: z.literal('candidate'),
        candidate: z.any(),
      }),
    )
    .or(
      z.object({
        sdp: z.string().optional(),
        type: z
          .literal('answer')
          .or(z.literal('offer'))
          .or(z.literal('pranswer'))
          .or(z.literal('rollback')),
      }),
    )
