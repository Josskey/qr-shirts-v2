import QRCode from "qrcode";

export async function generateQr(
  text: string
) {

  return QRCode.toDataURL(
    text,
    {
      errorCorrectionLevel: "H",
      margin: 1,
      width: 500
    }
  );

}