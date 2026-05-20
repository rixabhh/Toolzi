import { useState } from "react";
import QRCode from "qrcode";
import { NeuButton } from "../../components/common/NeuButton";
import { OutputPanel } from "../../components/common/OutputPanel";
import { downloadBlob } from "../../lib/downloads";

function buildQrValue(type: string, fields: Record<string, string>) {
  if (type === "email") return `mailto:${fields.email}?subject=${encodeURIComponent(fields.subject || "")}`;
  if (type === "phone") return `tel:${fields.phone}`;
  if (type === "wifi") return `WIFI:T:${fields.security || "WPA"};S:${fields.ssid};P:${fields.password};;`;
  if (type === "contact") return `BEGIN:VCARD\nVERSION:3.0\nFN:${fields.name}\nTEL:${fields.phone}\nEMAIL:${fields.email}\nEND:VCARD`;
  return fields.value;
}

export function QRGenerator() {
  const [type, setType] = useState("url");
  const [fields, setFields] = useState<Record<string, string>>({ value: "https://toolzi.local" });
  const [png, setPng] = useState("");
  const [svg, setSvg] = useState("");
  const [message, setMessage] = useState("");

  async function generate() {
    const value = buildQrValue(type, fields);
    if (!value.trim()) {
      setMessage("Add something to put inside the QR code.");
      return;
    }
    setPng(await QRCode.toDataURL(value, { margin: 2, width: 320 }));
    setSvg(await QRCode.toString(value, { type: "svg", margin: 2, width: 320 }));
    setMessage("QR code is ready.");
  }

  const field = (key: string, label: string, placeholder = "") => (
    <label className="field">{label}<input className="tool-input" value={fields[key] ?? ""} placeholder={placeholder} onChange={(e) => setFields({ ...fields, [key]: e.target.value })} /></label>
  );

  return (
    <div className="tool-layout">
      <section className="tool-panel neu-card">
        <h2>Make a QR code</h2>
        <label className="field">Type<select className="tool-select" value={type} onChange={(e) => setType(e.target.value)}><option value="url">URL</option><option value="text">Text</option><option value="email">Email</option><option value="phone">Phone</option><option value="wifi">Wi-Fi</option><option value="contact">Contact/vCard</option></select></label>
        <div className="field-grid">
          {(type === "url" || type === "text") && field("value", type === "url" ? "URL" : "Text")}
          {type === "email" && <>{field("email", "Email")}{field("subject", "Subject")}</>}
          {type === "phone" && field("phone", "Phone")}
          {type === "wifi" && <>{field("ssid", "Network name")}{field("password", "Password")}{field("security", "Security", "WPA")}</>}
          {type === "contact" && <>{field("name", "Name")}{field("phone", "Phone")}{field("email", "Email")}</>}
        </div>
        <div className="button-row"><NeuButton onClick={generate}>Generate QR</NeuButton></div>
      </section>
      <OutputPanel title="QR preview">
        <p>{message || "Your QR code appears here."}</p>
        {png && <div className="media-preview-frame qr-frame"><img className="qr-preview" src={png} alt="Generated QR code" /></div>}
        <div className="button-row">
          {png && <NeuButton onClick={() => fetch(png).then((r) => r.blob()).then((blob) => downloadBlob(blob, "toolzi-qr.png"))}>Download PNG</NeuButton>}
          {svg && <NeuButton onClick={() => downloadBlob(new Blob([svg], { type: "image/svg+xml" }), "toolzi-qr.svg")}>Download SVG</NeuButton>}
        </div>
      </OutputPanel>
    </div>
  );
}
