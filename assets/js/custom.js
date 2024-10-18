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

  // $(document).ready(function () {
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

  $("#apply-now-form").on("submit", function (e) {
    e.preventDefault();

    // Create a function to collect repeated fields dynamically
    function collectFieldValues(fieldName) {
      let values = [];
      let i = 0;
      while ($(`#${fieldName}${i}`).length) {
        // Check if the field with index i exists
        values.push($(`#${fieldName}${i}`).val() || ""); // Push the value or empty string if it doesn't exist
        i++;
      }
      return values.join(" | "); // Join all values with ' | ' separator
    }

    // Now collect data for all your fields
    var data = {
      CompanyName: $("#CompanyName").val(),
      DescribeIdea: $("#DescribeIdea").val(),
      CompanyWebsite: $("#CompanyWebsite").val(),
      OnlineDemo: $("#OnlineDemo").val(),
      EnvironmentProblems: $("#EnvironmentProblems").val(),
      YourSolution: $("#YourSolution").val(),
      EnvironmentRelevance: $("#EnvironmentRelevance").val(),
      ServiceType: $("#ServiceType").val(),
      ProblamesTackleBySolution: $("#ProblamesTackleBySolution").val(),
      BusinessModel: $("#BusinessModel").val(),
      SpecificNumber: $("#SpecificNumber").val(),
      SpecificEvidence: $("#SpecificEvidence").val(),
      ReadinessLevel: $("#ReadinessLevel").val(),
      CurrentStatus: $("#CurrentStatus").val(),
      KindOfSupport: $("#KindOfSupport").val(),
      YourPlan: $("#YourPlan").val(),
      businessPlannPDF: $("#businessPlannPDF").val(),
      onlineDemoVideo: $("#onlineDemoVideo").val(),
      marketsector: $("#marketsector").val(),
      subsector: $("#subsector").val(),
      TargetMaket: $("#TargetMaket").val(),
      Competitors: $("#Competitors").val(),
      FoundersDream: $("#FoundersDream").val(),
      Expertise: $("#Expertise").val(),

      // Collect all repeated fields using the helper function
      firstname: collectFieldValues("firstname"),
      lastname: collectFieldValues("lastname"),
      role: collectFieldValues("role"),
      email: collectFieldValues("email"),
      country: collectFieldValues("country"),
      city: collectFieldValues("city"),
      profileurl: collectFieldValues("profileurl"),
      gender: collectFieldValues("gender"),
      commitmentlevel: collectFieldValues("commitmentlevel"),
      primarycontact: collectFieldValues("primarycontact"),

      Investors: $("#Investors").val(),
      keymembers: $("#keymembers").val(),
      legalentity: $("#legalentity").val(),
      relevantinfo: $("#relevantinfo").val(),
      ipprotection: $("#ipprotection").val(),
      programparticipation: $("#programparticipation").val(),
      reference: $("#reference").val(),
    };

    var formData = new FormData();
    formData.append("objCatalyst", JSON.stringify(data));

    if ($("#businessPlannPDF")[0].files.length > 0) {
      var fileBusUpload = $("#businessPlannPDF").prop("files")[0];
      formData.append("fileBusPDFInput", fileBusUpload);
    }
    if ($("#onlineDemoVideo")[0].files.length > 0) {
      var fileVideoUpload = $("#onlineDemoVideo").prop("files")[0];
      formData.append("fileVideoInput", fileVideoUpload);
    }

    $.ajax({
      type: "POST",
      url: "/api/applynow",
      cache: false,
      contentType: false,
      processData: false,
      data: formData,
      success: function (result) {
        if (result.message == "success") {
          $(".overlay").hide();
          $("#submissionerror").hide();
          $(".apply-now-form").append(`<h1  class="msg success" style="">
        You have successfully submitted your details!
    </h1>`);
          $("#apply-now-form").hide();
          $("#apply-now-form")[0].reset();
        } else if (result.message == "error") {
          $("#submissionerror").hide();
          $(".overlay").hide();
          $("#apply-now-form").hide();
          $("#apply-now-form")[0].reset();
          $(".apply-now-form").append(`<h1  class="msg error" style="">
        SOmething went wronf. Try again later!
    </h1>`);
        }
      },
      error: function (ex) {
        console.log(ex.responseText);
        $("#btnsubmitcontactus").prop("disabled", false);
      },
    });
  });
  // });
});
