// Real client-side encryption for the Data Encryption Tool — AES-256-GCM
// with a PBKDF2-SHA256 derived key, random salt and IV per encryption.
// Everything runs through the browser's native Web Crypto API; no text or
// passphrase is ever sent to a server. This is a genuine, working
// implementation, not a simulated/mock tool like the Threat Intel lookup.

const PBKDF2_ITERATIONS = 100_000;
const SALT_LENGTH = 16;
const IV_LENGTH = 12;
const PAYLOAD_PREFIX = "nhi-enc:v1:";

async function deriveKey(passphrase: string, salt: Uint8Array): Promise<CryptoKey> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: salt as BufferSource, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

function fromBase64(b64: string): Uint8Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export async function encryptText(plaintext: string, passphrase: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const key = await deriveKey(passphrase, salt);
  const ciphertext = new Uint8Array(
    await crypto.subtle.encrypt({ name: "AES-GCM", iv: iv as BufferSource }, key, new TextEncoder().encode(plaintext))
  );

  const combined = new Uint8Array(salt.length + iv.length + ciphertext.length);
  combined.set(salt, 0);
  combined.set(iv, salt.length);
  combined.set(ciphertext, salt.length + iv.length);

  return `${PAYLOAD_PREFIX}${toBase64(combined)}`;
}

export async function decryptText(payload: string, passphrase: string): Promise<string> {
  const trimmed = payload.trim();
  const raw = trimmed.startsWith(PAYLOAD_PREFIX) ? trimmed.slice(PAYLOAD_PREFIX.length) : trimmed;
  const combined = fromBase64(raw);

  const salt = combined.slice(0, SALT_LENGTH);
  const iv = combined.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
  const ciphertext = combined.slice(SALT_LENGTH + IV_LENGTH);

  const key = await deriveKey(passphrase, salt);
  const plaintext = await crypto.subtle.decrypt({ name: "AES-GCM", iv: iv as BufferSource }, key, ciphertext as BufferSource);
  return new TextDecoder().decode(plaintext);
}
