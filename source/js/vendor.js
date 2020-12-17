"use strict";
!(function (t) {
   "use strict";
   "function" == typeof define && define.amd
      ? define(["jquery"], t)
      : "undefined" != typeof exports
      ? (module.exports = t(require("jquery")))
      : t(jQuery);
})(function (c) {
   "use strict";
   var s,
      r = window.Slick || {};
   (s = 0),
      ((r = function (t, e) {
         var i,
            o = this;
         (o.defaults = {
            accessibility: !0,
            adaptiveHeight: !1,
            appendArrows: c(t),
            appendDots: c(t),
            arrows: !0,
            asNavFor: null,
            prevArrow:
               '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
            nextArrow:
               '<button class="slick-next" aria-label="Next" type="button">Next</button>',
            autoplay: !1,
            autoplaySpeed: 3e3,
            centerMode: !1,
            centerPadding: "50px",
            cssEase: "ease",
            customPaging: function (t, e) {
               return c('<button type="button" />').text(e + 1);
            },
            dots: !1,
            dotsClass: "slick-dots",
            draggable: !0,
            easing: "linear",
            edgeFriction: 0.35,
            fade: !1,
            focusOnSelect: !1,
            focusOnChange: !1,
            infinite: !0,
            initialSlide: 0,
            lazyLoad: "ondemand",
            mobileFirst: !1,
            pauseOnHover: !0,
            pauseOnFocus: !0,
            pauseOnDotsHover: !1,
            respondTo: "window",
            responsive: null,
            rows: 1,
            rtl: !1,
            slide: "",
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            swipe: !0,
            swipeToSlide: !1,
            touchMove: !0,
            touchThreshold: 5,
            useCSS: !0,
            useTransform: !0,
            variableWidth: !1,
            vertical: !1,
            verticalSwiping: !1,
            waitForAnimate: !0,
            zIndex: 1e3,
         }),
            (o.initials = {
               animating: !1,
               dragging: !1,
               autoPlayTimer: null,
               currentDirection: 0,
               currentLeft: null,
               currentSlide: 0,
               direction: 1,
               $dots: null,
               listWidth: null,
               listHeight: null,
               loadIndex: 0,
               $nextArrow: null,
               $prevArrow: null,
               scrolling: !1,
               slideCount: null,
               slideWidth: null,
               $slideTrack: null,
               $slides: null,
               sliding: !1,
               slideOffset: 0,
               swipeLeft: null,
               swiping: !1,
               $list: null,
               touchObject: {},
               transformsEnabled: !1,
               unslicked: !1,
            }),
            c.extend(o, o.initials),
            (o.activeBreakpoint = null),
            (o.animType = null),
            (o.animProp = null),
            (o.breakpoints = []),
            (o.breakpointSettings = []),
            (o.cssTransitions = !1),
            (o.focussed = !1),
            (o.interrupted = !1),
            (o.hidden = "hidden"),
            (o.paused = !0),
            (o.positionProp = null),
            (o.respondTo = null),
            (o.rowCount = 1),
            (o.shouldClick = !0),
            (o.$slider = c(t)),
            (o.$slidesCache = null),
            (o.transformType = null),
            (o.transitionType = null),
            (o.visibilityChange = "visibilitychange"),
            (o.windowWidth = 0),
            (o.windowTimer = null),
            (i = c(t).data("slick") || {}),
            (o.options = c.extend({}, o.defaults, e, i)),
            (o.currentSlide = o.options.initialSlide),
            (o.originalSettings = o.options),
            void 0 !== document.mozHidden
               ? ((o.hidden = "mozHidden"),
                 (o.visibilityChange = "mozvisibilitychange"))
               : void 0 !== document.webkitHidden &&
                 ((o.hidden = "webkitHidden"),
                 (o.visibilityChange = "webkitvisibilitychange")),
            (o.autoPlay = c.proxy(o.autoPlay, o)),
            (o.autoPlayClear = c.proxy(o.autoPlayClear, o)),
            (o.autoPlayIterator = c.proxy(o.autoPlayIterator, o)),
            (o.changeSlide = c.proxy(o.changeSlide, o)),
            (o.clickHandler = c.proxy(o.clickHandler, o)),
            (o.selectHandler = c.proxy(o.selectHandler, o)),
            (o.setPosition = c.proxy(o.setPosition, o)),
            (o.swipeHandler = c.proxy(o.swipeHandler, o)),
            (o.dragHandler = c.proxy(o.dragHandler, o)),
            (o.keyHandler = c.proxy(o.keyHandler, o)),
            (o.instanceUid = s++),
            (o.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
            o.registerBreakpoints(),
            o.init(!0);
      }).prototype.activateADA = function () {
         this.$slideTrack
            .find(".slick-active")
            .attr({ "aria-hidden": "false" })
            .find("a, input, button, select")
            .attr({ tabindex: "0" });
      }),
      (r.prototype.addSlide = r.prototype.slickAdd = function (t, e, i) {
         var o = this;
         if ("boolean" == typeof e) (i = e), (e = null);
         else if (e < 0 || e >= o.slideCount) return !1;
         o.unload(),
            "number" == typeof e
               ? 0 === e && 0 === o.$slides.length
                  ? c(t).appendTo(o.$slideTrack)
                  : i
                  ? c(t).insertBefore(o.$slides.eq(e))
                  : c(t).insertAfter(o.$slides.eq(e))
               : !0 === i
               ? c(t).prependTo(o.$slideTrack)
               : c(t).appendTo(o.$slideTrack),
            (o.$slides = o.$slideTrack.children(this.options.slide)),
            o.$slideTrack.children(this.options.slide).detach(),
            o.$slideTrack.append(o.$slides),
            o.$slides.each(function (t, e) {
               c(e).attr("data-slick-index", t);
            }),
            (o.$slidesCache = o.$slides),
            o.reinit();
      }),
      (r.prototype.animateHeight = function () {
         var t = this;
         if (
            1 === t.options.slidesToShow &&
            !0 === t.options.adaptiveHeight &&
            !1 === t.options.vertical
         ) {
            var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
            t.$list.animate({ height: e }, t.options.speed);
         }
      }),
      (r.prototype.animateSlide = function (t, e) {
         var i = {},
            o = this;
         o.animateHeight(),
            !0 === o.options.rtl && !1 === o.options.vertical && (t = -t),
            !1 === o.transformsEnabled
               ? !1 === o.options.vertical
                  ? o.$slideTrack.animate(
                       { left: t },
                       o.options.speed,
                       o.options.easing,
                       e
                    )
                  : o.$slideTrack.animate(
                       { top: t },
                       o.options.speed,
                       o.options.easing,
                       e
                    )
               : !1 === o.cssTransitions
               ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft),
                 c({ animStart: o.currentLeft }).animate(
                    { animStart: t },
                    {
                       duration: o.options.speed,
                       easing: o.options.easing,
                       step: function (t) {
                          (t = Math.ceil(t)),
                             !1 === o.options.vertical
                                ? (i[o.animType] =
                                     "translate(" + t + "px, 0px)")
                                : (i[o.animType] =
                                     "translate(0px," + t + "px)"),
                             o.$slideTrack.css(i);
                       },
                       complete: function () {
                          e && e.call();
                       },
                    }
                 ))
               : (o.applyTransition(),
                 (t = Math.ceil(t)),
                 !1 === o.options.vertical
                    ? (i[o.animType] = "translate3d(" + t + "px, 0px, 0px)")
                    : (i[o.animType] = "translate3d(0px," + t + "px, 0px)"),
                 o.$slideTrack.css(i),
                 e &&
                    setTimeout(function () {
                       o.disableTransition(), e.call();
                    }, o.options.speed));
      }),
      (r.prototype.getNavTarget = function () {
         var t = this.options.asNavFor;
         return t && null !== t && (t = c(t).not(this.$slider)), t;
      }),
      (r.prototype.asNavFor = function (e) {
         var t = this.getNavTarget();
         null !== t &&
            "object" == typeof t &&
            t.each(function () {
               var t = c(this).slick("getSlick");
               t.unslicked || t.slideHandler(e, !0);
            });
      }),
      (r.prototype.applyTransition = function (t) {
         var e = this,
            i = {};
         !1 === e.options.fade
            ? (i[e.transitionType] =
                 e.transformType +
                 " " +
                 e.options.speed +
                 "ms " +
                 e.options.cssEase)
            : (i[e.transitionType] =
                 "opacity " + e.options.speed + "ms " + e.options.cssEase),
            !1 === e.options.fade
               ? e.$slideTrack.css(i)
               : e.$slides.eq(t).css(i);
      }),
      (r.prototype.autoPlay = function () {
         var t = this;
         t.autoPlayClear(),
            t.slideCount > t.options.slidesToShow &&
               (t.autoPlayTimer = setInterval(
                  t.autoPlayIterator,
                  t.options.autoplaySpeed
               ));
      }),
      (r.prototype.autoPlayClear = function () {
         this.autoPlayTimer && clearInterval(this.autoPlayTimer);
      }),
      (r.prototype.autoPlayIterator = function () {
         var t = this,
            e = t.currentSlide + t.options.slidesToScroll;
         t.paused ||
            t.interrupted ||
            t.focussed ||
            (!1 === t.options.infinite &&
               (1 === t.direction && t.currentSlide + 1 === t.slideCount - 1
                  ? (t.direction = 0)
                  : 0 === t.direction &&
                    ((e = t.currentSlide - t.options.slidesToScroll),
                    t.currentSlide - 1 == 0 && (t.direction = 1))),
            t.slideHandler(e));
      }),
      (r.prototype.buildArrows = function () {
         var t = this;
         !0 === t.options.arrows &&
            ((t.$prevArrow = c(t.options.prevArrow).addClass("slick-arrow")),
            (t.$nextArrow = c(t.options.nextArrow).addClass("slick-arrow")),
            t.slideCount > t.options.slidesToShow
               ? (t.$prevArrow
                    .removeClass("slick-hidden")
                    .removeAttr("aria-hidden tabindex"),
                 t.$nextArrow
                    .removeClass("slick-hidden")
                    .removeAttr("aria-hidden tabindex"),
                 t.htmlExpr.test(t.options.prevArrow) &&
                    t.$prevArrow.prependTo(t.options.appendArrows),
                 t.htmlExpr.test(t.options.nextArrow) &&
                    t.$nextArrow.appendTo(t.options.appendArrows),
                 !0 !== t.options.infinite &&
                    t.$prevArrow
                       .addClass("slick-disabled")
                       .attr("aria-disabled", "true"))
               : t.$prevArrow
                    .add(t.$nextArrow)
                    .addClass("slick-hidden")
                    .attr({ "aria-disabled": "true", tabindex: "-1" }));
      }),
      (r.prototype.buildDots = function () {
         var t,
            e,
            i = this;
         if (!0 === i.options.dots && i.slideCount > i.options.slidesToShow) {
            for (
               i.$slider.addClass("slick-dotted"),
                  e = c("<ul />").addClass(i.options.dotsClass),
                  t = 0;
               t <= i.getDotCount();
               t += 1
            )
               e.append(
                  c("<li />").append(i.options.customPaging.call(this, i, t))
               );
            (i.$dots = e.appendTo(i.options.appendDots)),
               i.$dots.find("li").first().addClass("slick-active");
         }
      }),
      (r.prototype.buildOut = function () {
         var t = this;
         (t.$slides = t.$slider
            .children(t.options.slide + ":not(.slick-cloned)")
            .addClass("slick-slide")),
            (t.slideCount = t.$slides.length),
            t.$slides.each(function (t, e) {
               c(e)
                  .attr("data-slick-index", t)
                  .data("originalStyling", c(e).attr("style") || "");
            }),
            t.$slider.addClass("slick-slider"),
            (t.$slideTrack =
               0 === t.slideCount
                  ? c('<div class="slick-track"/>').appendTo(t.$slider)
                  : t.$slides.wrapAll('<div class="slick-track"/>').parent()),
            (t.$list = t.$slideTrack
               .wrap('<div class="slick-list"/>')
               .parent()),
            t.$slideTrack.css("opacity", 0),
            (!0 !== t.options.centerMode && !0 !== t.options.swipeToSlide) ||
               (t.options.slidesToScroll = 1),
            c("img[data-lazy]", t.$slider)
               .not("[src]")
               .addClass("slick-loading"),
            t.setupInfinite(),
            t.buildArrows(),
            t.buildDots(),
            t.updateDots(),
            t.setSlideClasses(
               "number" == typeof t.currentSlide ? t.currentSlide : 0
            ),
            !0 === t.options.draggable && t.$list.addClass("draggable");
      }),
      (r.prototype.buildRows = function () {
         var t,
            e,
            i,
            o,
            s,
            n,
            r,
            l = this;
         if (
            ((o = document.createDocumentFragment()),
            (n = l.$slider.children()),
            0 < l.options.rows)
         ) {
            for (
               r = l.options.slidesPerRow * l.options.rows,
                  s = Math.ceil(n.length / r),
                  t = 0;
               t < s;
               t++
            ) {
               var a = document.createElement("div");
               for (e = 0; e < l.options.rows; e++) {
                  var c = document.createElement("div");
                  for (i = 0; i < l.options.slidesPerRow; i++) {
                     var d = t * r + (e * l.options.slidesPerRow + i);
                     n.get(d) && c.appendChild(n.get(d));
                  }
                  a.appendChild(c);
               }
               o.appendChild(a);
            }
            l.$slider.empty().append(o),
               l.$slider
                  .children()
                  .children()
                  .children()
                  .css({
                     width: 100 / l.options.slidesPerRow + "%",
                     display: "inline-block",
                  });
         }
      }),
      (r.prototype.checkResponsive = function (t, e) {
         var i,
            o,
            s,
            n = this,
            r = !1,
            l = n.$slider.width(),
            a = window.innerWidth || c(window).width();
         if (
            ("window" === n.respondTo
               ? (s = a)
               : "slider" === n.respondTo
               ? (s = l)
               : "min" === n.respondTo && (s = Math.min(a, l)),
            n.options.responsive &&
               n.options.responsive.length &&
               null !== n.options.responsive)
         ) {
            for (i in ((o = null), n.breakpoints))
               n.breakpoints.hasOwnProperty(i) &&
                  (!1 === n.originalSettings.mobileFirst
                     ? s < n.breakpoints[i] && (o = n.breakpoints[i])
                     : s > n.breakpoints[i] && (o = n.breakpoints[i]));
            null !== o
               ? (null !== n.activeBreakpoint &&
                    o === n.activeBreakpoint &&
                    !e) ||
                 ((n.activeBreakpoint = o),
                 "unslick" === n.breakpointSettings[o]
                    ? n.unslick(o)
                    : ((n.options = c.extend(
                         {},
                         n.originalSettings,
                         n.breakpointSettings[o]
                      )),
                      !0 === t && (n.currentSlide = n.options.initialSlide),
                      n.refresh(t)),
                 (r = o))
               : null !== n.activeBreakpoint &&
                 ((n.activeBreakpoint = null),
                 (n.options = n.originalSettings),
                 !0 === t && (n.currentSlide = n.options.initialSlide),
                 n.refresh(t),
                 (r = o)),
               t || !1 === r || n.$slider.trigger("breakpoint", [n, r]);
         }
      }),
      (r.prototype.changeSlide = function (t, e) {
         var i,
            o,
            s = this,
            n = c(t.currentTarget);
         switch (
            (n.is("a") && t.preventDefault(),
            n.is("li") || (n = n.closest("li")),
            (i =
               s.slideCount % s.options.slidesToScroll != 0
                  ? 0
                  : (s.slideCount - s.currentSlide) % s.options.slidesToScroll),
            t.data.message)
         ) {
            case "previous":
               (o =
                  0 == i
                     ? s.options.slidesToScroll
                     : s.options.slidesToShow - i),
                  s.slideCount > s.options.slidesToShow &&
                     s.slideHandler(s.currentSlide - o, !1, e);
               break;
            case "next":
               (o = 0 == i ? s.options.slidesToScroll : i),
                  s.slideCount > s.options.slidesToShow &&
                     s.slideHandler(s.currentSlide + o, !1, e);
               break;
            case "index":
               var r =
                  0 === t.data.index
                     ? 0
                     : t.data.index || n.index() * s.options.slidesToScroll;
               s.slideHandler(s.checkNavigable(r), !1, e),
                  n.children().trigger("focus");
               break;
            default:
               return;
         }
      }),
      (r.prototype.checkNavigable = function (t) {
         var e, i;
         if (((i = 0), t > (e = this.getNavigableIndexes())[e.length - 1]))
            t = e[e.length - 1];
         else
            for (var o in e) {
               if (t < e[o]) {
                  t = i;
                  break;
               }
               i = e[o];
            }
         return t;
      }),
      (r.prototype.cleanUpEvents = function () {
         var t = this;
         t.options.dots &&
            null !== t.$dots &&
            (c("li", t.$dots)
               .off("click.slick", t.changeSlide)
               .off("mouseenter.slick", c.proxy(t.interrupt, t, !0))
               .off("mouseleave.slick", c.proxy(t.interrupt, t, !1)),
            !0 === t.options.accessibility &&
               t.$dots.off("keydown.slick", t.keyHandler)),
            t.$slider.off("focus.slick blur.slick"),
            !0 === t.options.arrows &&
               t.slideCount > t.options.slidesToShow &&
               (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide),
               t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide),
               !0 === t.options.accessibility &&
                  (t.$prevArrow &&
                     t.$prevArrow.off("keydown.slick", t.keyHandler),
                  t.$nextArrow &&
                     t.$nextArrow.off("keydown.slick", t.keyHandler))),
            t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler),
            t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler),
            t.$list.off("touchend.slick mouseup.slick", t.swipeHandler),
            t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler),
            t.$list.off("click.slick", t.clickHandler),
            c(document).off(t.visibilityChange, t.visibility),
            t.cleanUpSlideEvents(),
            !0 === t.options.accessibility &&
               t.$list.off("keydown.slick", t.keyHandler),
            !0 === t.options.focusOnSelect &&
               c(t.$slideTrack).children().off("click.slick", t.selectHandler),
            c(window).off(
               "orientationchange.slick.slick-" + t.instanceUid,
               t.orientationChange
            ),
            c(window).off("resize.slick.slick-" + t.instanceUid, t.resize),
            c("[draggable!=true]", t.$slideTrack).off(
               "dragstart",
               t.preventDefault
            ),
            c(window).off("load.slick.slick-" + t.instanceUid, t.setPosition);
      }),
      (r.prototype.cleanUpSlideEvents = function () {
         var t = this;
         t.$list.off("mouseenter.slick", c.proxy(t.interrupt, t, !0)),
            t.$list.off("mouseleave.slick", c.proxy(t.interrupt, t, !1));
      }),
      (r.prototype.cleanUpRows = function () {
         var t;
         0 < this.options.rows &&
            ((t = this.$slides.children().children()).removeAttr("style"),
            this.$slider.empty().append(t));
      }),
      (r.prototype.clickHandler = function (t) {
         !1 === this.shouldClick &&
            (t.stopImmediatePropagation(),
            t.stopPropagation(),
            t.preventDefault());
      }),
      (r.prototype.destroy = function (t) {
         var e = this;
         e.autoPlayClear(),
            (e.touchObject = {}),
            e.cleanUpEvents(),
            c(".slick-cloned", e.$slider).detach(),
            e.$dots && e.$dots.remove(),
            e.$prevArrow &&
               e.$prevArrow.length &&
               (e.$prevArrow
                  .removeClass("slick-disabled slick-arrow slick-hidden")
                  .removeAttr("aria-hidden aria-disabled tabindex")
                  .css("display", ""),
               e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove()),
            e.$nextArrow &&
               e.$nextArrow.length &&
               (e.$nextArrow
                  .removeClass("slick-disabled slick-arrow slick-hidden")
                  .removeAttr("aria-hidden aria-disabled tabindex")
                  .css("display", ""),
               e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove()),
            e.$slides &&
               (e.$slides
                  .removeClass(
                     "slick-slide slick-active slick-center slick-visible slick-current"
                  )
                  .removeAttr("aria-hidden")
                  .removeAttr("data-slick-index")
                  .each(function () {
                     c(this).attr("style", c(this).data("originalStyling"));
                  }),
               e.$slideTrack.children(this.options.slide).detach(),
               e.$slideTrack.detach(),
               e.$list.detach(),
               e.$slider.append(e.$slides)),
            e.cleanUpRows(),
            e.$slider.removeClass("slick-slider"),
            e.$slider.removeClass("slick-initialized"),
            e.$slider.removeClass("slick-dotted"),
            (e.unslicked = !0),
            t || e.$slider.trigger("destroy", [e]);
      }),
      (r.prototype.disableTransition = function (t) {
         var e = {};
         (e[this.transitionType] = ""),
            !1 === this.options.fade
               ? this.$slideTrack.css(e)
               : this.$slides.eq(t).css(e);
      }),
      (r.prototype.fadeSlide = function (t, e) {
         var i = this;
         !1 === i.cssTransitions
            ? (i.$slides.eq(t).css({ zIndex: i.options.zIndex }),
              i.$slides
                 .eq(t)
                 .animate({ opacity: 1 }, i.options.speed, i.options.easing, e))
            : (i.applyTransition(t),
              i.$slides.eq(t).css({ opacity: 1, zIndex: i.options.zIndex }),
              e &&
                 setTimeout(function () {
                    i.disableTransition(t), e.call();
                 }, i.options.speed));
      }),
      (r.prototype.fadeSlideOut = function (t) {
         var e = this;
         !1 === e.cssTransitions
            ? e.$slides
                 .eq(t)
                 .animate(
                    { opacity: 0, zIndex: e.options.zIndex - 2 },
                    e.options.speed,
                    e.options.easing
                 )
            : (e.applyTransition(t),
              e.$slides
                 .eq(t)
                 .css({ opacity: 0, zIndex: e.options.zIndex - 2 }));
      }),
      (r.prototype.filterSlides = r.prototype.slickFilter = function (t) {
         var e = this;
         null !== t &&
            ((e.$slidesCache = e.$slides),
            e.unload(),
            e.$slideTrack.children(this.options.slide).detach(),
            e.$slidesCache.filter(t).appendTo(e.$slideTrack),
            e.reinit());
      }),
      (r.prototype.focusHandler = function () {
         var i = this;
         i.$slider
            .off("focus.slick blur.slick")
            .on("focus.slick blur.slick", "*", function (t) {
               t.stopImmediatePropagation();
               var e = c(this);
               setTimeout(function () {
                  i.options.pauseOnFocus &&
                     ((i.focussed = e.is(":focus")), i.autoPlay());
               }, 0);
            });
      }),
      (r.prototype.getCurrent = r.prototype.slickCurrentSlide = function () {
         return this.currentSlide;
      }),
      (r.prototype.getDotCount = function () {
         var t = this,
            e = 0,
            i = 0,
            o = 0;
         if (!0 === t.options.infinite)
            if (t.slideCount <= t.options.slidesToShow) ++o;
            else
               for (; e < t.slideCount; )
                  ++o,
                     (e = i + t.options.slidesToScroll),
                     (i +=
                        t.options.slidesToScroll <= t.options.slidesToShow
                           ? t.options.slidesToScroll
                           : t.options.slidesToShow);
         else if (!0 === t.options.centerMode) o = t.slideCount;
         else if (t.options.asNavFor)
            for (; e < t.slideCount; )
               ++o,
                  (e = i + t.options.slidesToScroll),
                  (i +=
                     t.options.slidesToScroll <= t.options.slidesToShow
                        ? t.options.slidesToScroll
                        : t.options.slidesToShow);
         else
            o =
               1 +
               Math.ceil(
                  (t.slideCount - t.options.slidesToShow) /
                     t.options.slidesToScroll
               );
         return o - 1;
      }),
      (r.prototype.getLeft = function (t) {
         var e,
            i,
            o,
            s,
            n = this,
            r = 0;
         return (
            (n.slideOffset = 0),
            (i = n.$slides.first().outerHeight(!0)),
            !0 === n.options.infinite
               ? (n.slideCount > n.options.slidesToShow &&
                    ((n.slideOffset =
                       n.slideWidth * n.options.slidesToShow * -1),
                    (s = -1),
                    !0 === n.options.vertical &&
                       !0 === n.options.centerMode &&
                       (2 === n.options.slidesToShow
                          ? (s = -1.5)
                          : 1 === n.options.slidesToShow && (s = -2)),
                    (r = i * n.options.slidesToShow * s)),
                 n.slideCount % n.options.slidesToScroll != 0 &&
                    t + n.options.slidesToScroll > n.slideCount &&
                    n.slideCount > n.options.slidesToShow &&
                    (r =
                       t > n.slideCount
                          ? ((n.slideOffset =
                               (n.options.slidesToShow - (t - n.slideCount)) *
                               n.slideWidth *
                               -1),
                            (n.options.slidesToShow - (t - n.slideCount)) *
                               i *
                               -1)
                          : ((n.slideOffset =
                               (n.slideCount % n.options.slidesToScroll) *
                               n.slideWidth *
                               -1),
                            (n.slideCount % n.options.slidesToScroll) *
                               i *
                               -1)))
               : t + n.options.slidesToShow > n.slideCount &&
                 ((n.slideOffset =
                    (t + n.options.slidesToShow - n.slideCount) * n.slideWidth),
                 (r = (t + n.options.slidesToShow - n.slideCount) * i)),
            n.slideCount <= n.options.slidesToShow && (r = n.slideOffset = 0),
            !0 === n.options.centerMode &&
            n.slideCount <= n.options.slidesToShow
               ? (n.slideOffset =
                    (n.slideWidth * Math.floor(n.options.slidesToShow)) / 2 -
                    (n.slideWidth * n.slideCount) / 2)
               : !0 === n.options.centerMode && !0 === n.options.infinite
               ? (n.slideOffset +=
                    n.slideWidth * Math.floor(n.options.slidesToShow / 2) -
                    n.slideWidth)
               : !0 === n.options.centerMode &&
                 ((n.slideOffset = 0),
                 (n.slideOffset +=
                    n.slideWidth * Math.floor(n.options.slidesToShow / 2))),
            (e =
               !1 === n.options.vertical
                  ? t * n.slideWidth * -1 + n.slideOffset
                  : t * i * -1 + r),
            !0 === n.options.variableWidth &&
               ((o =
                  n.slideCount <= n.options.slidesToShow ||
                  !1 === n.options.infinite
                     ? n.$slideTrack.children(".slick-slide").eq(t)
                     : n.$slideTrack
                          .children(".slick-slide")
                          .eq(t + n.options.slidesToShow)),
               (e =
                  !0 === n.options.rtl
                     ? o[0]
                        ? -1 *
                          (n.$slideTrack.width() - o[0].offsetLeft - o.width())
                        : 0
                     : o[0]
                     ? -1 * o[0].offsetLeft
                     : 0),
               !0 === n.options.centerMode &&
                  ((o =
                     n.slideCount <= n.options.slidesToShow ||
                     !1 === n.options.infinite
                        ? n.$slideTrack.children(".slick-slide").eq(t)
                        : n.$slideTrack
                             .children(".slick-slide")
                             .eq(t + n.options.slidesToShow + 1)),
                  (e =
                     !0 === n.options.rtl
                        ? o[0]
                           ? -1 *
                             (n.$slideTrack.width() -
                                o[0].offsetLeft -
                                o.width())
                           : 0
                        : o[0]
                        ? -1 * o[0].offsetLeft
                        : 0),
                  (e += (n.$list.width() - o.outerWidth()) / 2))),
            e
         );
      }),
      (r.prototype.getOption = r.prototype.slickGetOption = function (t) {
         return this.options[t];
      }),
      (r.prototype.getNavigableIndexes = function () {
         var t,
            e = this,
            i = 0,
            o = 0,
            s = [];
         for (
            t =
               !1 === e.options.infinite
                  ? e.slideCount
                  : ((i = -1 * e.options.slidesToScroll),
                    (o = -1 * e.options.slidesToScroll),
                    2 * e.slideCount);
            i < t;

         )
            s.push(i),
               (i = o + e.options.slidesToScroll),
               (o +=
                  e.options.slidesToScroll <= e.options.slidesToShow
                     ? e.options.slidesToScroll
                     : e.options.slidesToShow);
         return s;
      }),
      (r.prototype.getSlick = function () {
         return this;
      }),
      (r.prototype.getSlideCount = function () {
         var i,
            o,
            s = this;
         return (
            (o =
               !0 === s.options.centerMode
                  ? s.slideWidth * Math.floor(s.options.slidesToShow / 2)
                  : 0),
            !0 === s.options.swipeToSlide
               ? (s.$slideTrack.find(".slick-slide").each(function (t, e) {
                    if (
                       e.offsetLeft - o + c(e).outerWidth() / 2 >
                       -1 * s.swipeLeft
                    )
                       return (i = e), !1;
                 }),
                 Math.abs(c(i).attr("data-slick-index") - s.currentSlide) || 1)
               : s.options.slidesToScroll
         );
      }),
      (r.prototype.goTo = r.prototype.slickGoTo = function (t, e) {
         this.changeSlide(
            { data: { message: "index", index: parseInt(t) } },
            e
         );
      }),
      (r.prototype.init = function (t) {
         var e = this;
         c(e.$slider).hasClass("slick-initialized") ||
            (c(e.$slider).addClass("slick-initialized"),
            e.buildRows(),
            e.buildOut(),
            e.setProps(),
            e.startLoad(),
            e.loadSlider(),
            e.initializeEvents(),
            e.updateArrows(),
            e.updateDots(),
            e.checkResponsive(!0),
            e.focusHandler()),
            t && e.$slider.trigger("init", [e]),
            !0 === e.options.accessibility && e.initADA(),
            e.options.autoplay && ((e.paused = !1), e.autoPlay());
      }),
      (r.prototype.initADA = function () {
         var o = this,
            i = Math.ceil(o.slideCount / o.options.slidesToShow),
            s = o.getNavigableIndexes().filter(function (t) {
               return 0 <= t && t < o.slideCount;
            });
         o.$slides
            .add(o.$slideTrack.find(".slick-cloned"))
            .attr({ "aria-hidden": "true", tabindex: "-1" })
            .find("a, input, button, select")
            .attr({ tabindex: "-1" }),
            null !== o.$dots &&
               (o.$slides
                  .not(o.$slideTrack.find(".slick-cloned"))
                  .each(function (t) {
                     var e = s.indexOf(t);
                     if (
                        (c(this).attr({
                           role: "tabpanel",
                           id: "slick-slide" + o.instanceUid + t,
                           tabindex: -1,
                        }),
                        -1 !== e)
                     ) {
                        var i = "slick-slide-control" + o.instanceUid + e;
                        c("#" + i).length &&
                           c(this).attr({ "aria-describedby": i });
                     }
                  }),
               o.$dots
                  .attr("role", "tablist")
                  .find("li")
                  .each(function (t) {
                     var e = s[t];
                     c(this).attr({ role: "presentation" }),
                        c(this)
                           .find("button")
                           .first()
                           .attr({
                              role: "tab",
                              id: "slick-slide-control" + o.instanceUid + t,
                              "aria-controls":
                                 "slick-slide" + o.instanceUid + e,
                              "aria-label": t + 1 + " of " + i,
                              "aria-selected": null,
                              tabindex: "-1",
                           });
                  })
                  .eq(o.currentSlide)
                  .find("button")
                  .attr({ "aria-selected": "true", tabindex: "0" })
                  .end());
         for (
            var t = o.currentSlide, e = t + o.options.slidesToShow;
            t < e;
            t++
         )
            o.options.focusOnChange
               ? o.$slides.eq(t).attr({ tabindex: "0" })
               : o.$slides.eq(t).removeAttr("tabindex");
         o.activateADA();
      }),
      (r.prototype.initArrowEvents = function () {
         var t = this;
         !0 === t.options.arrows &&
            t.slideCount > t.options.slidesToShow &&
            (t.$prevArrow
               .off("click.slick")
               .on("click.slick", { message: "previous" }, t.changeSlide),
            t.$nextArrow
               .off("click.slick")
               .on("click.slick", { message: "next" }, t.changeSlide),
            !0 === t.options.accessibility &&
               (t.$prevArrow.on("keydown.slick", t.keyHandler),
               t.$nextArrow.on("keydown.slick", t.keyHandler)));
      }),
      (r.prototype.initDotEvents = function () {
         var t = this;
         !0 === t.options.dots &&
            t.slideCount > t.options.slidesToShow &&
            (c("li", t.$dots).on(
               "click.slick",
               { message: "index" },
               t.changeSlide
            ),
            !0 === t.options.accessibility &&
               t.$dots.on("keydown.slick", t.keyHandler)),
            !0 === t.options.dots &&
               !0 === t.options.pauseOnDotsHover &&
               t.slideCount > t.options.slidesToShow &&
               c("li", t.$dots)
                  .on("mouseenter.slick", c.proxy(t.interrupt, t, !0))
                  .on("mouseleave.slick", c.proxy(t.interrupt, t, !1));
      }),
      (r.prototype.initSlideEvents = function () {
         var t = this;
         t.options.pauseOnHover &&
            (t.$list.on("mouseenter.slick", c.proxy(t.interrupt, t, !0)),
            t.$list.on("mouseleave.slick", c.proxy(t.interrupt, t, !1)));
      }),
      (r.prototype.initializeEvents = function () {
         var t = this;
         t.initArrowEvents(),
            t.initDotEvents(),
            t.initSlideEvents(),
            t.$list.on(
               "touchstart.slick mousedown.slick",
               { action: "start" },
               t.swipeHandler
            ),
            t.$list.on(
               "touchmove.slick mousemove.slick",
               { action: "move" },
               t.swipeHandler
            ),
            t.$list.on(
               "touchend.slick mouseup.slick",
               { action: "end" },
               t.swipeHandler
            ),
            t.$list.on(
               "touchcancel.slick mouseleave.slick",
               { action: "end" },
               t.swipeHandler
            ),
            t.$list.on("click.slick", t.clickHandler),
            c(document).on(t.visibilityChange, c.proxy(t.visibility, t)),
            !0 === t.options.accessibility &&
               t.$list.on("keydown.slick", t.keyHandler),
            !0 === t.options.focusOnSelect &&
               c(t.$slideTrack).children().on("click.slick", t.selectHandler),
            c(window).on(
               "orientationchange.slick.slick-" + t.instanceUid,
               c.proxy(t.orientationChange, t)
            ),
            c(window).on(
               "resize.slick.slick-" + t.instanceUid,
               c.proxy(t.resize, t)
            ),
            c("[draggable!=true]", t.$slideTrack).on(
               "dragstart",
               t.preventDefault
            ),
            c(window).on("load.slick.slick-" + t.instanceUid, t.setPosition),
            c(t.setPosition);
      }),
      (r.prototype.initUI = function () {
         var t = this;
         !0 === t.options.arrows &&
            t.slideCount > t.options.slidesToShow &&
            (t.$prevArrow.show(), t.$nextArrow.show()),
            !0 === t.options.dots &&
               t.slideCount > t.options.slidesToShow &&
               t.$dots.show();
      }),
      (r.prototype.keyHandler = function (t) {
         var e = this;
         t.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
            (37 === t.keyCode && !0 === e.options.accessibility
               ? e.changeSlide({
                    data: {
                       message: !0 === e.options.rtl ? "next" : "previous",
                    },
                 })
               : 39 === t.keyCode &&
                 !0 === e.options.accessibility &&
                 e.changeSlide({
                    data: {
                       message: !0 === e.options.rtl ? "previous" : "next",
                    },
                 }));
      }),
      (r.prototype.lazyLoad = function () {
         var t,
            e,
            i,
            n = this;
         function o(t) {
            c("img[data-lazy]", t).each(function () {
               var t = c(this),
                  e = c(this).attr("data-lazy"),
                  i = c(this).attr("data-srcset"),
                  o =
                     c(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
                  s = document.createElement("img");
               (s.onload = function () {
                  t.animate({ opacity: 0 }, 100, function () {
                     i && (t.attr("srcset", i), o && t.attr("sizes", o)),
                        t
                           .attr("src", e)
                           .animate({ opacity: 1 }, 200, function () {
                              t.removeAttr(
                                 "data-lazy data-srcset data-sizes"
                              ).removeClass("slick-loading");
                           }),
                        n.$slider.trigger("lazyLoaded", [n, t, e]);
                  });
               }),
                  (s.onerror = function () {
                     t
                        .removeAttr("data-lazy")
                        .removeClass("slick-loading")
                        .addClass("slick-lazyload-error"),
                        n.$slider.trigger("lazyLoadError", [n, t, e]);
                  }),
                  (s.src = e);
            });
         }
         if (
            (!0 === n.options.centerMode
               ? (i =
                    !0 === n.options.infinite
                       ? (e =
                            n.currentSlide + (n.options.slidesToShow / 2 + 1)) +
                         n.options.slidesToShow +
                         2
                       : ((e = Math.max(
                            0,
                            n.currentSlide - (n.options.slidesToShow / 2 + 1)
                         )),
                         n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide))
               : ((e = n.options.infinite
                    ? n.options.slidesToShow + n.currentSlide
                    : n.currentSlide),
                 (i = Math.ceil(e + n.options.slidesToShow)),
                 !0 === n.options.fade &&
                    (0 < e && e--, i <= n.slideCount && i++)),
            (t = n.$slider.find(".slick-slide").slice(e, i)),
            "anticipated" === n.options.lazyLoad)
         )
            for (
               var s = e - 1, r = i, l = n.$slider.find(".slick-slide"), a = 0;
               a < n.options.slidesToScroll;
               a++
            )
               s < 0 && (s = n.slideCount - 1),
                  (t = (t = t.add(l.eq(s))).add(l.eq(r))),
                  s--,
                  r++;
         o(t),
            n.slideCount <= n.options.slidesToShow
               ? o(n.$slider.find(".slick-slide"))
               : n.currentSlide >= n.slideCount - n.options.slidesToShow
               ? o(
                    n.$slider
                       .find(".slick-cloned")
                       .slice(0, n.options.slidesToShow)
                 )
               : 0 === n.currentSlide &&
                 o(
                    n.$slider
                       .find(".slick-cloned")
                       .slice(-1 * n.options.slidesToShow)
                 );
      }),
      (r.prototype.loadSlider = function () {
         var t = this;
         t.setPosition(),
            t.$slideTrack.css({ opacity: 1 }),
            t.$slider.removeClass("slick-loading"),
            t.initUI(),
            "progressive" === t.options.lazyLoad && t.progressiveLazyLoad();
      }),
      (r.prototype.next = r.prototype.slickNext = function () {
         this.changeSlide({ data: { message: "next" } });
      }),
      (r.prototype.orientationChange = function () {
         this.checkResponsive(), this.setPosition();
      }),
      (r.prototype.pause = r.prototype.slickPause = function () {
         this.autoPlayClear(), (this.paused = !0);
      }),
      (r.prototype.play = r.prototype.slickPlay = function () {
         var t = this;
         t.autoPlay(),
            (t.options.autoplay = !0),
            (t.paused = !1),
            (t.focussed = !1),
            (t.interrupted = !1);
      }),
      (r.prototype.postSlide = function (t) {
         var e = this;
         e.unslicked ||
            (e.$slider.trigger("afterChange", [e, t]),
            (e.animating = !1),
            e.slideCount > e.options.slidesToShow && e.setPosition(),
            (e.swipeLeft = null),
            e.options.autoplay && e.autoPlay(),
            !0 === e.options.accessibility &&
               (e.initADA(),
               e.options.focusOnChange &&
                  c(e.$slides.get(e.currentSlide))
                     .attr("tabindex", 0)
                     .focus()));
      }),
      (r.prototype.prev = r.prototype.slickPrev = function () {
         this.changeSlide({ data: { message: "previous" } });
      }),
      (r.prototype.preventDefault = function (t) {
         t.preventDefault();
      }),
      (r.prototype.progressiveLazyLoad = function (t) {
         t = t || 1;
         var e,
            i,
            o,
            s,
            n,
            r = this,
            l = c("img[data-lazy]", r.$slider);
         l.length
            ? ((e = l.first()),
              (i = e.attr("data-lazy")),
              (o = e.attr("data-srcset")),
              (s = e.attr("data-sizes") || r.$slider.attr("data-sizes")),
              ((n = document.createElement("img")).onload = function () {
                 o && (e.attr("srcset", o), s && e.attr("sizes", s)),
                    e
                       .attr("src", i)
                       .removeAttr("data-lazy data-srcset data-sizes")
                       .removeClass("slick-loading"),
                    !0 === r.options.adaptiveHeight && r.setPosition(),
                    r.$slider.trigger("lazyLoaded", [r, e, i]),
                    r.progressiveLazyLoad();
              }),
              (n.onerror = function () {
                 t < 3
                    ? setTimeout(function () {
                         r.progressiveLazyLoad(t + 1);
                      }, 500)
                    : (e
                         .removeAttr("data-lazy")
                         .removeClass("slick-loading")
                         .addClass("slick-lazyload-error"),
                      r.$slider.trigger("lazyLoadError", [r, e, i]),
                      r.progressiveLazyLoad());
              }),
              (n.src = i))
            : r.$slider.trigger("allImagesLoaded", [r]);
      }),
      (r.prototype.refresh = function (t) {
         var e,
            i,
            o = this;
         (i = o.slideCount - o.options.slidesToShow),
            !o.options.infinite && o.currentSlide > i && (o.currentSlide = i),
            o.slideCount <= o.options.slidesToShow && (o.currentSlide = 0),
            (e = o.currentSlide),
            o.destroy(!0),
            c.extend(o, o.initials, { currentSlide: e }),
            o.init(),
            t || o.changeSlide({ data: { message: "index", index: e } }, !1);
      }),
      (r.prototype.registerBreakpoints = function () {
         var t,
            e,
            i,
            o = this,
            s = o.options.responsive || null;
         if ("array" === c.type(s) && s.length) {
            for (t in ((o.respondTo = o.options.respondTo || "window"), s))
               if (((i = o.breakpoints.length - 1), s.hasOwnProperty(t))) {
                  for (e = s[t].breakpoint; 0 <= i; )
                     o.breakpoints[i] &&
                        o.breakpoints[i] === e &&
                        o.breakpoints.splice(i, 1),
                        i--;
                  o.breakpoints.push(e),
                     (o.breakpointSettings[e] = s[t].settings);
               }
            o.breakpoints.sort(function (t, e) {
               return o.options.mobileFirst ? t - e : e - t;
            });
         }
      }),
      (r.prototype.reinit = function () {
         var t = this;
         (t.$slides = t.$slideTrack
            .children(t.options.slide)
            .addClass("slick-slide")),
            (t.slideCount = t.$slides.length),
            t.currentSlide >= t.slideCount &&
               0 !== t.currentSlide &&
               (t.currentSlide = t.currentSlide - t.options.slidesToScroll),
            t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0),
            t.registerBreakpoints(),
            t.setProps(),
            t.setupInfinite(),
            t.buildArrows(),
            t.updateArrows(),
            t.initArrowEvents(),
            t.buildDots(),
            t.updateDots(),
            t.initDotEvents(),
            t.cleanUpSlideEvents(),
            t.initSlideEvents(),
            t.checkResponsive(!1, !0),
            !0 === t.options.focusOnSelect &&
               c(t.$slideTrack).children().on("click.slick", t.selectHandler),
            t.setSlideClasses(
               "number" == typeof t.currentSlide ? t.currentSlide : 0
            ),
            t.setPosition(),
            t.focusHandler(),
            (t.paused = !t.options.autoplay),
            t.autoPlay(),
            t.$slider.trigger("reInit", [t]);
      }),
      (r.prototype.resize = function () {
         var t = this;
         c(window).width() !== t.windowWidth &&
            (clearTimeout(t.windowDelay),
            (t.windowDelay = window.setTimeout(function () {
               (t.windowWidth = c(window).width()),
                  t.checkResponsive(),
                  t.unslicked || t.setPosition();
            }, 50)));
      }),
      (r.prototype.removeSlide = r.prototype.slickRemove = function (t, e, i) {
         var o = this;
         if (
            ((t =
               "boolean" == typeof t
                  ? !0 === (e = t)
                     ? 0
                     : o.slideCount - 1
                  : !0 === e
                  ? --t
                  : t),
            o.slideCount < 1 || t < 0 || t > o.slideCount - 1)
         )
            return !1;
         o.unload(),
            !0 === i
               ? o.$slideTrack.children().remove()
               : o.$slideTrack.children(this.options.slide).eq(t).remove(),
            (o.$slides = o.$slideTrack.children(this.options.slide)),
            o.$slideTrack.children(this.options.slide).detach(),
            o.$slideTrack.append(o.$slides),
            (o.$slidesCache = o.$slides),
            o.reinit();
      }),
      (r.prototype.setCSS = function (t) {
         var e,
            i,
            o = this,
            s = {};
         !0 === o.options.rtl && (t = -t),
            (e = "left" == o.positionProp ? Math.ceil(t) + "px" : "0px"),
            (i = "top" == o.positionProp ? Math.ceil(t) + "px" : "0px"),
            (s[o.positionProp] = t),
            !1 === o.transformsEnabled ||
               (!(s = {}) === o.cssTransitions
                  ? (s[o.animType] = "translate(" + e + ", " + i + ")")
                  : (s[o.animType] = "translate3d(" + e + ", " + i + ", 0px)")),
            o.$slideTrack.css(s);
      }),
      (r.prototype.setDimensions = function () {
         var t = this;
         !1 === t.options.vertical
            ? !0 === t.options.centerMode &&
              t.$list.css({ padding: "0px " + t.options.centerPadding })
            : (t.$list.height(
                 t.$slides.first().outerHeight(!0) * t.options.slidesToShow
              ),
              !0 === t.options.centerMode &&
                 t.$list.css({ padding: t.options.centerPadding + " 0px" })),
            (t.listWidth = t.$list.width()),
            (t.listHeight = t.$list.height()),
            !1 === t.options.vertical && !1 === t.options.variableWidth
               ? ((t.slideWidth = Math.ceil(
                    t.listWidth / t.options.slidesToShow
                 )),
                 t.$slideTrack.width(
                    Math.ceil(
                       t.slideWidth *
                          t.$slideTrack.children(".slick-slide").length
                    )
                 ))
               : !0 === t.options.variableWidth
               ? t.$slideTrack.width(5e3 * t.slideCount)
               : ((t.slideWidth = Math.ceil(t.listWidth)),
                 t.$slideTrack.height(
                    Math.ceil(
                       t.$slides.first().outerHeight(!0) *
                          t.$slideTrack.children(".slick-slide").length
                    )
                 ));
         var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
         !1 === t.options.variableWidth &&
            t.$slideTrack.children(".slick-slide").width(t.slideWidth - e);
      }),
      (r.prototype.setFade = function () {
         var i,
            o = this;
         o.$slides.each(function (t, e) {
            (i = o.slideWidth * t * -1),
               !0 === o.options.rtl
                  ? c(e).css({
                       position: "relative",
                       right: i,
                       top: 0,
                       zIndex: o.options.zIndex - 2,
                       opacity: 0,
                    })
                  : c(e).css({
                       position: "relative",
                       left: i,
                       top: 0,
                       zIndex: o.options.zIndex - 2,
                       opacity: 0,
                    });
         }),
            o.$slides
               .eq(o.currentSlide)
               .css({ zIndex: o.options.zIndex - 1, opacity: 1 });
      }),
      (r.prototype.setHeight = function () {
         var t = this;
         if (
            1 === t.options.slidesToShow &&
            !0 === t.options.adaptiveHeight &&
            !1 === t.options.vertical
         ) {
            var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
            t.$list.css("height", e);
         }
      }),
      (r.prototype.setOption = r.prototype.slickSetOption = function () {
         var t,
            e,
            i,
            o,
            s,
            n = this,
            r = !1;
         if (
            ("object" === c.type(arguments[0])
               ? ((i = arguments[0]), (r = arguments[1]), (s = "multiple"))
               : "string" === c.type(arguments[0]) &&
                 ((o = arguments[1]),
                 (r = arguments[2]),
                 "responsive" === (i = arguments[0]) &&
                 "array" === c.type(arguments[1])
                    ? (s = "responsive")
                    : void 0 !== arguments[1] && (s = "single")),
            "single" === s)
         )
            n.options[i] = o;
         else if ("multiple" === s)
            c.each(i, function (t, e) {
               n.options[t] = e;
            });
         else if ("responsive" === s)
            for (e in o)
               if ("array" !== c.type(n.options.responsive))
                  n.options.responsive = [o[e]];
               else {
                  for (t = n.options.responsive.length - 1; 0 <= t; )
                     n.options.responsive[t].breakpoint === o[e].breakpoint &&
                        n.options.responsive.splice(t, 1),
                        t--;
                  n.options.responsive.push(o[e]);
               }
         r && (n.unload(), n.reinit());
      }),
      (r.prototype.setPosition = function () {
         var t = this;
         t.setDimensions(),
            t.setHeight(),
            !1 === t.options.fade
               ? t.setCSS(t.getLeft(t.currentSlide))
               : t.setFade(),
            t.$slider.trigger("setPosition", [t]);
      }),
      (r.prototype.setProps = function () {
         var t = this,
            e = document.body.style;
         (t.positionProp = !0 === t.options.vertical ? "top" : "left"),
            "top" === t.positionProp
               ? t.$slider.addClass("slick-vertical")
               : t.$slider.removeClass("slick-vertical"),
            (void 0 === e.WebkitTransition &&
               void 0 === e.MozTransition &&
               void 0 === e.msTransition) ||
               (!0 === t.options.useCSS && (t.cssTransitions = !0)),
            t.options.fade &&
               ("number" == typeof t.options.zIndex
                  ? t.options.zIndex < 3 && (t.options.zIndex = 3)
                  : (t.options.zIndex = t.defaults.zIndex)),
            void 0 !== e.OTransform &&
               ((t.animType = "OTransform"),
               (t.transformType = "-o-transform"),
               (t.transitionType = "OTransition"),
               void 0 === e.perspectiveProperty &&
                  void 0 === e.webkitPerspective &&
                  (t.animType = !1)),
            void 0 !== e.MozTransform &&
               ((t.animType = "MozTransform"),
               (t.transformType = "-moz-transform"),
               (t.transitionType = "MozTransition"),
               void 0 === e.perspectiveProperty &&
                  void 0 === e.MozPerspective &&
                  (t.animType = !1)),
            void 0 !== e.webkitTransform &&
               ((t.animType = "webkitTransform"),
               (t.transformType = "-webkit-transform"),
               (t.transitionType = "webkitTransition"),
               void 0 === e.perspectiveProperty &&
                  void 0 === e.webkitPerspective &&
                  (t.animType = !1)),
            void 0 !== e.msTransform &&
               ((t.animType = "msTransform"),
               (t.transformType = "-ms-transform"),
               (t.transitionType = "msTransition"),
               void 0 === e.msTransform && (t.animType = !1)),
            void 0 !== e.transform &&
               !1 !== t.animType &&
               ((t.animType = "transform"),
               (t.transformType = "transform"),
               (t.transitionType = "transition")),
            (t.transformsEnabled =
               t.options.useTransform &&
               null !== t.animType &&
               !1 !== t.animType);
      }),
      (r.prototype.setSlideClasses = function (t) {
         var e,
            i,
            o,
            s,
            n = this;
         if (
            ((i = n.$slider
               .find(".slick-slide")
               .removeClass("slick-active slick-center slick-current")
               .attr("aria-hidden", "true")),
            n.$slides.eq(t).addClass("slick-current"),
            !0 === n.options.centerMode)
         ) {
            var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
            (e = Math.floor(n.options.slidesToShow / 2)),
               !0 === n.options.infinite &&
                  (e <= t && t <= n.slideCount - 1 - e
                     ? n.$slides
                          .slice(t - e + r, t + e + 1)
                          .addClass("slick-active")
                          .attr("aria-hidden", "false")
                     : ((o = n.options.slidesToShow + t),
                       i
                          .slice(o - e + 1 + r, o + e + 2)
                          .addClass("slick-active")
                          .attr("aria-hidden", "false")),
                  0 === t
                     ? i
                          .eq(i.length - 1 - n.options.slidesToShow)
                          .addClass("slick-center")
                     : t === n.slideCount - 1 &&
                       i.eq(n.options.slidesToShow).addClass("slick-center")),
               n.$slides.eq(t).addClass("slick-center");
         } else
            0 <= t && t <= n.slideCount - n.options.slidesToShow
               ? n.$slides
                    .slice(t, t + n.options.slidesToShow)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false")
               : i.length <= n.options.slidesToShow
               ? i.addClass("slick-active").attr("aria-hidden", "false")
               : ((s = n.slideCount % n.options.slidesToShow),
                 (o =
                    !0 === n.options.infinite ? n.options.slidesToShow + t : t),
                 n.options.slidesToShow == n.options.slidesToScroll &&
                 n.slideCount - t < n.options.slidesToShow
                    ? i
                         .slice(o - (n.options.slidesToShow - s), o + s)
                         .addClass("slick-active")
                         .attr("aria-hidden", "false")
                    : i
                         .slice(o, o + n.options.slidesToShow)
                         .addClass("slick-active")
                         .attr("aria-hidden", "false"));
         ("ondemand" !== n.options.lazyLoad &&
            "anticipated" !== n.options.lazyLoad) ||
            n.lazyLoad();
      }),
      (r.prototype.setupInfinite = function () {
         var t,
            e,
            i,
            o = this;
         if (
            (!0 === o.options.fade && (o.options.centerMode = !1),
            !0 === o.options.infinite &&
               !1 === o.options.fade &&
               ((e = null), o.slideCount > o.options.slidesToShow))
         ) {
            for (
               i =
                  !0 === o.options.centerMode
                     ? o.options.slidesToShow + 1
                     : o.options.slidesToShow,
                  t = o.slideCount;
               t > o.slideCount - i;
               t -= 1
            )
               (e = t - 1),
                  c(o.$slides[e])
                     .clone(!0)
                     .attr("id", "")
                     .attr("data-slick-index", e - o.slideCount)
                     .prependTo(o.$slideTrack)
                     .addClass("slick-cloned");
            for (t = 0; t < i + o.slideCount; t += 1)
               (e = t),
                  c(o.$slides[e])
                     .clone(!0)
                     .attr("id", "")
                     .attr("data-slick-index", e + o.slideCount)
                     .appendTo(o.$slideTrack)
                     .addClass("slick-cloned");
            o.$slideTrack
               .find(".slick-cloned")
               .find("[id]")
               .each(function () {
                  c(this).attr("id", "");
               });
         }
      }),
      (r.prototype.interrupt = function (t) {
         t || this.autoPlay(), (this.interrupted = t);
      }),
      (r.prototype.selectHandler = function (t) {
         var e = c(t.target).is(".slick-slide")
               ? c(t.target)
               : c(t.target).parents(".slick-slide"),
            i = parseInt(e.attr("data-slick-index"));
         (i = i || 0),
            this.slideCount <= this.options.slidesToShow
               ? this.slideHandler(i, !1, !0)
               : this.slideHandler(i);
      }),
      (r.prototype.slideHandler = function (t, e, i) {
         var o,
            s,
            n,
            r,
            l,
            a,
            c = this;
         if (
            ((e = e || !1),
            !(
               (!0 === c.animating && !0 === c.options.waitForAnimate) ||
               (!0 === c.options.fade && c.currentSlide === t)
            ))
         )
            if (
               (!1 === e && c.asNavFor(t),
               (o = t),
               (l = c.getLeft(o)),
               (r = c.getLeft(c.currentSlide)),
               (c.currentLeft = null === c.swipeLeft ? r : c.swipeLeft),
               !1 === c.options.infinite &&
                  !1 === c.options.centerMode &&
                  (t < 0 || t > c.getDotCount() * c.options.slidesToScroll))
            )
               !1 === c.options.fade &&
                  ((o = c.currentSlide),
                  !0 !== i && c.slideCount > c.options.slidesToShow
                     ? c.animateSlide(r, function () {
                          c.postSlide(o);
                       })
                     : c.postSlide(o));
            else if (
               !1 === c.options.infinite &&
               !0 === c.options.centerMode &&
               (t < 0 || t > c.slideCount - c.options.slidesToScroll)
            )
               !1 === c.options.fade &&
                  ((o = c.currentSlide),
                  !0 !== i && c.slideCount > c.options.slidesToShow
                     ? c.animateSlide(r, function () {
                          c.postSlide(o);
                       })
                     : c.postSlide(o));
            else {
               if (
                  (c.options.autoplay && clearInterval(c.autoPlayTimer),
                  (s =
                     o < 0
                        ? c.slideCount % c.options.slidesToScroll != 0
                           ? c.slideCount -
                             (c.slideCount % c.options.slidesToScroll)
                           : c.slideCount + o
                        : o >= c.slideCount
                        ? c.slideCount % c.options.slidesToScroll != 0
                           ? 0
                           : o - c.slideCount
                        : o),
                  (c.animating = !0),
                  c.$slider.trigger("beforeChange", [c, c.currentSlide, s]),
                  (n = c.currentSlide),
                  (c.currentSlide = s),
                  c.setSlideClasses(c.currentSlide),
                  c.options.asNavFor &&
                     (a = (a = c.getNavTarget()).slick("getSlick"))
                        .slideCount <= a.options.slidesToShow &&
                     a.setSlideClasses(c.currentSlide),
                  c.updateDots(),
                  c.updateArrows(),
                  !0 === c.options.fade)
               )
                  return (
                     !0 !== i
                        ? (c.fadeSlideOut(n),
                          c.fadeSlide(s, function () {
                             c.postSlide(s);
                          }))
                        : c.postSlide(s),
                     void c.animateHeight()
                  );
               !0 !== i && c.slideCount > c.options.slidesToShow
                  ? c.animateSlide(l, function () {
                       c.postSlide(s);
                    })
                  : c.postSlide(s);
            }
      }),
      (r.prototype.startLoad = function () {
         var t = this;
         !0 === t.options.arrows &&
            t.slideCount > t.options.slidesToShow &&
            (t.$prevArrow.hide(), t.$nextArrow.hide()),
            !0 === t.options.dots &&
               t.slideCount > t.options.slidesToShow &&
               t.$dots.hide(),
            t.$slider.addClass("slick-loading");
      }),
      (r.prototype.swipeDirection = function () {
         var t,
            e,
            i,
            o,
            s = this;
         return (
            (t = s.touchObject.startX - s.touchObject.curX),
            (e = s.touchObject.startY - s.touchObject.curY),
            (i = Math.atan2(e, t)),
            (o = Math.round((180 * i) / Math.PI)) < 0 &&
               (o = 360 - Math.abs(o)),
            o <= 45 && 0 <= o
               ? !1 === s.options.rtl
                  ? "left"
                  : "right"
               : o <= 360 && 315 <= o
               ? !1 === s.options.rtl
                  ? "left"
                  : "right"
               : 135 <= o && o <= 225
               ? !1 === s.options.rtl
                  ? "right"
                  : "left"
               : !0 === s.options.verticalSwiping
               ? 35 <= o && o <= 135
                  ? "down"
                  : "up"
               : "vertical"
         );
      }),
      (r.prototype.swipeEnd = function (t) {
         var e,
            i,
            o = this;
         if (((o.dragging = !1), (o.swiping = !1), o.scrolling))
            return (o.scrolling = !1);
         if (
            ((o.interrupted = !1),
            (o.shouldClick = !(10 < o.touchObject.swipeLength)),
            void 0 === o.touchObject.curX)
         )
            return !1;
         if (
            (!0 === o.touchObject.edgeHit &&
               o.$slider.trigger("edge", [o, o.swipeDirection()]),
            o.touchObject.swipeLength >= o.touchObject.minSwipe)
         ) {
            switch ((i = o.swipeDirection())) {
               case "left":
               case "down":
                  (e = o.options.swipeToSlide
                     ? o.checkNavigable(o.currentSlide + o.getSlideCount())
                     : o.currentSlide + o.getSlideCount()),
                     (o.currentDirection = 0);
                  break;
               case "right":
               case "up":
                  (e = o.options.swipeToSlide
                     ? o.checkNavigable(o.currentSlide - o.getSlideCount())
                     : o.currentSlide - o.getSlideCount()),
                     (o.currentDirection = 1);
            }
            "vertical" != i &&
               (o.slideHandler(e),
               (o.touchObject = {}),
               o.$slider.trigger("swipe", [o, i]));
         } else
            o.touchObject.startX !== o.touchObject.curX &&
               (o.slideHandler(o.currentSlide), (o.touchObject = {}));
      }),
      (r.prototype.swipeHandler = function (t) {
         var e = this;
         if (
            !(
               !1 === e.options.swipe ||
               ("ontouchend" in document && !1 === e.options.swipe) ||
               (!1 === e.options.draggable && -1 !== t.type.indexOf("mouse"))
            )
         )
            switch (
               ((e.touchObject.fingerCount =
                  t.originalEvent && void 0 !== t.originalEvent.touches
                     ? t.originalEvent.touches.length
                     : 1),
               (e.touchObject.minSwipe =
                  e.listWidth / e.options.touchThreshold),
               !0 === e.options.verticalSwiping &&
                  (e.touchObject.minSwipe =
                     e.listHeight / e.options.touchThreshold),
               t.data.action)
            ) {
               case "start":
                  e.swipeStart(t);
                  break;
               case "move":
                  e.swipeMove(t);
                  break;
               case "end":
                  e.swipeEnd(t);
            }
      }),
      (r.prototype.swipeMove = function (t) {
         var e,
            i,
            o,
            s,
            n,
            r,
            l = this;
         return (
            (n = void 0 !== t.originalEvent ? t.originalEvent.touches : null),
            !(!l.dragging || l.scrolling || (n && 1 !== n.length)) &&
               ((e = l.getLeft(l.currentSlide)),
               (l.touchObject.curX = void 0 !== n ? n[0].pageX : t.clientX),
               (l.touchObject.curY = void 0 !== n ? n[0].pageY : t.clientY),
               (l.touchObject.swipeLength = Math.round(
                  Math.sqrt(
                     Math.pow(l.touchObject.curX - l.touchObject.startX, 2)
                  )
               )),
               (r = Math.round(
                  Math.sqrt(
                     Math.pow(l.touchObject.curY - l.touchObject.startY, 2)
                  )
               )),
               !l.options.verticalSwiping && !l.swiping && 4 < r
                  ? !(l.scrolling = !0)
                  : (!0 === l.options.verticalSwiping &&
                       (l.touchObject.swipeLength = r),
                    (i = l.swipeDirection()),
                    void 0 !== t.originalEvent &&
                       4 < l.touchObject.swipeLength &&
                       ((l.swiping = !0), t.preventDefault()),
                    (s =
                       (!1 === l.options.rtl ? 1 : -1) *
                       (l.touchObject.curX > l.touchObject.startX ? 1 : -1)),
                    !0 === l.options.verticalSwiping &&
                       (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
                    (o = l.touchObject.swipeLength),
                    (l.touchObject.edgeHit = !1) === l.options.infinite &&
                       ((0 === l.currentSlide && "right" === i) ||
                          (l.currentSlide >= l.getDotCount() &&
                             "left" === i)) &&
                       ((o =
                          l.touchObject.swipeLength * l.options.edgeFriction),
                       (l.touchObject.edgeHit = !0)),
                    !1 === l.options.vertical
                       ? (l.swipeLeft = e + o * s)
                       : (l.swipeLeft =
                            e + o * (l.$list.height() / l.listWidth) * s),
                    !0 === l.options.verticalSwiping &&
                       (l.swipeLeft = e + o * s),
                    !0 !== l.options.fade &&
                       !1 !== l.options.touchMove &&
                       (!0 === l.animating
                          ? ((l.swipeLeft = null), !1)
                          : void l.setCSS(l.swipeLeft))))
         );
      }),
      (r.prototype.swipeStart = function (t) {
         var e,
            i = this;
         if (
            ((i.interrupted = !0),
            1 !== i.touchObject.fingerCount ||
               i.slideCount <= i.options.slidesToShow)
         )
            return !(i.touchObject = {});
         void 0 !== t.originalEvent &&
            void 0 !== t.originalEvent.touches &&
            (e = t.originalEvent.touches[0]),
            (i.touchObject.startX = i.touchObject.curX =
               void 0 !== e ? e.pageX : t.clientX),
            (i.touchObject.startY = i.touchObject.curY =
               void 0 !== e ? e.pageY : t.clientY),
            (i.dragging = !0);
      }),
      (r.prototype.unfilterSlides = r.prototype.slickUnfilter = function () {
         var t = this;
         null !== t.$slidesCache &&
            (t.unload(),
            t.$slideTrack.children(this.options.slide).detach(),
            t.$slidesCache.appendTo(t.$slideTrack),
            t.reinit());
      }),
      (r.prototype.unload = function () {
         var t = this;
         c(".slick-cloned", t.$slider).remove(),
            t.$dots && t.$dots.remove(),
            t.$prevArrow &&
               t.htmlExpr.test(t.options.prevArrow) &&
               t.$prevArrow.remove(),
            t.$nextArrow &&
               t.htmlExpr.test(t.options.nextArrow) &&
               t.$nextArrow.remove(),
            t.$slides
               .removeClass(
                  "slick-slide slick-active slick-visible slick-current"
               )
               .attr("aria-hidden", "true")
               .css("width", "");
      }),
      (r.prototype.unslick = function (t) {
         this.$slider.trigger("unslick", [this, t]), this.destroy();
      }),
      (r.prototype.updateArrows = function () {
         var t = this;
         Math.floor(t.options.slidesToShow / 2),
            !0 === t.options.arrows &&
               t.slideCount > t.options.slidesToShow &&
               !t.options.infinite &&
               (t.$prevArrow
                  .removeClass("slick-disabled")
                  .attr("aria-disabled", "false"),
               t.$nextArrow
                  .removeClass("slick-disabled")
                  .attr("aria-disabled", "false"),
               0 === t.currentSlide
                  ? (t.$prevArrow
                       .addClass("slick-disabled")
                       .attr("aria-disabled", "true"),
                    t.$nextArrow
                       .removeClass("slick-disabled")
                       .attr("aria-disabled", "false"))
                  : t.currentSlide >= t.slideCount - t.options.slidesToShow &&
                    !1 === t.options.centerMode
                  ? (t.$nextArrow
                       .addClass("slick-disabled")
                       .attr("aria-disabled", "true"),
                    t.$prevArrow
                       .removeClass("slick-disabled")
                       .attr("aria-disabled", "false"))
                  : t.currentSlide >= t.slideCount - 1 &&
                    !0 === t.options.centerMode &&
                    (t.$nextArrow
                       .addClass("slick-disabled")
                       .attr("aria-disabled", "true"),
                    t.$prevArrow
                       .removeClass("slick-disabled")
                       .attr("aria-disabled", "false")));
      }),
      (r.prototype.updateDots = function () {
         var t = this;
         null !== t.$dots &&
            (t.$dots.find("li").removeClass("slick-active").end(),
            t.$dots
               .find("li")
               .eq(Math.floor(t.currentSlide / t.options.slidesToScroll))
               .addClass("slick-active"));
      }),
      (r.prototype.visibility = function () {
         this.options.autoplay &&
            (document[this.hidden]
               ? (this.interrupted = !0)
               : (this.interrupted = !1));
      }),
      (c.fn.slick = function () {
         var t,
            e,
            i = this,
            o = arguments[0],
            s = Array.prototype.slice.call(arguments, 1),
            n = i.length;
         for (t = 0; t < n; t++)
            if (
               ("object" == typeof o || void 0 === o
                  ? (i[t].slick = new r(i[t], o))
                  : (e = i[t].slick[o].apply(i[t].slick, s)),
               void 0 !== e)
            )
               return e;
         return i;
      });
}),
   (function (t, e, i, o) {
      "function" == typeof define && define.amd
         ? define(function () {
              return (t.fullpage = o(e, i)), t.fullpage;
           })
         : "object" == typeof exports
         ? (module.exports = o(e, i))
         : (e.fullpage = o(e, i));
   })(this, window, document, function (_e, De) {
      "use strict";
      var We = "fullpage-wrapper",
         Be = "." + We,
         je = "fp-responsive",
         Re = "fp-notransition",
         Ne = "fp-destroyed",
         qe = "fp-enabled",
         Fe = "fp-viewing",
         Ue = "active",
         Ve = "." + Ue,
         Ke = "fp-completely",
         Qe = "fp-section",
         Ze = "." + Qe,
         Ge = Ze + Ve,
         Je = "fp-tableCell",
         ti = "." + Je,
         ei = "fp-auto-height",
         ii = "fp-normal-scroll",
         oi = "#fp-nav",
         si = "fp-tooltip",
         ni = "fp-slide",
         ri = "." + ni,
         li = ri + Ve,
         ai = "fp-slides",
         ci = "." + ai,
         di = "fp-slidesContainer",
         pi = "." + di,
         hi = "fp-table",
         ui = "fp-slidesNav",
         fi = "." + ui,
         vi = fi + " a",
         t = "fp-controlArrow",
         gi = "." + t,
         mi = "fp-prev",
         yi = gi + ".fp-prev",
         Si = gi + ".fp-next";
      function wi(t, e) {
         _e.console && _e.console[t] && _e.console[t]("fullPage: " + e);
      }
      function Ti(t, e) {
         return (e = 1 < arguments.length ? e : De)
            ? e.querySelectorAll(t)
            : null;
      }
      function bi(t) {
         t = t || {};
         for (var e = 1, i = arguments.length; e < i; ++e) {
            var o = arguments[e];
            if (o)
               for (var s in o)
                  o.hasOwnProperty(s) &&
                     ("[object Object]" !== Object.prototype.toString.call(o[s])
                        ? (t[s] = o[s])
                        : (t[s] = bi(t[s], o[s])));
         }
         return t;
      }
      function ki(t, e) {
         return (
            null != t &&
            (t.classList
               ? t.classList.contains(e)
               : new RegExp("(^| )" + e + "( |$)", "gi").test(t.className))
         );
      }
      function xi() {
         return "innerHeight" in _e
            ? _e.innerHeight
            : De.documentElement.offsetHeight;
      }
      function Ei() {
         return _e.innerWidth;
      }
      function Ci(t, e) {
         var i;
         for (i in ((t = r(t)), e))
            if (e.hasOwnProperty(i) && null !== i)
               for (var o = 0; o < t.length; o++) {
                  t[o].style[i] = e[i];
               }
         return t;
      }
      function i(t, e, i) {
         for (var o = t[i]; o && !Ki(o, e); ) o = o[i];
         return o;
      }
      function $i(t, e) {
         return i(t, e, "previousElementSibling");
      }
      function Pi(t, e) {
         return i(t, e, "nextElementSibling");
      }
      function Ai(t) {
         return t.previousElementSibling;
      }
      function Li(t) {
         return t.nextElementSibling;
      }
      function Hi(t) {
         return t[t.length - 1];
      }
      function Oi(t, e) {
         t = n(t) ? t[0] : t;
         for (
            var i = null != e ? Ti(e, t.parentNode) : t.parentNode.childNodes,
               o = 0,
               s = 0;
            s < i.length;
            s++
         ) {
            if (i[s] == t) return o;
            1 == i[s].nodeType && o++;
         }
         return -1;
      }
      function r(t) {
         return n(t) ? t : [t];
      }
      function Mi(t) {
         t = r(t);
         for (var e = 0; e < t.length; e++) t[e].style.display = "none";
         return t;
      }
      function zi(t) {
         t = r(t);
         for (var e = 0; e < t.length; e++) t[e].style.display = "block";
         return t;
      }
      function n(t) {
         return (
            "[object Array]" === Object.prototype.toString.call(t) ||
            "[object NodeList]" === Object.prototype.toString.call(t)
         );
      }
      function Xi(t, e) {
         t = r(t);
         for (var i = 0; i < t.length; i++) {
            var o = t[i];
            o.classList ? o.classList.add(e) : (o.className += " " + e);
         }
         return t;
      }
      function Yi(t, e) {
         t = r(t);
         for (var i = e.split(" "), o = 0; o < i.length; o++) {
            e = i[o];
            for (var s = 0; s < t.length; s++) {
               var n = t[s];
               n.classList
                  ? n.classList.remove(e)
                  : (n.className = n.className.replace(
                       new RegExp(
                          "(^|\\b)" + e.split(" ").join("|") + "(\\b|$)",
                          "gi"
                       ),
                       " "
                    ));
            }
         }
         return t;
      }
      function Ii(t, e) {
         e.appendChild(t);
      }
      function o(t, e, i) {
         var o;
         e = e || De.createElement("div");
         for (var s = 0; s < t.length; s++) {
            var n = t[s];
            ((!i || s) && i) ||
               ((o = e.cloneNode(!0)), n.parentNode.insertBefore(o, n)),
               o.appendChild(n);
         }
         return t;
      }
      function _i(t, e) {
         o(t, e, !0);
      }
      function Di(t, e) {
         for (
            "string" == typeof e && (e = Zi(e)), t.appendChild(e);
            t.firstChild !== e;

         )
            e.appendChild(t.firstChild);
      }
      function Wi(t) {
         for (var e = De.createDocumentFragment(); t.firstChild; )
            e.appendChild(t.firstChild);
         t.parentNode.replaceChild(e, t);
      }
      function Bi(t, e) {
         return t && 1 === t.nodeType
            ? Ki(t, e)
               ? t
               : Bi(t.parentNode, e)
            : null;
      }
      function ji(t, e) {
         s(t, t.nextSibling, e);
      }
      function Ri(t, e) {
         s(t, t, e);
      }
      function s(t, e, i) {
         n(i) || ("string" == typeof i && (i = Zi(i)), (i = [i]));
         for (var o = 0; o < i.length; o++) t.parentNode.insertBefore(i[o], e);
      }
      function Ni() {
         var t = De.documentElement;
         return (_e.pageYOffset || t.scrollTop) - (t.clientTop || 0);
      }
      function qi(e) {
         return Array.prototype.filter.call(
            e.parentNode.children,
            function (t) {
               return t !== e;
            }
         );
      }
      function Fi(t) {
         t.preventDefault ? t.preventDefault() : (t.returnValue = !1);
      }
      function Ui(t) {
         if ("function" == typeof t) return !0;
         var e = Object.prototype.toString(t);
         return "[object Function]" === e || "[object GeneratorFunction]" === e;
      }
      function Vi(t, e, i) {
         var o;
         (i = void 0 === i ? {} : i),
            "function" == typeof _e.CustomEvent
               ? (o = new CustomEvent(e, { detail: i }))
               : (o = De.createEvent("CustomEvent")).initCustomEvent(
                    e,
                    !0,
                    !0,
                    i
                 ),
            t.dispatchEvent(o);
      }
      function Ki(t, e) {
         return (
            t.matches ||
            t.matchesSelector ||
            t.msMatchesSelector ||
            t.mozMatchesSelector ||
            t.webkitMatchesSelector ||
            t.oMatchesSelector
         ).call(t, e);
      }
      function Qi(t, e) {
         if ("boolean" == typeof e)
            for (var i = 0; i < t.length; i++)
               t[i].style.display = e ? "block" : "none";
         return t;
      }
      function Zi(t) {
         var e = De.createElement("div");
         return (e.innerHTML = t.trim()), e.firstChild;
      }
      function Gi(t) {
         t = r(t);
         for (var e = 0; e < t.length; e++) {
            var i = t[e];
            i && i.parentElement && i.parentNode.removeChild(i);
         }
      }
      function l(t, e, i) {
         for (var o = t[i], s = []; o; )
            (!Ki(o, e) && null != e) || s.push(o), (o = o[i]);
         return s;
      }
      function Ji(t, e) {
         return l(t, e, "nextElementSibling");
      }
      function to(t, e) {
         return l(t, e, "previousElementSibling");
      }
      return (
         _e.NodeList &&
            !NodeList.prototype.forEach &&
            (NodeList.prototype.forEach = function (t, e) {
               e = e || _e;
               for (var i = 0; i < this.length; i++)
                  t.call(e, this[i], i, this);
            }),
         (_e.fp_utils = {
            $: Ti,
            deepExtend: bi,
            hasClass: ki,
            getWindowHeight: xi,
            css: Ci,
            until: i,
            prevUntil: $i,
            nextUntil: Pi,
            prev: Ai,
            next: Li,
            last: Hi,
            index: Oi,
            getList: r,
            hide: Mi,
            show: zi,
            isArrayOrList: n,
            addClass: Xi,
            removeClass: Yi,
            appendTo: Ii,
            wrap: o,
            wrapAll: _i,
            wrapInner: Di,
            unwrap: Wi,
            closest: Bi,
            after: ji,
            before: Ri,
            insertBefore: s,
            getScrollTop: Ni,
            siblings: qi,
            preventDefault: Fi,
            isFunction: Ui,
            trigger: Vi,
            matches: Ki,
            toggle: Qi,
            createElementFromHTML: Zi,
            remove: Gi,
            filter: function (t, e) {
               Array.prototype.filter.call(t, e);
            },
            untilAll: l,
            nextAll: Ji,
            prevAll: to,
            showError: wi,
         }),
         function (t, m) {
            var i =
                  (m &&
                     new RegExp(
                        "([\\d\\w]{8}-){3}[\\d\\w]{8}|^(?=.*?[A-Y])(?=.*?[a-y])(?=.*?[0-8])(?=.*?[#?!@$%^&*-]).{8,}$"
                     ).test(m.licenseKey)) ||
                  -1 < De.domain.indexOf("alvarotrigo.com"),
               s = Ti("html, body"),
               r = Ti("html")[0],
               y = Ti("body")[0];
            if (!ki(r, qe)) {
               var l = {};
               m = bi(
                  {
                     menu: !1,
                     anchors: [],
                     lockAnchors: !1,
                     navigation: !1,
                     navigationPosition: "right",
                     navigationTooltips: [],
                     showActiveTooltip: !1,
                     slidesNavigation: !1,
                     slidesNavPosition: "bottom",
                     scrollBar: !1,
                     hybrid: !1,
                     css3: !0,
                     scrollingSpeed: 700,
                     autoScrolling: !0,
                     fitToSection: !0,
                     fitToSectionDelay: 1e3,
                     easing: "easeInOutCubic",
                     easingcss3: "ease",
                     loopBottom: !1,
                     loopTop: !1,
                     loopHorizontal: !0,
                     continuousVertical: !1,
                     continuousHorizontal: !1,
                     scrollHorizontally: !1,
                     interlockedSlides: !1,
                     dragAndMove: !1,
                     offsetSections: !1,
                     resetSliders: !1,
                     fadingEffect: !1,
                     normalScrollElements: null,
                     scrollOverflow: !1,
                     scrollOverflowReset: !1,
                     scrollOverflowHandler: _e.fp_scrolloverflow
                        ? _e.fp_scrolloverflow.iscrollHandler
                        : null,
                     scrollOverflowOptions: null,
                     touchSensitivity: 5,
                     touchWrapper: "string" == typeof t ? Ti(t)[0] : t,
                     bigSectionsDestination: null,
                     keyboardScrolling: !0,
                     animateAnchor: !0,
                     recordHistory: !0,
                     controlArrows: !0,
                     controlArrowColor: "#fff",
                     verticalCentered: !0,
                     sectionsColor: [],
                     paddingTop: 0,
                     paddingBottom: 0,
                     fixedElements: null,
                     responsive: 0,
                     responsiveWidth: 0,
                     responsiveHeight: 0,
                     responsiveSlides: !1,
                     parallax: !1,
                     parallaxOptions: {
                        type: "reveal",
                        percentage: 62,
                        property: "translate",
                     },
                     cards: !1,
                     cardsOptions: {
                        perspective: 100,
                        fadeContent: !0,
                        fadeBackground: !0,
                     },
                     sectionSelector: ".section",
                     slideSelector: ".slide",
                     v2compatible: !1,
                     afterLoad: null,
                     onLeave: null,
                     afterRender: null,
                     afterResize: null,
                     afterReBuild: null,
                     afterSlideLoad: null,
                     onSlideLeave: null,
                     afterResponsive: null,
                     lazyLoading: !0,
                  },
                  m
               );
               var S,
                  n,
                  c,
                  o,
                  a = !1,
                  d = navigator.userAgent.match(
                     /(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/
                  ),
                  p =
                     "ontouchstart" in _e ||
                     0 < navigator.msMaxTouchPoints ||
                     navigator.maxTouchPoints,
                  h = "string" == typeof t ? Ti(t)[0] : t,
                  w = xi(),
                  u = Ei(),
                  T = !1,
                  e = !0,
                  b = !0,
                  f = [],
                  v = { m: { up: !0, down: !0, left: !0, right: !0 } };
               v.k = bi({}, v.m);
               var g,
                  k,
                  x,
                  E,
                  C,
                  $,
                  P,
                  A,
                  L,
                  H = (function () {
                     var t;
                     t = _e.PointerEvent
                        ? { down: "pointerdown", move: "pointermove" }
                        : { down: "MSPointerDown", move: "MSPointerMove" };
                     return t;
                  })(),
                  O = {
                     touchmove: "ontouchmove" in _e ? "touchmove" : H.move,
                     touchstart: "ontouchstart" in _e ? "touchstart" : H.down,
                  },
                  M =
                     'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]',
                  z = !1;
               try {
                  var X = Object.defineProperty({}, "passive", {
                     get: function () {
                        z = !0;
                     },
                  });
                  _e.addEventListener("testPassive", null, X),
                     _e.removeEventListener("testPassive", null, X);
               } catch (t) {}
               var Y,
                  I,
                  _,
                  D = bi({}, m),
                  W = !1,
                  B = !0,
                  j = [
                     "parallax",
                     "scrollOverflowReset",
                     "dragAndMove",
                     "offsetSections",
                     "fadingEffect",
                     "responsiveSlides",
                     "continuousHorizontal",
                     "interlockedSlides",
                     "scrollHorizontally",
                     "resetSliders",
                     "cards",
                  ];
               Oe(),
                  (_e.fp_easings = bi(_e.fp_easings, {
                     easeInOutCubic: function (t, e, i, o) {
                        return (t /= o / 2) < 1
                           ? (i / 2) * t * t * t + e
                           : (i / 2) * ((t -= 2) * t * t + 2) + e;
                     },
                  })),
                  h &&
                     ((l.version = "3.0.8"),
                     (l.setAutoScrolling = J),
                     (l.setRecordHistory = tt),
                     (l.setScrollingSpeed = et),
                     (l.setFitToSection = it),
                     (l.setLockAnchors = function (t) {
                        m.lockAnchors = t;
                     }),
                     (l.setMouseWheelScrolling = ot),
                     (l.setAllowScrolling = st),
                     (l.setKeyboardScrolling = rt),
                     (l.moveSectionUp = lt),
                     (l.moveSectionDown = at),
                     (l.silentMoveTo = ct),
                     (l.moveTo = dt),
                     (l.moveSlideRight = pt),
                     (l.moveSlideLeft = ht),
                     (l.fitToSection = Ct),
                     (l.reBuild = ut),
                     (l.setResponsive = vt),
                     (l.getFullpageData = function () {
                        return m;
                     }),
                     (l.destroy = function (t) {
                        J(!1, "internal"),
                           st(!0),
                           nt(!1),
                           rt(!1),
                           Xi(h, Ne),
                           [C, E, k, $, P, L, x, _].forEach(function (t) {
                              clearTimeout(t);
                           }),
                           _e.removeEventListener("scroll", Et),
                           _e.removeEventListener("hashchange", Zt),
                           _e.removeEventListener("resize", ce),
                           De.removeEventListener("keydown", Jt),
                           De.removeEventListener("keyup", te),
                           ["click", "touchstart"].forEach(function (t) {
                              De.removeEventListener(t, gt);
                           }),
                           [
                              "mouseenter",
                              "touchstart",
                              "mouseleave",
                              "touchend",
                           ].forEach(function (t) {
                              De.removeEventListener(t, yt, !0);
                           }),
                           t &&
                              (Pe(0),
                              Ti(
                                 "img[data-src], source[data-src], audio[data-src], iframe[data-src]",
                                 h
                              ).forEach(function (t) {
                                 jt(t, "src");
                              }),
                              Ti("img[data-srcset]").forEach(function (t) {
                                 jt(t, "srcset");
                              }),
                              Gi(Ti(oi + ", " + fi + ", " + gi)),
                              Ci(Ti(Ze), {
                                 height: "",
                                 "background-color": "",
                                 padding: "",
                              }),
                              Ci(Ti(ri), { width: "" }),
                              Ci(h, {
                                 height: "",
                                 position: "",
                                 "-ms-touch-action": "",
                                 "touch-action": "",
                              }),
                              Ci(s, { overflow: "", height: "" }),
                              Yi(r, qe),
                              Yi(y, je),
                              y.className.split(/\s+/).forEach(function (t) {
                                 0 === t.indexOf(Fe) && Yi(y, t);
                              }),
                              Ti(Ze + ", " + ri).forEach(function (t) {
                                 m.scrollOverflowHandler &&
                                    m.scrollOverflow &&
                                    m.scrollOverflowHandler.remove(t),
                                    Yi(t, hi + " " + Ue + " " + Ke),
                                    t.getAttribute("data-fp-styles") &&
                                       t.setAttribute(
                                          "style",
                                          t.getAttribute("data-fp-styles")
                                       ),
                                    ki(t, Qe) &&
                                       !W &&
                                       t.removeAttribute("data-anchor");
                              }),
                              ue(h),
                              [ti, pi, ci].forEach(function (t) {
                                 Ti(t, h).forEach(function (t) {
                                    Wi(t);
                                 });
                              }),
                              Ci(h, {
                                 "-webkit-transition": "none",
                                 transition: "none",
                              }),
                              _e.scrollTo(0, 0),
                              [Qe, ni, di].forEach(function (t) {
                                 Yi(Ti("." + t), t);
                              }));
                     }),
                     (l.getActiveSection = function () {
                        return new Ye(Ti(Ge)[0]);
                     }),
                     (l.getActiveSlide = function () {
                        return Dt(Ti(li, Ti(Ge)[0])[0]);
                     }),
                     (l.test = {
                        top: "0px",
                        translate3d: "translate3d(0px, 0px, 0px)",
                        translate3dH: (function () {
                           for (
                              var t = [], e = 0;
                              e < Ti(m.sectionSelector, h).length;
                              e++
                           )
                              t.push("translate3d(0px, 0px, 0px)");
                           return t;
                        })(),
                        left: (function () {
                           for (
                              var t = [], e = 0;
                              e < Ti(m.sectionSelector, h).length;
                              e++
                           )
                              t.push(0);
                           return t;
                        })(),
                        options: m,
                        setAutoScrolling: J,
                     }),
                     (l.shared = {
                        afterRenderActions: xt,
                        isNormalScrollElement: !1,
                     }),
                     (_e.fullpage_api = l),
                     m.$ &&
                        Object.keys(l).forEach(function (t) {
                           m.$.fn.fullpage[t] = l[t];
                        }),
                     (function () {
                        m.css3 &&
                           (m.css3 = (function () {
                              var t,
                                 e = De.createElement("p"),
                                 i = {
                                    webkitTransform: "-webkit-transform",
                                    OTransform: "-o-transform",
                                    msTransform: "-ms-transform",
                                    MozTransform: "-moz-transform",
                                    transform: "transform",
                                 };
                              for (var o in ((e.style.display = "block"),
                              De.body.insertBefore(e, null),
                              i))
                                 void 0 !== e.style[o] &&
                                    ((e.style[o] = "translate3d(1px,1px,1px)"),
                                    (t = _e
                                       .getComputedStyle(e)
                                       .getPropertyValue(i[o])));
                              return (
                                 De.body.removeChild(e),
                                 void 0 !== t && 0 < t.length && "none" !== t
                              );
                           })());
                        (m.scrollBar = m.scrollBar || m.hybrid),
                           (function () {
                              if (!m.anchors.length) {
                                 var t = "[data-anchor]",
                                    e = Ti(
                                       m.sectionSelector
                                          .split(",")
                                          .join(t + ",") + t,
                                       h
                                    );
                                 e.length &&
                                    e.length === Ti(Ze).length &&
                                    ((W = !0),
                                    e.forEach(function (t) {
                                       m.anchors.push(
                                          t
                                             .getAttribute("data-anchor")
                                             .toString()
                                       );
                                    }));
                              }
                              if (!m.navigationTooltips.length) {
                                 var i = "[data-tooltip]",
                                    o = Ti(
                                       m.sectionSelector
                                          .split(",")
                                          .join(i + ",") + i,
                                       h
                                    );
                                 o.length &&
                                    o.forEach(function (t) {
                                       m.navigationTooltips.push(
                                          t
                                             .getAttribute("data-tooltip")
                                             .toString()
                                       );
                                    });
                              }
                           })(),
                           (function () {
                              Ci(h, { height: "100%", position: "relative" }),
                                 Xi(h, We),
                                 Xi(r, qe),
                                 (w = xi()),
                                 Yi(h, Ne),
                                 Xi(Ti(m.sectionSelector, h), Qe),
                                 Xi(Ti(m.slideSelector, h), ni);
                              for (var t = Ti(Ze), e = 0; e < t.length; e++) {
                                 var i = e,
                                    o = t[e],
                                    s = Ti(ri, o),
                                    n = s.length;
                                 o.setAttribute(
                                    "data-fp-styles",
                                    o.getAttribute("style")
                                 ),
                                    Tt(o, i),
                                    bt(o, i),
                                    0 < n
                                       ? wt(o, s, n)
                                       : m.verticalCentered && ge(o);
                              }
                              m.fixedElements &&
                                 m.css3 &&
                                 Ti(m.fixedElements).forEach(function (t) {
                                    y.appendChild(t);
                                 });
                              m.navigation &&
                                 (function () {
                                    var t = De.createElement("div");
                                    t.setAttribute("id", "fp-nav");
                                    var e = De.createElement("ul");
                                    t.appendChild(e), Ii(t, y);
                                    var i = Ti(oi)[0];
                                    Xi(i, "fp-" + m.navigationPosition),
                                       m.showActiveTooltip &&
                                          Xi(i, "fp-show-active");
                                    for (
                                       var o = "", s = 0;
                                       s < Ti(Ze).length;
                                       s++
                                    ) {
                                       var n = "";
                                       m.anchors.length && (n = m.anchors[s]),
                                          (o +=
                                             '<li><a href="#' +
                                             n +
                                             '"><span class="fp-sr-only">' +
                                             kt(s, "Section") +
                                             "</span><span></span></a>");
                                       var r = m.navigationTooltips[s];
                                       void 0 !== r &&
                                          "" !== r &&
                                          (o +=
                                             '<div class="' +
                                             si +
                                             " fp-" +
                                             m.navigationPosition +
                                             '">' +
                                             r +
                                             "</div>"),
                                          (o += "</li>");
                                    }
                                    (Ti("ul", i)[0].innerHTML = o),
                                       Xi(
                                          Ti(
                                             "a",
                                             Ti("li", Ti(oi)[0])[
                                                Oi(Ti(Ge)[0], Ze)
                                             ]
                                          ),
                                          Ue
                                       );
                                 })();
                              Ti(
                                 'iframe[src*="youtube.com/embed/"]',
                                 h
                              ).forEach(function (t) {
                                 !(function (t, e) {
                                    var i = t.getAttribute("src");
                                    t.setAttribute(
                                       "src",
                                       i +
                                          (function (t) {
                                             return /\?/.test(t) ? "&" : "?";
                                          })(i) +
                                          e
                                    );
                                 })(t, "enablejsapi=1");
                              }),
                                 m.scrollOverflow &&
                                    (g = m.scrollOverflowHandler.init(m));
                           })(),
                           st(!0),
                           nt(!0),
                           J(m.autoScrolling, "internal"),
                           pe(),
                           Ee(),
                           "complete" === De.readyState && Qt();
                        _e.addEventListener("load", Qt),
                           m.scrollOverflow || xt();
                        !(function () {
                           for (var t = 1; t < 4; t++)
                              L = setTimeout(St, 350 * t);
                        })();
                     })(),
                     _e.addEventListener("scroll", Et),
                     _e.addEventListener("hashchange", Zt),
                     _e.addEventListener("focus", se),
                     _e.addEventListener("blur", ne),
                     _e.addEventListener("resize", ce),
                     De.addEventListener("keydown", Jt),
                     De.addEventListener("keyup", te),
                     ["click", "touchstart"].forEach(function (t) {
                        De.addEventListener(t, gt);
                     }),
                     m.normalScrollElements &&
                        (["mouseenter", "touchstart"].forEach(function (t) {
                           mt(t, !1);
                        }),
                        ["mouseleave", "touchend"].forEach(function (t) {
                           mt(t, !0);
                        })));
               var R = !1,
                  N = 0,
                  q = 0,
                  F = 0,
                  U = 0,
                  V = 0,
                  K = new Date().getTime(),
                  Q = 0,
                  Z = 0,
                  G = w;
               return l;
            }
            function J(t, e) {
               t || Pe(0), He("autoScrolling", t, e);
               var i = Ti(Ge)[0];
               if (m.autoScrolling && !m.scrollBar)
                  Ci(s, { overflow: "hidden", height: "100%" }),
                     tt(D.recordHistory, "internal"),
                     Ci(h, {
                        "-ms-touch-action": "none",
                        "touch-action": "none",
                     }),
                     null != i && Pe(i.offsetTop);
               else if (
                  (Ci(s, { overflow: "visible", height: "initial" }),
                  tt(!!m.autoScrolling && D.recordHistory, "internal"),
                  Ci(h, { "-ms-touch-action": "", "touch-action": "" }),
                  null != i)
               ) {
                  var o = Wt(i.offsetTop);
                  o.element.scrollTo(0, o.options);
               }
            }
            function tt(t, e) {
               He("recordHistory", t, e);
            }
            function et(t, e) {
               He("scrollingSpeed", t, e);
            }
            function it(t, e) {
               He("fitToSection", t, e);
            }
            function ot(t) {
               t
                  ? ((function () {
                       var t,
                          e = "";
                       _e.addEventListener
                          ? (t = "addEventListener")
                          : ((t = "attachEvent"), (e = "on"));
                       var i =
                             "onwheel" in De.createElement("div")
                                ? "wheel"
                                : void 0 !== De.onmousewheel
                                ? "mousewheel"
                                : "DOMMouseScroll",
                          o = !!z && { passive: !1 };
                       "DOMMouseScroll" == i
                          ? De[t](e + "MozMousePixelScroll", Mt, o)
                          : De[t](e + i, Mt, o);
                    })(),
                    h.addEventListener("mousedown", ee),
                    h.addEventListener("mouseup", ie))
                  : (De.addEventListener
                       ? (De.removeEventListener("mousewheel", Mt, !1),
                         De.removeEventListener("wheel", Mt, !1),
                         De.removeEventListener("MozMousePixelScroll", Mt, !1))
                       : De.detachEvent("onmousewheel", Mt),
                    h.removeEventListener("mousedown", ee),
                    h.removeEventListener("mouseup", ie));
            }
            function st(e, t) {
               void 0 !== t
                  ? (t = t.replace(/ /g, "").split(",")).forEach(function (t) {
                       Le(e, t, "m");
                    })
                  : Le(e, "all", "m");
            }
            function nt(t) {
               t
                  ? (ot(!0),
                    (function () {
                       if (d || p) {
                          m.autoScrolling &&
                             (y.removeEventListener(O.touchmove, Pt, {
                                passive: !1,
                             }),
                             y.addEventListener(O.touchmove, Pt, {
                                passive: !1,
                             }));
                          var t = m.touchWrapper;
                          t.removeEventListener(O.touchstart, Ht),
                             t.removeEventListener(O.touchmove, At, {
                                passive: !1,
                             }),
                             t.addEventListener(O.touchstart, Ht),
                             t.addEventListener(O.touchmove, At, {
                                passive: !1,
                             });
                       }
                    })())
                  : (ot(!1),
                    (function () {
                       if (d || p) {
                          m.autoScrolling &&
                             (y.removeEventListener(O.touchmove, At, {
                                passive: !1,
                             }),
                             y.removeEventListener(O.touchmove, Pt, {
                                passive: !1,
                             }));
                          var t = m.touchWrapper;
                          t.removeEventListener(O.touchstart, Ht),
                             t.removeEventListener(O.touchmove, At, {
                                passive: !1,
                             });
                       }
                    })());
            }
            function rt(e, t) {
               void 0 !== t
                  ? (t = t.replace(/ /g, "").split(",")).forEach(function (t) {
                       Le(e, t, "k");
                    })
                  : (Le(e, "all", "k"), (m.keyboardScrolling = e));
            }
            function lt() {
               var t = $i(Ti(Ge)[0], Ze);
               t || (!m.loopTop && !m.continuousVertical) || (t = Hi(Ti(Ze))),
                  null != t && Yt(t, null, !0);
            }
            function at() {
               var t = Pi(Ti(Ge)[0], Ze);
               t || (!m.loopBottom && !m.continuousVertical) || (t = Ti(Ze)[0]),
                  null != t && Yt(t, null, !1);
            }
            function ct(t, e) {
               et(0, "internal"), dt(t, e), et(D.scrollingSpeed, "internal");
            }
            function dt(t, e) {
               var i = Se(t);
               void 0 !== e ? we(t, e) : null != i && Yt(i);
            }
            function pt(t) {
               zt("right", t);
            }
            function ht(t) {
               zt("left", t);
            }
            function ut(t) {
               if (!ki(h, Ne)) {
                  (T = !0), (w = xi()), (u = Ei());
                  for (var e = Ti(Ze), i = 0; i < e.length; ++i) {
                     var o = e[i],
                        s = Ti(ci, o)[0],
                        n = Ti(ri, o);
                     m.verticalCentered &&
                        Ci(Ti(ti, o), { height: me(o) + "px" }),
                        Ci(o, { height: w + "px" }),
                        1 < n.length && le(s, Ti(li, s)[0]);
                  }
                  m.scrollOverflow && g.createScrollBarForAll();
                  var r = Oi(Ti(Ge)[0], Ze);
                  r && ct(r + 1),
                     (T = !1),
                     Ui(m.afterResize) &&
                        t &&
                        m.afterResize.call(h, _e.innerWidth, _e.innerHeight),
                     Ui(m.afterReBuild) && !t && m.afterReBuild.call(h);
               }
            }
            function ft() {
               return ki(y, je);
            }
            function vt(t) {
               var e = ft();
               t
                  ? e ||
                    (J(!1, "internal"),
                    it(!1, "internal"),
                    Mi(Ti(oi)),
                    Xi(y, je),
                    Ui(m.afterResponsive) && m.afterResponsive.call(h, t),
                    m.scrollOverflow && g.createScrollBarForAll())
                  : e &&
                    (J(D.autoScrolling, "internal"),
                    it(D.autoScrolling, "internal"),
                    zi(Ti(oi)),
                    Yi(y, je),
                    Ui(m.afterResponsive) && m.afterResponsive.call(h, t));
            }
            function gt(t) {
               var e = t.target;
               e && Bi(e, oi + " a")
                  ? function (t) {
                       Fi(t);
                       var e = Oi(Bi(this, oi + " li"));
                       Yt(Ti(Ze)[e]);
                    }.call(e, t)
                  : Ki(e, ".fp-tooltip")
                  ? function () {
                       Vi(Ai(this), "click");
                    }.call(e)
                  : Ki(e, gi)
                  ? function () {
                       var t = Bi(this, Ze);
                       ki(this, mi) ? v.m.left && ht(t) : v.m.right && pt(t);
                    }.call(e, t)
                  : Ki(e, vi) || null != Bi(e, vi)
                  ? function (t) {
                       Fi(t);
                       var e = Ti(ci, Bi(this, Ze))[0],
                          i = Ti(ri, e)[Oi(Bi(this, "li"))];
                       le(e, i);
                    }.call(e, t)
                  : Bi(e, m.menu + " [data-menuanchor]") &&
                    function (t) {
                       !Ti(m.menu)[0] ||
                          (!m.lockAnchors && m.anchors.length) ||
                          (Fi(t), dt(this.getAttribute("data-menuanchor")));
                    }.call(e, t);
            }
            function mt(t, e) {
               (De["fp_" + t] = e), De.addEventListener(t, yt, !0);
            }
            function yt(t) {
               var e = t.type,
                  o = !1,
                  s = m.scrollOverflow,
                  n =
                     "mouseleave" === e
                        ? t.toElement || t.relatedTarget
                        : t.target;
               if (n == De || !n)
                  return (
                     nt(!0),
                     void (s && m.scrollOverflowHandler.setIscroll(n, !0))
                  );
               "touchend" === e &&
                  ((B = !1),
                  setTimeout(function () {
                     B = !0;
                  }, 800)),
                  ("mouseenter" === e && !B) ||
                     (m.normalScrollElements.split(",").forEach(function (t) {
                        if (!o) {
                           var e = Ki(n, t),
                              i = Bi(n, t);
                           (e || i) &&
                              (l.shared.isNormalScrollElement ||
                                 (nt(!1),
                                 s &&
                                    m.scrollOverflowHandler.setIscroll(n, !1)),
                              (l.shared.isNormalScrollElement = !0),
                              (o = !0));
                        }
                     }),
                     !o &&
                        l.shared.isNormalScrollElement &&
                        (nt(!0),
                        s && m.scrollOverflowHandler.setIscroll(n, !0),
                        (l.shared.isNormalScrollElement = !1)));
            }
            function St() {
               var t = xi(),
                  e = Ei();
               (w === t && u === e) || ((w = t), (u = e), ut(!0));
            }
            function wt(t, e, i) {
               var o = 100 * i,
                  s = 100 / i,
                  n = De.createElement("div");
               (n.className = ai), _i(e, n);
               var r = De.createElement("div");
               (r.className = di),
                  _i(e, r),
                  Ci(Ti(pi, t), { width: o + "%" }),
                  1 < i &&
                     (m.controlArrows &&
                        (function (t) {
                           var e = [
                              Zi('<div class="fp-controlArrow fp-prev"></div>'),
                              Zi('<div class="fp-controlArrow fp-next"></div>'),
                           ];
                           ji(Ti(ci, t)[0], e),
                              "#fff" !== m.controlArrowColor &&
                                 (Ci(Ti(Si, t), {
                                    "border-color":
                                       "transparent transparent transparent " +
                                       m.controlArrowColor,
                                 }),
                                 Ci(Ti(yi, t), {
                                    "border-color":
                                       "transparent " +
                                       m.controlArrowColor +
                                       " transparent transparent",
                                 }));
                           m.loopHorizontal || Mi(Ti(yi, t));
                        })(t),
                     m.slidesNavigation &&
                        (function (t, e) {
                           Ii(Zi('<div class="' + ui + '"><ul></ul></div>'), t);
                           var i = Ti(fi, t)[0];
                           Xi(i, "fp-" + m.slidesNavPosition);
                           for (var o = 0; o < e; o++) {
                              var s = Ti(ri, t)[o];
                              Ii(
                                 Zi(
                                    '<li><a href="#"><span class="fp-sr-only">' +
                                       kt(o, "Slide", s) +
                                       "</span><span></span></a></li>"
                                 ),
                                 Ti("ul", i)[0]
                              );
                           }
                           Ci(i, {
                              "margin-left": "-" + i.innerWidth / 2 + "px",
                           }),
                              Xi(Ti("a", Ti("li", i)[0]), Ue);
                        })(t, i)),
                  e.forEach(function (t) {
                     Ci(t, { width: s + "%" }), m.verticalCentered && ge(t);
                  });
               var l = Ti(li, t)[0];
               null != l &&
               (0 !== Oi(Ti(Ge), Ze) || (0 === Oi(Ti(Ge), Ze) && 0 !== Oi(l)))
                  ? $e(l, "internal")
                  : Xi(e[0], Ue);
            }
            function Tt(t, e) {
               e || null != Ti(Ge)[0] || Xi(t, Ue),
                  (o = Ti(Ge)[0]),
                  Ci(t, { height: w + "px" }),
                  m.paddingTop && Ci(t, { "padding-top": m.paddingTop }),
                  m.paddingBottom &&
                     Ci(t, { "padding-bottom": m.paddingBottom }),
                  void 0 !== m.sectionsColor[e] &&
                     Ci(t, { "background-color": m.sectionsColor[e] }),
                  void 0 !== m.anchors[e] &&
                     t.setAttribute("data-anchor", m.anchors[e]);
            }
            function bt(t, e) {
               void 0 !== m.anchors[e] && ki(t, Ue) && fe(m.anchors[e], e),
                  m.menu &&
                     m.css3 &&
                     null != Bi(Ti(m.menu)[0], Be) &&
                     Ti(m.menu).forEach(function (t) {
                        y.appendChild(t);
                     });
            }
            function kt(t, e, i) {
               var o =
                  "Section" === e
                     ? m.anchors[t]
                     : i.getAttribute("data-anchor");
               return m.navigationTooltips[t] || o || e + " " + (t + 1);
            }
            function xt() {
               var t = Ti(Ge)[0];
               Xi(t, Ke),
                  Nt(t),
                  Rt(),
                  Ft(t),
                  m.scrollOverflow && m.scrollOverflowHandler.afterLoad(),
                  (function () {
                     var t = Gt(),
                        e = Se(t.section);
                     return (
                        !t.section || !e || (void 0 !== e && Oi(e) === Oi(o))
                     );
                  })() &&
                     Ui(m.afterLoad) &&
                     It("afterLoad", {
                        activeSection: t,
                        element: t,
                        direction: null,
                        anchorLink: t.getAttribute("data-anchor"),
                        sectionIndex: Oi(t, Ze),
                     }),
                  Ui(m.afterRender) && It("afterRender");
            }
            function Et() {
               var t;
               if (!T && (!m.autoScrolling || m.scrollBar)) {
                  var e = Ni(),
                     i = (function (t) {
                        var e = N < t ? "down" : "up";
                        return (Q = N = t), e;
                     })(e),
                     o = 0,
                     s = e + xi() / 2,
                     n = y.offsetHeight - xi() === e,
                     r = Ti(Ze);
                  if (n) o = r.length - 1;
                  else if (e)
                     for (var l = 0; l < r.length; ++l) {
                        r[l].offsetTop <= s && (o = l);
                     }
                  else o = 0;
                  if (
                     (!(function (t) {
                        var e = Ti(Ge)[0].offsetTop,
                           i = e + xi();
                        return "up" != t ? e <= Ni() : i >= Ni() + xi();
                     })(i) ||
                        ki(Ti(Ge)[0], Ke) ||
                        (Xi(Ti(Ge)[0], Ke), Yi(qi(Ti(Ge)[0]), Ke)),
                     !ki((t = r[o]), Ue))
                  ) {
                     R = !0;
                     var a,
                        c,
                        d = Ti(Ge)[0],
                        p = Oi(d, Ze) + 1,
                        h = ve(t),
                        u = t.getAttribute("data-anchor"),
                        f = Oi(t, Ze) + 1,
                        v = Ti(li, t)[0],
                        g = {
                           activeSection: d,
                           sectionIndex: f - 1,
                           anchorLink: u,
                           element: t,
                           leavingSection: p,
                           direction: h,
                        };
                     v && ((c = v.getAttribute("data-anchor")), (a = Oi(v))),
                        b &&
                           (Xi(t, Ue),
                           Yi(qi(t), Ue),
                           Ui(m.onLeave) && It("onLeave", g),
                           Ui(m.afterLoad) && It("afterLoad", g),
                           Vt(d),
                           Nt(t),
                           Ft(t),
                           fe(u, f - 1),
                           m.anchors.length && (S = u),
                           be(a, c, u, f)),
                        clearTimeout($),
                        ($ = setTimeout(function () {
                           R = !1;
                        }, 100));
                  }
                  m.fitToSection &&
                     (clearTimeout(P),
                     (P = setTimeout(function () {
                        m.fitToSection && Ti(Ge)[0].offsetHeight <= w && Ct();
                     }, m.fitToSectionDelay)));
               }
            }
            function Ct() {
               b && ((T = !0), Yt(Ti(Ge)[0]), (T = !1));
            }
            function $t(t) {
               if (v.m[t]) {
                  var e = "down" === t ? at : lt;
                  if (m.scrollOverflow) {
                     var i = m.scrollOverflowHandler.scrollable(Ti(Ge)[0]),
                        o = "down" === t ? "bottom" : "top";
                     if (null != i) {
                        if (!m.scrollOverflowHandler.isScrolled(o, i))
                           return !0;
                        e();
                     } else e();
                  } else e();
               }
            }
            function Pt(t) {
               m.autoScrolling && Lt(t) && v.m.up && Fi(t);
            }
            function At(t) {
               var e = Bi(t.target, Ze) || Ti(Ge)[0];
               if (Lt(t)) {
                  m.autoScrolling && Fi(t);
                  var i = Ce(t);
                  (U = i.y),
                     (V = i.x),
                     Ti(ci, e).length && Math.abs(F - V) > Math.abs(q - U)
                        ? !a &&
                          Math.abs(F - V) > (Ei() / 100) * m.touchSensitivity &&
                          (V < F ? v.m.right && pt(e) : v.m.left && ht(e))
                        : m.autoScrolling &&
                          b &&
                          Math.abs(q - U) >
                             (_e.innerHeight / 100) * m.touchSensitivity &&
                          (U < q ? $t("down") : q < U && $t("up"));
               }
            }
            function Lt(t) {
               return void 0 === t.pointerType || "mouse" != t.pointerType;
            }
            function Ht(t) {
               if ((m.fitToSection && (Y = !1), Lt(t))) {
                  var e = Ce(t);
                  (q = e.y), (F = e.x);
               }
            }
            function Ot(t, e) {
               for (
                  var i = 0, o = t.slice(Math.max(t.length - e, 1)), s = 0;
                  s < o.length;
                  s++
               )
                  i += o[s];
               return Math.ceil(i / e);
            }
            function Mt(t) {
               var e = new Date().getTime(),
                  i = ki(Ti(".fp-completely")[0], ii);
               if (!v.m.down && !v.m.up) return Fi(t), !1;
               if (m.autoScrolling && !c && !i) {
                  var o =
                        (t = t || _e.event).wheelDelta ||
                        -t.deltaY ||
                        -t.detail,
                     s = Math.max(-1, Math.min(1, o)),
                     n = void 0 !== t.wheelDeltaX || void 0 !== t.deltaX,
                     r =
                        Math.abs(t.wheelDeltaX) < Math.abs(t.wheelDelta) ||
                        Math.abs(t.deltaX) < Math.abs(t.deltaY) ||
                        !n;
                  149 < f.length && f.shift(),
                     f.push(Math.abs(o)),
                     m.scrollBar && Fi(t);
                  var l = e - K;
                  if (((K = e), 200 < l && (f = []), b)) {
                     var a = Ot(f, 10);
                     Ot(f, 70) <= a && r && $t(s < 0 ? "down" : "up");
                  }
                  return !1;
               }
               m.fitToSection && (Y = !1);
            }
            function zt(t, e) {
               var i = null == e ? Ti(Ge)[0] : e,
                  o = Ti(ci, i)[0];
               if (!(null == o || a || Ti(ri, o).length < 2)) {
                  var s = Ti(li, o)[0],
                     n = null;
                  if (null == (n = "left" === t ? $i(s, ri) : Pi(s, ri))) {
                     if (!m.loopHorizontal) return;
                     var r = qi(s);
                     n = "left" === t ? r[r.length - 1] : r[0];
                  }
                  (a = !l.test.isTesting), le(o, n, t);
               }
            }
            function Xt() {
               for (var t = Ti(li), e = 0; e < t.length; e++)
                  $e(t[e], "internal");
            }
            function Yt(t, e, i) {
               if (null != t) {
                  var o,
                     s,
                     n = {
                        element: t,
                        callback: e,
                        isMovementUp: i,
                        dtop: (function (t) {
                           var e = t.offsetHeight,
                              i = t.offsetTop,
                              o = i,
                              s = Q < i,
                              n = o - w + e,
                              r = m.bigSectionsDestination;
                           return (
                              w < e
                                 ? ((s || r) && "bottom" !== r) || (o = n)
                                 : (s || (T && null == Li(t))) && (o = n),
                              (Q = o)
                           );
                        })(t),
                        yMovement: ve(t),
                        anchorLink: t.getAttribute("data-anchor"),
                        sectionIndex: Oi(t, Ze),
                        activeSlide: Ti(li, t)[0],
                        activeSection: Ti(Ge)[0],
                        leavingSection: Oi(Ti(Ge), Ze) + 1,
                        localIsResizing: T,
                     };
                  if (
                     !(
                        (n.activeSection == t && !T) ||
                        (m.scrollBar && Ni() === n.dtop && !ki(t, ei))
                     )
                  ) {
                     if (
                        (null != n.activeSlide &&
                           ((o = n.activeSlide.getAttribute("data-anchor")),
                           (s = Oi(n.activeSlide))),
                        !n.localIsResizing)
                     ) {
                        var r = n.yMovement;
                        if (
                           (void 0 !== i && (r = i ? "up" : "down"),
                           (n.direction = r),
                           Ui(m.onLeave) && !1 === It("onLeave", n))
                        )
                           return;
                     }
                     m.autoScrolling &&
                        m.continuousVertical &&
                        void 0 !== n.isMovementUp &&
                        ((!n.isMovementUp && "up" == n.yMovement) ||
                           (n.isMovementUp && "down" == n.yMovement)) &&
                        (n = (function (t) {
                           t.isMovementUp
                              ? Ri(Ti(Ge)[0], Ji(t.activeSection, Ze))
                              : ji(
                                   Ti(Ge)[0],
                                   to(t.activeSection, Ze).reverse()
                                );
                           return (
                              Pe(Ti(Ge)[0].offsetTop),
                              Xt(),
                              (t.wrapAroundElements = t.activeSection),
                              (t.dtop = t.element.offsetTop),
                              (t.yMovement = ve(t.element)),
                              t
                           );
                        })(n)),
                        n.localIsResizing || Vt(n.activeSection),
                        m.scrollOverflow &&
                           m.scrollOverflowHandler.beforeLeave(),
                        Xi(t, Ue),
                        Yi(qi(t), Ue),
                        Nt(t),
                        m.scrollOverflow && m.scrollOverflowHandler.onLeave(),
                        (b = l.test.isTesting),
                        be(s, o, n.anchorLink, n.sectionIndex),
                        (function (t) {
                           var e = m.scrollingSpeed < 700,
                              i = e ? 700 : m.scrollingSpeed;
                           if (m.css3 && m.autoScrolling && !m.scrollBar) {
                              ye(
                                 "translate3d(0px, -" +
                                    Math.round(t.dtop) +
                                    "px, 0px)",
                                 !0
                              ),
                                 m.scrollingSpeed
                                    ? (clearTimeout(E),
                                      (E = setTimeout(function () {
                                         Bt(t), (b = !e);
                                      }, m.scrollingSpeed)))
                                    : Bt(t);
                           } else {
                              var o = Wt(t.dtop);
                              (l.test.top = -t.dtop + "px"),
                                 Me(
                                    o.element,
                                    o.options,
                                    m.scrollingSpeed,
                                    function () {
                                       m.scrollBar
                                          ? setTimeout(function () {
                                               Bt(t);
                                            }, 30)
                                          : (Bt(t), (b = !e));
                                    }
                                 );
                           }
                           e &&
                              (clearTimeout(_),
                              (_ = setTimeout(function () {
                                 b = !0;
                              }, i)));
                        })(n),
                        (S = n.anchorLink),
                        fe(n.anchorLink, n.sectionIndex);
                  }
               }
            }
            function It(t, e) {
               var i = (function (t, e) {
                  var i;
                  i = m.v2compatible
                     ? {
                          afterRender: function () {
                             return [h];
                          },
                          onLeave: function () {
                             return [
                                e.activeSection,
                                e.leavingSection,
                                e.sectionIndex + 1,
                                e.direction,
                             ];
                          },
                          afterLoad: function () {
                             return [
                                e.element,
                                e.anchorLink,
                                e.sectionIndex + 1,
                             ];
                          },
                          afterSlideLoad: function () {
                             return [
                                e.destiny,
                                e.anchorLink,
                                e.sectionIndex + 1,
                                e.slideAnchor,
                                e.slideIndex,
                             ];
                          },
                          onSlideLeave: function () {
                             return [
                                e.prevSlide,
                                e.anchorLink,
                                e.sectionIndex + 1,
                                e.prevSlideIndex,
                                e.direction,
                                e.slideIndex,
                             ];
                          },
                       }
                     : {
                          afterRender: function () {
                             return {
                                section: _t(Ti(Ge)[0]),
                                slide: Dt(Ti(li, Ti(Ge)[0])[0]),
                             };
                          },
                          onLeave: function () {
                             return {
                                origin: _t(e.activeSection),
                                destination: _t(e.element),
                                direction: e.direction,
                             };
                          },
                          afterLoad: function () {
                             return i.onLeave();
                          },
                          afterSlideLoad: function () {
                             return {
                                section: _t(e.section),
                                origin: Dt(e.prevSlide),
                                destination: Dt(e.destiny),
                                direction: e.direction,
                             };
                          },
                          onSlideLeave: function () {
                             return i.afterSlideLoad();
                          },
                       };
                  return i[t]();
               })(t, e);
               if (m.v2compatible) {
                  if (!1 === m[t].apply(i[0], i.slice(1))) return !1;
               } else if (
                  (Vi(h, t, i),
                  !1 ===
                     m[t].apply(
                        i[Object.keys(i)[0]],
                        (function (e) {
                           return Object.keys(e).map(function (t) {
                              return e[t];
                           });
                        })(i)
                     ))
               )
                  return !1;
               return !0;
            }
            function _t(t) {
               return t ? new Ye(t) : null;
            }
            function Dt(t) {
               return t ? new Ie(t) : null;
            }
            function Wt(t) {
               var e = {};
               return (
                  m.autoScrolling && !m.scrollBar
                     ? ((e.options = -t), (e.element = Ti(Be)[0]))
                     : ((e.options = t), (e.element = _e)),
                  e
               );
            }
            function Bt(t) {
               !(function (t) {
                  null != t.wrapAroundElements &&
                     (t.isMovementUp
                        ? Ri(Ti(Ze)[0], t.wrapAroundElements)
                        : ji(Ti(Ze)[Ti(Ze).length - 1], t.wrapAroundElements),
                     Pe(Ti(Ge)[0].offsetTop),
                     Xt());
               })(t),
                  Ui(m.afterLoad) && !t.localIsResizing && It("afterLoad", t),
                  m.scrollOverflow && m.scrollOverflowHandler.afterLoad(),
                  t.localIsResizing || Ft(t.element),
                  Xi(t.element, Ke),
                  Yi(qi(t.element), Ke),
                  Rt(),
                  (b = !0),
                  Ui(t.callback) && t.callback();
            }
            function jt(t, e) {
               t.setAttribute(e, t.getAttribute("data-" + e)),
                  t.removeAttribute("data-" + e);
            }
            function Rt() {
               var t =
                  Ti(".fp-auto-height")[0] ||
                  (ft() && Ti(".fp-auto-height-responsive")[0]);
               m.lazyLoading &&
                  t &&
                  Ti(Ze + ":not(" + Ve + ")").forEach(function (t) {
                     !(function (t) {
                        var e = t.getBoundingClientRect(),
                           i = e.top,
                           o = e.bottom;
                        return (i + 2 < w && 0 < i) || (2 < o && o < w);
                     })(t) || Nt(t);
                  });
            }
            function Nt(o) {
               m.lazyLoading &&
                  Ti(
                     "img[data-src], img[data-srcset], source[data-src], source[data-srcset], video[data-src], audio[data-src], iframe[data-src]",
                     Kt(o)
                  ).forEach(function (i) {
                     if (
                        (["src", "srcset"].forEach(function (t) {
                           var e = i.getAttribute("data-" + t);
                           null != e &&
                              e &&
                              (jt(i, t),
                              i.addEventListener("load", function () {
                                 qt(o);
                              }));
                        }),
                        Ki(i, "source"))
                     ) {
                        var t = Bi(i, "video, audio");
                        t &&
                           (t.load(),
                           (t.onloadeddata = function () {
                              qt(o);
                           }));
                     }
                  });
            }
            function qt(t) {
               m.scrollOverflow &&
                  (clearTimeout(I),
                  (I = setTimeout(function () {
                     ki(y, je) || g.createScrollBar(t);
                  }, 200)));
            }
            function Ft(t) {
               var e = Kt(t);
               Ti("video, audio", e).forEach(function (t) {
                  t.hasAttribute("data-autoplay") &&
                     "function" == typeof t.play &&
                     t.play();
               }),
                  Ti('iframe[src*="youtube.com/embed/"]', e).forEach(function (
                     t
                  ) {
                     t.hasAttribute("data-autoplay") && Ut(t),
                        (t.onload = function () {
                           t.hasAttribute("data-autoplay") && Ut(t);
                        });
                  });
            }
            function Ut(t) {
               t.contentWindow.postMessage(
                  '{"event":"command","func":"playVideo","args":""}',
                  "*"
               );
            }
            function Vt(t) {
               var e = Kt(t);
               Ti("video, audio", e).forEach(function (t) {
                  t.hasAttribute("data-keepplaying") ||
                     "function" != typeof t.pause ||
                     t.pause();
               }),
                  Ti('iframe[src*="youtube.com/embed/"]', e).forEach(function (
                     t
                  ) {
                     /youtube\.com\/embed\//.test(t.getAttribute("src")) &&
                        !t.hasAttribute("data-keepplaying") &&
                        t.contentWindow.postMessage(
                           '{"event":"command","func":"pauseVideo","args":""}',
                           "*"
                        );
                  });
            }
            function Kt(t) {
               var e = Ti(li, t);
               return e.length && (t = e[0]), t;
            }
            function Qt() {
               var t = Gt(),
                  e = t.section,
                  i = t.slide;
               e && (m.animateAnchor ? we(e, i) : ct(e, i));
            }
            function Zt() {
               if (!R && !m.lockAnchors) {
                  var t = Gt(),
                     e = t.section,
                     i = t.slide,
                     o = void 0 === S,
                     s = void 0 === S && void 0 === i && !a;
                  e &&
                     e.length &&
                     ((e && e !== S && !o) || s || (!a && n != i)) &&
                     we(e, i);
               }
            }
            function Gt() {
               var t,
                  e,
                  i = _e.location.hash;
               if (i.length) {
                  var o = i.replace("#", "").split("/"),
                     s = -1 < i.indexOf("#/");
                  t = s ? "/" + o[1] : decodeURIComponent(o[0]);
                  var n = s ? o[2] : o[1];
                  n && n.length && (e = decodeURIComponent(n));
               }
               return { section: t, slide: e };
            }
            function Jt(t) {
               clearTimeout(A);
               var e = De.activeElement,
                  i = t.keyCode;
               if (9 === i)
                  !(function (t) {
                     var e = t.shiftKey,
                        i = De.activeElement,
                        o = oe(Kt(Ti(Ge)[0]));
                     function s(t) {
                        return Fi(t), o[0] ? o[0].focus() : null;
                     }
                     if (
                        (function (t) {
                           var e = oe(De),
                              i = e.indexOf(De.activeElement),
                              o = t.shiftKey ? i - 1 : i + 1,
                              s = e[o],
                              n = Dt(Bi(s, ri)),
                              r = _t(Bi(s, Ze));
                           return !n && !r;
                        })(t)
                     )
                        return;
                     i
                        ? null == Bi(i, Ge + "," + Ge + " " + li) && (i = s(t))
                        : s(t);
                     ((!e && i == o[o.length - 1]) || (e && i == o[0])) &&
                        Fi(t);
                  })(t);
               else if (
                  !Ki(e, "textarea") &&
                  !Ki(e, "input") &&
                  !Ki(e, "select") &&
                  "true" !== e.getAttribute("contentEditable") &&
                  "" !== e.getAttribute("contentEditable") &&
                  m.keyboardScrolling &&
                  m.autoScrolling
               ) {
                  -1 < [40, 38, 32, 33, 34].indexOf(i) && Fi(t),
                     (c = t.ctrlKey),
                     (A = setTimeout(function () {
                        !(function (t) {
                           var e = t.shiftKey,
                              i = De.activeElement,
                              o = Ki(i, "video") || Ki(i, "audio");
                           if (!b && [37, 39].indexOf(t.keyCode) < 0) return;
                           switch (t.keyCode) {
                              case 38:
                              case 33:
                                 v.k.up && lt();
                                 break;
                              case 32:
                                 if (e && v.k.up && !o) {
                                    lt();
                                    break;
                                 }
                              case 40:
                              case 34:
                                 v.k.down && ((32 === t.keyCode && o) || at());
                                 break;
                              case 36:
                                 v.k.up && dt(1);
                                 break;
                              case 35:
                                 v.k.down && dt(Ti(Ze).length);
                                 break;
                              case 37:
                                 v.k.left && ht();
                                 break;
                              case 39:
                                 v.k.right && pt();
                                 break;
                              default:
                           }
                        })(t);
                     }, 150));
               }
            }
            function te(t) {
               e && (c = t.ctrlKey);
            }
            function ee(t) {
               2 == t.which &&
                  ((Z = t.pageY), h.addEventListener("mousemove", re));
            }
            function ie(t) {
               2 == t.which && h.removeEventListener("mousemove", re);
            }
            function oe(t) {
               return [].slice.call(Ti(M, t)).filter(function (t) {
                  return (
                     "-1" !== t.getAttribute("tabindex") &&
                     null !== t.offsetParent
                  );
               });
            }
            function se() {
               e = !0;
            }
            function ne() {
               c = e = !1;
            }
            function re(t) {
               m.autoScrolling &&
                  (b &&
                     (t.pageY < Z && v.m.up
                        ? lt()
                        : t.pageY > Z && v.m.down && at()),
                  (Z = t.pageY));
            }
            function le(t, e, i) {
               var o = Bi(t, Ze),
                  s = {
                     slides: t,
                     destiny: e,
                     direction: i,
                     destinyPos: { left: e.offsetLeft },
                     slideIndex: Oi(e),
                     section: o,
                     sectionIndex: Oi(o, Ze),
                     anchorLink: o.getAttribute("data-anchor"),
                     slidesNav: Ti(fi, o)[0],
                     slideAnchor: xe(e),
                     prevSlide: Ti(li, o)[0],
                     prevSlideIndex: Oi(Ti(li, o)[0]),
                     localIsResizing: T,
                  };
               (s.xMovement = (function (t, e) {
                  if (t == e) return "none";
                  if (e < t) return "left";
                  return "right";
               })(s.prevSlideIndex, s.slideIndex)),
                  (s.direction = s.direction ? s.direction : s.xMovement),
                  s.localIsResizing || (b = !1),
                  m.onSlideLeave &&
                  !s.localIsResizing &&
                  "none" !== s.xMovement &&
                  Ui(m.onSlideLeave) &&
                  !1 === It("onSlideLeave", s)
                     ? (a = !1)
                     : (Xi(e, Ue),
                       Yi(qi(e), Ue),
                       s.localIsResizing || (Vt(s.prevSlide), Nt(e)),
                       !m.loopHorizontal &&
                          m.controlArrows &&
                          (Qi(Ti(yi, o), 0 !== s.slideIndex),
                          Qi(Ti(Si, o), null != Li(e))),
                       ki(o, Ue) &&
                          !s.localIsResizing &&
                          be(
                             s.slideIndex,
                             s.slideAnchor,
                             s.anchorLink,
                             s.sectionIndex
                          ),
                       (function (t, e, i) {
                          var o = e.destinyPos;
                          if (m.css3) {
                             var s =
                                "translate3d(-" +
                                Math.round(o.left) +
                                "px, 0px, 0px)";
                             (l.test.translate3dH[e.sectionIndex] = s),
                                Ci(he(Ti(pi, t)), Ae(s)),
                                (C = setTimeout(function () {
                                   i && ae(e);
                                }, m.scrollingSpeed));
                          } else
                             (l.test.left[e.sectionIndex] = Math.round(o.left)),
                                Me(
                                   t,
                                   Math.round(o.left),
                                   m.scrollingSpeed,
                                   function () {
                                      i && ae(e);
                                   }
                                );
                       })(t, s, !0));
            }
            function ae(t) {
               !(function (t, e) {
                  m.slidesNavigation &&
                     null != t &&
                     (Yi(Ti(Ve, t), Ue), Xi(Ti("a", Ti("li", t)[e]), Ue));
               })(t.slidesNav, t.slideIndex),
                  t.localIsResizing ||
                     (Ui(m.afterSlideLoad) && It("afterSlideLoad", t),
                     (b = !0),
                     Ft(t.destiny)),
                  (a = !1);
            }
            function ce() {
               (T = !0),
                  clearTimeout(k),
                  (k = setTimeout(function () {
                     for (var t = 0; t < 4; t++) x = setTimeout(de, 200 * t);
                  }, 200));
            }
            function de() {
               if ((pe(), d)) {
                  var t = De.activeElement;
                  if (
                     !Ki(t, "textarea") &&
                     !Ki(t, "input") &&
                     !Ki(t, "select")
                  ) {
                     var e = xi();
                     Math.abs(e - G) > (20 * Math.max(G, e)) / 100 &&
                        (ut(!0), (G = e));
                  }
               } else St();
            }
            function pe() {
               var t = m.responsive || m.responsiveWidth,
                  e = m.responsiveHeight,
                  i = t && _e.innerWidth < t,
                  o = e && _e.innerHeight < e;
               t && e ? vt(i || o) : t ? vt(i) : e && vt(o);
            }
            function he(t) {
               var e = "all " + m.scrollingSpeed + "ms " + m.easingcss3;
               return (
                  Yi(t, Re), Ci(t, { "-webkit-transition": e, transition: e })
               );
            }
            function ue(t) {
               return Xi(t, Re);
            }
            function fe(t, e) {
               !(function (e) {
                  Ti(m.menu).forEach(function (t) {
                     m.menu &&
                        null != t &&
                        (Yi(Ti(Ve, t), Ue),
                        Xi(Ti('[data-menuanchor="' + e + '"]', t), Ue));
                  });
               })(t),
                  (function (t, e) {
                     m.navigation &&
                        null != Ti(oi)[0] &&
                        (Yi(Ti(Ve, Ti(oi)[0]), Ue),
                        Xi(
                           t
                              ? Ti('a[href="#' + t + '"]', Ti(oi)[0])
                              : Ti("a", Ti("li", Ti(oi)[0])[e]),
                           Ue
                        ));
                  })(t, e);
            }
            function ve(t) {
               var e = Oi(Ti(Ge)[0], Ze),
                  i = Oi(t, Ze);
               return e == i ? "none" : i < e ? "up" : "down";
            }
            function ge(t) {
               if (!ki(t, hi)) {
                  var e = De.createElement("div");
                  (e.className = Je),
                     (e.style.height = me(t) + "px"),
                     Xi(t, hi),
                     Di(t, e);
               }
            }
            function me(t) {
               var e = w;
               if (m.paddingTop || m.paddingBottom) {
                  var i = t;
                  ki(i, Qe) || (i = Bi(t, Ze));
                  var o =
                     parseInt(getComputedStyle(i)["padding-top"]) +
                     parseInt(getComputedStyle(i)["padding-bottom"]);
                  e = w - o;
               }
               return e;
            }
            function ye(t, e) {
               e ? he(h) : ue(h),
                  Ci(h, Ae(t)),
                  (l.test.translate3d = t),
                  setTimeout(function () {
                     Yi(h, Re);
                  }, 10);
            }
            function Se(t) {
               var e = Ti(Ze + '[data-anchor="' + t + '"]', h)[0];
               if (!e) {
                  var i = void 0 !== t ? t - 1 : 0;
                  e = Ti(Ze)[i];
               }
               return e;
            }
            function we(t, e) {
               var i = Se(t);
               if (null != i) {
                  var o = (function (t, e) {
                     var i = Ti(ri + '[data-anchor="' + t + '"]', e)[0];
                     return (
                        null == i &&
                           ((t = void 0 !== t ? t : 0), (i = Ti(ri, e)[t])),
                        i
                     );
                  })(e, i);
                  xe(i) === S || ki(i, Ue)
                     ? Te(o)
                     : Yt(i, function () {
                          Te(o);
                       });
               }
            }
            function Te(t) {
               null != t && le(Bi(t, ci), t);
            }
            function be(t, e, i) {
               var o = "";
               m.anchors.length &&
                  !m.lockAnchors &&
                  (t
                     ? (null != i && (o = i),
                       null == e && (e = t),
                       ke(o + "/" + (n = e)))
                     : (null != t && (n = e), ke(i))),
                  Ee();
            }
            function ke(t) {
               if (m.recordHistory) location.hash = t;
               else if (d || p)
                  _e.history.replaceState(void 0, void 0, "#" + t);
               else {
                  var e = _e.location.href.split("#")[0];
                  _e.location.replace(e + "#" + t);
               }
            }
            function xe(t) {
               if (!t) return null;
               var e = t.getAttribute("data-anchor"),
                  i = Oi(t);
               return null == e && (e = i), e;
            }
            function Ee() {
               var t = Ti(Ge)[0],
                  e = Ti(li, t)[0],
                  i = xe(t),
                  o = xe(e),
                  s = String(i);
               e && (s = s + "-" + o),
                  (s = s.replace("/", "-").replace("#", ""));
               var n = new RegExp("\\b\\s?" + Fe + "-[^\\s]+\\b", "g");
               (y.className = y.className.replace(n, "")), Xi(y, Fe + "-" + s);
            }
            function Ce(t) {
               var e = [];
               return (
                  (e.y =
                     void 0 !== t.pageY && (t.pageY || t.pageX)
                        ? t.pageY
                        : t.touches[0].pageY),
                  (e.x =
                     void 0 !== t.pageX && (t.pageY || t.pageX)
                        ? t.pageX
                        : t.touches[0].pageX),
                  p &&
                     Lt(t) &&
                     m.scrollBar &&
                     void 0 !== t.touches &&
                     ((e.y = t.touches[0].pageY), (e.x = t.touches[0].pageX)),
                  e
               );
            }
            function $e(t, e) {
               et(0, "internal"),
                  void 0 !== e && (T = !0),
                  le(Bi(t, ci), t),
                  void 0 !== e && (T = !1),
                  et(D.scrollingSpeed, "internal");
            }
            function Pe(t) {
               var e = Math.round(t);
               if (m.css3 && m.autoScrolling && !m.scrollBar)
                  ye("translate3d(0px, -" + e + "px, 0px)", !1);
               else if (m.autoScrolling && !m.scrollBar)
                  Ci(h, { top: -e + "px" }), (l.test.top = -e + "px");
               else {
                  var i = Wt(e);
                  ze(i.element, i.options);
               }
            }
            function Ae(t) {
               return {
                  "-webkit-transform": t,
                  "-moz-transform": t,
                  "-ms-transform": t,
                  transform: t,
               };
            }
            function Le(e, t, i) {
               "all" !== t
                  ? (v[i][t] = e)
                  : Object.keys(v[i]).forEach(function (t) {
                       v[i][t] = e;
                    });
            }
            function He(t, e, i) {
               (m[t] = e), "internal" !== i && (D[t] = e);
            }
            function Oe() {
               var t = m.licenseKey,
                  e = "font-size: 15px;background:yellow;";
               i
                  ? t &&
                    t.length < 20 &&
                    (console.warn(
                       "%c This website was made using fullPage.js slider. More info on the following website:",
                       e
                    ),
                    console.warn("%c https://alvarotrigo.com/fullPage/", e))
                  : (wi(
                       "error",
                       "Fullpage.js version 3 has changed its license to GPLv3 and it requires a `licenseKey` option. Read about it here:"
                    ),
                    wi(
                       "error",
                       "https://github.com/alvarotrigo/fullPage.js#options."
                    )),
                  ki(r, qe)
                     ? wi(
                          "error",
                          "Fullpage.js can only be initialized once and you are doing it multiple times!"
                       )
                     : (m.continuousVertical &&
                          (m.loopTop || m.loopBottom) &&
                          ((m.continuousVertical = !1),
                          wi(
                             "warn",
                             "Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled"
                          )),
                       !m.scrollOverflow ||
                          (!m.scrollBar && m.autoScrolling) ||
                          wi(
                             "warn",
                             "Options scrollBar:true and autoScrolling:false are mutually exclusive with scrollOverflow:true. Sections with scrollOverflow might not work well in Firefox"
                          ),
                       !m.continuousVertical ||
                          (!m.scrollBar && m.autoScrolling) ||
                          ((m.continuousVertical = !1),
                          wi(
                             "warn",
                             "Scroll bars (`scrollBar:true` or `autoScrolling:false`) are mutually exclusive with `continuousVertical`; `continuousVertical` disabled"
                          )),
                       m.scrollOverflow &&
                          null == m.scrollOverflowHandler &&
                          ((m.scrollOverflow = !1),
                          wi(
                             "error",
                             "The option `scrollOverflow:true` requires the file `scrolloverflow.min.js`. Please include it before fullPage.js."
                          )),
                       j.forEach(function (t) {
                          m[t] &&
                             wi(
                                "warn",
                                "fullpage.js extensions require fullpage.extensions.min.js file instead of the usual fullpage.js. Requested: " +
                                   t
                             );
                       }),
                       m.anchors.forEach(function (e) {
                          var t = [].slice
                                .call(Ti("[name]"))
                                .filter(function (t) {
                                   return (
                                      t.getAttribute("name") &&
                                      t.getAttribute("name").toLowerCase() ==
                                         e.toLowerCase()
                                   );
                                }),
                             i = [].slice.call(Ti("[id]")).filter(function (t) {
                                return (
                                   t.getAttribute("id") &&
                                   t.getAttribute("id").toLowerCase() ==
                                      e.toLowerCase()
                                );
                             });
                          if (i.length || t.length) {
                             wi(
                                "error",
                                "data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE)."
                             );
                             var o = i.length ? "id" : "name";
                             (i.length || t.length) &&
                                wi(
                                   "error",
                                   '"' +
                                      e +
                                      '" is is being used by another element `' +
                                      o +
                                      "` property"
                                );
                          }
                       }));
            }
            function Me(e, i, o, s) {
               var n = (function (t) {
                     return t.self != _e && ki(t, ai)
                        ? t.scrollLeft
                        : !m.autoScrolling || m.scrollBar
                        ? Ni()
                        : t.offsetTop;
                  })(e),
                  r = i - n,
                  l = 0;
               Y = !0;
               var a = function () {
                  if (Y) {
                     var t = i;
                     (l += 20),
                        o && (t = _e.fp_easings[m.easing](l, n, r, o)),
                        ze(e, t),
                        l < o ? setTimeout(a, 20) : void 0 !== s && s();
                  } else l < o && s();
               };
               a();
            }
            function ze(t, e) {
               !m.autoScrolling || m.scrollBar || (t.self != _e && ki(t, ai))
                  ? t.self != _e && ki(t, ai)
                     ? (t.scrollLeft = e)
                     : t.scrollTo(0, e)
                  : (t.style.top = e + "px");
            }
            function Xe(t, e) {
               (this.anchor = t.getAttribute("data-anchor")),
                  (this.item = t),
                  (this.index = Oi(t, e)),
                  (this.isLast =
                     this.index ===
                     t.parentElement.querySelectorAll(e).length - 1),
                  (this.isFirst = !this.index);
            }
            function Ye(t) {
               Xe.call(this, t, Ze);
            }
            function Ie(t) {
               Xe.call(this, t, ri);
            }
            Oe();
         }
      );
   }),
   window.jQuery &&
      window.fullpage &&
      (function (e, i) {
         "use strict";
         e && i
            ? (e.fn.fullpage = function (t) {
                 t = e.extend({}, t, { $: e });
                 new i(this[0], t);
              })
            : window.fp_utils.showError(
                 "error",
                 "jQuery is required to use the jQuery fullpage adapter!"
              );
      })(window.jQuery, window.fullpage),
   (function (r, n, p) {
      var f =
            r.requestAnimationFrame ||
            r.webkitRequestAnimationFrame ||
            r.mozRequestAnimationFrame ||
            r.oRequestAnimationFrame ||
            r.msRequestAnimationFrame ||
            function (t) {
               r.setTimeout(t, 1e3 / 60);
            },
         v = (function () {
            var o = {},
               s = n.createElement("div").style,
               e = (function () {
                  for (
                     var t = ["t", "webkitT", "MozT", "msT", "OT"],
                        e = 0,
                        i = t.length;
                     e < i;
                     e++
                  )
                     if (t[e] + "ransform" in s)
                        return t[e].substr(0, t[e].length - 1);
                  return !1;
               })();
            function t(t) {
               return (
                  !1 !== e &&
                  ("" === e ? t : e + t.charAt(0).toUpperCase() + t.substr(1))
               );
            }
            (o.getTime =
               Date.now ||
               function () {
                  return new Date().getTime();
               }),
               (o.extend = function (t, e) {
                  for (var i in e) t[i] = e[i];
               }),
               (o.addEvent = function (t, e, i, o) {
                  t.addEventListener(e, i, !!o);
               }),
               (o.removeEvent = function (t, e, i, o) {
                  t.removeEventListener(e, i, !!o);
               }),
               (o.prefixPointerEvent = function (t) {
                  return r.MSPointerEvent
                     ? "MSPointer" + t.charAt(7).toUpperCase() + t.substr(8)
                     : t;
               }),
               (o.momentum = function (t, e, i, o, s, n) {
                  var r,
                     l,
                     a = t - e,
                     c = p.abs(a) / i;
                  return (
                     (l = c / (n = void 0 === n ? 6e-4 : n)),
                     (r = t + ((c * c) / (2 * n)) * (a < 0 ? -1 : 1)) < o
                        ? ((r = s ? o - (s / 2.5) * (c / 8) : o),
                          (l = (a = p.abs(r - t)) / c))
                        : 0 < r &&
                          ((r = s ? (s / 2.5) * (c / 8) : 0),
                          (l = (a = p.abs(t) + r) / c)),
                     { destination: p.round(r), duration: l }
                  );
               });
            var i = t("transform");
            return (
               o.extend(o, {
                  hasTransform: !1 !== i,
                  hasPerspective: t("perspective") in s,
                  hasTouch: "ontouchstart" in r,
                  hasPointer: !(!r.PointerEvent && !r.MSPointerEvent),
                  hasTransition: t("transition") in s,
               }),
               (o.isBadAndroid = (function () {
                  var t = r.navigator.appVersion;
                  if (!/Android/.test(t) || /Chrome\/\d/.test(t)) return !1;
                  var e = t.match(/Safari\/(\d+.\d)/);
                  return (
                     !(e && "object" == typeof e && 2 <= e.length) ||
                     parseFloat(e[1]) < 535.19
                  );
               })()),
               o.extend((o.style = {}), {
                  transform: i,
                  transitionTimingFunction: t("transitionTimingFunction"),
                  transitionDuration: t("transitionDuration"),
                  transitionDelay: t("transitionDelay"),
                  transformOrigin: t("transformOrigin"),
               }),
               (o.hasClass = function (t, e) {
                  return new RegExp("(^|\\s)" + e + "(\\s|$)").test(
                     t.className
                  );
               }),
               (o.addClass = function (t, e) {
                  if (!o.hasClass(t, e)) {
                     var i = t.className.split(" ");
                     i.push(e), (t.className = i.join(" "));
                  }
               }),
               (o.removeClass = function (t, e) {
                  if (o.hasClass(t, e)) {
                     var i = new RegExp("(^|\\s)" + e + "(\\s|$)", "g");
                     t.className = t.className.replace(i, " ");
                  }
               }),
               (o.offset = function (t) {
                  for (
                     var e = -t.offsetLeft, i = -t.offsetTop;
                     (t = t.offsetParent);

                  )
                     (e -= t.offsetLeft), (i -= t.offsetTop);
                  return { left: e, top: i };
               }),
               (o.preventDefaultException = function (t, e) {
                  for (var i in e) if (e[i].test(t[i])) return !0;
                  return !1;
               }),
               o.extend((o.eventType = {}), {
                  touchstart: 1,
                  touchmove: 1,
                  touchend: 1,
                  mousedown: 2,
                  mousemove: 2,
                  mouseup: 2,
                  pointerdown: 3,
                  pointermove: 3,
                  pointerup: 3,
                  MSPointerDown: 3,
                  MSPointerMove: 3,
                  MSPointerUp: 3,
               }),
               o.extend((o.ease = {}), {
                  quadratic: {
                     style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                     fn: function (t) {
                        return t * (2 - t);
                     },
                  },
                  circular: {
                     style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
                     fn: function (t) {
                        return p.sqrt(1 - --t * t);
                     },
                  },
                  back: {
                     style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                     fn: function (t) {
                        return (t -= 1) * t * (5 * t + 4) + 1;
                     },
                  },
                  bounce: {
                     style: "",
                     fn: function (t) {
                        return (t /= 1) < 1 / 2.75
                           ? 7.5625 * t * t
                           : t < 2 / 2.75
                           ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
                           : t < 2.5 / 2.75
                           ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
                           : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
                     },
                  },
                  elastic: {
                     style: "",
                     fn: function (t) {
                        return 0 === t
                           ? 0
                           : 1 == t
                           ? 1
                           : 0.4 *
                                p.pow(2, -10 * t) *
                                p.sin(((t - 0.055) * (2 * p.PI)) / 0.22) +
                             1;
                     },
                  },
               }),
               (o.tap = function (t, e) {
                  var i = n.createEvent("Event");
                  i.initEvent(e, !0, !0),
                     (i.pageX = t.pageX),
                     (i.pageY = t.pageY),
                     t.target.dispatchEvent(i);
               }),
               (o.click = function (t) {
                  var e,
                     i = t.target;
                  /(SELECT|INPUT|TEXTAREA)/i.test(i.tagName) ||
                     ((e = n.createEvent(
                        r.MouseEvent ? "MouseEvents" : "Event"
                     )).initEvent("click", !0, !0),
                     (e.view = t.view || r),
                     (e.detail = 1),
                     (e.screenX = i.screenX || 0),
                     (e.screenY = i.screenY || 0),
                     (e.clientX = i.clientX || 0),
                     (e.clientY = i.clientY || 0),
                     (e.ctrlKey = !!t.ctrlKey),
                     (e.altKey = !!t.altKey),
                     (e.shiftKey = !!t.shiftKey),
                     (e.metaKey = !!t.metaKey),
                     (e.button = 0),
                     (e.relatedTarget = null),
                     (e._constructed = !0),
                     i.dispatchEvent(e));
               }),
               o
            );
         })();
      function t(t, e) {
         for (var i in ((this.wrapper =
            "string" == typeof t ? n.querySelector(t) : t),
         (this.scroller = this.wrapper.children[0]),
         (this.scrollerStyle = this.scroller.style),
         (this.options = {
            resizeScrollbars: !0,
            mouseWheelSpeed: 20,
            snapThreshold: 0.334,
            disablePointer: !v.hasPointer,
            disableTouch: v.hasPointer || !v.hasTouch,
            disableMouse: v.hasPointer || v.hasTouch,
            startX: 0,
            startY: 0,
            scrollY: !0,
            directionLockThreshold: 5,
            momentum: !0,
            bounce: !0,
            bounceTime: 600,
            bounceEasing: "",
            preventDefault: !0,
            preventDefaultException: {
               tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|LABEL)$/,
            },
            HWCompositing: !0,
            useTransition: !0,
            useTransform: !0,
            bindToWrapper: void 0 === r.onmousedown,
         }),
         e))
            this.options[i] = e[i];
         (this.translateZ =
            this.options.HWCompositing && v.hasPerspective
               ? " translateZ(0)"
               : ""),
            (this.options.useTransition =
               v.hasTransition && this.options.useTransition),
            (this.options.useTransform =
               v.hasTransform && this.options.useTransform),
            (this.options.eventPassthrough =
               !0 === this.options.eventPassthrough
                  ? "vertical"
                  : this.options.eventPassthrough),
            (this.options.preventDefault =
               !this.options.eventPassthrough && this.options.preventDefault),
            (this.options.scrollY =
               "vertical" != this.options.eventPassthrough &&
               this.options.scrollY),
            (this.options.scrollX =
               "horizontal" != this.options.eventPassthrough &&
               this.options.scrollX),
            (this.options.freeScroll =
               this.options.freeScroll && !this.options.eventPassthrough),
            (this.options.directionLockThreshold = this.options.eventPassthrough
               ? 0
               : this.options.directionLockThreshold),
            (this.options.bounceEasing =
               "string" == typeof this.options.bounceEasing
                  ? v.ease[this.options.bounceEasing] || v.ease.circular
                  : this.options.bounceEasing),
            (this.options.resizePolling =
               void 0 === this.options.resizePolling
                  ? 60
                  : this.options.resizePolling),
            !0 === this.options.tap && (this.options.tap = "tap"),
            this.options.useTransition ||
               this.options.useTransform ||
               /relative|absolute/i.test(this.scrollerStyle.position) ||
               (this.scrollerStyle.position = "relative"),
            "scale" == this.options.shrinkScrollbars &&
               (this.options.useTransition = !1),
            (this.options.invertWheelDirection = this.options
               .invertWheelDirection
               ? -1
               : 1),
            (this.x = 0),
            (this.y = 0),
            (this.directionX = 0),
            (this.directionY = 0),
            (this._events = {}),
            this._init(),
            this.refresh(),
            this.scrollTo(this.options.startX, this.options.startY),
            this.enable();
      }
      function l(t, e, i) {
         var o = n.createElement("div"),
            s = n.createElement("div");
         return (
            !0 === i &&
               ((o.style.cssText = "position:absolute;z-index:9999"),
               (s.style.cssText =
                  "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px")),
            (s.className = "iScrollIndicator"),
            "h" == t
               ? (!0 === i &&
                    ((o.style.cssText +=
                       ";height:7px;left:2px;right:2px;bottom:0"),
                    (s.style.height = "100%")),
                 (o.className = "iScrollHorizontalScrollbar"))
               : (!0 === i &&
                    ((o.style.cssText +=
                       ";width:7px;bottom:2px;top:2px;right:1px"),
                    (s.style.width = "100%")),
                 (o.className = "iScrollVerticalScrollbar")),
            (o.style.cssText += ";overflow:hidden"),
            e || (o.style.pointerEvents = "none"),
            o.appendChild(s),
            o
         );
      }
      function a(t, e) {
         for (var i in ((this.wrapper =
            "string" == typeof e.el ? n.querySelector(e.el) : e.el),
         (this.wrapperStyle = this.wrapper.style),
         (this.indicator = this.wrapper.children[0]),
         (this.indicatorStyle = this.indicator.style),
         (this.scroller = t),
         (this.options = {
            listenX: !0,
            listenY: !0,
            interactive: !1,
            resize: !0,
            defaultScrollbars: !1,
            shrink: !1,
            fade: !1,
            speedRatioX: 0,
            speedRatioY: 0,
         }),
         e))
            this.options[i] = e[i];
         if (
            ((this.sizeRatioX = 1),
            (this.sizeRatioY = 1),
            (this.maxPosX = 0),
            (this.maxPosY = 0),
            this.options.interactive &&
               (this.options.disableTouch ||
                  (v.addEvent(this.indicator, "touchstart", this),
                  v.addEvent(r, "touchend", this)),
               this.options.disablePointer ||
                  (v.addEvent(
                     this.indicator,
                     v.prefixPointerEvent("pointerdown"),
                     this
                  ),
                  v.addEvent(r, v.prefixPointerEvent("pointerup"), this)),
               this.options.disableMouse ||
                  (v.addEvent(this.indicator, "mousedown", this),
                  v.addEvent(r, "mouseup", this))),
            this.options.fade)
         ) {
            this.wrapperStyle[v.style.transform] = this.scroller.translateZ;
            var o = v.style.transitionDuration;
            if (!o) return;
            this.wrapperStyle[o] = v.isBadAndroid ? "0.0001ms" : "0ms";
            var s = this;
            v.isBadAndroid &&
               f(function () {
                  "0.0001ms" === s.wrapperStyle[o] &&
                     (s.wrapperStyle[o] = "0s");
               }),
               (this.wrapperStyle.opacity = "0");
         }
      }
      (t.prototype = {
         version: "5.2.0",
         _init: function () {
            this._initEvents(),
               (this.options.scrollbars || this.options.indicators) &&
                  this._initIndicators(),
               this.options.mouseWheel && this._initWheel(),
               this.options.snap && this._initSnap(),
               this.options.keyBindings && this._initKeys();
         },
         destroy: function () {
            this._initEvents(!0),
               clearTimeout(this.resizeTimeout),
               (this.resizeTimeout = null),
               this._execEvent("destroy");
         },
         _transitionEnd: function (t) {
            t.target == this.scroller &&
               this.isInTransition &&
               (this._transitionTime(),
               this.resetPosition(this.options.bounceTime) ||
                  ((this.isInTransition = !1), this._execEvent("scrollEnd")));
         },
         _start: function (t) {
            if (
               1 != v.eventType[t.type] &&
               0 !==
                  (t.which
                     ? t.button
                     : t.button < 2
                     ? 0
                     : 4 == t.button
                     ? 1
                     : 2)
            )
               return;
            if (
               this.enabled &&
               (!this.initiated || v.eventType[t.type] === this.initiated)
            ) {
               !this.options.preventDefault ||
                  v.isBadAndroid ||
                  v.preventDefaultException(
                     t.target,
                     this.options.preventDefaultException
                  ) ||
                  t.preventDefault();
               var e,
                  i = t.touches ? t.touches[0] : t;
               (this.initiated = v.eventType[t.type]),
                  (this.moved = !1),
                  (this.distX = 0),
                  (this.distY = 0),
                  (this.directionX = 0),
                  (this.directionY = 0),
                  (this.directionLocked = 0),
                  (this.startTime = v.getTime()),
                  this.options.useTransition && this.isInTransition
                     ? (this._transitionTime(),
                       (this.isInTransition = !1),
                       (e = this.getComputedPosition()),
                       this._translate(p.round(e.x), p.round(e.y)),
                       this._execEvent("scrollEnd"))
                     : !this.options.useTransition &&
                       this.isAnimating &&
                       ((this.isAnimating = !1), this._execEvent("scrollEnd")),
                  (this.startX = this.x),
                  (this.startY = this.y),
                  (this.absStartX = this.x),
                  (this.absStartY = this.y),
                  (this.pointX = i.pageX),
                  (this.pointY = i.pageY),
                  this._execEvent("beforeScrollStart");
            }
         },
         _move: function (t) {
            if (this.enabled && v.eventType[t.type] === this.initiated) {
               this.options.preventDefault && t.preventDefault();
               var e,
                  i,
                  o,
                  s,
                  n = t.touches ? t.touches[0] : t,
                  r = n.pageX - this.pointX,
                  l = n.pageY - this.pointY,
                  a = v.getTime();
               if (
                  ((this.pointX = n.pageX),
                  (this.pointY = n.pageY),
                  (this.distX += r),
                  (this.distY += l),
                  (o = p.abs(this.distX)),
                  (s = p.abs(this.distY)),
                  !(300 < a - this.endTime && o < 10 && s < 10))
               ) {
                  if (
                     (this.directionLocked ||
                        this.options.freeScroll ||
                        (o > s + this.options.directionLockThreshold
                           ? (this.directionLocked = "h")
                           : s >= o + this.options.directionLockThreshold
                           ? (this.directionLocked = "v")
                           : (this.directionLocked = "n")),
                     "h" == this.directionLocked)
                  ) {
                     if ("vertical" == this.options.eventPassthrough)
                        t.preventDefault();
                     else if ("horizontal" == this.options.eventPassthrough)
                        return void (this.initiated = !1);
                     l = 0;
                  } else if ("v" == this.directionLocked) {
                     if ("horizontal" == this.options.eventPassthrough)
                        t.preventDefault();
                     else if ("vertical" == this.options.eventPassthrough)
                        return void (this.initiated = !1);
                     r = 0;
                  }
                  (r = this.hasHorizontalScroll ? r : 0),
                     (l = this.hasVerticalScroll ? l : 0),
                     (e = this.x + r),
                     (i = this.y + l),
                     (0 < e || e < this.maxScrollX) &&
                        (e = this.options.bounce
                           ? this.x + r / 3
                           : 0 < e
                           ? 0
                           : this.maxScrollX),
                     (0 < i || i < this.maxScrollY) &&
                        (i = this.options.bounce
                           ? this.y + l / 3
                           : 0 < i
                           ? 0
                           : this.maxScrollY),
                     (this.directionX = 0 < r ? -1 : r < 0 ? 1 : 0),
                     (this.directionY = 0 < l ? -1 : l < 0 ? 1 : 0),
                     this.moved || this._execEvent("scrollStart"),
                     (this.moved = !0),
                     this._translate(e, i),
                     300 < a - this.startTime &&
                        ((this.startTime = a),
                        (this.startX = this.x),
                        (this.startY = this.y));
               }
            }
         },
         _end: function (t) {
            if (this.enabled && v.eventType[t.type] === this.initiated) {
               this.options.preventDefault &&
                  !v.preventDefaultException(
                     t.target,
                     this.options.preventDefaultException
                  ) &&
                  t.preventDefault();
               t.changedTouches && t.changedTouches[0];
               var e,
                  i,
                  o = v.getTime() - this.startTime,
                  s = p.round(this.x),
                  n = p.round(this.y),
                  r = p.abs(s - this.startX),
                  l = p.abs(n - this.startY),
                  a = 0,
                  c = "";
               if (
                  ((this.isInTransition = 0),
                  (this.initiated = 0),
                  (this.endTime = v.getTime()),
                  !this.resetPosition(this.options.bounceTime))
               ) {
                  if ((this.scrollTo(s, n), !this.moved))
                     return (
                        this.options.tap && v.tap(t, this.options.tap),
                        this.options.click && v.click(t),
                        void this._execEvent("scrollCancel")
                     );
                  if (this._events.flick && o < 200 && r < 100 && l < 100)
                     this._execEvent("flick");
                  else {
                     if (
                        (this.options.momentum &&
                           o < 300 &&
                           ((e = this.hasHorizontalScroll
                              ? v.momentum(
                                   this.x,
                                   this.startX,
                                   o,
                                   this.maxScrollX,
                                   this.options.bounce ? this.wrapperWidth : 0,
                                   this.options.deceleration
                                )
                              : { destination: s, duration: 0 }),
                           (i = this.hasVerticalScroll
                              ? v.momentum(
                                   this.y,
                                   this.startY,
                                   o,
                                   this.maxScrollY,
                                   this.options.bounce ? this.wrapperHeight : 0,
                                   this.options.deceleration
                                )
                              : { destination: n, duration: 0 }),
                           (s = e.destination),
                           (n = i.destination),
                           (a = p.max(e.duration, i.duration)),
                           (this.isInTransition = 1)),
                        this.options.snap)
                     ) {
                        var d = this._nearestSnap(s, n);
                        (this.currentPage = d),
                           (a =
                              this.options.snapSpeed ||
                              p.max(
                                 p.max(
                                    p.min(p.abs(s - d.x), 1e3),
                                    p.min(p.abs(n - d.y), 1e3)
                                 ),
                                 300
                              )),
                           (s = d.x),
                           (n = d.y),
                           (this.directionX = 0),
                           (this.directionY = 0),
                           (c = this.options.bounceEasing);
                     }
                     if (s != this.x || n != this.y)
                        return (
                           (0 < s ||
                              s < this.maxScrollX ||
                              0 < n ||
                              n < this.maxScrollY) &&
                              (c = v.ease.quadratic),
                           void this.scrollTo(s, n, a, c)
                        );
                     this._execEvent("scrollEnd");
                  }
               }
            }
         },
         _resize: function () {
            var t = this;
            clearTimeout(this.resizeTimeout),
               (this.resizeTimeout = setTimeout(function () {
                  t.refresh();
               }, this.options.resizePolling));
         },
         resetPosition: function (t) {
            var e = this.x,
               i = this.y;
            return (
               (t = t || 0),
               !this.hasHorizontalScroll || 0 < this.x
                  ? (e = 0)
                  : this.x < this.maxScrollX && (e = this.maxScrollX),
               !this.hasVerticalScroll || 0 < this.y
                  ? (i = 0)
                  : this.y < this.maxScrollY && (i = this.maxScrollY),
               (e != this.x || i != this.y) &&
                  (this.scrollTo(e, i, t, this.options.bounceEasing), !0)
            );
         },
         disable: function () {
            this.enabled = !1;
         },
         enable: function () {
            this.enabled = !0;
         },
         refresh: function () {
            this.wrapper.offsetHeight;
            (this.wrapperWidth = this.wrapper.clientWidth),
               (this.wrapperHeight = this.wrapper.clientHeight),
               (this.scrollerWidth = this.scroller.offsetWidth),
               (this.scrollerHeight = this.scroller.offsetHeight),
               (this.maxScrollX = this.wrapperWidth - this.scrollerWidth),
               (this.maxScrollY = this.wrapperHeight - this.scrollerHeight),
               (this.hasHorizontalScroll =
                  this.options.scrollX && this.maxScrollX < 0),
               (this.hasVerticalScroll =
                  this.options.scrollY && this.maxScrollY < 0),
               this.hasHorizontalScroll ||
                  ((this.maxScrollX = 0),
                  (this.scrollerWidth = this.wrapperWidth)),
               this.hasVerticalScroll ||
                  ((this.maxScrollY = 0),
                  (this.scrollerHeight = this.wrapperHeight)),
               (this.endTime = 0),
               (this.directionX = 0),
               (this.directionY = 0),
               (this.wrapperOffset = v.offset(this.wrapper)),
               this._execEvent("refresh"),
               this.resetPosition();
         },
         on: function (t, e) {
            this._events[t] || (this._events[t] = []), this._events[t].push(e);
         },
         off: function (t, e) {
            if (this._events[t]) {
               var i = this._events[t].indexOf(e);
               -1 < i && this._events[t].splice(i, 1);
            }
         },
         _execEvent: function (t) {
            if (this._events[t]) {
               var e = 0,
                  i = this._events[t].length;
               if (i)
                  for (; e < i; e++)
                     this._events[t][e].apply(
                        this,
                        [].slice.call(arguments, 1)
                     );
            }
         },
         scrollBy: function (t, e, i, o) {
            (t = this.x + t),
               (e = this.y + e),
               (i = i || 0),
               this.scrollTo(t, e, i, o);
         },
         scrollTo: function (t, e, i, o) {
            (o = o || v.ease.circular),
               (this.isInTransition = this.options.useTransition && 0 < i);
            var s = this.options.useTransition && o.style;
            !i || s
               ? (s &&
                    (this._transitionTimingFunction(o.style),
                    this._transitionTime(i)),
                 this._translate(t, e))
               : this._animate(t, e, i, o.fn);
         },
         scrollToElement: function (t, e, i, o, s) {
            if ((t = t.nodeType ? t : this.scroller.querySelector(t))) {
               var n = v.offset(t);
               (n.left -= this.wrapperOffset.left),
                  (n.top -= this.wrapperOffset.top),
                  !0 === i &&
                     (i = p.round(
                        t.offsetWidth / 2 - this.wrapper.offsetWidth / 2
                     )),
                  !0 === o &&
                     (o = p.round(
                        t.offsetHeight / 2 - this.wrapper.offsetHeight / 2
                     )),
                  (n.left -= i || 0),
                  (n.top -= o || 0),
                  (n.left =
                     0 < n.left
                        ? 0
                        : n.left < this.maxScrollX
                        ? this.maxScrollX
                        : n.left),
                  (n.top =
                     0 < n.top
                        ? 0
                        : n.top < this.maxScrollY
                        ? this.maxScrollY
                        : n.top),
                  (e =
                     null == e || "auto" === e
                        ? p.max(p.abs(this.x - n.left), p.abs(this.y - n.top))
                        : e),
                  this.scrollTo(n.left, n.top, e, s);
            }
         },
         _transitionTime: function (t) {
            if (this.options.useTransition) {
               t = t || 0;
               var e = v.style.transitionDuration;
               if (e) {
                  if (
                     ((this.scrollerStyle[e] = t + "ms"), !t && v.isBadAndroid)
                  ) {
                     this.scrollerStyle[e] = "0.0001ms";
                     var i = this;
                     f(function () {
                        "0.0001ms" === i.scrollerStyle[e] &&
                           (i.scrollerStyle[e] = "0s");
                     });
                  }
                  if (this.indicators)
                     for (var o = this.indicators.length; o--; )
                        this.indicators[o].transitionTime(t);
               }
            }
         },
         _transitionTimingFunction: function (t) {
            if (
               ((this.scrollerStyle[v.style.transitionTimingFunction] = t),
               this.indicators)
            )
               for (var e = this.indicators.length; e--; )
                  this.indicators[e].transitionTimingFunction(t);
         },
         _translate: function (t, e) {
            if (
               (this.options.useTransform
                  ? (this.scrollerStyle[v.style.transform] =
                       "translate(" + t + "px," + e + "px)" + this.translateZ)
                  : ((t = p.round(t)),
                    (e = p.round(e)),
                    (this.scrollerStyle.left = t + "px"),
                    (this.scrollerStyle.top = e + "px")),
               (this.x = t),
               (this.y = e),
               this.indicators)
            )
               for (var i = this.indicators.length; i--; )
                  this.indicators[i].updatePosition();
         },
         _initEvents: function (t) {
            var e = t ? v.removeEvent : v.addEvent,
               i = this.options.bindToWrapper ? this.wrapper : r;
            e(r, "orientationchange", this),
               e(r, "resize", this),
               this.options.click && e(this.wrapper, "click", this, !0),
               this.options.disableMouse ||
                  (e(this.wrapper, "mousedown", this),
                  e(i, "mousemove", this),
                  e(i, "mousecancel", this),
                  e(i, "mouseup", this)),
               v.hasPointer &&
                  !this.options.disablePointer &&
                  (e(this.wrapper, v.prefixPointerEvent("pointerdown"), this),
                  e(i, v.prefixPointerEvent("pointermove"), this),
                  e(i, v.prefixPointerEvent("pointercancel"), this),
                  e(i, v.prefixPointerEvent("pointerup"), this)),
               v.hasTouch &&
                  !this.options.disableTouch &&
                  (e(this.wrapper, "touchstart", this),
                  e(i, "touchmove", this),
                  e(i, "touchcancel", this),
                  e(i, "touchend", this)),
               e(this.scroller, "transitionend", this),
               e(this.scroller, "webkitTransitionEnd", this),
               e(this.scroller, "oTransitionEnd", this),
               e(this.scroller, "MSTransitionEnd", this);
         },
         getComputedPosition: function () {
            var t,
               e,
               i = r.getComputedStyle(this.scroller, null);
            return (
               (e = this.options.useTransform
                  ? ((t = +(
                       (i = i[v.style.transform]
                          .split(")")[0]
                          .split(", "))[12] || i[4]
                    )),
                    +(i[13] || i[5]))
                  : ((t = +i.left.replace(/[^-\d.]/g, "")),
                    +i.top.replace(/[^-\d.]/g, ""))),
               { x: t, y: e }
            );
         },
         _initIndicators: function () {
            var t,
               e = this.options.interactiveScrollbars,
               i = "string" != typeof this.options.scrollbars,
               o = [],
               s = this;
            (this.indicators = []),
               this.options.scrollbars &&
                  (this.options.scrollY &&
                     ((t = {
                        el: l("v", e, this.options.scrollbars),
                        interactive: e,
                        defaultScrollbars: !0,
                        customStyle: i,
                        resize: this.options.resizeScrollbars,
                        shrink: this.options.shrinkScrollbars,
                        fade: this.options.fadeScrollbars,
                        listenX: !1,
                     }),
                     this.wrapper.appendChild(t.el),
                     o.push(t)),
                  this.options.scrollX &&
                     ((t = {
                        el: l("h", e, this.options.scrollbars),
                        interactive: e,
                        defaultScrollbars: !0,
                        customStyle: i,
                        resize: this.options.resizeScrollbars,
                        shrink: this.options.shrinkScrollbars,
                        fade: this.options.fadeScrollbars,
                        listenY: !1,
                     }),
                     this.wrapper.appendChild(t.el),
                     o.push(t))),
               this.options.indicators &&
                  (o = o.concat(this.options.indicators));
            for (var n = o.length; n--; )
               this.indicators.push(new a(this, o[n]));
            function r(t) {
               if (s.indicators)
                  for (var e = s.indicators.length; e--; )
                     t.call(s.indicators[e]);
            }
            this.options.fadeScrollbars &&
               (this.on("scrollEnd", function () {
                  r(function () {
                     this.fade();
                  });
               }),
               this.on("scrollCancel", function () {
                  r(function () {
                     this.fade();
                  });
               }),
               this.on("scrollStart", function () {
                  r(function () {
                     this.fade(1);
                  });
               }),
               this.on("beforeScrollStart", function () {
                  r(function () {
                     this.fade(1, !0);
                  });
               })),
               this.on("refresh", function () {
                  r(function () {
                     this.refresh();
                  });
               }),
               this.on("destroy", function () {
                  r(function () {
                     this.destroy();
                  }),
                     delete this.indicators;
               });
         },
         _initWheel: function () {
            v.addEvent(this.wrapper, "wheel", this),
               v.addEvent(this.wrapper, "mousewheel", this),
               v.addEvent(this.wrapper, "DOMMouseScroll", this),
               this.on("destroy", function () {
                  clearTimeout(this.wheelTimeout),
                     (this.wheelTimeout = null),
                     v.removeEvent(this.wrapper, "wheel", this),
                     v.removeEvent(this.wrapper, "mousewheel", this),
                     v.removeEvent(this.wrapper, "DOMMouseScroll", this);
               });
         },
         _wheel: function (t) {
            if (this.enabled) {
               r.navigator.userAgent.match(/(MSIE|Trident)/) ||
                  t.preventDefault();
               var e,
                  i,
                  o,
                  s,
                  n = this;
               if (
                  (void 0 === this.wheelTimeout && n._execEvent("scrollStart"),
                  clearTimeout(this.wheelTimeout),
                  (this.wheelTimeout = setTimeout(function () {
                     n.options.snap || n._execEvent("scrollEnd"),
                        (n.wheelTimeout = void 0);
                  }, 400)),
                  "deltaX" in t)
               )
                  i =
                     1 === t.deltaMode
                        ? ((e = -t.deltaX * this.options.mouseWheelSpeed),
                          -t.deltaY * this.options.mouseWheelSpeed)
                        : ((e = -t.deltaX), -t.deltaY);
               else if ("wheelDeltaX" in t)
                  (e = (t.wheelDeltaX / 120) * this.options.mouseWheelSpeed),
                     (i = (t.wheelDeltaY / 120) * this.options.mouseWheelSpeed);
               else if ("wheelDelta" in t)
                  e = i = (t.wheelDelta / 120) * this.options.mouseWheelSpeed;
               else {
                  if (!("detail" in t)) return;
                  e = i = (-t.detail / 3) * this.options.mouseWheelSpeed;
               }
               if (
                  ((e *= this.options.invertWheelDirection),
                  (i *= this.options.invertWheelDirection),
                  this.hasVerticalScroll || ((e = i), (i = 0)),
                  this.options.snap)
               )
                  return (
                     (o = this.currentPage.pageX),
                     (s = this.currentPage.pageY),
                     0 < e ? o-- : e < 0 && o++,
                     0 < i ? s-- : i < 0 && s++,
                     void this.goToPage(o, s)
                  );
               (o = this.x + p.round(this.hasHorizontalScroll ? e : 0)),
                  (s = this.y + p.round(this.hasVerticalScroll ? i : 0)),
                  (this.directionX = 0 < e ? -1 : e < 0 ? 1 : 0),
                  (this.directionY = 0 < i ? -1 : i < 0 ? 1 : 0),
                  0 < o
                     ? (o = 0)
                     : o < this.maxScrollX && (o = this.maxScrollX),
                  0 < s
                     ? (s = 0)
                     : s < this.maxScrollY && (s = this.maxScrollY),
                  this.scrollTo(o, s, 0);
            }
         },
         _initSnap: function () {
            (this.currentPage = {}),
               "string" == typeof this.options.snap &&
                  (this.options.snap = this.scroller.querySelectorAll(
                     this.options.snap
                  )),
               this.on("refresh", function () {
                  var t,
                     e,
                     i,
                     o,
                     s,
                     n,
                     r = 0,
                     l = 0,
                     a = 0,
                     c = this.options.snapStepX || this.wrapperWidth,
                     d = this.options.snapStepY || this.wrapperHeight;
                  if (
                     ((this.pages = []),
                     this.wrapperWidth &&
                        this.wrapperHeight &&
                        this.scrollerWidth &&
                        this.scrollerHeight)
                  ) {
                     if (!0 === this.options.snap)
                        for (
                           i = p.round(c / 2), o = p.round(d / 2);
                           a > -this.scrollerWidth;

                        ) {
                           for (
                              this.pages[r] = [], s = t = 0;
                              s > -this.scrollerHeight;

                           )
                              (this.pages[r][t] = {
                                 x: p.max(a, this.maxScrollX),
                                 y: p.max(s, this.maxScrollY),
                                 width: c,
                                 height: d,
                                 cx: a - i,
                                 cy: s - o,
                              }),
                                 (s -= d),
                                 t++;
                           (a -= c), r++;
                        }
                     else
                        for (
                           t = (n = this.options.snap).length, e = -1;
                           r < t;
                           r++
                        )
                           (0 === r ||
                              n[r].offsetLeft <= n[r - 1].offsetLeft) &&
                              ((l = 0), e++),
                              this.pages[l] || (this.pages[l] = []),
                              (a = p.max(-n[r].offsetLeft, this.maxScrollX)),
                              (s = p.max(-n[r].offsetTop, this.maxScrollY)),
                              (i = a - p.round(n[r].offsetWidth / 2)),
                              (o = s - p.round(n[r].offsetHeight / 2)),
                              (this.pages[l][e] = {
                                 x: a,
                                 y: s,
                                 width: n[r].offsetWidth,
                                 height: n[r].offsetHeight,
                                 cx: i,
                                 cy: o,
                              }),
                              a > this.maxScrollX && l++;
                     this.goToPage(
                        this.currentPage.pageX || 0,
                        this.currentPage.pageY || 0,
                        0
                     ),
                        this.options.snapThreshold % 1 == 0
                           ? ((this.snapThresholdX = this.options.snapThreshold),
                             (this.snapThresholdY = this.options.snapThreshold))
                           : ((this.snapThresholdX = p.round(
                                this.pages[this.currentPage.pageX][
                                   this.currentPage.pageY
                                ].width * this.options.snapThreshold
                             )),
                             (this.snapThresholdY = p.round(
                                this.pages[this.currentPage.pageX][
                                   this.currentPage.pageY
                                ].height * this.options.snapThreshold
                             )));
                  }
               }),
               this.on("flick", function () {
                  var t =
                     this.options.snapSpeed ||
                     p.max(
                        p.max(
                           p.min(p.abs(this.x - this.startX), 1e3),
                           p.min(p.abs(this.y - this.startY), 1e3)
                        ),
                        300
                     );
                  this.goToPage(
                     this.currentPage.pageX + this.directionX,
                     this.currentPage.pageY + this.directionY,
                     t
                  );
               });
         },
         _nearestSnap: function (t, e) {
            if (!this.pages.length) return { x: 0, y: 0, pageX: 0, pageY: 0 };
            var i = 0,
               o = this.pages.length,
               s = 0;
            if (
               p.abs(t - this.absStartX) < this.snapThresholdX &&
               p.abs(e - this.absStartY) < this.snapThresholdY
            )
               return this.currentPage;
            for (
               0 < t ? (t = 0) : t < this.maxScrollX && (t = this.maxScrollX),
                  0 < e
                     ? (e = 0)
                     : e < this.maxScrollY && (e = this.maxScrollY);
               i < o;
               i++
            )
               if (t >= this.pages[i][0].cx) {
                  t = this.pages[i][0].x;
                  break;
               }
            for (o = this.pages[i].length; s < o; s++)
               if (e >= this.pages[0][s].cy) {
                  e = this.pages[0][s].y;
                  break;
               }
            return (
               i == this.currentPage.pageX &&
                  ((i += this.directionX) < 0
                     ? (i = 0)
                     : i >= this.pages.length && (i = this.pages.length - 1),
                  (t = this.pages[i][0].x)),
               s == this.currentPage.pageY &&
                  ((s += this.directionY) < 0
                     ? (s = 0)
                     : s >= this.pages[0].length &&
                       (s = this.pages[0].length - 1),
                  (e = this.pages[0][s].y)),
               { x: t, y: e, pageX: i, pageY: s }
            );
         },
         goToPage: function (t, e, i, o) {
            (o = o || this.options.bounceEasing),
               t >= this.pages.length
                  ? (t = this.pages.length - 1)
                  : t < 0 && (t = 0),
               e >= this.pages[t].length
                  ? (e = this.pages[t].length - 1)
                  : e < 0 && (e = 0);
            var s = this.pages[t][e].x,
               n = this.pages[t][e].y;
            (i =
               void 0 === i
                  ? this.options.snapSpeed ||
                    p.max(
                       p.max(
                          p.min(p.abs(s - this.x), 1e3),
                          p.min(p.abs(n - this.y), 1e3)
                       ),
                       300
                    )
                  : i),
               (this.currentPage = { x: s, y: n, pageX: t, pageY: e }),
               this.scrollTo(s, n, i, o);
         },
         next: function (t, e) {
            var i = this.currentPage.pageX,
               o = this.currentPage.pageY;
            ++i >= this.pages.length &&
               this.hasVerticalScroll &&
               ((i = 0), o++),
               this.goToPage(i, o, t, e);
         },
         prev: function (t, e) {
            var i = this.currentPage.pageX,
               o = this.currentPage.pageY;
            --i < 0 && this.hasVerticalScroll && ((i = 0), o--),
               this.goToPage(i, o, t, e);
         },
         _initKeys: function (t) {
            var e,
               i = {
                  pageUp: 33,
                  pageDown: 34,
                  end: 35,
                  home: 36,
                  left: 37,
                  up: 38,
                  right: 39,
                  down: 40,
               };
            if ("object" == typeof this.options.keyBindings)
               for (e in this.options.keyBindings)
                  "string" == typeof this.options.keyBindings[e] &&
                     (this.options.keyBindings[e] = this.options.keyBindings[e]
                        .toUpperCase()
                        .charCodeAt(0));
            else this.options.keyBindings = {};
            for (e in i)
               this.options.keyBindings[e] =
                  this.options.keyBindings[e] || i[e];
            v.addEvent(r, "keydown", this),
               this.on("destroy", function () {
                  v.removeEvent(r, "keydown", this);
               });
         },
         _key: function (t) {
            if (this.enabled) {
               var e,
                  i = this.options.snap,
                  o = i ? this.currentPage.pageX : this.x,
                  s = i ? this.currentPage.pageY : this.y,
                  n = v.getTime(),
                  r = this.keyTime || 0;
               switch (
                  (this.options.useTransition &&
                     this.isInTransition &&
                     ((e = this.getComputedPosition()),
                     this._translate(p.round(e.x), p.round(e.y)),
                     (this.isInTransition = !1)),
                  (this.keyAcceleration =
                     n - r < 200 ? p.min(this.keyAcceleration + 0.25, 50) : 0),
                  t.keyCode)
               ) {
                  case this.options.keyBindings.pageUp:
                     this.hasHorizontalScroll && !this.hasVerticalScroll
                        ? (o += i ? 1 : this.wrapperWidth)
                        : (s += i ? 1 : this.wrapperHeight);
                     break;
                  case this.options.keyBindings.pageDown:
                     this.hasHorizontalScroll && !this.hasVerticalScroll
                        ? (o -= i ? 1 : this.wrapperWidth)
                        : (s -= i ? 1 : this.wrapperHeight);
                     break;
                  case this.options.keyBindings.end:
                     (o = i ? this.pages.length - 1 : this.maxScrollX),
                        (s = i ? this.pages[0].length - 1 : this.maxScrollY);
                     break;
                  case this.options.keyBindings.home:
                     s = o = 0;
                     break;
                  case this.options.keyBindings.left:
                     o += i ? -1 : (5 + this.keyAcceleration) >> 0;
                     break;
                  case this.options.keyBindings.up:
                     s += i ? 1 : (5 + this.keyAcceleration) >> 0;
                     break;
                  case this.options.keyBindings.right:
                     o -= i ? -1 : (5 + this.keyAcceleration) >> 0;
                     break;
                  case this.options.keyBindings.down:
                     s -= i ? 1 : (5 + this.keyAcceleration) >> 0;
                     break;
                  default:
                     return;
               }
               i
                  ? this.goToPage(o, s)
                  : (0 < o
                       ? ((o = 0), (this.keyAcceleration = 0))
                       : o < this.maxScrollX &&
                         ((o = this.maxScrollX), (this.keyAcceleration = 0)),
                    0 < s
                       ? ((s = 0), (this.keyAcceleration = 0))
                       : s < this.maxScrollY &&
                         ((s = this.maxScrollY), (this.keyAcceleration = 0)),
                    this.scrollTo(o, s, 0),
                    (this.keyTime = n));
            }
         },
         _animate: function (n, r, l, a) {
            var c = this,
               d = this.x,
               p = this.y,
               h = v.getTime(),
               u = h + l;
            (this.isAnimating = !0),
               (function t() {
                  var e,
                     i,
                     o,
                     s = v.getTime();
                  if (u <= s)
                     return (
                        (c.isAnimating = !1),
                        c._translate(n, r),
                        void (
                           c.resetPosition(c.options.bounceTime) ||
                           c._execEvent("scrollEnd")
                        )
                     );
                  (o = a((s = (s - h) / l))),
                     (e = (n - d) * o + d),
                     (i = (r - p) * o + p),
                     c._translate(e, i),
                     c.isAnimating && f(t);
               })();
         },
         handleEvent: function (t) {
            switch (t.type) {
               case "touchstart":
               case "pointerdown":
               case "MSPointerDown":
               case "mousedown":
                  this._start(t);
                  break;
               case "touchmove":
               case "pointermove":
               case "MSPointerMove":
               case "mousemove":
                  this._move(t);
                  break;
               case "touchend":
               case "pointerup":
               case "MSPointerUp":
               case "mouseup":
               case "touchcancel":
               case "pointercancel":
               case "MSPointerCancel":
               case "mousecancel":
                  this._end(t);
                  break;
               case "orientationchange":
               case "resize":
                  this._resize();
                  break;
               case "transitionend":
               case "webkitTransitionEnd":
               case "oTransitionEnd":
               case "MSTransitionEnd":
                  this._transitionEnd(t);
                  break;
               case "wheel":
               case "DOMMouseScroll":
               case "mousewheel":
                  this._wheel(t);
                  break;
               case "keydown":
                  this._key(t);
                  break;
               case "click":
                  this.enabled &&
                     !t._constructed &&
                     (t.preventDefault(), t.stopPropagation());
            }
         },
      }),
         (a.prototype = {
            handleEvent: function (t) {
               switch (t.type) {
                  case "touchstart":
                  case "pointerdown":
                  case "MSPointerDown":
                  case "mousedown":
                     this._start(t);
                     break;
                  case "touchmove":
                  case "pointermove":
                  case "MSPointerMove":
                  case "mousemove":
                     this._move(t);
                     break;
                  case "touchend":
                  case "pointerup":
                  case "MSPointerUp":
                  case "mouseup":
                  case "touchcancel":
                  case "pointercancel":
                  case "MSPointerCancel":
                  case "mousecancel":
                     this._end(t);
               }
            },
            destroy: function () {
               this.options.fadeScrollbars &&
                  (clearTimeout(this.fadeTimeout), (this.fadeTimeout = null)),
                  this.options.interactive &&
                     (v.removeEvent(this.indicator, "touchstart", this),
                     v.removeEvent(
                        this.indicator,
                        v.prefixPointerEvent("pointerdown"),
                        this
                     ),
                     v.removeEvent(this.indicator, "mousedown", this),
                     v.removeEvent(r, "touchmove", this),
                     v.removeEvent(
                        r,
                        v.prefixPointerEvent("pointermove"),
                        this
                     ),
                     v.removeEvent(r, "mousemove", this),
                     v.removeEvent(r, "touchend", this),
                     v.removeEvent(r, v.prefixPointerEvent("pointerup"), this),
                     v.removeEvent(r, "mouseup", this)),
                  this.options.defaultScrollbars &&
                     this.wrapper.parentNode.removeChild(this.wrapper);
            },
            _start: function (t) {
               var e = t.touches ? t.touches[0] : t;
               t.preventDefault(),
                  t.stopPropagation(),
                  this.transitionTime(),
                  (this.initiated = !0),
                  (this.moved = !1),
                  (this.lastPointX = e.pageX),
                  (this.lastPointY = e.pageY),
                  (this.startTime = v.getTime()),
                  this.options.disableTouch || v.addEvent(r, "touchmove", this),
                  this.options.disablePointer ||
                     v.addEvent(r, v.prefixPointerEvent("pointermove"), this),
                  this.options.disableMouse || v.addEvent(r, "mousemove", this),
                  this.scroller._execEvent("beforeScrollStart");
            },
            _move: function (t) {
               var e,
                  i,
                  o,
                  s,
                  n = t.touches ? t.touches[0] : t;
               v.getTime();
               this.moved || this.scroller._execEvent("scrollStart"),
                  (this.moved = !0),
                  (e = n.pageX - this.lastPointX),
                  (this.lastPointX = n.pageX),
                  (i = n.pageY - this.lastPointY),
                  (this.lastPointY = n.pageY),
                  (o = this.x + e),
                  (s = this.y + i),
                  this._pos(o, s),
                  t.preventDefault(),
                  t.stopPropagation();
            },
            _end: function (t) {
               if (this.initiated) {
                  if (
                     ((this.initiated = !1),
                     t.preventDefault(),
                     t.stopPropagation(),
                     v.removeEvent(r, "touchmove", this),
                     v.removeEvent(
                        r,
                        v.prefixPointerEvent("pointermove"),
                        this
                     ),
                     v.removeEvent(r, "mousemove", this),
                     this.scroller.options.snap)
                  ) {
                     var e = this.scroller._nearestSnap(
                           this.scroller.x,
                           this.scroller.y
                        ),
                        i =
                           this.options.snapSpeed ||
                           p.max(
                              p.max(
                                 p.min(p.abs(this.scroller.x - e.x), 1e3),
                                 p.min(p.abs(this.scroller.y - e.y), 1e3)
                              ),
                              300
                           );
                     (this.scroller.x == e.x && this.scroller.y == e.y) ||
                        ((this.scroller.directionX = 0),
                        (this.scroller.directionY = 0),
                        (this.scroller.currentPage = e),
                        this.scroller.scrollTo(
                           e.x,
                           e.y,
                           i,
                           this.scroller.options.bounceEasing
                        ));
                  }
                  this.moved && this.scroller._execEvent("scrollEnd");
               }
            },
            transitionTime: function (t) {
               t = t || 0;
               var e = v.style.transitionDuration;
               if (
                  e &&
                  ((this.indicatorStyle[e] = t + "ms"), !t && v.isBadAndroid)
               ) {
                  this.indicatorStyle[e] = "0.0001ms";
                  var i = this;
                  f(function () {
                     "0.0001ms" === i.indicatorStyle[e] &&
                        (i.indicatorStyle[e] = "0s");
                  });
               }
            },
            transitionTimingFunction: function (t) {
               this.indicatorStyle[v.style.transitionTimingFunction] = t;
            },
            refresh: function () {
               this.transitionTime(),
                  this.options.listenX && !this.options.listenY
                     ? (this.indicatorStyle.display = this.scroller
                          .hasHorizontalScroll
                          ? "block"
                          : "none")
                     : this.options.listenY && !this.options.listenX
                     ? (this.indicatorStyle.display = this.scroller
                          .hasVerticalScroll
                          ? "block"
                          : "none")
                     : (this.indicatorStyle.display =
                          this.scroller.hasHorizontalScroll ||
                          this.scroller.hasVerticalScroll
                             ? "block"
                             : "none"),
                  this.scroller.hasHorizontalScroll &&
                  this.scroller.hasVerticalScroll
                     ? (v.addClass(this.wrapper, "iScrollBothScrollbars"),
                       v.removeClass(this.wrapper, "iScrollLoneScrollbar"),
                       this.options.defaultScrollbars &&
                          this.options.customStyle &&
                          (this.options.listenX
                             ? (this.wrapper.style.right = "8px")
                             : (this.wrapper.style.bottom = "8px")))
                     : (v.removeClass(this.wrapper, "iScrollBothScrollbars"),
                       v.addClass(this.wrapper, "iScrollLoneScrollbar"),
                       this.options.defaultScrollbars &&
                          this.options.customStyle &&
                          (this.options.listenX
                             ? (this.wrapper.style.right = "2px")
                             : (this.wrapper.style.bottom = "2px")));
               this.wrapper.offsetHeight;
               this.options.listenX &&
                  ((this.wrapperWidth = this.wrapper.clientWidth),
                  this.options.resize
                     ? ((this.indicatorWidth = p.max(
                          p.round(
                             (this.wrapperWidth * this.wrapperWidth) /
                                (this.scroller.scrollerWidth ||
                                   this.wrapperWidth ||
                                   1)
                          ),
                          8
                       )),
                       (this.indicatorStyle.width = this.indicatorWidth + "px"))
                     : (this.indicatorWidth = this.indicator.clientWidth),
                  (this.maxPosX = this.wrapperWidth - this.indicatorWidth),
                  "clip" == this.options.shrink
                     ? ((this.minBoundaryX = 8 - this.indicatorWidth),
                       (this.maxBoundaryX = this.wrapperWidth - 8))
                     : ((this.minBoundaryX = 0),
                       (this.maxBoundaryX = this.maxPosX)),
                  (this.sizeRatioX =
                     this.options.speedRatioX ||
                     (this.scroller.maxScrollX &&
                        this.maxPosX / this.scroller.maxScrollX))),
                  this.options.listenY &&
                     ((this.wrapperHeight = this.wrapper.clientHeight),
                     this.options.resize
                        ? ((this.indicatorHeight = p.max(
                             p.round(
                                (this.wrapperHeight * this.wrapperHeight) /
                                   (this.scroller.scrollerHeight ||
                                      this.wrapperHeight ||
                                      1)
                             ),
                             8
                          )),
                          (this.indicatorStyle.height =
                             this.indicatorHeight + "px"))
                        : (this.indicatorHeight = this.indicator.clientHeight),
                     (this.maxPosY = this.wrapperHeight - this.indicatorHeight),
                     "clip" == this.options.shrink
                        ? ((this.minBoundaryY = 8 - this.indicatorHeight),
                          (this.maxBoundaryY = this.wrapperHeight - 8))
                        : ((this.minBoundaryY = 0),
                          (this.maxBoundaryY = this.maxPosY)),
                     (this.maxPosY = this.wrapperHeight - this.indicatorHeight),
                     (this.sizeRatioY =
                        this.options.speedRatioY ||
                        (this.scroller.maxScrollY &&
                           this.maxPosY / this.scroller.maxScrollY))),
                  this.updatePosition();
            },
            updatePosition: function () {
               var t =
                     (this.options.listenX &&
                        p.round(this.sizeRatioX * this.scroller.x)) ||
                     0,
                  e =
                     (this.options.listenY &&
                        p.round(this.sizeRatioY * this.scroller.y)) ||
                     0;
               this.options.ignoreBoundaries ||
                  (t < this.minBoundaryX
                     ? ("scale" == this.options.shrink &&
                          ((this.width = p.max(this.indicatorWidth + t, 8)),
                          (this.indicatorStyle.width = this.width + "px")),
                       (t = this.minBoundaryX))
                     : t > this.maxBoundaryX
                     ? (t =
                          "scale" == this.options.shrink
                             ? ((this.width = p.max(
                                  this.indicatorWidth - (t - this.maxPosX),
                                  8
                               )),
                               (this.indicatorStyle.width = this.width + "px"),
                               this.maxPosX + this.indicatorWidth - this.width)
                             : this.maxBoundaryX)
                     : "scale" == this.options.shrink &&
                       this.width != this.indicatorWidth &&
                       ((this.width = this.indicatorWidth),
                       (this.indicatorStyle.width = this.width + "px")),
                  e < this.minBoundaryY
                     ? ("scale" == this.options.shrink &&
                          ((this.height = p.max(
                             this.indicatorHeight + 3 * e,
                             8
                          )),
                          (this.indicatorStyle.height = this.height + "px")),
                       (e = this.minBoundaryY))
                     : e > this.maxBoundaryY
                     ? (e =
                          "scale" == this.options.shrink
                             ? ((this.height = p.max(
                                  this.indicatorHeight - 3 * (e - this.maxPosY),
                                  8
                               )),
                               (this.indicatorStyle.height =
                                  this.height + "px"),
                               this.maxPosY +
                                  this.indicatorHeight -
                                  this.height)
                             : this.maxBoundaryY)
                     : "scale" == this.options.shrink &&
                       this.height != this.indicatorHeight &&
                       ((this.height = this.indicatorHeight),
                       (this.indicatorStyle.height = this.height + "px"))),
                  (this.x = t),
                  (this.y = e),
                  this.scroller.options.useTransform
                     ? (this.indicatorStyle[v.style.transform] =
                          "translate(" +
                          t +
                          "px," +
                          e +
                          "px)" +
                          this.scroller.translateZ)
                     : ((this.indicatorStyle.left = t + "px"),
                       (this.indicatorStyle.top = e + "px"));
            },
            _pos: function (t, e) {
               t < 0 ? (t = 0) : t > this.maxPosX && (t = this.maxPosX),
                  e < 0 ? (e = 0) : e > this.maxPosY && (e = this.maxPosY),
                  (t = this.options.listenX
                     ? p.round(t / this.sizeRatioX)
                     : this.scroller.x),
                  (e = this.options.listenY
                     ? p.round(e / this.sizeRatioY)
                     : this.scroller.y),
                  this.scroller.scrollTo(t, e);
            },
            fade: function (t, e) {
               if (!e || this.visible) {
                  clearTimeout(this.fadeTimeout), (this.fadeTimeout = null);
                  var i = t ? 250 : 500,
                     o = t ? 0 : 300;
                  (t = t ? "1" : "0"),
                     (this.wrapperStyle[v.style.transitionDuration] = i + "ms"),
                     (this.fadeTimeout = setTimeout(
                        function (t) {
                           (this.wrapperStyle.opacity = t), (this.visible = +t);
                        }.bind(this, t),
                        o
                     ));
               }
            },
         }),
         (t.utils = v),
         "undefined" != typeof module && module.exports
            ? (module.exports = t)
            : "function" == typeof define && define.amd
            ? (define(function () {
                 return t;
              }),
              void 0 !== r && (r.IScroll = t))
            : (r.IScroll = t);
   })(window, document, Math),
   (function (u, f) {
      u.fp_scrolloverflow = (function () {
         u.IScroll || (u.IScroll = module.exports);
         var i = "fp-scrollable",
            n = "." + i,
            t = ".active",
            d = ".fp-section",
            o = d + t,
            s = ".fp-slide",
            p = ".fp-tableCell";
         function r() {
            var c = this;
            function i() {
               fp_utils.hasClass(f.body, "fp-responsive") ? e(o) : e(t);
            }
            function t(t) {
               if (!fp_utils.hasClass(t, "fp-noscroll")) {
                  fp_utils.css(t, { overflow: "hidden" });
                  var e,
                     i = c.options.scrollOverflowHandler,
                     o = i.wrapContent(),
                     s = fp_utils.closest(t, d),
                     n = i.scrollable(t),
                     r = (function (t) {
                        var e = fp_utils.closest(t, d);
                        return null != e
                           ? parseInt(getComputedStyle(e)["padding-bottom"]) +
                                parseInt(getComputedStyle(e)["padding-top"])
                           : 0;
                     })(s);
                  null != n
                     ? (e = i.scrollHeight(t))
                     : ((e = t.scrollHeight),
                       c.options.verticalCentered &&
                          (e = h(p, t)[0].scrollHeight));
                  var l = fp_utils.getWindowHeight(),
                     a = l - r;
                  l < e + r
                     ? null != n
                        ? i.update(t, a)
                        : (c.options.verticalCentered
                             ? (fp_utils.wrapInner(h(p, t)[0], o.scroller),
                               fp_utils.wrapInner(h(p, t)[0], o.scrollable))
                             : (fp_utils.wrapInner(t, o.scroller),
                               fp_utils.wrapInner(t, o.scrollable)),
                          i.create(t, a, c.iscrollOptions))
                     : i.remove(t),
                     fp_utils.css(t, { overflow: "" });
               }
            }
            function e(i) {
               h(d).forEach(function (t) {
                  var e = h(s, t);
                  e.length
                     ? e.forEach(function (t) {
                          i(t);
                       })
                     : i(t);
               });
            }
            function o(t) {
               var e = c.options.scrollOverflowHandler;
               fp_utils.hasClass(
                  fp_utils.closest(t, d),
                  "fp-auto-height-responsive"
               ) && e.remove(t);
            }
            (c.options = null),
               (c.init = function (t, e) {
                  return (
                     (c.options = t),
                     (c.iscrollOptions = e),
                     "complete" === f.readyState &&
                        (i(), fullpage_api.shared.afterRenderActions()),
                     u.addEventListener("load", function () {
                        i(), fullpage_api.shared.afterRenderActions();
                     }),
                     c
                  );
               }),
               (c.createScrollBarForAll = i),
               (c.createScrollBar = t);
         }
         (IScroll.prototype.wheelOn = function () {
            this.wrapper.addEventListener("wheel", this),
               this.wrapper.addEventListener("mousewheel", this),
               this.wrapper.addEventListener("DOMMouseScroll", this);
         }),
            (IScroll.prototype.wheelOff = function () {
               this.wrapper.removeEventListener("wheel", this),
                  this.wrapper.removeEventListener("mousewheel", this),
                  this.wrapper.removeEventListener("DOMMouseScroll", this);
            });
         var h = null,
            l = null,
            a = {
               refreshId: null,
               iScrollInstances: [],
               lastScrollY: null,
               hasBeenInit: !1,
               iscrollOptions: {
                  scrollbars: !0,
                  mouseWheel: !0,
                  hideScrollbars: !1,
                  fadeScrollbars: !1,
                  disableMouse: !0,
                  interactiveScrollbars: !0,
               },
               init: function (t) {
                  (h = fp_utils.$), (l = t);
                  var e =
                     "ontouchstart" in u ||
                     0 < navigator.msMaxTouchPoints ||
                     navigator.maxTouchPoints;
                  return (
                     (a.iscrollOptions.click = e),
                     (a.hasBeenInit = !0),
                     (a.iscrollOptions = fp_utils.deepExtend(
                        a.iscrollOptions,
                        t.scrollOverflowOptions
                     )),
                     new r().init(t, a.iscrollOptions)
                  );
               },
               toggleWheel: function (i) {
                  h(n, h(o)[0]).forEach(function (t) {
                     var e = t.fp_iscrollInstance;
                     null != e && (i ? e.wheelOn() : e.wheelOff());
                  });
               },
               setIscroll: function (t, e) {
                  if (a.hasBeenInit && t) {
                     var i = fp_utils.closest(t, n) || (h(n, t) && h(n, t)[0]),
                        o = e ? "enable" : "disable";
                     i && i.fp_iscrollInstance[o]();
                  }
               },
               onLeave: function () {
                  a.toggleWheel(!1);
               },
               beforeLeave: function () {
                  a.onLeave();
               },
               afterLoad: function () {
                  a.toggleWheel(!0);
               },
               create: function (i, o, s) {
                  h(n, i).forEach(function (t) {
                     fp_utils.css(t, { height: o + "px" });
                     var e = t.fp_iscrollInstance;
                     null != e &&
                        a.iScrollInstances.forEach(function (t) {
                           t.destroy();
                        }),
                        (e = new IScroll(t, s)),
                        a.iScrollInstances.push(e),
                        fp_utils.hasClass(fp_utils.closest(i, d), "active") ||
                           e.wheelOff(),
                        (t.fp_iscrollInstance = e);
                  });
               },
               isScrolled: function (t, e) {
                  var i = e.fp_iscrollInstance;
                  if (!i) return !0;
                  if ("top" === t) return 0 <= i.y && !fp_utils.getScrollTop(e);
                  if ("bottom" === t) {
                     var o = a.lastScrollY === i.y;
                     return (
                        (a.lastScrollY = i.y),
                        (o ? 1 : 0) +
                           (0 - i.y) +
                           fp_utils.getScrollTop(e) +
                           e.offsetHeight >=
                           e.scrollHeight
                     );
                  }
               },
               scrollable: function (t) {
                  return h(".fp-slides", t).length
                     ? h(n, h(".fp-slide.active", t)[0])[0]
                     : h(n, t)[0];
               },
               scrollHeight: function (t) {
                  return h(".fp-scroller", h(n, t)[0])[0].scrollHeight;
               },
               remove: function (t) {
                  if (null != t) {
                     var e = h(n, t)[0];
                     if (null != e) {
                        var i = e.fp_iscrollInstance;
                        null != i && i.destroy(),
                           (e.fp_iscrollInstance = null),
                           fp_utils.unwrap(h(".fp-scroller", t)[0]),
                           fp_utils.unwrap(h(n, t)[0]);
                     }
                  }
               },
               update: function (t, e) {
                  clearTimeout(a.refreshId),
                     (a.refreshId = setTimeout(function () {
                        a.iScrollInstances.forEach(function (t) {
                           t.refresh(),
                              fullpage_api.silentMoveTo(
                                 fp_utils.index(h(o)[0]) + 1
                              );
                        });
                     }, 150)),
                     fp_utils.css(h(n, t)[0], { height: e + "px" }),
                     l.verticalCentered &&
                        fp_utils.css(h(n, t)[0].parentNode, {
                           height: e + "px",
                        });
               },
               wrapContent: function () {
                  var t = f.createElement("div");
                  t.className = i;
                  var e = f.createElement("div");
                  return (
                     (e.className = "fp-scroller"),
                     { scrollable: t, scroller: e }
                  );
               },
            };
         return { iscrollHandler: a };
      })();
   })(window, document);
/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-webp-setclasses !*/
!(function (e, n, A) {
   function o(e) {
      var n = u.className,
         A = Modernizr._config.classPrefix || "";
      if ((c && (n = n.baseVal), Modernizr._config.enableJSClass)) {
         var o = new RegExp("(^|\\s)" + A + "no-js(\\s|$)");
         n = n.replace(o, "$1" + A + "js$2");
      }
      Modernizr._config.enableClasses &&
         ((n += " " + A + e.join(" " + A)),
         c ? (u.className.baseVal = n) : (u.className = n));
   }
   function t(e, n) {
      return typeof e === n;
   }
   function a() {
      var e, n, A, o, a, i, l;
      for (var f in r)
         if (r.hasOwnProperty(f)) {
            if (
               ((e = []),
               (n = r[f]),
               n.name &&
                  (e.push(n.name.toLowerCase()),
                  n.options && n.options.aliases && n.options.aliases.length))
            )
               for (A = 0; A < n.options.aliases.length; A++)
                  e.push(n.options.aliases[A].toLowerCase());
            for (
               o = t(n.fn, "function") ? n.fn() : n.fn, a = 0;
               a < e.length;
               a++
            )
               (i = e[a]),
                  (l = i.split(".")),
                  1 === l.length
                     ? (Modernizr[l[0]] = o)
                     : (!Modernizr[l[0]] ||
                          Modernizr[l[0]] instanceof Boolean ||
                          (Modernizr[l[0]] = new Boolean(Modernizr[l[0]])),
                       (Modernizr[l[0]][l[1]] = o)),
                  s.push((o ? "" : "no-") + l.join("-"));
         }
   }
   function i(e, n) {
      if ("object" == typeof e) for (var A in e) f(e, A) && i(A, e[A]);
      else {
         e = e.toLowerCase();
         var t = e.split("."),
            a = Modernizr[t[0]];
         if ((2 == t.length && (a = a[t[1]]), "undefined" != typeof a))
            return Modernizr;
         (n = "function" == typeof n ? n() : n),
            1 == t.length
               ? (Modernizr[t[0]] = n)
               : (!Modernizr[t[0]] ||
                    Modernizr[t[0]] instanceof Boolean ||
                    (Modernizr[t[0]] = new Boolean(Modernizr[t[0]])),
                 (Modernizr[t[0]][t[1]] = n)),
            o([(n && 0 != n ? "" : "no-") + t.join("-")]),
            Modernizr._trigger(e, n);
      }
      return Modernizr;
   }
   var s = [],
      r = [],
      l = {
         _version: "3.6.0",
         _config: {
            classPrefix: "",
            enableClasses: !0,
            enableJSClass: !0,
            usePrefixes: !0,
         },
         _q: [],
         on: function (e, n) {
            var A = this;
            setTimeout(function () {
               n(A[e]);
            }, 0);
         },
         addTest: function (e, n, A) {
            r.push({ name: e, fn: n, options: A });
         },
         addAsyncTest: function (e) {
            r.push({ name: null, fn: e });
         },
      },
      Modernizr = function () {};
   (Modernizr.prototype = l), (Modernizr = new Modernizr());
   var f,
      u = n.documentElement,
      c = "svg" === u.nodeName.toLowerCase();
   !(function () {
      var e = {}.hasOwnProperty;
      f =
         t(e, "undefined") || t(e.call, "undefined")
            ? function (e, n) {
                 return n in e && t(e.constructor.prototype[n], "undefined");
              }
            : function (n, A) {
                 return e.call(n, A);
              };
   })(),
      (l._l = {}),
      (l.on = function (e, n) {
         this._l[e] || (this._l[e] = []),
            this._l[e].push(n),
            Modernizr.hasOwnProperty(e) &&
               setTimeout(function () {
                  Modernizr._trigger(e, Modernizr[e]);
               }, 0);
      }),
      (l._trigger = function (e, n) {
         if (this._l[e]) {
            var A = this._l[e];
            setTimeout(function () {
               var e, o;
               for (e = 0; e < A.length; e++) (o = A[e])(n);
            }, 0),
               delete this._l[e];
         }
      }),
      Modernizr._q.push(function () {
         l.addTest = i;
      }),
      Modernizr.addAsyncTest(function () {
         function e(e, n, A) {
            function o(n) {
               var o = n && "load" === n.type ? 1 == t.width : !1,
                  a = "webp" === e;
               i(e, a && o ? new Boolean(o) : o), A && A(n);
            }
            var t = new Image();
            (t.onerror = o), (t.onload = o), (t.src = n);
         }
         var n = [
               {
                  uri:
                     "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=",
                  name: "webp",
               },
               {
                  uri:
                     "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==",
                  name: "webp.alpha",
               },
               {
                  uri:
                     "data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",
                  name: "webp.animation",
               },
               {
                  uri:
                     "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=",
                  name: "webp.lossless",
               },
            ],
            A = n.shift();
         e(A.name, A.uri, function (A) {
            if (A && "load" === A.type)
               for (var o = 0; o < n.length; o++) e(n[o].name, n[o].uri);
         });
      }),
      a(),
      o(s),
      delete l.addTest,
      delete l.addAsyncTest;
   for (var p = 0; p < Modernizr._q.length; p++) Modernizr._q[p]();
   e.Modernizr = Modernizr;
})(window, document);
