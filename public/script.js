function redirectTo(page) {
    switch (page) {
      case 'imagesToPdf':
        window.location.href = '/images-to-pdf';
        break;
      case 'pdfToImages':
        window.location.href = '/pdf-to-images';
        break;
      case 'mergePdf':
        window.location.href = '/merge-pdf';
        break;
      case 'imageToImage':
        window.location.href = '/image-to-image';
        break;
      default:
        alert('Page not found');
    }
  }
  