var PdfBook = (function() {
  var CACHE = {};
  var PDF_CACHE = {};

  function init(pdflink, cb) {
    var pdfjs = window.pdfjsLib;
    if (!pdfjs) {
      cb("pdfjsLib not loaded");
      return;
    }

    if (PDF_CACHE[pdflink]) {
      return cb(null, wrapBook(PDF_CACHE[pdflink]));
    }

    pdfjs.getDocument(pdflink).promise
      .then(function(pdf) {
        PDF_CACHE[pdflink] = pdf;
        warmCache(pdf, 1);
        cb(null, wrapBook(pdf));
      })
      .catch(function(err) {
        cb(err || "pdf parsing failed");
      });
  }

  function warmCache(pdf, n) {
    if (n <= pdf.numPages) {
      getPage(pdf, n, function() {
        warmCache(pdf, n + 1);
      });
    }
  }

  function getPage(pdf, n, cb) {
    if (!n || n > pdf.numPages) return cb();
    if (CACHE[pdf._fingerprint + '-' + n]) {
      return cb(null, CACHE[pdf._fingerprint + '-' + n]);
    }

    pdf.getPage(n)
      .then(function(page) {
        var scale = 1.4;
        var viewport = page.getViewport({ scale: scale });
        var outputScale = window.devicePixelRatio || 1;

        var canvas = document.createElement("canvas");
        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = Math.floor(viewport.width) + "px";
        canvas.style.height = Math.floor(viewport.height) + "px";

        var transform = outputScale !== 1
          ? [outputScale, 0, 0, outputScale, 0, 0]
          : null;

        var context = canvas.getContext("2d");
        var renderContext = {
          canvasContext: context,
          transform: transform,
          viewport: viewport,
        };
        page.render(renderContext).promise
          .then(function() {
            var img = new Image();
            img.src = canvas.toDataURL();
            img.addEventListener("load", function() {
              CACHE[pdf._fingerprint + '-' + n] = {
                img: img,
                num: n,
                width: img.width,
                height: img.height,
              };
              cb(null, CACHE[pdf._fingerprint + '-' + n]);
            }, false);
          })
          .catch(function(err) { cb(err); });
      })
      .catch(function(err) { cb(err); });
  }

  function wrapBook(pdf) {
    return {
      pdf: pdf,
      numPages: function() { return pdf.numPages; },
      getPage: function(n, cb) { getPage(pdf, n, cb); },
    };
  }

  return { init: init };
})();
