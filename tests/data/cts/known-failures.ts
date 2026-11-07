/**
 * Compliance Test Suite cases jsonpathly does not pass yet, by reason.
 *
 * Empty: every case of the vendored suite passes. When the suite is updated,
 * list here (with a reason) the new cases that cannot be fixed at once:
 * tests/cts.test.ts checks that each one still fails, so a fix that makes one
 * pass must remove it from this list.
 */
export const knownFailures: { reason: string; names: string[] }[] = [];
