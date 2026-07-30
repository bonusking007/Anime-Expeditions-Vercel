export function validApiKey(request) {
  const expected = process.env.TRACKER_API_KEY || '';
  const received = request.headers.get('x-api-key') || '';

  if (!expected || received.length !== expected.length) return false;

  let mismatch = 0;
  for (let index = 0; index < expected.length; index += 1) {
    mismatch |= expected.charCodeAt(index) ^ received.charCodeAt(index);
  }
  return mismatch === 0;
}
