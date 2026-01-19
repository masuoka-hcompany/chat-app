export function getAuthHeaderFromContext(ctx: any): string | undefined {
  // HTTPリクエスト
  if (ctx.req?.headers) {
    return ctx.req.headers.authorization || ctx.req.headers.Authorization;
  }
  // WebSocket (connectionParams)
  if (ctx.connectionParams) {
    return (
      ctx.connectionParams.authorization || ctx.connectionParams.Authorization
    );
  }
  // その他
  return ctx.authorization || ctx.Authorization;
}
