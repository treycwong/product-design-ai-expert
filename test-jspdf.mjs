(async () => {
  const jsPDFModule = await import("jspdf");
  const jsPDF = jsPDFModule.default || jsPDFModule.jsPDF;
  const doc = new jsPDF();
  const autoTableModule = await import("jspdf-autotable");
  const autoTable = autoTableModule.default || autoTableModule;
  try {
    autoTable(doc, { head: [['a']], body: [['b']]});
    console.log("autoTable function worked!");
  } catch (e) {
    console.log("autoTable function failed:", e);
    try {
      doc.autoTable({ head: [['a']], body: [['b']]});
      console.log("doc.autoTable worked!");
    } catch(e2) {
      console.log("Both failed");
    }
  }
})();
