const form = document.getElementById("urlForm");
const longUrlInput = document.getElementById("longUrl");
const shortenedUrlContainer = document.getElementById("shortenedUrl");
const qrCodeContainer = document.getElementById("qrCode");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const longUrl = longUrlInput.value;

  try {
    const accessToken = "ebfe6a163c920e75baa15995c8f1adef44751c16";
    const apiUrl = "https://api-ssl.bitly.com/v4/shorten";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ long_url: longUrl }),
    });

    if (!response.ok) {
      throw new Error("Failed to shorten URL");
    }

    const data = await response.json();
    const shortenedUrl = data.link;

    generateQRCode(shortenedUrl);

    showThankYouMessage();

    shortenedUrlContainer.innerHTML = `
      <p>Shortened URL: <a href="${shortenedUrl}" target="_blank">${shortenedUrl}</a></p>
    `;
  } catch (error) {
    console.error(error);
    shortenedUrlContainer.innerHTML = "<p>Error: Failed to shorten URL</p>";
    qrCodeContainer.innerHTML = "";
  }
});

async function generateQRCode(url) {
  try {
    const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
      url
    )}`;

    const response = await fetch(qrCodeApiUrl);
    if (!response.ok) {
      throw new Error("Failed to generate QR code");
    }

    const qrCodeImageSrc = qrCodeApiUrl;
    qrCodeContainer.innerHTML = `<img src="${qrCodeImageSrc}" alt="QR Code">`;
  } catch (error) {
    console.error(error);
    qrCodeContainer.innerHTML = "<p>Error: Failed to generate QR code</p>";
  }
}

function showThankYouMessage() {
    const thankYouMessageContainer = document.getElementById("thankYouMessageContainer");
    const thankYouMessage = document.createElement("p");
    thankYouMessage.textContent = "Thank you for using Saurab URL Shortener";
    thankYouMessageContainer.innerHTML = ""; 
    thankYouMessageContainer.appendChild(thankYouMessage);
  }
  