const downloadReceipt = async () => {
  const doc = new jsPDF();
  const img = new Image();
  img.src = "/logo.png";

  img.onload = () => {
    doc.addImage(img, "PNG", 75, 10, 60, 20); // Center logo
    doc.setFontSize(16);
    doc.text("Healthify Lab – Booking Receipt", 20, 40);
    doc.setFontSize(12);
    doc.text(`Name: ${booking.name || "Guest"}`, 20, 55);

    let y = 70;
    if (booking.tests?.length) {
      doc.text("Selected Tests:", 20, y);
      booking.tests.forEach((test, i) => {
        doc.text(`- ${test}`, 30, y + 10 + i * 8);
      });
      y += 10 + booking.tests.length * 8;
    }

    if (booking.profiles?.length) {
      doc.text("Selected Profiles:", 20, y);
      booking.profiles.forEach((profile, i) => {
        doc.text(`- ${profile}`, 30, y + 10 + i * 8);
      });
    }

    doc.save("Healthify_Receipt.pdf");
  };
};
