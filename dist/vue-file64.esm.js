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
//
var script = {
  props: {
    label: String,
    placeholder: String,
    accept: String,
    multiple: Boolean,
    isInvalid: Boolean
  },

  created() {},

  mounted() {},

  data() {
    return {
      customPlaceHolder: null,
      hasUploaded: false
    };
  },

  methods: {
    uploadFiles: function (event) {
      let text = "";

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


      let selectedFileCount = event.target.files.length;
      let promises = [];
      let files = event.target.files;

      for (let i = 0; i < files.length; i++) {
        const temp = {
          name: files[i].name,
          file: ""
        };
        let reader = new FileReader();

        reader.onload = file => {
          temp.file = reader.result;
        };

        reader.readAsDataURL(files[i]);
        promises.push(temp);
      }

      this.customPlaceHolder = event.target.files.length + text;
      Promise.all(promises).then(fileContents => {
        this.$emit("output", fileContents);
        this.$emit("filecount", event.target.files.length);
        this.hasUploaded = true;
        console.log(promises);
      });
    }
  },
  computed: {
    isMultiple: function () {
      if (this.multiple == null) {
        return false;
      } else {
        return this.multiple;
      }
    },
    mainLabel: function () {
      if (this.label == null) {
        return "Choose To Upload";
      } else {
        return this.label;
      }
    },
    mainPlaceholder: function () {
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
    itemFilter: function () {
      if (this.accept == null) {
        return "";
      } else {
        return this.accept;
      }
    },
    errorCheck: function () {
      if (this.isInvalid == null) {
        return false;
      } else {
        return this.isInvalid;
      }
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_c('label', [_vm._v(_vm._s(_vm.mainLabel))]), _vm._v(" "), _c('div', {
    staticClass: "main-style"
  }, [_c('input', {
    staticClass: "input-style",
    attrs: {
      "accept": _vm.itemFilter,
      "multiple": _vm.isMultiple,
      "type": "file"
    },
    on: {
      "change": _vm.uploadFiles
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "file-label",
    class: {
      invalid: _vm.errorCheck
    }
  }, [_vm._v(_vm._s(_vm.mainPlaceholder))])]), _vm._v(" "), _vm.errorCheck ? _vm._t("errorMessage") : _vm._e(), _vm._v(" "), _vm.hasUploaded ? _vm._t("onComplete") : _vm._e()], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-1b5bac8c_0", {
    source: ".main-style[data-v-1b5bac8c]{position:relative;display:inline-block;width:100%;height:calc(1.6em + .75rem + 2px);overflow:hidden!important}.input-style[data-v-1b5bac8c]{position:relative;z-index:2;width:100%;height:calc(1.6em + .75rem + 2px);margin:0;opacity:0}.file-label[data-v-1b5bac8c]{position:absolute;top:0;right:0;left:0;z-index:1;height:calc(1.6em + .75rem + 2px);padding:.375rem .75rem;font-weight:400;line-height:1.6;color:#495057;background-color:#fff;border:1px solid #e1e5ed;border-radius:.25rem}.file-label[data-v-1b5bac8c]::after{position:absolute;top:0;right:0;bottom:0;z-index:3;display:block;height:calc(1.6em + .75rem);padding:.375rem .75rem;line-height:1.6;color:#495057;content:\"Browse\";background-color:#e9ecef;border-left:inherit;border-radius:0 .25rem .25rem 0}.invalid[data-v-1b5bac8c]{border:1px solid #e3342f!important}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-1b5bac8c";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

// Import vue component

const install = function installVueFile64(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VueFile64', __vue_component__);
}; // Create module definition for Vue.use()
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default __vue_component__;
