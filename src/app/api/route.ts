export function GET(request: Request) {
  
  return new Response(request)
}

export function POST() {
  return new Response('POST')
}

export function HEAD() {
  return new Response('HEAD')
}

export function PUT() {
  return new Response('PUT')
}

export function DELETE() {
  return new Response('DELETE')
}

export function CONNECT() {
  return new Response('CONNECT')
}

export function OPTIONS() {
  return new Response('OPTIONS')
}

export function TRACE() {
  return new Response('TRACE')
}

export function PATCH() {
  return new Response('PATCH')
}
