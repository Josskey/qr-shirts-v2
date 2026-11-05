import crypto from "crypto";

export function randomCode(
  length = 8
) {

  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let result = "";

  for (
    let i = 0;
    i < length;
    i++
  ) {

    result += chars[
      Math.floor(
        Math.random() * chars.length
      )
    ];

  }

  return result;

}

export function publicId() {

  return (
    "QRSH-" +
    Date.now() +
    "-" +
    Math.floor(
      Math.random() * 1000
    )
  );

}

export function sha256(
  value: string
) {

  return crypto
    .createHash("sha256")
    .update(value)
    .digest("hex");

}