document.addEventListener("DOMContentLoaded", function () {
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
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
window.addEventListener('scroll', function () {
    let scroll = window.scrollY;
    if (scroll > 0 && fired === false) {
        var recaptchaScript = document.createElement('script');
        recaptchaScript.src = './assets/recaptcha/apif064.js?render=6LeHflUmAAAAAFI-_rB4YWt_q3nii1xrKAAtEBPr';
        recaptchaScript.defer = true;
        document.body.appendChild(recaptchaScript);
        fired = true;
    }
}, true);