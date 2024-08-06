!(function ($) {
  "use strict";
  function a(b, c) {
    var d,
      a = this;
    (a.$elem = $(b)),
      (a.lineHeight = a._getLineHeight()),
      (a.origHeight = a.$elem.height()),
      (a.origTxt = a.$elem.text()),
      (a.settings = $.extend({}, a._defaults, c || {})),
      a._setLines(),
      a.truncate(),
      $(window).resize(function () {
        clearTimeout(d), (d = setTimeout($.proxy(a.truncate, a), 200));
      });
  }
  (a.prototype = {
    hide: function () {
      this._getCurrentLines() > this.settings.lines &&
        this.$elem.animate(
          { height: this.lineHeight * this.settings.lines },
          $.proxy(this.truncate, this)
        );
    },
    show: function () {
      this.$elem.height(this.$elem.height()),
        this._restoreOrigTxt(),
        this.$elem.animate({ height: this.origHeight });
    },
    truncate: function () {
      this._prepareElem();
      var a = this._restoreOrigTxt(),
        b = this._getCurrentLines(),
        c = Math.round(a.length / b),
        d = Math.round(c / 2);
      if (b > this.settings.lines) {
        if (b > this.settings.lines + 1)
          for (
            a = this._truncateElementTxt((this.settings.lines + 1) * c);
            this._getCurrentLines() > this.settings.lines + 1;

          )
            a = this._truncateElementTxt(a.length - d);
        for (; this._getCurrentLines() > this.settings.lines; ) {
          if (a.length == d) {
            this._recoverFromLoop(a);
            break;
          }
          a = this._truncateElementTxt(a.length - 1);
        }
      }
      this._restoreElem();
    },
    _defaults: { end: "\u2026", lines: null },
    _getLineHeight: function () {
      var a = null;
      return (
        document.body.currentStyle &&
          ((a = this.$elem.get(0).currentStyle.lineHeight).match(
            /px|PX|pt|PT|em|EM/
          ) ||
            this.$elem.css("line-height", 100 * a + "%")),
        parseInt(this.$elem.css("line-height"), 10)
      );
    },
    _getCurrentLines: function () {
      return Math.round(this.$elem.height() / this.lineHeight);
    },
    _prepareElem: function () {
      (this.css = {
        height: $.style(this.$elem, "height") || "auto",
        maxHeight: this.$elem.css("max-height"),
        minHeight: this.$elem.css("min-height"),
      }),
        this.$elem.css({ height: "auto", maxHeight: "none", minHeight: 0 });
    },
    _recoverFromLoop: function (a) {
      for (
        var b = this.$elem.height(), c = this.origTxt.length;
        b == this.$elem.height() && a.length < c;

      )
        a = this._truncateElementTxt(a.length + 1);
      this.$elem.height() != b && this._truncateElementTxt(a.length - 1),
        a.length == c && this._restoreOrigTxt();
    },
    _restoreElem: function () {
      this.$elem.css(this.css);
    },
    _restoreOrigTxt: function () {
      return this.$elem.text(this.origTxt), this.origTxt;
    },
    _setLines: function () {
      if (!this.settings.lines) {
        var a = parseInt(this.$elem.css("max-height"), 10);
        a > this.lineHeight
          ? (this.settings.lines = Math.floor(a / this.lineHeight))
          : (this.settings.lines = 1);
      }
    },
    _truncateElementTxt: function (b) {
      var a = this.origTxt.substring(0, b);
      return this.$elem.text(a + this.settings.end), a;
    },
  }),
    ($.fn.txtTruncate = function (b) {
      return this.each(function () {
        $(this).data("truncator", new a(this, b));
      });
    });
})(jQuery),
  (function ($) {
    var a = $(window);
    $.fn.visible = function (f, G, d, s) {
      if (!(this.length < 1)) {
        d = d || "both";
        var j = this.length > 1 ? this.eq(0) : this,
          e = null != s,
          k = e ? $(s) : a,
          c = e ? k.position() : 0,
          l = j.get(0),
          g = k.outerWidth(),
          h = k.outerHeight(),
          i = !0 !== G || l.offsetWidth * l.offsetHeight;
        if ("function" == typeof l.getBoundingClientRect) {
          var b = l.getBoundingClientRect(),
            t = e
              ? b.top - c.top >= 0 && b.top < h + c.top
              : b.top >= 0 && b.top < h,
            u = e
              ? b.bottom - c.top > 0 && b.bottom <= h + c.top
              : b.bottom > 0 && b.bottom <= h,
            v = e
              ? b.left - c.left >= 0 && b.left < g + c.left
              : b.left >= 0 && b.left < g,
            w = e
              ? b.right - c.left > 0 && b.right < g + c.left
              : b.right > 0 && b.right <= g,
            m = f ? t || u : t && u,
            n = f ? v || w : v && w,
            m = (b.top < 0 && b.bottom > h) || m,
            n = (b.left < 0 && b.right > g) || n;
          if ("both" === d) return i && m && n;
          if ("vertical" === d) return i && m;
          if ("horizontal" === d) return i && n;
        } else {
          var o = e ? 0 : c,
            x = o + h,
            p = k.scrollLeft(),
            y = p + g,
            z = j.position(),
            q = z.top,
            A = q + j.height(),
            r = z.left,
            B = r + j.width(),
            C = !0 === f ? A : q,
            D = !0 === f ? q : A,
            E = !0 === f ? B : r,
            F = !0 === f ? r : B;
          if ("both" === d) return !!i && D <= x && C >= o && F <= y && E >= p;
          if ("vertical" === d) return !!i && D <= x && C >= o;
          if ("horizontal" === d) return !!i && F <= y && E >= p;
        }
      }
    };
  })(jQuery);
var btn = $("#GoTotop");
function truncateText() {
  $(".inner-page.news .news-block .news-details .news-title").txtTruncate(),
    $(
      ".inner-page.news .news-block .news-details .news-description"
    ).txtTruncate(),
    $(
      ".inner-page.news-details .you-may-like .news-details .news-title"
    ).txtTruncate(),
    $(
      ".inner-page.news-details .you-may-like .news-details .news-description"
    ).txtTruncate();
}
function homepageBannerImages() {
  if ($(window).width() > 768) {
    $(".banner .img-block").removeAttr("style");
    var a = $(".banner").width(),
      b = (a / 1920) * 991;
    $(".banner .img-block").height(b), $(".banner .img-block").width(a);
  }
}
function homepageMentourImages() {
  $(".mentors .mentor-list .mentor-block .profile-pic").removeAttr("style");
  var a = $(".mentors .mentor-list .mentor-block").width();
  $(".mentors .mentor-list .mentor-block .profile-pic").height((a / 200) * 238),
    $(".mentors .mentor-list .mentor-block .profile-pic").width(a);
}
function mediaNews() {
  $(".inner-page.news .regular.news-block .news-pic").removeAttr("style");
  var a = $(".inner-page.news .regular.news-block").width();
  $(".inner-page.news .regular.news-block .news-pic").height((a / 440) * 248),
    $(".inner-page.news .regular.news-block .news-pic").width(a);
}
function mediaNewsFeatured() {
  $(".inner-page.news .row.top .news-block .news-pic").removeAttr("style");
  var a = $(".inner-page.news .row.top .news-block").width();
  $(".inner-page.news .row.top .news-block .news-pic").height((a / 682) * 384),
    $(".inner-page.news .row.top .news-block .news-pic").width(a);
}
function mediaNewsDetails() {
  $(".inner-page.news-details .top .news-block .news-pic").removeAttr("style");
  var a = $(".inner-page.news-details .top .news-block").width();
  $(".inner-page.news-details .top .news-block .news-pic").height(
    (a / 1401) * 788
  ),
    $(".inner-page.news-details .top .news-block .news-pic").width(a);
}
function newsDetailsDescriptionImage() {
  $(".inner-page.news-details .description-image .news-pic").removeAttr(
    "style"
  );
  var a = $(".inner-page.news-details .description-image").width();
  $(".inner-page.news-details .description-image .news-pic").height(
    (a / 677) * 368
  ),
    $(".inner-page.news-details .description-image .news-pic").width(a);
}
function suggestedNews() {
  $(".inner-page.news-details  .you-may-like .news-block .news-pic").removeAttr(
    "style"
  );
  var a = $(".inner-page.news-details .you-may-like  .news-block").width();
  $(".inner-page.news-details .you-may-like  .news-block .news-pic").height(
    (a / 440) * 248
  ),
    $(".inner-page.news-details .you-may-like .news-block .news-pic").width(a);
}
function ourTeam() {
  $(".inner-page.about-us-page .our-team .block .img-wrapper").removeAttr(
    "style"
  );
  var a = $(".inner-page.about-us-page .our-team .block").width();
  $(".inner-page.about-us-page .our-team .block .img-wrapper").height(
    (a / 200) * 238
  ),
    $(".inner-page.about-us-page .our-team .block .img-wrapper").width(a);
}
function whoCanApply() {
  $(".inner-page.who-can-apply-page .who-can-apply-image-wrapper").removeAttr(
    "style"
  );
  var a = $(".inner-page.who-can-apply-page .image-block").width();
  $(".inner-page.who-can-apply-page .who-can-apply-image-wrapper").height(
    (a / 681) * 383
  ),
    $(".inner-page.who-can-apply-page .who-can-apply-image-wrapper").width(a);
}
function ourServices() {
  $(".inner-page.services-page .block .img-wrapper").removeAttr("style");
  var a = $(".inner-page.services-page .block").width();
  $(".inner-page.services-page .block .img-wrapper").height((a / 201) * 238),
    $(".inner-page.services-page .block .img-wrapper").width(a);
}
function events_main() {
  $(".events-image-big").removeAttr("style");
  var a = $(".events-block").width();
  $(".events-image-big").height((a / 682) * 384),
    $(".events-image-big").width(a);
}
function events_small() {
  $(".events-image-small").removeAttr("style");
  var a = $(".event-small-block").width();
  $(".events-image-small").height((a / 440) * 248),
    $(".events-image-small").width(a);
}
function sectionActive() {
  $("section").each(function (b, a) {
    var a = $(a);
    a.visible(!0) ? a.addClass("active") : a.removeClass("active");
  });
}
function socialMediaInsta() {
  $(".social-media .media-block .block-content.instagram .picture").removeAttr(
    "style"
  );
  var a = $(
    ".social-media .media-block .block-content.instagram .picture"
  ).width();
  $(".social-media .media-block .block-content.instagram .picture").height(
    (a / 210) * 210
  );
}
function socialMediaYoutube() {
  $(".social-media .media-block .block-content.youtube .video").removeAttr(
    "style"
  );
  var a = $(".social-media .media-block .block-content.youtube").width();
  $(".social-media .media-block .block-content.youtube .video").height(
    (a / 383) * 236
  ),
    $(".social-media .media-block .block-content.youtube .video").width(a);
}
$(window).scroll(function () {
  $(window).scrollTop() > 300 ? btn.addClass("show") : btn.removeClass("show");
}),
  btn.on("click", function (a) {
    a.preventDefault(), $("html, body").animate({ scrollTop: 0 }, "300");
  }),
  $(".nav-item").click(function () {
    $(this).children(".dropdown-menu").toggleClass("active");
  }),
  $(".dropdown").mouseenter(function () {
    $(window).width() >= 992 &&
      ($(this).addClass("active"),
      $(this).next(".dropdown-menu").addClass("active"));
  }),
  $(".dropdown").mouseleave(function () {
    $(window).width() >= 992 &&
      ($(this).removeClass("active"),
      $(this).next(".dropdown-menu").removeClass("active"));
  }),
  $(".dropdown-menu").mouseenter(function () {
    $(this).addClass("active"), $(this).prev(".nav-link").addClass("active");
  }),
  $(".dropdown-menu").mouseleave(function () {
    $(this).removeClass("active"),
      $(this).prev(".nav-link").removeClass("active");
  }),
  $("header .search-wrapper .icon-search").click(function () {
    $(this).parent().addClass("active");
  }),
  $("header .search-wrapper .form-control").focusin(function () {
    $(".search-dropdown").addClass("active");
  }),
  $("header .search-wrapper .form-control").focusout(function () {
    $(".search-dropdown").removeClass("active");
  }),
  $(document).mouseup(function (b) {
    var a = $("header .right-content .search-wrapper");
    a.is(b.target) || 0 !== a.has(b.target).length || a.removeClass("active");
  }),
  $(document).ready(function () {
    setTimeout(function () {
      truncateText(),
        mediaNews(),
        mediaNewsFeatured(),
        mediaNewsDetails(),
        newsDetailsDescriptionImage(),
        suggestedNews(),
        ourTeam(),
        whoCanApply(),
        ourServices(),
        homepageMentourImages(),
        events_main(),
        events_small();
    }, 300);
  }),
  $(window).scroll(function () {
    $(window).scrollTop() > 0
      ? $("#header").addClass("fixed")
      : $("#header").removeClass("fixed");
  }),
  $(window).resize(function () {
    setTimeout(function () {
      truncateText(),
        mediaNews(),
        mediaNewsFeatured(),
        mediaNewsDetails(),
        newsDetailsDescriptionImage(),
        suggestedNews(),
        ourTeam(),
        whoCanApply(),
        ourServices(),
        homepageMentourImages(),
        events_main(),
        events_small();
    }, 300);
  }),
  $(document).ready(function () {
    $(".input-field").each(function () {
      var a = (textarea_text = $(this).find("textarea")).attr("maxlength");
      textarea_text
        .next(".count")
        .find(".maximum_count")
        .text("/" + a),
        textarea_text
          .next(".count")
          .find(".count-text")
          .text("(max " + a + " characters)"),
        textarea_text.keyup(function () {
          var a = $(this).val().length,
            b = $(this).next(".count").find(".current_count");
          $(this).next(".count"), b.text(a);
        });
    }),
      $('.input-text .input-group input[type="file"]').change(function (a) {
        var b = a.target.files[0].name;
        $(this).next(".custom-file-label").html(b),
          $(this).next(".custom-file-label").css("color", "#000");
      }),
      $(".selecttwo").select2();
  }),
  $(window).scroll(function () {
    sectionActive(), setTimeout(function () {}, 300);
  }),
  $(document).ready(function () {
    new Swiper(".testimonials-slider", {
      slidesPerView: 3,
      spaceBetween: 40,
      preloadImages: !1,
      lazy: !0,
      loop: !0,
      autoplay: !0,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        320: { slidesPerView: 1 },
        580: { slidesPerView: 2 },
        767: { slidesPerView: 2 },
        1e3: { slidesPerView: 3 },
        1400: { slidesPerView: 3 },
      },
    }),
      setTimeout(function () {
        sectionActive(), socialMediaInsta(), socialMediaYoutube();
      }, 300);
  }),
  $(window).resize(function () {
    socialMediaInsta(), socialMediaYoutube(), setTimeout(function () {}, 300);
  }),
  $(".nav.nav-tabs li a").click(function () {
    $(".nav.nav-tabs li a").removeClass("active");
  }),
  $(
    ".inner-page.faq-page .page-content .questions-wrapper .question-block .question-header"
  ).click(function () {
    $(this).parent(".question-block").toggleClass("active");
  });
var swiper = new Swiper(".catalyzers-slider", {
  slidesPerView: 4,
  spaceBetween: 126,
  preloadImages: !1,
  lazy: { loadPrevNext: !0, loadPrevNextAmount: 1 },
  loop: !0,
  autoplay: !0,
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
  breakpoints: {
    320: { slidesPerView: 1 },
    580: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1400: { slidesPerView: 4 },
    1920: { slidesPerView: 4 },
  },
});
$(document).ready(function () {
  function a() {
    var a = !0,
      b = $(".validate");
    return (
      $.each(b, function (f, b) {
        if ($(b).is("input")) {
          if (
            ("text" == $(b).attr("type") &&
              ($(b).hasClass("required") && "" == $(b).val()
                ? ((a = !1), $(b).siblings(".error").show())
                : $(b).siblings(".error").hide()),
            "url" == $(b).attr("type"))
          ) {
            var c =
              /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
            $(b).hasClass("required")
              ? ("" != $(b).val() && c.test($(b).val())) ||
                ((a = !1), $(b).siblings(".error").show())
              : (console.log(c.test($(b).val())),
                "" == $(b).val() || c.test($(b).val())
                  ? $(b).siblings(".error").hide()
                  : ((a = !1), $(b).siblings(".error").show()));
          }
          if ("email" == $(b).attr("type")) {
            var c =
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            $(b).hasClass("required")
              ? "" != $(b).val() && c.test($(b).val())
                ? $(b).siblings(".error").hide()
                : ((a = !1), $(b).siblings(".error").show())
              : "" == $(b).val() || c.test($(b).val())
              ? $(b).siblings(".error").hide()
              : ((a = !1), $(b).siblings(".error").show());
          }
          if ("tel" == $(b).attr("type")) {
            var c = /^([0-9]|#|\+|\ |\)|\()+$/;
            $(b).hasClass("required")
              ? "" != $(b).val() && c.test($(b).val())
                ? $(b).siblings(".error").hide()
                : ((a = !1), $(b).siblings(".error").show())
              : "" == $(b).val() || c.test($(b).val())
              ? $(b).siblings(".error").hide()
              : ((a = !1), $(b).siblings(".error").show());
          }
          if (
            ("checkbox" == $(b).attr("type") &&
              $(b).hasClass("required") &&
              (!0 == this.checked
                ? $("#privacycheck").hide()
                : ((a = !1), $("#privacycheck").show())),
            "radio" == $(b).attr("type") && $(b).hasClass("required"))
          ) {
            var d = $(b).attr("name");
            $("input[name='" + d + "']:checked").length > 0
              ? $("." + d).hide()
              : ((a = !1), $("." + d).show());
          }
        } else if ($(b).is("textarea"))
          $(b).hasClass("required") && "" == $(b).val()
            ? ((a = !1), $(b).siblings(".error").show())
            : $(b).siblings(".error").hide();
        else if ($(b).is("select") && $(b).hasClass("required")) {
          if (
            "0" == $(b).val() ||
            "undefined" == $(b).val() ||
            null == $(b).val()
          ) {
            a = !1;
            var e = $(b).attr("id") + "select";
            $("#" + e).show();
          } else {
            var e = $(b).attr("id") + "select";
            $("#" + e).hide();
          }
        }
      }),
      a
    );
  }
  function b() {
    var a = this;
    (a.Name = $("#name").val()),
      (a.Email = $("#email").val()),
      (a.PhoneNumber = $("#contact").val()),
      (a.Subject = $("#txtSubject").val()),
      (a.Comment = $("#message").val()),
      (a.Token = $("#g-recaptcha-response-100000").val());
  }
  $("#save-email").click(function (b) {
    var a;
    (b.preventDefault(),
    $("#newsletter-email-exist").hide(),
    $("#newsletter-success-message").hide(),
    $("#newsletter-fail-message").hide(),
    (a = $("#txtEmailNewsletterSub").val()),
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      a
    ))
      ? ($("#newsletter-invalid-email-message").hide(),
        document.getElementById("cbNewsletterAgree").checked
          ? ($(".overlay").show(),
            $("#newsletter-checkbox-message").hide(),
            grecaptcha
              .execute($("#sitekey").val(), { action: "newsletter" })
              .then(function (a) {
                $.ajax({
                  type: "POST",
                  dataType: "json",
                  url:
                    "/api/catalystnewslettersubscription/Newsletter?email=" +
                    $("#txtEmailNewsletterSub").val() +
                    "&token=" +
                    $("#g-recaptcha-response-100000").val(),
                  async: !0,
                  contentType: "application/json; charset=utf-8",
                  success: function (a) {
                    a
                      ? "Success" == a
                        ? ($("#newsletter-email-exist").hide(),
                          $("#newsletter-success-message").show(),
                          $("#newsletter-fail-message").hide(),
                          $("#txtEmailNewsletterSub").val(""),
                          $("#cbNewsletterAgree").prop("checked", !1),
                          $(".overlay").hide())
                        : "AlreadyExists" == a
                        ? ($("#newsletter-email-exist").show(),
                          $("#newsletter-success-message").hide(),
                          $("#newsletter-fail-message").hide(),
                          $(".overlay").hide())
                        : ($("#newsletter-email-exist").hide(),
                          $("#newsletter-success-message").hide(),
                          $("#newsletter-fail-message").show(),
                          $(".overlay").hide())
                      : ($("#newsletter-email-exist").hide(),
                        $("#newsletter-success-message").hide(),
                        $("#newsletter-fail-message").show(),
                        $(".overlay").hide());
                  },
                  error: function (a) {
                    a.responseText
                      ? "Success" == a.responseText
                        ? ($("#newsletter-email-exist").hide(),
                          $("#newsletter-success-message").show(),
                          $("#newsletter-fail-message").hide(),
                          $("#txtEmailNewsletterSub").val(""),
                          $("#cbNewsletterAgree").prop("checked", !1),
                          $(".overlay").hide())
                        : "AlreadyExists" == a.responseText
                        ? ($("#newsletter-email-exist").show(),
                          $("#newsletter-success-message").hide(),
                          $("#newsletter-fail-message").hide(),
                          $(".overlay").hide())
                        : ($("#newsletter-email-exist").hide(),
                          $("#newsletter-success-message").hide(),
                          $("#newsletter-fail-message").show(),
                          $(".overlay").hide())
                      : ($("#newsletter-email-exist").hide(),
                        $("#newsletter-success-message").hide(),
                        $("#newsletter-fail-message").show(),
                        $(".overlay").hide());
                  },
                });
              }))
          : ($("#newsletter-checkbox-message").show(), $(".overlay").hide()))
      : ($("#newsletter-invalid-email-message").show(), $(".overlay").hide());
  }),
    $("#btnsubmitcontactus").click(function () {
      $("html,body").scrollTop(0),
        $("#contactformError").hide(),
        $("#contactFormSuccess").hide(),
        a() &&
          ($(".overlay").show(),
          $("#wait-msg").show(),
          grecaptcha
            .execute($("#sitekey").val(), { action: "ContactUs" })
            .then(function (c) {
              var a = new b();
              $.ajax({
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                url: "/api/catalystcontactus/ContactUs",
                data: JSON.stringify(a),
                async: !0,
                success: function (a) {
                  a && !0 == a.Response
                    ? ($("#contactusForm").hide(),
                      $("#thankYouMessage").show(),
                      $("#contactformError").hide(),
                      $("#contactFormSuccess").show(),
                      $("#txtName").val(""),
                      $("#txtEmail").val(""),
                      $("#txtSubject").val(""),
                      $("#txtPhone").val(""),
                      $("#txtComments").val(""),
                      $(".overlay").hide(),
                      $("#wait-msg").hide())
                    : ($("#contactusForm").hide(),
                      $("#thankYouMessage").show(),
                      $("#contactformError").show(),
                      $("#contactFormSuccess").hide(),
                      $(".overlay").hide(),
                      $("#wait-msg").hide());
                },
              }),
                $("#contact-captcha-fail-message").hide();
            }));
    }),
    $("#btnsubmitapplynow").click(function () {
      if (
        (event.preventDefault(),
        $("#applyformError").hide(),
        $("#applyFormSuccess").hide(),
        a())
      ) {
        $(".overlay").show(), $("#wait-msg").show();
        var b = (function () {
          for (
            var c = [],
              e = parseInt(document.getElementById("indexvalue").value),
              b = 0;
            b <= e;
            b++
          ) {
            var d,
              a = b.toString();
            d =
              "Yes" != $("#primarycontact" + a).val() &&
              "No" != $("#primarycontact" + a).val()
                ? "No"
                : $("#primarycontact" + a).val();
            var f = {
              FirstName: $("#firstname" + a).val(),
              LastName: $("#lastname" + a).val(),
              Role: $("#role" + a).val(),
              Email: $("#email" + a).val(),
              Country: $("#country" + a).val(),
              City: $("#city" + a).val(),
              ProfileURL: $("#profileurl" + a).val(),
              Gender: $("#gender" + a).val(),
              CommitmentLevel: $("#commitmentlevel" + a).val(),
              PrimaryContact: d,
            };
            c.push(f);
          }
          return c;
        })();
        (document.getElementById("JsonCompanyFounders").value =
          JSON.stringify(b)),
          grecaptcha
            .execute($("#sitekey").val(), { action: "apply_now" })
            .then(function (a) {
              (document.getElementById("Token").value = a),
                $(".overlay").show(),
                $("#apply-now-form").unbind("submit").submit();
            });
      } else $("#submissionerror").show(), $("html,body").scrollTop(0);
    }),
    $("#search-box-icon").click(function (b) {
      if (
        $(".search-wrapper").hasClass("active") &&
        "" != $("#search-box-query").val() &&
        $("#search-box-query") &&
        "" != $("#search-box-query").val()
      ) {
        var a = "query=" + $("#search-box-query").val();
        a &&
          ($("#search-box-query").val(""),
          (window.location.href = "/en/Search?" + a));
      }
      return !1;
    }),
    $("#search-box-query").keypress(function (b) {
      if (13 == b.keyCode) {
        if ($("#search-box-query") && "" != $("#search-box-query").val()) {
          var a = "query=" + $("#search-box-query").val();
          a &&
            ($("#search-box-query").val(""),
            (window.location.href = "/en/Search?" + a));
        }
        return !1;
      }
    }),
    $("#faqsearch-box-query").keypress(function (a) {
      13 == a.keyCode &&
        (window.location.href = "/en/catalyzers/faqs?query=" + $(this).val());
    }),
    $("#search-box-btn").click(function () {
      return (
        e.preventDefault(),
        $("#search-box-query") &&
          "" != $("#search-box-query").val() &&
          ($("#search-box-query").val(),
          (window.location.href = "/en/Search?" + data)),
        !1
      );
    }),
    $(".load-new-page").click(function () {
      var b = parseInt($(this).val());
      if ($("#search-box-query") && "" != $("#search-box-query").val()) {
        var a = "query=" + $("#search-box-query").val();
        a && (window.location.href = "/en/Search?" + a + "&page=" + b);
      }
    }),
    $(".page-prev").click(function () {
      var a = parseInt($(this).val());
      if (
        ((a -= 1), $("#search-box-query") && "" != $("#search-box-query").val())
      ) {
        var b = "query=" + $("#search-box-query").val();
        b && (window.location.href = "/en/Search?" + b + "&page=" + a);
      }
    }),
    $(".page-next").click(function () {
      var a = parseInt($(this).val());
      if (
        ((a += 1), $("#search-box-query") && "" != $("#search-box-query").val())
      ) {
        var b = "query=" + $("#search-box-query").val();
        b && (window.location.href = "/en/Search?" + b + "&page=" + a);
      }
    }),
    (ShowTextCounter = function (a, d) {
      var b,
        c = a.value.length;
      (b = a.maxLength > 0 ? c + "/" + a.maxLength : c),
        (document.getElementById("text-counter-" + d).innerText = b);
    });
}),
  $(".add-item").click(function (b) {
    b.preventDefault(),
      $(".remove-item").css("display", "block"),
      $(".fonders-row").append(
        '<div class="fonders-block"><div class="row"><div class="col-md-6"><div class="input-field"><div class="input-label"><label for="name" class="input-label">First Name <span class="required">*</span></label></div><div class="input-text"><input type="text" class="form-control validate required" id="firstname" placeholder="Enter first name"><p class="error" style="display:none;">Please enter first name</p></div></div></div><div class="col-md-6"><div class="input-field"><div class="input-label"><label for="name" class="input-label">Last Name <span class="required">*</span></label></div><div class="input-text"><input type="text" class="form-control validate required" id="lastname" placeholder="Enter last name"><p class="error" style="display:none;">Please enter last name</p></div></div></div><div class="col-md-6"><div class="input-field"><div class="input-label"><label for="name" class="input-label">Role/ Responsibility <span class="required">*</span></label></div><div class="input-text"><input type="text" class="form-control validate required" id="role" placeholder="Enter your role"><p class="error" style="display:none;">Please enter in detail</p></div></div></div><div class="col-md-6"><div class="input-field"><div class="input-label"><label for="name" class="input-label">Email <span class="required">*</span></label></div><div class="input-text"><input type="email" class="form-control validate required" id="email" placeholder="Enter your email"><p class="error" style="display:none;">Please enter email</p></div></div></div><div class="col-md-6"><div class="input-field"><div class="input-label"><label for="name" class="input-label">Country<span class="required">*</span></label></div><div class="input-text"><input type="text" class="form-control validate required" id="country" placeholder="Enter your country"><p class="error" style="display:none;">Please enter country</p></div></div></div><div class="col-md-6"><div class="input-field"><div class="input-label"><label for="name" class="input-label">City <span class="required">*</span></label></div><div class="input-text"><input type="text" class="form-control validate required" id="city" placeholder="Enter your city"><p class="error" style="display:none;">Please enter city</p></div></div></div><div class="col-md-6"><div class="input-field"><div class="input-label"><label for="name" class="input-label">Professional profile URL (e.g. LinkedIn)<span class="required">*</span></label></div><div class="input-text"><input type="text" class="form-control validate required" id="profileurl" placeholder="Enter your profile URL"><p class="error" style="display:none;">Please enter professional profile URL</p></div></div></div><div class="col-md-6"><div class="input-field"><div class="input-label"><label for="name" class="input-label">Gender <span class="required">*</span></label></div><div class="input-text"><select class="form-control selecttwo validate required" id="gender"><option value="" disabled selected>Select</option><option value="Male"> Male</option><option value="Female"> Female</option><option value="Others"> Others</option><option value="Not Disclosed"> Not Disclosed</option></select><p class="error" id="genderselect" style="display:none;">Please enter gender</p></div></div></div><div class="col-md-6"><div class="input-field"><div class="input-label"><label for="name" class="input-label">Level of commitment<span class="required">*</span></label></div><div class="input-text"><input type="text" class="form-control validate required" id="commitmentlevel" placeholder="Enter your level of commitment"><p class="error" style="display:none;">Please enter level of commitment</p></div></div></div><div class="col-md-6"><div class="input-field"><div class="input-label"><label for="name" class="input-label">Will you be the primary contact to Catalyst? </label></div><div class="input-text"><select class="form-control selecttwo" id="primarycontact"><option value="0" disabled selected>Select</option><option value="Yes"> Yes</option><option value="No"> No</option></select></div></div></div></div></div>'
      );
    var a = document.getElementById("indexvalue").value;
    (a = (parseInt(a) + 1).toString()),
      (document.getElementById("firstname").id = "firstname" + a),
      (document.getElementById("lastname").id = "lastname" + a),
      (document.getElementById("role").id = "role" + a),
      (document.getElementById("email").id = "email" + a),
      (document.getElementById("country").id = "country" + a),
      (document.getElementById("city").id = "city" + a),
      (document.getElementById("profileurl").id = "profileurl" + a),
      (document.getElementById("gender").id = "gender" + a),
      (document.getElementById("genderselect").id = "gender" + a + "select"),
      (document.getElementById("commitmentlevel").id = "commitmentlevel" + a),
      (document.getElementById("primarycontact").id = "primarycontact" + a),
      (document.getElementById("indexvalue").value = a),
      $(".selecttwo").select2();
  }),
  $(".add-remove-item").on("click", function () {
    1 == $(".fonders-row .fonders-block").length && $(".remove-item").fadeOut();
  }),
  $(".remove-item").on("click", function (a) {
    if ((a.preventDefault(), $(".fonders-row .fonders-block").length > 1)) {
      $(this)
        .closest(".form-block")
        .find(".fonders-row .fonders-block")
        .not(":first")
        .last()
        .remove();
      var b = document.getElementById("indexvalue").value;
      document.getElementById("indexvalue").value = (
        parseInt(b) - 1
      ).toString();
    }
  }),
  $("#news-load-more").click(function () {
    $(this).parent().parent().css("display", "none"),
      $("#load-more-news").css("display", "flex");
  }),
  $("#event-load-more").click(function () {
    $(this).parent().parent().css("display", "none"),
      $("#load-more-event").css("display", "block");
  }),
  $(document).ready(function () {
    $("#businessPlannPDF").change(function () {
      if ("" != $("#businessPlannPDF").val()) {
        $("#pdfFile").hide();
        var a = $("#businessPlannPDF").get(0).files;
        let b = Math.round(a[0].size / 1024);
        b > 1024 &&
          ($(this).next(".custom-file-label").html("File Name"),
          $(this).next(".custom-file-label").css("color", "#858585"),
          $("#pdfFile").show(),
          $("#businessPlannPDF").wrap("<form>").closest("form").get(0).reset(),
          $("#businessPlannPDF").unwrap());
      }
    }),
      $("#onlineDemoVideo").change(function () {
        if ("" != $("#onlineDemoVideo").val()) {
          $("#videoFile").hide();
          var a = $("#onlineDemoVideo").get(0).files;
          let b = Math.round(a[0].size / 1024);
          b > 5120 &&
            ($(this).next(".custom-file-label").html("File Name"),
            $(this).next(".custom-file-label").css("color", "#858585"),
            $("#videoFile").show(),
            $("#onlineDemoVideo").wrap("<form>").closest("form").get(0).reset(),
            $("#onlineDemoVideo").unwrap());
        }
      });
  });
