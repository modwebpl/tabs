export let tabs = function (el) {
  this.init(el);
};

tabs.prototype = {
  constructor: tabs,

  init: function (el) {
    var _this = this;

    if (!_this._setVars(el)) return;
    _this._setEvents();
  },

  _setVars: function (el) {
    var _this = this;

    _this._parent = el;
    if (!_this._parent) return false;

    _this._tabs = _this._parent.querySelectorAll('.tab');
    if (!_this._tabs) return false;

    _this._contentBox = _this._parent.querySelectorAll('.contentBox');
    if (!_this._contentBox) return false;

    CSSPlugin;

    return true;
  },

  _setEvents: function () {
    var _this = this;

    _this._clickTab();
  },

  _clickTab: function () {
    var _this = this;

    each(_this._tabs, function (key, val) {

      const index = key;
      const tab = _this._tabs;

      tab._elh = tab._elh || {};
      tab._elh.click = function () {

        if (this.classList.contains('tab--active')) return;

        let open = _this._parent.querySelector('#' + this.getAttribute('data-id'));

        _this._closeAll();

        each(_this._tabs, function(key, val){
          if(index !== key) val.classList.remove('tab--active');
        });

        this.classList.add('tab--active');

        TweenLite.killTweensOf(open);
        _this._openTab(open);
      };
      val.addEventListener('click', tab._elh.click);
    });
  },

  _closeAll: function () {
    var _this = this;

    each(_this._contentBox, function (key, val) {
      _this._closeTab(val);
    });
  },

  _closeTab: function(el){
    TweenLite.set(el, {className: '-=open', autoAlpha: 0});
  },

  _openTab: function (el) {
    TweenLite.set(el, {autoAlpha: 0, className: '+=open'});
    TweenLite.to(el, 1, {autoAlpha: 1})
  }
};
