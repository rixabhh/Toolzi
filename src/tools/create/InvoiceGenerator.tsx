import { useEffect, useMemo, useState } from "react";
import { NeuButton } from "../../components/common/NeuButton";
import { OutputPanel } from "../../components/common/OutputPanel";
import { readLocalJson, writeLocalJson } from "../../lib/storage";

type Item = { description: string; quantity: number; rate: number; tax: number; discount: number };
type Invoice = {
  sender: string;
  client: string;
  number: string;
  date: string;
  dueDate: string;
  notes: string;
  items: Item[];
};

const defaultInvoice: Invoice = {
  sender: "Your name\nYour address",
  client: "Client name\nClient address",
  number: "INV-001",
  date: new Date().toISOString().slice(0, 10),
  dueDate: "",
  notes: "Thanks for your business.",
  items: [{ description: "Project work", quantity: 1, rate: 1000, tax: 18, discount: 0 }]
};

export function InvoiceGenerator() {
  const [invoice, setInvoice] = useState(() => readLocalJson("toolzi:invoice", defaultInvoice));

  useEffect(() => writeLocalJson("toolzi:invoice", invoice), [invoice]);

  const totals = useMemo(() => {
    const subtotal = invoice.items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
    const discount = invoice.items.reduce((sum, item) => sum + item.discount, 0);
    const taxable = Math.max(0, subtotal - discount);
    const tax = invoice.items.reduce((sum, item) => sum + ((item.quantity * item.rate - item.discount) * item.tax) / 100, 0);
    return { subtotal, discount, tax, total: taxable + tax };
  }, [invoice]);

  const set = (patch: Partial<Invoice>) => setInvoice({ ...invoice, ...patch });
  const updateItem = (index: number, patch: Partial<Item>) => setInvoice({ ...invoice, items: invoice.items.map((item, i) => i === index ? { ...item, ...patch } : item) });

  return (
    <div className="tool-layout">
      <section className="tool-panel neu-card no-print">
        <h2>Create invoice</h2>
        <div className="field-grid">
          <label className="field">Sender<textarea className="tool-textarea" value={invoice.sender} onChange={(e) => set({ sender: e.target.value })} /></label>
          <label className="field">Client<textarea className="tool-textarea" value={invoice.client} onChange={(e) => set({ client: e.target.value })} /></label>
          <label className="field">Invoice number<input className="tool-input" value={invoice.number} onChange={(e) => set({ number: e.target.value })} /></label>
          <label className="field">Invoice date<input className="tool-input" type="date" value={invoice.date} onChange={(e) => set({ date: e.target.value })} /></label>
          <label className="field">Due date<input className="tool-input" type="date" value={invoice.dueDate} onChange={(e) => set({ dueDate: e.target.value })} /></label>
        </div>
        <h3>Line items</h3>
        <div className="list">
          {invoice.items.map((item, index) => (
            <div className="invoice-row" key={index}>
              <input className="tool-input" value={item.description} onChange={(e) => updateItem(index, { description: e.target.value })} aria-label="Description" />
              <input className="tool-input" type="number" value={item.quantity} onChange={(e) => updateItem(index, { quantity: Number(e.target.value) })} aria-label="Quantity" />
              <input className="tool-input" type="number" value={item.rate} onChange={(e) => updateItem(index, { rate: Number(e.target.value) })} aria-label="Rate" />
              <input className="tool-input" type="number" value={item.tax} onChange={(e) => updateItem(index, { tax: Number(e.target.value) })} aria-label="Tax" />
              <input className="tool-input" type="number" value={item.discount} onChange={(e) => updateItem(index, { discount: Number(e.target.value) })} aria-label="Discount" />
              <NeuButton variant="ghost" onClick={() => set({ items: invoice.items.filter((_, i) => i !== index) })}>Delete</NeuButton>
            </div>
          ))}
        </div>
        <label className="field">Notes<textarea className="tool-textarea" value={invoice.notes} onChange={(e) => set({ notes: e.target.value })} /></label>
        <div className="button-row">
          <NeuButton onClick={() => set({ items: [...invoice.items, { description: "", quantity: 1, rate: 0, tax: 0, discount: 0 }] })}>Add item</NeuButton>
          <NeuButton onClick={() => window.print()}>Print / Save as PDF</NeuButton>
        </div>
        <p className="muted">Saved only in this browser.</p>
      </section>
      <OutputPanel title="Invoice preview">
        <div className="invoice-preview">
          <h2>Invoice {invoice.number}</h2>
          <div className="field-grid"><p><strong>From</strong><br />{invoice.sender}</p><p><strong>Bill to</strong><br />{invoice.client}</p></div>
          <p><strong>Date:</strong> {invoice.date || "-"} / <strong>Due:</strong> {invoice.dueDate || "-"}</p>
          <table>
            <thead><tr><th>Description</th><th>Qty</th><th>Rate</th><th>Tax</th><th>Discount</th><th>Total</th></tr></thead>
            <tbody>{invoice.items.map((item, index) => <tr key={index}><td>{item.description}</td><td>{item.quantity}</td><td>{item.rate}</td><td>{item.tax}%</td><td>{item.discount}</td><td>{(item.quantity * item.rate - item.discount + ((item.quantity * item.rate - item.discount) * item.tax) / 100).toFixed(2)}</td></tr>)}</tbody>
          </table>
          <p><strong>Subtotal:</strong> {totals.subtotal.toFixed(2)}</p>
          <p><strong>Discount:</strong> {totals.discount.toFixed(2)}</p>
          <p><strong>Tax:</strong> {totals.tax.toFixed(2)}</p>
          <h3>Total: {totals.total.toFixed(2)}</h3>
          <p>{invoice.notes}</p>
        </div>
      </OutputPanel>
    </div>
  );
}
