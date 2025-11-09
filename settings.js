console.log("📦 settings.js starting load...");

import { auth, db, doc, setDoc, getDoc, onAuthStateChanged } from "./firebase.js";

window.__settingsModuleLoaded = true;
console.log("✅ settings.js module loaded successfully");

// ✅ Toast helper
function showToast(msg, type = "success") {
  const el = document.getElementById("toast");
  if (!el) return console.warn("⚠️ Missing #toast element");
  el.textContent = msg;
  el.style.backgroundColor = type === "error" ? "#dc2626" : "#16a34a";
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2000);
}

// ✅ Wait until user is authenticated before attaching event
onAuthStateChanged(auth, (user) => {
  if (!user) {
    console.warn("⚠️ User not logged in — disabling settings form.");
    return;
  }

  console.log("👤 Authenticated as:", user.uid);

  // Load existing business profile
  loadBusinessProfile(user.uid);

  // Attach Save button event
  const saveSettingsBtn = document.getElementById("saveSettings");
  if (!saveSettingsBtn) {
    console.error("❌ Save Settings button not found!");
    return;
  }

  saveSettingsBtn.addEventListener("click", async () => {
    console.log("💾 Save Settings clicked");

    const payload = {
      companyName: document.getElementById("setCompanyName")?.value.trim(),
      gstin: document.getElementById("setGST")?.value.trim(),
      email: document.getElementById("setEmail")?.value.trim(),
      phone: document.getElementById("setPhone")?.value.trim(),
      address: document.getElementById("setAddress")?.value.trim(),
      invoiceTemplate: document.getElementById("setTemplate")?.value,
      taxType: document.getElementById("setTaxType")?.value,
      showLogo: document.getElementById("setShowLogo")?.checked ?? true,
        // 💳 Payment details
        upiId: document.getElementById("setUpiId")?.value.trim(),
        paytmLink: document.getElementById("setPaytmLink")?.value.trim(),
        razorpayLink: document.getElementById("setRazorpayLink")?.value.trim(),
        bankDetails: document.getElementById("setBankDetails")?.value.trim()
    };

    console.log("📤 Attempting Firestore write...");
    console.log("User UID:", user.uid);
    console.log("Payload before writing:", payload);

    // Field diagnostics
    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined) console.warn(`⚠️ ${key} is undefined`);
      else if (value === "") console.warn(`⚠️ ${key} is empty`);
    });

    try {
      await setDoc(doc(db, "businessProfile", user.uid), payload, { merge: true });
      console.log("✅ Firestore write success!");
      showToast("Settings saved successfully ✅");
    } catch (err) {
      console.error("❌ Firestore save failed:", err);
      showToast("Error saving settings ❌", "error");
    }
  });
});

// ✅ Function to load existing data
async function loadBusinessProfile(uid) {
  const ref = doc(db, "businessProfile", uid);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    const d = snap.data();
    console.log("📥 Loaded business profile:", d);

    document.getElementById("setCompanyName").value = d.companyName || "";
    document.getElementById("setGST").value = d.gstin || "";
    document.getElementById("setEmail").value = d.email || "";
    document.getElementById("setPhone").value = d.phone || "";
    document.getElementById("setAddress").value = d.address || "";
    document.getElementById("setTemplate").value = d.invoiceTemplate || "invoice-template-1.html";
    document.getElementById("setTaxType").value = d.taxType || "intra";
    document.getElementById("setShowLogo").checked = d.showLogo ?? true;
    document.getElementById("setUpiId").value = d.upiId || "";
    document.getElementById("setPaytmLink").value = d.paytmLink || "";
    document.getElementById("setRazorpayLink").value = d.razorpayLink || "";
    document.getElementById("setBankDetails").value = d.bankDetails || "";

  } else {
    console.log("ℹ️ No business profile found yet for this user.");
  }
}
