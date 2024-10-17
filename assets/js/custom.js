/** @format */

document.addEventListener("DOMContentLoaded", function () {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          //lazyImage.srcset = lazyImage.dataset.srcset;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function (lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Possibly fall back to event handlers here
  }
});
var fired = false;
window.addEventListener(
  "scroll",
  function () {
    let scroll = window.scrollY;
    if (scroll > 0 && fired === false) {
      var recaptchaScript = document.createElement("script");
      recaptchaScript.src =
        "/Mvc/assetscatalyst/js/recaptcha/apif064.js?render=6LeHflUmAAAAAFI-_rB4YWt_q3nii1xrKAAtEBPr";
      recaptchaScript.defer = true;
      document.body.appendChild(recaptchaScript);
      fired = true;
    }
  },
  true
);

$(document).ready(function () {
  $("#newsletter-form").on("submit", function (e) {
    e.preventDefault();
    submitEmailNewsLetter();
  });

  $("#save-email").on("click", function (e) {
    e.preventDefault();
    submitEmailNewsLetter();
  });
  function submitEmailNewsLetter() {
    // Hide all previous error and success messages
    $("#newsletter-invalid-email-message").hide();
    $("#newsletter-email-exist").hide();
    $("#newsletter-fail-message").hide();
    $("#newsletter-success-message").hide();

    // Class for creating the newsletter object
    class CatalystNewsletter {
      constructor(email) {
        this.Email = email;
      }
    }

    // Regular expression for email validation
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const email = $("#newsletteremail").val();

    // Check if the email field is empty or invalid
    if (!email) {
      $("#newsletter-invalid-email-message").show();
    } else if (!emailRegex.test(email)) {
      $("#newsletter-invalid-email-message").show();
    } else {
      // AJAX call to submit the email if it's valid
      $.ajax({
        type: "POST",
        url: "/api/newsletter",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(new CatalystNewsletter(email)),
        cache: false,
        success: function (result) {
          if (result?.success === true) {
            $("#newsletter-success-message").show();
            $("#newsletter-form")[0].reset();
          } else {
            $("#newsletter-fail-message").show();
          }
        },
        error: function (ex) {
          console.error(ex.responseText);
          $("#newsletter-fail-message").show();
        },
      });
    }
  }
});
