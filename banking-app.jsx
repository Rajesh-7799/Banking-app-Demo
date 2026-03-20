import { useState, useEffect } from "react";

const theme = {
  bg: "#0A0A0F",
  card: "#13131A",
  cardHover: "#1A1A24",
  accent: "#C8FF00",
  accentDim: "rgba(200,255,0,0.12)",
  accentMid: "rgba(200,255,0,0.25)",
  text: "#FFFFFF",
  muted: "#6B6B80",
  border: "rgba(255,255,255,0.06)",
  red: "#FF4D6D",
  blue: "#4D9FFF",
  purple: "#9B6DFF",
};

const transactions = [
  { id: 1, name: "Spotify", cat: "Entertainment", amount: -9.99, date: "Today", icon: "♪" },
  { id: 2, name: "Salary", cat: "Income", amount: 4800, date: "Today", icon: "↓" },
  { id: 3, name: "Whole Foods", cat: "Groceries", amount: -67.42, date: "Yesterday", icon: "⊕" },
  { id: 4, name: "Netflix", cat: "Entertainment", amount: -15.99, date: "Mar 18", icon: "▶" },
  { id: 5, name: "Uber", cat: "Transport", amount: -12.5, date: "Mar 17", icon: "◎" },
  { id: 6, name: "Amazon", cat: "Shopping", amount: -134.00, date: "Mar 16", icon: "◻" },
  { id: 7, name: "Gym", cat: "Health", amount: -49.0, date: "Mar 15", icon: "◈" },
];

const cards = [
  { label: "Main Account", number: "•••• 4821", balance: 12480.50, color: theme.accent, textColor: "#000" },
  { label: "Savings", number: "•••• 9034", balance: 38920.00, color: "#1A1A2E", textColor: "#fff", border: true },
];

const spending = [
  { cat: "Housing", pct: 35, color: theme.accent },
  { cat: "Food", pct: 20, color: theme.blue },
  { cat: "Transport", pct: 12, color: theme.purple },
  { cat: "Entertainment", pct: 18, color: "#FF9F4D" },
  { cat: "Other", pct: 15, color: theme.muted },
];

export default function BankingApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [cardIdx, setCardIdx] = useState(0);
  const [showBalance, setShowBalance] = useState(true);
  const [sendAmt, setSendAmt] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSend() {
    if (!sendAmt) return;
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); setTimeout(() => setSent(false), 2000); setSendAmt(""); }, 1400);
  }

  const card = cards[cardIdx];

  return (
    <div style={{
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      background: theme.bg,
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: "24px 16px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        .tab-btn { transition: all 0.2s; }
        .tab-btn:hover { opacity: 0.8; }
        .card-slide { transition: transform 0.35s cubic-bezier(.4,0,.2,1), opacity 0.35s; }
        .action-btn { transition: background 0.15s, transform 0.12s; cursor: pointer; }
        .action-btn:hover { filter: brightness(1.15); }
        .action-btn:active { transform: scale(0.96); }
        .tx-row { transition: background 0.15s; }
        .tx-row:hover { background: rgba(255,255,255,0.04) !important; }
        input[type=number] { -moz-appearance: textfield; }
        input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; }
        .dot-active { background: ${theme.accent}; }
        .dot-inactive { background: rgba(255,255,255,0.2); }
        .numpad-key { transition: background 0.1s, transform 0.1s; cursor: pointer; }
        .numpad-key:hover { background: rgba(255,255,255,0.1) !important; }
        .numpad-key:active { transform: scale(0.93); background: rgba(255,255,255,0.16) !important; }
        .seg-btn { transition: all 0.2s; cursor: pointer; }
        .seg-btn:hover { opacity:0.85; }
      `}</style>

      <div style={{ width: "100%", maxWidth: 390, background: theme.bg, borderRadius: 40, overflow: "hidden", minHeight: 780, position: "relative", border: `1px solid ${theme.border}` }}>

        {/* Status Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 28px 8px", color: theme.text, fontSize: 12 }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500 }}>9:41</span>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span>▊▊▊</span><span>WiFi</span><span style={{ color: theme.accent }}>⬛</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "0 0 80px" }}>

          {/* HOME TAB */}
          {activeTab === "home" && (
            <div>
              {/* Header */}
              <div style={{ padding: "12px 28px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ margin: 0, color: theme.muted, fontSize: 13 }}>Good morning,</p>
                  <h2 style={{ margin: "2px 0 0", color: theme.text, fontSize: 22, fontWeight: 600 }}>Alex Rivera</h2>
                </div>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#9B6DFF,#4D9FFF)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 16, cursor: "pointer" }}>AR</div>
              </div>

              {/* Card Carousel */}
              <div style={{ padding: "24px 0 0" }}>
                <div style={{ display: "flex", gap: 16, padding: "0 28px", overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none" }}>
                  {cards.map((c, i) => (
                    <div key={i} className="card-slide" onClick={() => setCardIdx(i)} style={{
                      minWidth: 300, borderRadius: 28, padding: "28px 28px 24px",
                      background: c.color === theme.accent ? theme.accent : theme.card,
                      border: c.border ? `1px solid ${theme.border}` : "none",
                      cursor: "pointer", scrollSnapAlign: "start", flexShrink: 0,
                      opacity: cardIdx === i ? 1 : 0.55, transform: cardIdx === i ? "scale(1)" : "scale(0.95)",
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
                        <div>
                          <p style={{ margin: 0, fontSize: 12, color: c.color === theme.accent ? "rgba(0,0,0,0.55)" : theme.muted }}>{c.label}</p>
                          <p style={{ margin: "4px 0 0", fontSize: 13, fontFamily: "'DM Mono', monospace", color: c.color === theme.accent ? "#000" : theme.text }}>{c.number}</p>
                        </div>
                        <div style={{ fontSize: 24 }}>◈</div>
                      </div>
                      <p style={{ margin: 0, fontSize: 11, color: c.color === theme.accent ? "rgba(0,0,0,0.5)" : theme.muted, marginBottom: 6 }}>Balance</p>
                      <p style={{ margin: 0, fontSize: 32, fontWeight: 600, color: c.color === theme.accent ? "#000" : theme.text, fontFamily: "'DM Mono', monospace" }}>
                        {showBalance ? `$${c.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}` : "••••••"}
                      </p>
                    </div>
                  ))}
                </div>
                {/* Dots */}
                <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 14 }}>
                  {cards.map((_, i) => <div key={i} className={i === cardIdx ? "dot-active" : "dot-inactive"} style={{ width: i === cardIdx ? 20 : 6, height: 6, borderRadius: 3, transition: "all 0.25s" }} />)}
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{ padding: "24px 28px 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  {[
                    { icon: "↑", label: "Send", tab: "send" },
                    { icon: "↓", label: "Request", tab: "home" },
                    { icon: "⊕", label: "Top Up", tab: "home" },
                    { icon: "◎", label: "History", tab: "activity" },
                  ].map((a, i) => (
                    <button key={i} className="action-btn" onClick={() => setActiveTab(a.tab)} style={{
                      background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer", padding: 0,
                    }}>
                      <div style={{ width: 56, height: 56, borderRadius: 18, background: i === 0 ? theme.accent : theme.card, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: i === 0 ? "#000" : theme.text }}>
                        {a.icon}
                      </div>
                      <span style={{ fontSize: 12, color: theme.muted }}>{a.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Transactions */}
              <div style={{ padding: "28px 0 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 28px", marginBottom: 16 }}>
                  <span style={{ color: theme.text, fontWeight: 600, fontSize: 16 }}>Recent</span>
                  <span onClick={() => setActiveTab("activity")} style={{ color: theme.accent, fontSize: 13, cursor: "pointer" }}>See all</span>
                </div>
                {transactions.slice(0, 4).map(tx => (
                  <div key={tx.id} className="tx-row" style={{ display: "flex", alignItems: "center", padding: "12px 28px", borderRadius: 0 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 14, background: theme.card, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: theme.accent, flexShrink: 0 }}>{tx.icon}</div>
                    <div style={{ flex: 1, marginLeft: 14 }}>
                      <p style={{ margin: 0, color: theme.text, fontSize: 14, fontWeight: 500 }}>{tx.name}</p>
                      <p style={{ margin: "2px 0 0", color: theme.muted, fontSize: 12 }}>{tx.cat} · {tx.date}</p>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "'DM Mono', monospace", color: tx.amount > 0 ? theme.accent : theme.text }}>
                      {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEND TAB */}
          {activeTab === "send" && (
            <div style={{ padding: "16px 28px 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}>
                <button onClick={() => setActiveTab("home")} style={{ background: theme.card, border: "none", borderRadius: 12, width: 40, height: 40, color: theme.text, fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
                <h2 style={{ margin: 0, color: theme.text, fontSize: 20, fontWeight: 600 }}>Send Money</h2>
              </div>

              {/* Recipients */}
              <p style={{ margin: "0 0 12px", color: theme.muted, fontSize: 13 }}>Recent recipients</p>
              <div style={{ display: "flex", gap: 16, marginBottom: 32, overflowX: "auto", paddingBottom: 4 }}>
                {["JL", "SM", "KP", "TC", "+"].map((init, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer", flexShrink: 0 }}>
                    <div style={{ width: 52, height: 52, borderRadius: "50%", background: i === 4 ? theme.card : `hsl(${i * 70},60%,40%)`, border: i === 4 ? `1px dashed ${theme.border}` : "none", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 600, fontSize: 14 }}>{init}</div>
                    <span style={{ fontSize: 11, color: theme.muted }}>
                      {["Jamie", "Sara", "Kyle", "Tom", "Add"][i]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Amount Display */}
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <p style={{ margin: "0 0 8px", color: theme.muted, fontSize: 13 }}>Amount to send</p>
                <div style={{ fontSize: 52, fontWeight: 300, fontFamily: "'DM Mono', monospace", color: theme.text, letterSpacing: -2 }}>
                  ${sendAmt || "0"}
                </div>
              </div>

              {/* Numpad */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
                {["1","2","3","4","5","6","7","8","9",".",  "0","⌫"].map((k, i) => (
                  <button key={i} className="numpad-key" onClick={() => {
                    if (k === "⌫") setSendAmt(p => p.slice(0,-1));
                    else if (k === "." && sendAmt.includes(".")) return;
                    else if (sendAmt.length < 8) setSendAmt(p => p + k);
                  }} style={{ background: theme.card, border: "none", borderRadius: 16, height: 64, fontSize: k === "⌫" ? 20 : 24, fontWeight: 400, color: theme.text, fontFamily: "'DM Mono', monospace", cursor: "pointer" }}>
                    {k}
                  </button>
                ))}
              </div>

              <button className="action-btn" onClick={handleSend} style={{
                width: "100%", padding: "18px", borderRadius: 20, border: "none",
                background: sendAmt ? theme.accent : theme.card, color: sendAmt ? "#000" : theme.muted,
                fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
              }}>
                {sent ? "✓ Sent!" : sending ? "Sending..." : "Send Money"}
              </button>
            </div>
          )}

          {/* ACTIVITY TAB */}
          {activeTab === "activity" && (
            <div>
              <div style={{ padding: "16px 28px 0", display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
                <button onClick={() => setActiveTab("home")} style={{ background: theme.card, border: "none", borderRadius: 12, width: 40, height: 40, color: theme.text, fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
                <h2 style={{ margin: 0, color: theme.text, fontSize: 20, fontWeight: 600 }}>Activity</h2>
              </div>
              {/* Filter */}
              <div style={{ display: "flex", gap: 8, padding: "0 28px", marginBottom: 20 }}>
                {["All", "Income", "Spending"].map((f, i) => (
                  <button key={f} className="seg-btn" style={{ padding: "8px 16px", borderRadius: 12, border: "none", background: i === 0 ? theme.accent : theme.card, color: i === 0 ? "#000" : theme.muted, fontSize: 13, fontWeight: 500 }}>{f}</button>
                ))}
              </div>
              {transactions.map(tx => (
                <div key={tx.id} className="tx-row" style={{ display: "flex", alignItems: "center", padding: "14px 28px" }}>
                  <div style={{ width: 46, height: 46, borderRadius: 14, background: theme.card, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: theme.accent, flexShrink: 0 }}>{tx.icon}</div>
                  <div style={{ flex: 1, marginLeft: 14 }}>
                    <p style={{ margin: 0, color: theme.text, fontSize: 14, fontWeight: 500 }}>{tx.name}</p>
                    <p style={{ margin: "2px 0 0", color: theme.muted, fontSize: 12 }}>{tx.cat} · {tx.date}</p>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "'DM Mono', monospace", color: tx.amount > 0 ? theme.accent : theme.text }}>
                    {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* ANALYTICS TAB */}
          {activeTab === "analytics" && (
            <div style={{ padding: "16px 28px 0" }}>
              <h2 style={{ margin: "0 0 24px", color: theme.text, fontSize: 20, fontWeight: 600 }}>Spending</h2>

              {/* Month total */}
              <div style={{ background: theme.card, borderRadius: 24, padding: "24px", marginBottom: 24 }}>
                <p style={{ margin: "0 0 4px", color: theme.muted, fontSize: 13 }}>This month</p>
                <p style={{ margin: "0 0 20px", fontFamily: "'DM Mono', monospace", fontSize: 36, fontWeight: 600, color: theme.text }}>$2,847.00</p>
                {/* Bar visual */}
                <div style={{ height: 8, background: "rgba(255,255,255,0.08)", borderRadius: 4, overflow: "hidden", display: "flex" }}>
                  {spending.map((s, i) => <div key={i} style={{ width: `${s.pct}%`, background: s.color, height: "100%" }} />)}
                </div>
              </div>

              {/* Breakdown */}
              <p style={{ margin: "0 0 16px", color: theme.muted, fontSize: 13 }}>Breakdown</p>
              {spending.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: s.color, marginRight: 12, flexShrink: 0 }} />
                  <span style={{ flex: 1, color: theme.text, fontSize: 14 }}>{s.cat}</span>
                  <div style={{ width: 120, height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 3, marginRight: 12, overflow: "hidden" }}>
                    <div style={{ width: `${s.pct}%`, height: "100%", background: s.color, borderRadius: 3 }} />
                  </div>
                  <span style={{ color: theme.muted, fontSize: 13, fontFamily: "'DM Mono', monospace", minWidth: 30, textAlign: "right" }}>{s.pct}%</span>
                </div>
              ))}

              {/* Monthly bars */}
              <p style={{ margin: "24px 0 16px", color: theme.muted, fontSize: 13 }}>Last 6 months</p>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-end", height: 100 }}>
                {[65, 80, 55, 90, 72, 100].map((h, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{ width: "100%", height: `${h}%`, background: i === 5 ? theme.accent : theme.card, borderRadius: 8, transition: "all 0.3s" }} />
                    <span style={{ fontSize: 10, color: theme.muted }}>
                      {["O","N","D","J","F","M"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Nav */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: theme.card, borderTop: `1px solid ${theme.border}`,
          display: "flex", padding: "12px 28px 20px", justifyContent: "space-around",
          backdropFilter: "blur(20px)",
        }}>
          {[
            { id: "home", icon: "⌂", label: "Home" },
            { id: "activity", icon: "≡", label: "Activity" },
            { id: "send", icon: "↑", label: "Send" },
            { id: "analytics", icon: "◈", label: "Insights" },
          ].map(tab => (
            <button key={tab.id} className="tab-btn" onClick={() => setActiveTab(tab.id)} style={{
              background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", padding: 0,
            }}>
              <div style={{
                width: 44, height: 32, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                background: activeTab === tab.id ? theme.accentDim : "transparent",
                color: activeTab === tab.id ? theme.accent : theme.muted,
                transition: "all 0.2s",
              }}>{tab.icon}</div>
              <span style={{ fontSize: 10, color: activeTab === tab.id ? theme.accent : theme.muted, transition: "color 0.2s" }}>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
