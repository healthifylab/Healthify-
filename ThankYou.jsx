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
y += 40;
doc.setFontSize(12);
doc.text("हेल्थिफाय लैब – बुकिंग रसीद", 20, y);
doc.text("धन्यवाद! आपकी जांच बुक कर ली गई है।", 20, y + 10);
doc.text("Healthify लॅब – तपासणी पावती", 20, y + 25);
doc.text("धन्यवाद! तुमची तपासणी यशस्वीरित्या बुक झाली आहे.", 20, y + 35);

    doc.save("Healthify_Receipt.pdf");
  };
};
<a
  href={`https://wa.me/919503832889?text=${encodeURIComponent(
    `Hello Healthify Lab,\n\nI have successfully booked a test.\nName: ${booking.name || ""}\nTests: ${booking.tests?.join(", ") || "-"}\nProfiles: ${booking.profiles?.join(", ") || "-"}`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
>
  <button>💬 Confirm on WhatsApp</button>
</a>

