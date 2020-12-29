'use strict';Object.defineProperty(exports,'__esModule',{value:true});//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  props: {
    label: String,
    placeholder: String,
    accept: String,
    multiple: Boolean,
    isInvalid: Boolean
  },
  created: function created() {},
  mounted: function mounted() {},
  data: function data() {
    return {
      customPlaceHolder: null,
      hasUploaded: false
    };
  },
  methods: {
    uploadFiles: function uploadFiles(event) {
      var _this = this;

      var text = "";

      if (event.target.files.length == 1) {
        text = " File Choosen";
      } else {
        text = " Files Choosen";
      }

      if (event.target.files.length <= 0) {
        this.customPlaceHolder = null;
        this.output = null;
        this.$emit("output", null);
        this.$emit("filecount", 0);
        this.hasUploaded = false;
        return;
      } // Incase if there are files


      var selectedFileCount = event.target.files.length;
      var promises = [];
      var files = event.target.files;

      var _loop = function _loop(i) {
        var temp = {
          name: files[i].name,
          file: ""
        };
        var reader = new FileReader();

        reader.onload = function (file) {
          temp.file = reader.result;
        };

        reader.readAsDataURL(files[i]);
        promises.push(temp);
      };

      for (var i = 0; i < files.length; i++) {
        _loop(i);
      }

      this.customPlaceHolder = event.target.files.length + text;
      Promise.all(promises).then(function (fileContents) {
        _this.$emit("output", fileContents);

        _this.$emit("filecount", event.target.files.length);

        _this.hasUploaded = true;
        console.log(promises);
      });
    }
  },
  computed: {
    isMultiple: function isMultiple() {
      if (this.multiple == null) {
        return false;
      } else {
        return this.multiple;
      }
    },
    mainLabel: function mainLabel() {
      if (this.label == null) {
        return "Choose To Upload";
      } else {
        return this.label;
      }
    },
    mainPlaceholder: function mainPlaceholder() {
      if (this.customPlaceHolder != null) {
        return this.customPlaceHolder;
      }

      if (this.placeholder == null) {
        if (this.multiple == null) {
          return "Choose File";
        } else {
          return "Choose Files";
        }
      } else {
        return this.placeholder;
      }
    },
    itemFilter: function itemFilter() {
      if (this.accept == null) {
        return "";
      } else {
        return this.accept;
      }
    },
    errorCheck: function errorCheck() {
      if (this.isInvalid == null) {
        return false;
      } else {
        return this.isInvalid;
      }
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._ssrNode("<label data-v-1b5bac8c>" + _vm._ssrEscape(_vm._s(_vm.mainLabel)) + "</label> <div class=\"main-style\" data-v-1b5bac8c><input" + _vm._ssrAttr("accept", _vm.itemFilter) + _vm._ssrAttr("multiple", _vm.isMultiple) + " type=\"file\" class=\"input-style\" data-v-1b5bac8c> <label" + _vm._ssrClass("file-label", {
    invalid: _vm.errorCheck
  }) + " data-v-1b5bac8c>" + _vm._ssrEscape(_vm._s(_vm.mainPlaceholder)) + "</label></div> "), _vm.errorCheck ? _vm._t("errorMessage") : _vm._e(), _vm._ssrNode(" "), _vm.hasUploaded ? _vm._t("onComplete") : _vm._e()], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-1b5bac8c_0", {
    source: ".main-style[data-v-1b5bac8c]{position:relative;display:inline-block;width:100%;height:calc(1.6em + .75rem + 2px);overflow:hidden!important}.input-style[data-v-1b5bac8c]{position:relative;z-index:2;width:100%;height:calc(1.6em + .75rem + 2px);margin:0;opacity:0}.file-label[data-v-1b5bac8c]{position:absolute;top:0;right:0;left:0;z-index:1;height:calc(1.6em + .75rem + 2px);padding:.375rem .75rem;font-weight:400;line-height:1.6;color:#495057;background-color:#fff;border:1px solid #e1e5ed;border-radius:.25rem}.file-label[data-v-1b5bac8c]::after{position:absolute;top:0;right:0;bottom:0;z-index:3;display:block;height:calc(1.6em + .75rem);padding:.375rem .75rem;line-height:1.6;color:#495057;content:\"Browse\";background-color:#e9ecef;border-left:inherit;border-radius:0 .25rem .25rem 0}.invalid[data-v-1b5bac8c]{border:1px solid #e3342f!important}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-1b5bac8c";
/* module identifier */

var __vue_module_identifier__ = "data-v-1b5bac8c";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);// Import vue component

var install = function installVueFile64(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VueFile64', __vue_component__);
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
exports.default=__vue_component__;